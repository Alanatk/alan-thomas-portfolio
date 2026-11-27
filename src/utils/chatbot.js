import {
  certificates, currentInternship, education, previousInternship, profile, projects, skills,
} from "../data/portfolioKnowledge.js";

export const MAX_QUESTION = 600;
export const MAX_HISTORY = 6;
const MAX_ANSWER = 2400;

export const messages = {
  welcome: "Hi! I'm Alan's AI Assistant. I can help you explore Alan's skills, projects, education, work experience, certifications, and contact information. How can I help you today?",
  unknown: "I don’t have that information in Alan’s portfolio. You can ask me about his work, projects, skills, education, or public contact details.",
  unrelated: "I can help with Alan’s professional portfolio. Try asking about his projects, internships, or technical skills.",
  unavailable: "Try one of the suggested questions for a built-in portfolio answer.",
  limited: "The assistant is receiving too many requests. Please wait a moment and try again.",
};

const projectIds = projects.map(({ id }) => id);
const certificateIds = certificates.map(({ id }) => id);
const educationIds = education.map(({ id }) => id);

const suggestions = {
  "Who is Alan?": ["about"],
  "What are his technical skills?": ["skills"],
  "Where is he currently working?": ["current"],
  "Tell me about his experience.": ["current", "previous"],
  "Show his projects.": projectIds,
  "What is his educational background?": educationIds,
  "View certifications.": certificateIds,
  "Download resume.": ["resume"],
  "How can I contact him?": ["contact"],
};

export const suggestedQuestions = Object.keys(suggestions);

export const facts = {
  about: {
    text: `${profile.name} is based in ${profile.location} and is pursuing an MCA at ${education[0].college}. His interests include ${profile.interests.join(", ")}.`,
  },
  skills: {
    text: `Alan lists ${skills.join(", ")} as technical skills. His current internship also uses ${currentInternship.technologies.filter((tech) => !skills.includes(tech)).join(", ")}.`,
  },
  current: {
    title: `${currentInternship.role} at ${currentInternship.company}`,
    text: `${currentInternship.start} – ${currentInternship.end}. His responsibilities include ${currentInternship.responsibilities.join(", ")}. He uses ${currentInternship.technologies.join(", ")}.`,
  },
  previous: {
    title: `${previousInternship.role} at ${previousInternship.company}`,
    text: `${previousInternship.department} · ${previousInternship.start} – ${previousInternship.end}. ${previousInternship.description}`,
    links: ["internship"],
  },
  ...Object.fromEntries(education.map((item) => [item.id, {
    title: item.degree,
    text: `${item.college} · ${item.year.replace(" - ", "–")}. ${item.description}`,
  }])),
  ...Object.fromEntries(projects.map((project) => [project.id, {
    title: project.title,
    text: `${project.description} Technologies include ${project.tech.join(", ")}.`,
    links: [`${project.id}-github`, `${project.id}-demo`],
  }])),
  ...Object.fromEntries(certificates.map((item) => [item.id, {
    title: item.title,
    text: `${item.issuer} · ${item.year}`,
    links: [item.id],
  }])),
  contact: {
    text: `Alan is based in ${profile.location}. You can reach him at ${profile.email} or connect with him on LinkedIn or GitHub.`,
    links: ["email", "linkedin", "github", "website"],
  },
  resume: {
    text: "You can download Alan’s resume as a PDF.",
    links: ["resume"],
  },
};

const blocked = /\b(?:system (?:prompt|instructions?|message)|developer (?:message|instructions?)|api[ _-]?keys?|gemini[ _-]?(?:key|api)|env(?:ironment)?[ _-]?(?:vars?|variables?)|private (?:repo\w*|e-?mail|phone|number|address)|confidential|login credentials?|passwords?|(?:ignore|override|disregard|forget) (?:all |any |your |the )*(?:previous |prior |above |safety )*(?:instructions?|rules?)|jailbreak)\b/i;

