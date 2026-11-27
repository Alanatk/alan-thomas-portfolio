import { useEffect, useRef, useState } from "react";
import { FaMinus, FaPaperPlane, FaRobot, FaTimes, FaTrashAlt } from "react-icons/fa";
import { certificateFiles, internship, resume } from "../data/portfolioAssets";
import { profile, projects } from "../data/portfolioKnowledge";
import {
  assessQuestion, facts, fallbackFor, MAX_HISTORY, MAX_QUESTION, messages,
  suggestedQuestions, validateReply,
} from "../utils/chatbot";
import "./Chatbot.css";

const STORAGE_KEY = "alan-portfolio-chat-v1";
const MAX_MESSAGES = 61;
const formatTime = new Intl.DateTimeFormat(undefined, { hour: "numeric", minute: "2-digit" });
const assetLinks = Object.fromEntries(
  Object.entries(certificateFiles).map(([id, href]) => [id, { href, label: "View certificate" }]),
);
const links = {
  ...assetLinks,
  internship: { href: internship, label: "View internship certificate" },
  resume: { href: resume, label: "Download resume", download: "ALAN THOMAS.pdf" },
  email: { href: `mailto:${profile.email}`, label: "Email Alan" },
  linkedin: { href: profile.linkedin, label: "LinkedIn" },
  github: { href: profile.github, label: "GitHub profile" },
  website: { href: profile.website, label: "Portfolio website" },
};
for (const project of projects) {
  links[`${project.id}-github`] = { href: project.github, label: "GitHub" };
  links[`${project.id}-demo`] = { href: project.live, label: "Live demo" };
}

function safeLink(id) {
  if (!Object.hasOwn(links, id)) return null;
  const link = links[id];
  try {
    const url = new URL(link.href, window.location.origin);
    const localAsset = link.href.startsWith("/") && url.origin === window.location.origin;
    const publicUrl = url.protocol === "https:" && !url.username && !url.password;
    const email = id === "email" && link.href === `mailto:${profile.email}`;
    return localAsset || publicUrl || email ? link : null;
  } catch {
    return null;
  }
}

function loadConversation() {
  try {
    const stored = JSON.parse(sessionStorage.getItem(STORAGE_KEY));
    if (Array.isArray(stored)) {
      const questions = [];
      const valid = stored.slice(-MAX_MESSAGES).flatMap((entry) => {
        if (!Number.isFinite(entry?.time) || Math.abs(entry.time) > 8.64e15) return [];
        if (entry.role === "user" && typeof entry.text === "string" && entry.text.trim() && entry.text.length <= MAX_QUESTION) {
          questions.push(entry.text);
          return [{ ...entry, id: nextMessageId() }];
        }
        const reply = entry.role === "assistant" &&
          validateReply(entry.reply, questions.at(-1), questions.slice(-MAX_HISTORY - 1, -1));
        return reply ? [{ ...entry, reply, id: nextMessageId() }] : [];
      });
      if (valid.length) return valid;
    }
  } catch {
    // The assistant can still run when storage is disabled.
  }
  return [assistantMessage({ message: "welcome" })];
}

let messageSequence = 0;
const nextMessageId = () => ++messageSequence;
const assistantMessage = (reply) => ({ role: "assistant", reply, time: Date.now(), id: nextMessageId() });

function FactLinks({ ids }) {
  return (
    <div className="portfolio-chat__links">
      {ids.map((id) => {
        const link = safeLink(id);
        if (!link) return null;
        return (
          <a
            href={link.href}
            key={id}
            download={link.download}
            target={link.download || link.href.startsWith("mailto:") ? undefined : "_blank"}
            rel="noopener noreferrer"
          >
            {link.label}
          </a>
        );
      })}
    </div>
  );
}

function AssistantReply({ reply }) {
  return (
    <>
      {reply.source === "fallback" && (
        <p className="portfolio-chat__notice">
          Fallback mode{reply.reason === "rate_limit" ? " · AI request limit reached" : " · AI unavailable"}
        </p>
      )}
      {reply.message && <p>{messages[reply.message]}</p>}
      {reply.answer && <p className="portfolio-chat__answer">{reply.answer}</p>}
      {reply.topics?.map((id) => {
        const fact = facts[id];
        if (reply.answer && !fact.links) return null;
        return (
          <div className="portfolio-chat__fact" key={id}>
            {fact.title && <strong>{fact.title}</strong>}
            {!reply.answer && <p>{fact.text}</p>}
            {fact.links && <FactLinks ids={fact.links} />}
          </div>
        );
      })}
    </>
  );
}

