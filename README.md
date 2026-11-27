# Alan Portfolio

A personal portfolio website built with React and Vite to showcase projects, skills, experience, and contact information.

## Features

- Modern responsive UI with smooth animations
- Project showcase and certificate gallery
- Contact form integration using EmailJS
- AI portfolio assistant with built-in answers and optional Gemini-generated replies
- Clean navigation and sections for About, Skills, Education, Projects, and Contact

## Tech Stack

- React
- Vite
- JavaScript
- EmailJS
- AOS (Animate On Scroll)
- React Icons
- React Type Animation
- Vercel Functions, Google Gemini API, and Upstash Redis REST API for the chatbot

## Getting Started

### Install dependencies

```bash
npm install
```

### Run locally

```bash
npm run dev
```

### Build for production

```bash
npm run build
```

### Preview production build

```bash
npm run preview
```

## Portfolio chatbot

The floating assistant answers suggested and common factual questions in the browser using shared portfolio records in `src/data/portfolioKnowledge.js`. Custom questions go to `POST /api/chat`, where Gemini writes an answer grounded in those records. The browser attaches verified public links when relevant. Chat history lives in session storage for the current tab. Gemini may receive the current question and up to six recent visitor questions. Redis stores expiring rate-limit counters.

### Environment variables

Copy `.env.example` to `.env.local` for a fresh setup. An existing `.env` with EmailJS configuration can be kept.

| Variable | Purpose |
| --- | --- |
| `VITE_EMAILJS_SERVICE_ID`, `VITE_EMAILJS_TEMPLATE_ID`, `VITE_EMAILJS_PUBLIC_KEY` | Existing public EmailJS configuration for the contact form |
| `GEMINI_API_KEY` | Server-only Google AI Studio API key |
| `GEMINI_MODEL` | Optional server-only model override. Defaults to `gemini-3.5-flash-lite` |
| `UPSTASH_REDIS_REST_URL`, `UPSTASH_REDIS_REST_TOKEN` | Server-only Redis REST credentials. Required alongside the Gemini key for AI responses |

Create an API key in [Google AI Studio](https://aistudio.google.com/apikey). Create an [Upstash Redis database](https://upstash.com/docs/redis/overall/getstarted) and copy its REST URL and token. Set the values in your local server environment and in Vercel. Keep Gemini and Redis credentials in server-side variables without the `VITE_` prefix.

Run `vercel dev` for Gemini integration. `npm run dev` and `npm run preview` serve only the Vite frontend, so a custom question shows **Fallback mode**. The same label appears when Gemini or Redis is unavailable or the assistant reaches a rate limit. With Redis configured, Gemini requests are limited to 12 per minute per visitor IP and 1,000 per 24 hours per Vercel environment. Suggested and common factual answers stay available in the browser.

### Test the serverless endpoint locally

For an already linked project, run `npx vercel dev` from the project root. To use local credentials without linking a Vercel project, run `npx vercel dev --local`. Restart the server after editing the environment variables. On Windows PowerShell, use `npx.cmd` if the PowerShell shim is blocked.

1. Open `http://localhost:3000` and select **Who is Alan?**. The built-in answer appears immediately and Chrome DevTools → Network → Fetch/XHR shows zero chat requests.
2. Send `Write a short recruiter introduction about Alan using his skills and experience.`. The chat shows a loading indicator, then a written reply. Look for `POST /api/chat` with HTTP 200 and a response containing `source: "gemini"` and `answer`.
3. Try the chat at a narrow mobile viewport and with the on-screen keyboard open. The composer should remain visible while the conversation scrolls.
4. To check fallback mode, open the same portfolio using `npm run dev` and repeat the custom question. The chat labels the reply **Fallback mode** and shows relevant built-in facts when available.

Run `node --test tests/chatbot.test.js` to check routing, request validation, and mocked provider failures and rate limiting. In a second PowerShell terminal, run the HTTP suite against Vercel with working Gemini and Redis credentials.

```powershell
$env:CHAT_TEST_URL = 'http://localhost:3000/api/chat'
node --test tests/chatbot.test.js
Remove-Item Env:CHAT_TEST_URL
```

### Deploy on Vercel

Use the Vite framework preset with this repository as the project root, the build command `npm run build`, and the output directory `dist`. Vercel detects the Node.js function in `api/chat.js`. Add the EmailJS variables and any Gemini and Redis variables to **Settings → Environment Variables** for the desired Production, Preview, or Development environments. Redeploy after updating environment variables. To validate the build and lint locally, run `npm run build` and `npm run lint`.

## Project Structure

- `src/` - source code for the app
- `src/components/` - reusable React components
- `public/` - static assets
- `package.json` - project metadata and scripts

## Notes

- Update the content and links in the components to match your personal information and projects.
- Use the `Hero`, `About`, `Skills`, `Projects`, `Certificates`, and `Contact` sections to highlight your best work.

## Contact

Feel free to customize this portfolio and add your own resume, project links, and social profiles.