const rules = [
  [/\b(?:bitcoin|crypto)\b/, ["bitcoin"]],
  [/\b(?:mnist|handwrit\w*|digits?|tensorflow|streamlit|cnn)\b/, ["mnist"]],
  [/\b(?:checkout|e[ -]?commerce|shopping cart)\b/, ["checkout"]],
  [/\b(?:memory|matching game|card game|browser game)\b/, ["memory"]],
  [/\b(?:prabisha|ai\s*\/\s*ml|artificial intelligence and machine learning|prior|previous|past|former|it department|internship cert\w*)\b/, ["previous"]],
  [/\b(?:zecser|python django developer|current(?:ly)? (?:working|internship|job|role|employer)|(?:working|work(?:s)?|employed|interning) (?:now|at|for|with)|who (?:does|is) .* work|where .* work|what .* (?:do for work|work(?:s|ing)? on)|responsibilit\w*|(?:internship|intern) .* (?:do|start|began)|(?:start|join).*internship)\b/, ["current"]],
  [/\b(?:oracle)\b/, ["oracle"]],
  [/\b(?:ibm|skillsbuild)\b/, ["ibm"]],
  [/\b(?:servicenow)\b/, ["servicenow"]],
  [/\b(?:cloud computing diploma|diploma in cloud)\b/, ["cloud"]],
  [/\b(?:cyber\s*security diploma|diploma in cyber)\b/, ["cyber"]],
  [/\b(?:mca|masters?|lead college)\b/, ["mca"]],
  [/\b(?:bca|bachelors?|sree narayana)\b/, ["bca"]],
];

const generalRules = [
  [/\b(?:projects?|portfolio work|things .* built|what .* (?:built|build)|demos?|source code|apps? .* (?:made|built))\b/, projectIds, projectIds],
  [/\b(?:experiences?|internships?|work history|employment|worked|professional background)\b/, ["current", "previous"], ["current", "previous"]],
  [/\b(?:education(?:al)?|colleges?|studies|studying|degrees?|university|school|academic\w?|graduat\w?)\b/, educationIds, educationIds],
  [/\b(?:certificates?|certifications?|certified|credentials?|diplomas?)\b/, certificateIds, [...certificateIds, "previous"]],
  [/\b(?:skills?|(?:tech(?:nical)? )?stack|technolog\w*|tools?|frameworks?|programming languages?|python|django|postman|react|javascript|node\.js|docker|mysql)\b/, ["skills"], ["skills", ...projectIds, "current", "previous"]],
  [/\b(?:résumé|resume|cv)\b/, ["resume"], []],
  [/\b(?:contact|reach|e-?mail|linkedin|github|location|based|live[s]? in|from where|where .* from|portfolio (?:url|link|website)|website|connect)\b/, ["contact"], [...projectIds, "contact"]],
  [/\b(?:who is alan|about (?:alans?|him|yourself)|introduce (?:alan|him|yourself)|bio(?:graphy)?|interests?|background)\b/, ["about"], Object.keys(facts)],
];

