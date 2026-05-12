# Estac LPS Risk Assessment Tool — Deployment Guide

This guide walks you through publishing the tool online so anyone at Estac
can open it in a browser. You will need about 20–30 minutes and no coding
knowledge. Everything is free.

---

## What You Will Need

- A computer with a web browser
- An email address (for creating the two free accounts below)
- Your Anthropic API key (see Step 1)

---

## STEP 1 — Get Your Anthropic API Key

The tool uses Anthropic's AI to generate the risk assessment.
You need an API key so the server can call it on your behalf.

1. Go to: https://console.anthropic.com
2. Sign up for a free account (or log in if you already have one)
3. Click **API Keys** in the left menu
4. Click **Create Key** — give it a name like "Estac LPS Tool"
5. Copy the key (it starts with "sk-ant-...") and paste it somewhere safe
   — you will only see it once

**Cost note:** You pay per use. One risk assessment costs roughly R0.05–0.10
(a few cents). For typical engineering use this will be a few rand per month.

---

## STEP 2 — Create a GitHub Account and Upload the Files

GitHub is a free service for storing code online. Render (the hosting
platform) will read your files directly from GitHub.

1. Go to: https://github.com and click **Sign up** — create a free account

2. Once logged in, click the **+** button (top right) → **New repository**

3. Fill in:
   - Repository name: `estac-lps-tool`
   - Keep it set to **Public**
   - Tick **Add a README file**
   - Click **Create repository**

4. You now have an empty repository. Click **Add file** → **Upload files**

5. Upload these three files (from the folder you received):
   - `server.js`
   - `package.json`
   - And for the `public` folder: click **Add file** → **Upload files** again,
     but first you need to create the folder — type `public/index.html` in the
     file name box and it will create the folder automatically, then upload
     `index.html` from your `public` folder

   **Easier alternative:** Drag all files at once. GitHub will handle the
   folder structure as long as `index.html` is inside a folder called `public`.

6. Click **Commit changes** (green button at the bottom)

---

## STEP 3 — Deploy on Render (Free Hosting)

Render will run your server 24/7 for free.

1. Go to: https://render.com and click **Get Started for Free**
   - Sign up using your GitHub account (click "Continue with GitHub")
   - This links the two accounts together automatically

2. Once logged in, click **New +** → **Web Service**

3. Click **Connect** next to your `estac-lps-tool` repository

4. Fill in the settings:
   - **Name:** `estac-lps-tool` (or anything you like)
   - **Region:** Choose the closest — Europe (Frankfurt) is fine for SA
   - **Branch:** `main`
   - **Runtime:** `Node`
   - **Build Command:** `npm install`
   - **Start Command:** `node server.js`
   - **Instance Type:** Select **Free**

5. Scroll down to **Environment Variables** — this is where your API key goes:
   - Click **Add Environment Variable**
   - Key: `ANTHROPIC_API_KEY`
   - Value: paste your key from Step 1 (the sk-ant-... one)

6. Click **Create Web Service**

7. Render will now build and deploy your tool. This takes 2–4 minutes.
   You will see a log of activity — wait until it says **"Live"** in green.

---

## STEP 4 — Open Your Tool

1. At the top of the Render page you will see a URL like:
   `https://estac-lps-tool.onrender.com`

2. Click it — your tool should open in the browser

3. Share this URL with your engineers. That is all they need — no login,
   no installation, just open in any browser.

---

## Important Notes

**Free tier sleep:** On the free Render plan, the server "sleeps" after
30 minutes of no use. The first visit after it sleeps takes about 30–60
seconds to wake up. Subsequent visits are instant. If this is annoying,
upgrading to the $7/month Render plan keeps it always awake.

**Security:** Your API key is stored securely in Render's environment
variables — it never appears in the HTML or browser. Engineers using the
tool cannot see it.

**Updating the tool:** If you receive an updated `index.html` in future,
simply go back to GitHub, navigate to `public/index.html`, click the pencil
(edit) icon, and upload the new file. Render will automatically redeploy
within a minute or two.

---

## Troubleshooting

| Problem | Likely cause | Fix |
|---|---|---|
| Page loads but "Generation failed" | API key not set correctly | Check environment variable in Render — no spaces around the key |
| Page won't load at all | Server still deploying | Wait 3–5 minutes and refresh |
| Slow first load | Free tier waking up | Wait 30–60 seconds, then it's fast |
| "API error 401" | Invalid API key | Re-check the key in Render environment variables |

---

## Getting Help

If you get stuck on any step, take a screenshot of what you see and share
it — happy to guide you through it.