function ChatMessage({ entry }) {
  const date = new Date(entry.time);
  const user = entry.role === "user";
  return (
    <div className={`portfolio-chat__message${user ? " portfolio-chat__message--user" : ""}`}>
      <span className="portfolio-chat__sr-only">{user ? "You: " : "Assistant: "}</span>
      {user ? <p>{entry.text}</p> : <AssistantReply reply={entry.reply} />}
      <time dateTime={date.toISOString()}>{formatTime.format(date)}</time>
    </div>
  );
}

function Chatbot() {
  const [open, setOpen] = useState(false);
  const [conversation, setConversation] = useState(loadConversation);
  const [draft, setDraft] = useState("");
  const [sending, setSending] = useState(false);
  const [notice, setNotice] = useState("");
  const widget = useRef(null);
  const launcher = useRef(null);
  const panel = useRef(null);
  const input = useRef(null);
  const scroller = useRef(null);
  const pending = useRef(null);

  useEffect(() => {
    try {
      sessionStorage.setItem(STORAGE_KEY, JSON.stringify(conversation));
    } catch {
      // Continue in memory when session storage is unavailable.
    }
  }, [conversation]);

  useEffect(() => () => {
    const request = pending.current;
    pending.current = null;
    request?.abort();
  }, []);

  useEffect(() => {
    const viewport = window.visualViewport;
    if (!viewport) return;
    const element = widget.current;
    const messagesElement = scroller.current;

    function updateViewport() {
      const pinned = messagesElement.scrollHeight - messagesElement.scrollTop - messagesElement.clientHeight < 24;
      const bottomInset = Math.max(0, window.innerHeight - viewport.height - viewport.offsetTop);
      const rightInset = Math.max(0, window.innerWidth - viewport.width - viewport.offsetLeft);
      element.style.setProperty("--chat-viewport-bottom", `${bottomInset}px`);
      element.style.setProperty("--chat-viewport-right", `${rightInset}px`);
      element.style.setProperty("--chat-visible-height", `${viewport.height}px`);
      element.style.setProperty("--chat-visible-width", `${viewport.width}px`);
      if (pinned) messagesElement.scrollTop = messagesElement.scrollHeight;
    }

    updateViewport();
    viewport.addEventListener("resize", updateViewport);
    viewport.addEventListener("scroll", updateViewport);
    window.addEventListener("resize", updateViewport);
    return () => {
      viewport.removeEventListener("resize", updateViewport);
      viewport.removeEventListener("scroll", updateViewport);
      window.removeEventListener("resize", updateViewport);
    };
  }, []);

  useEffect(() => {
    if (!open) return;
    const windowElement = panel.current;
    const focusTarget = window.matchMedia("(pointer: coarse)").matches ? windowElement : input.current;
    focusTarget.focus({ preventScroll: true });

    function onEscape(event) {
      if (event.key !== "Escape" || event.defaultPrevented) return;
      event.preventDefault();
      launcher.current.focus({ preventScroll: true });
      setOpen(false);
      setDraft("");
    }
    window.addEventListener("keydown", onEscape);

    return () => window.removeEventListener("keydown", onEscape);
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const element = scroller.current;
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    element.scrollTo({
      top: element.scrollHeight,
      behavior: conversation.length > 1 && !reduceMotion ? "smooth" : "instant",
    });
  }, [conversation, open, sending]);

  function closeChat(discardDraft = false) {
    launcher.current.focus({ preventScroll: true });
    setOpen(false);
    if (discardDraft) setDraft("");
  }

  function clearConversation() {
    pending.current?.abort();
    pending.current = null;
    setSending(false);
    setDraft("");
    setNotice("Conversation cleared.");
    setConversation([assistantMessage({ message: "welcome" })]);
    input.current.focus({ preventScroll: true });
  }

  async function sendQuestion(value) {
    const question = value.trim();
    if (!question || question.length > MAX_QUESTION || pending.current) return;

    const controller = new AbortController();
    pending.current = controller;
    const history = conversation.filter(({ role }) => role === "user").slice(-MAX_HISTORY).map(({ text }) => text);
    const assessment = assessQuestion(question, history);
    let reply = fallbackFor(assessment);
    const userMessage = { role: "user", text: question, time: Date.now(), id: nextMessageId() };
    setConversation((entries) => [...entries, userMessage].slice(-MAX_MESSAGES));
    setDraft("");
    setNotice("");

    if (assessment.useAI) {
      setSending(true);
      reply = { ...fallbackFor(assessment, "unavailable"), source: "fallback" };
      const timeout = setTimeout(() => controller.abort(), 15_000);
      try {
        const response = await fetch("/api/chat", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ question, history }),
          signal: controller.signal,
        });
        if (response.status === 429) reply = { ...fallbackFor(assessment, "limited"), source: "fallback", reason: "rate_limit" };
        if ((response.ok || response.status === 429) && response.headers.get("content-type")?.includes("application/json")) {
          reply = validateReply(await response.json(), question, history) ?? reply;
        }
      } catch {
        // The prepared local reply also covers timeouts and offline requests.
      } finally {
        clearTimeout(timeout);
      }
    }

    if (pending.current !== controller) return;
    const answer = assistantMessage(reply);
    setConversation((entries) => [...entries, answer].slice(-MAX_MESSAGES));
    pending.current = null;
    setSending(false);
  }

  function onInputKeyDown(event) {
    if (event.key === "Enter" && !event.shiftKey && !event.nativeEvent.isComposing) {
      event.preventDefault();
      void sendQuestion(draft);
    }
  }

  return (
    <div className="portfolio-chat" ref={widget}>
      <div className="portfolio-chat__launcher-slot">
        <button
          className="portfolio-chat__launcher"
          type="button"
          aria-label="Ask My AI Assistant"
          aria-expanded={open}
          aria-controls="portfolio-chat-panel"
          ref={launcher}
          onClick={() => open ? closeChat() : setOpen(true)}
        >
          <FaRobot aria-hidden="true" />
        </button>
        <span className="portfolio-chat__tooltip" aria-hidden="true">Ask My AI Assistant</span>
      </div>

      <section
        className="portfolio-chat__panel"
        id="portfolio-chat-panel"
        role="dialog"
        aria-labelledby="portfolio-chat-title"
        aria-describedby="portfolio-chat-privacy"
        inert={!open}
        data-open={open}
        tabIndex={-1}
        ref={panel}
      >
        <header className="portfolio-chat__header">
          <div className="portfolio-chat__avatar"><FaRobot aria-hidden="true" /></div>
          <div className="portfolio-chat__heading">
            <h2 id="portfolio-chat-title">Alan's AI Assistant</h2>
            <p>Portfolio Assistant</p>
            <span className="portfolio-chat__ready">{sending ? "Thinking…" : "Ready to help"}</span>
          </div>
          <div className="portfolio-chat__actions">
            <button type="button" aria-label="Clear conversation" title="Clear conversation" onClick={clearConversation}><FaTrashAlt aria-hidden="true" /></button>
            <button type="button" aria-label="Minimize chat" title="Minimize chat" onClick={() => closeChat()}><FaMinus aria-hidden="true" /></button>
            <button type="button" aria-label="Close chat" title="Close chat" onClick={() => closeChat(true)}><FaTimes aria-hidden="true" /></button>
          </div>
        </header>

        <div className="portfolio-chat__conversation" ref={scroller} tabIndex={0} aria-label="Chat conversation">
          {conversation[0]?.reply?.message === "welcome" && <ChatMessage entry={conversation[0]} />}
          <div className="portfolio-chat__suggested" aria-label="Suggested questions" role="group">
            {suggestedQuestions.map((question) => (
              <button type="button" key={question} aria-disabled={sending} onClick={() => void sendQuestion(question)}>
                {question}
              </button>
            ))}
          </div>
          <div className="portfolio-chat__log" role="log" aria-label="Messages">
            {conversation.map((entry, index) => (
              index === 0 && entry.reply?.message === "welcome" ? null :
                <ChatMessage key={entry.id} entry={entry} />
            ))}
          </div>
          {sending && <div className="portfolio-chat__typing" aria-hidden="true"><span /><span /><span /></div>}
        </div>

        <div className="portfolio-chat__composer">
          <div role="status" className={notice ? "portfolio-chat__notice" : "portfolio-chat__sr-only"}>
            {sending ? "Assistant is typing." : notice}
          </div>
          <form onSubmit={(event) => { event.preventDefault(); void sendQuestion(draft); }}>
            <textarea
              ref={input}
              rows={2}
              value={draft}
              maxLength={MAX_QUESTION}
              aria-label="Message Alan's AI Assistant"
              placeholder="Ask about Alan…"
              onChange={(event) => setDraft(event.target.value)}
              onKeyDown={onInputKeyDown}
            />
            <button className="portfolio-chat__send" type="submit" aria-label="Send message" disabled={!draft.trim() || sending}>
              <FaPaperPlane aria-hidden="true" />
            </button>
          </form>
          <p id="portfolio-chat-privacy">Some questions may be sent to Google Gemini. Please avoid sharing private information.</p>
        </div>
      </section>
    </div>
  );
}

export default Chatbot;