const normalize = (text) => text.normalize("NFKC").toLowerCase().replace(/[’']/g, "")
  .trim().replace(/\s+/g, " ").replace(/[.!?]+$/, "");

const projectNames = {
  bitcoin: /\b(?:bitcoin|crypto(?:currency)? (?:price|predictor|project))\b/,
  mnist: /\b(?:mnist|(?:handwritten )?digit recognition|recogniz(?:es?|ing) handwriting)\b/,
  checkout: /\b(?:checkout|shopping cart)\b/,
  memory: /\b(?:memory (?:card |matching )*(?:game|project)|card matching game)\b/,
};
const creativeForm = /\b(?:poems?|poetry|haikus?|songs?|raps?|stories|story|cover letters?|(?:professional|recruiter|personal|elevator) (?:introductions?|intro|pitches?|bios?|summar(?:y|ies)|profiles?|blurbs?|speeches))\b/;
const writingFormat = /\b(?:pitches?|bios?|biograph(?:y|ies)|introductions?|intro|summar(?:y|ies)|profiles?|scripts?|blurbs?|speeches|e-?mails?)\b/;
const writingVerb = /\b(?:write|draft|compose|create|generate|craft|prepare|make|introduce|summarize)\b/;
const writingPrompt = /^(?:an? |some )?(?:(?:short|brief|professional|recruiter|creative) )*(?:poem|poetry|haiku|song|rap|story|cover letter|pitch|bio|biography|introduction|intro|summary|profile)\b/;
const artifactRequest = /\b(?:links?|demos?|source code|repos(?:itory|itories)?|github)\b/;
const projectQuestion = /\b(?:projects?|portfolio work|apps? (?:has|did) (?:he|alan)|what (?:has|did) (?:he|alan) (?:build|built|make|made))\b/;
const namedProjectContext = /\b(?:alans?|his|bitcoin (?:price )?(?:tracker|predictor)|mnist digit recognition|e[ -]?commerce checkout|memory (?:card |matching )*game)\b/;

function relevantTopics(topics, question, history, answer) {
  const text = normalize(question);
  const asksForArtifact = artifactRequest.test(text);
  const asksAboutProjects = projectQuestion.test(text);
  if (creativeForm.test(text) || writingPrompt.test(text) || (writingFormat.test(text) && writingVerb.test(text)) ||
      /^(?:introduce|summarize) (?:alan|him|yourself)\b/.test(text)) return [];

  const aboutNamedProject = asksAboutProjects || asksForArtifact || namedProjectContext.test(text);
  let namedProjects = aboutNamedProject ? projectIds.filter((id) => projectNames[id]?.test(text)) : [];
  if (!namedProjects.length && asksForArtifact && !asksAboutProjects &&
      /\b(?:it|its|that|this|them|their|the (?:demo|repo|source code))\b/.test(text)) {
    const previous = normalize(history.at(-1) ?? "");
    namedProjects = projectIds.filter((id) => projectNames[id]?.test(previous));
  }

  const answerText = normalize(answer);
  return [...new Set(topics)].filter((id) => {
    if (!projectIds.includes(id)) return true;
    if (namedProjects.length) return namedProjects.includes(id);
    return Boolean(asksAboutProjects && projectNames[id]?.test(answerText));
  });
}

const suggestedAnswers = new Map(Object.entries(suggestions).map(([question, topics]) => [normalize(question), topics]));

// Only complete factual requests bypass Gemini. Topic keywords help select fallback facts.
const factualQuestions = [
  [/^(?:who is alan(?: thomas)?|(?:tell me )?about alan(?: thomas)?|introduce (?:alan|yourself))$/, ["about"]],
  [/^(?:what are (?:his|alans) (?:technical )?skills|what (?:technical )?skills does (?:he|alan) have|what (?:technologies|tools|languages) does (?:he|alan) (?:know|use)|does (?:he|alan) (?:know|use) (?:python|django|postman|react|javascript|node\.js|docker|mysql))$/, ["skills"]],
  [/^(?:where (?:is (?:he|alan) (?:currently working|employed now|interning)|does (?:he|alan) work(?: now)?)|what is (?:his|alans) current (?:role|job|internship|employer))$/, ["current"]],
  [/^(?:(?:who|what) was (?:his|alans) (?:previous|former) employer|where did (?:he|alan) (?:previously work|intern before))$/, ["previous"]],
  [/^(?:what (?:projects )?has (?:he|alan) (?:built|made)|what are (?:his|alans) projects|(?:show|list) (?:me )?(?:alans |his |the )?projects)$/, projectIds],
  [/^(?:what is (?:his|alans) educational background|(?:where|what) (?:did|does) (?:he|alan) study|(?:list|show) (?:his |alans )?(?:degrees|education))$/, educationIds],
  [/^(?:what certifications does (?:he|alan) have|(?:list|show|view) (?:his |alans )?(?:certifications|certificates))$/, certificateIds],
  [/^(?:(?:download|show|view) (?:his |alans |the )?)?(?:resume|résumé|cv)$/, ["resume"]],
  [/^(?:how (?:can|do) i (?:contact|reach) (?:him|alan)|where is (?:he|alan) (?:from|based)|(?:what is )?(?:his|alans) (?:e-?mail(?: address)?|linkedin(?: profile)?|github(?: profile)?))$/, ["contact"]],
  [/^(?:show (?:me )?the project that recognizes handwriting)$/, ["mnist"]],
  [/^(?:(?:tell me about|show|what is) )?(?:(?:alans|his|the) )?(?:bitcoin (?:price )?(?:tracker|project)|(?:mnist|handwritten digit recognition) (?:project|app)|(?:e-commerce |ecommerce )?checkout (?:project|app)|memory (?:game|project))$/, null],
  [/^(?:what is |(?:tell me )?about )?(?:his |alans |the )?(?:current internship|previous internship|mca|bca|(?:oracle|ibm|servicenow) certificat(?:e|ion))$/, null],
  [/^(?:(?:tell me about|show|list) )?(?:his |alans )?(?:technical skills|skills|tech stack|work experience|experience|internships|education|certifications|contact details)$/, null],
];

function getFactualTopics(text) {
  const suggested = suggestedAnswers.get(text);
  if (suggested) return suggested;
  const match = factualQuestions.find(([pattern]) => pattern.test(text));
  return match && (match[1] ?? inferTopics(text));
}

function inferTopics(question) {
  const topics = rules.filter(([pattern]) => pattern.test(question)).flatMap(([, ids]) => ids);
  for (const [pattern, ids, related] of generalRules) {
    if (pattern.test(question) && !related.some((id) => topics.includes(id))) {
      topics.push(...ids);
    }
  }
  return topics;
}

export function assessQuestion(question, history = []) {
  const text = normalize(question);
  if (blocked.test(text)) return { message: "unrelated" };
  if (/^(?:hi|hey|hello|thanks|thank you)$/.test(text)) return { message: "welcome" };

  const direct = getFactualTopics(text);
  if (direct?.length) return { topics: direct, useAI: false };

  let topics = inferTopics(text);
  const pointsBack = /\b(?:it|that|those|there|both|they|them)\b|^(?:and |when |how long)/.test(text);
  if (pointsBack && !topics.length) {
    const previous = history.slice().reverse().map(normalize)
      .filter((earlier) => !blocked.test(earlier))
      .map((earlier) => getFactualTopics(earlier) ?? inferTopics(earlier))
      .find((ids) => ids.length > 0);
    if (previous) {
      const [id] = previous;
      if (previous.length === 1 && ["current", "previous"].includes(id) &&
          /^what (?:does|did) he do there$/.test(text)) return { topics: previous, useAI: false };
      topics = previous;
    }
  }

  return { topics: relevantTopics(topics, question, history, ""), useAI: true };
}

export function fallbackFor(assessment, message = "unknown") {
  if (assessment.message) return { message: assessment.message };
  if (assessment.topics.length) return { topics: assessment.topics };
  return { message };
}

export function validateReply(reply, question = "", history = []) {
  const validTopics = Array.isArray(reply?.topics) && reply.topics.length <= Object.keys(facts).length &&
    reply.topics.every((id) => typeof id === "string" && Object.hasOwn(facts, id));
  if (reply?.source === "gemini") {
    if (!validTopics || typeof reply.answer !== "string" || !reply.answer.trim() || reply.answer.length > MAX_ANSWER) return null;
    const answer = reply.answer.replace(/\r\n?/g, "\n").trim();
    return { answer, topics: relevantTopics(reply.topics, question, history, answer), source: "gemini" };
  }
  const fallback = reply?.source === "fallback" ? {
    source: "fallback",
    ...(reply.reason === "rate_limit" ? { reason: "rate_limit" } : {}),
  } : {};
  if (validTopics && reply.topics.length) {
    const topics = fallback.source ? relevantTopics(reply.topics, question, history, "") : [...new Set(reply.topics)];
    if (topics.length) return { topics, ...fallback };
    return { message: fallback.reason ? "limited" : "unavailable", ...fallback };
  }
  if (typeof reply?.message === "string" && Object.hasOwn(messages, reply.message)) {
    return { message: reply.message, ...fallback };
  }
  return null;
}
