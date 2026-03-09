---
title: 'Build with Gemini in Vertex AI Studio and Deploy as an App'
description: 'Vertex AI Studio tour: prompt design, collaboration, prompt optimization agents, and one-click Deploy as App to Cloud Run. Official Google Cloud resources and media.'
date: '2026-02-26'
tags: ['gcp', 'google-cloud', 'vertex-ai', 'gemini', 'cloud-run', 'tutorial']
published: true
featured: false
author: 'Jatinder (Jay) Bhola'
---

## Vertex AI Studio: Where Prompts Become Apps

**Vertex AI Studio** is the Google Cloud console experience for **building and tuning** generative AI experiences — prompts, chat apps, and multimodal flows. It also connects directly to **Cloud Run** via **“Deploy as App,”** so you can go from a prompt to a shareable web app without leaving the console.

This post is based on **official Google Cloud content only**: the [Build with Gemini in Vertex AI Studio](https://cloud.google.com/blog/topics/developers-practitioners/build-with-gemini-in-the-vertex-ai-studio) blog and the [Create gen AI apps in 60 seconds](https://cloud.google.com/blog/products/ai-machine-learning/create-gen-ai-apps-in-less-than-60-seconds-with-vertex-ai) post. Links point to **Google sources**; media references use **official** demos and docs.

![Vertex AI Studio: prompt → Deploy as App → Cloud Run URL](/portfolio-images/gcp/vertex-deploy-as-app-flow.svg)

---

## What You Can Do in Vertex AI Studio

| Feature | What it’s for |
|---------|----------------|
| **Prompt design** | System instructions, few-shot examples, parameters (temperature, top_p, etc.) |
| **Multiple models** | Gemini family and other models available in Vertex AI |
| **Collaboration** | Share and iterate with your team (see blog for current capabilities) |
| **Prompt optimization** | Use **agents as tools** to suggest or refine prompts |
| **Code generation** | Generate code from your design; **one-click deploy to Cloud Run** (Deploy as App) |
| **GitHub / Cloud Run** | Deeper integration for code and deployment (see official roadmap in blog) |

---

## The “Deploy as App” Flow (With Media)

1. **Design in Studio** — Build your prompt (and optionally multimodal input). Test until the behavior is right.  
2. **Click “Deploy as App”** — Vertex AI packages the experience into an interactive web UI (Gradio-based) and hands off to **Cloud Run**.  
3. **Configure** — Choose public or authenticated access.  
4. **Share** — Use the generated URL to share the app with stakeholders or testers.  
5. **Iterate** — Change the prompt in Studio and redeploy to update the app.

**Official demo / product:** For image generation you can try **Nano Banana 2** in the console: [Vertex AI Studio — Multimodal (Nano Banana 2)](https://console.cloud.google.com/vertex-ai/studio/multimodal?model=gemini-3.1-flash-image-preview). This illustrates the kind of experience you can then “Deploy as App.”

---

## Where to Find Official Media and Demos

- **Google Cloud Blog** — [Build with Gemini in Vertex AI Studio](https://cloud.google.com/blog/topics/developers-practitioners/build-with-gemini-in-the-vertex-ai-studio) often includes screenshots or links to console flows.  
- **Vertex AI documentation** — [Vertex AI](https://cloud.google.com/vertex-ai) and [Vertex AI Studio](https://cloud.google.com/vertex-ai/docs/studio) on cloud.google.com describe the UI and features.  
- **Console** — [Vertex AI Studio](https://console.cloud.google.com/vertex-ai/studio) is the live environment; use it for your own screenshots or screen recordings (respecting Google’s terms of use for demos).

When you write your own blog or portfolio, you can embed or link to **official** screenshots from the blog, or record your own walkthrough of the **public** console.

---

## Inference-as-a-Service with Cloud Run

Beyond “Deploy as App,” you can run **custom inference** (e.g. open models) on **Cloud Run** and call them from your app — the [Unlock Inference-as-a-Service with Cloud Run and Vertex AI](https://cloud.google.com/blog/products/ai-machine-learning/improve-your-gen-ai-app-velocity-with-inference-as-a-service) blog describes this pattern. That fits the “build in Studio, run in production” story: prototype in Vertex AI Studio, then move to Cloud Run (or Vertex AI endpoints) for scale and control.

---

## References (Google sources only)

- [Build with Gemini in the Vertex AI Studio](https://cloud.google.com/blog/topics/developers-practitioners/build-with-gemini-in-the-vertex-ai-studio) — Google Cloud Blog, Developers & Practitioners  
- [Create shareable generative AI apps in less than 60 seconds with Vertex AI and Cloud Run](https://cloud.google.com/blog/products/ai-machine-learning/create-gen-ai-apps-in-less-than-60-seconds-with-vertex-ai) — Google Cloud Blog, AI & Machine Learning  
- [Vertex AI](https://cloud.google.com/vertex-ai) — Google Cloud  
- [Vertex AI Studio (docs)](https://cloud.google.com/vertex-ai/docs/studio) — Google Cloud Documentation  
- [Improve gen AI app velocity with Inference-as-a-Service](https://cloud.google.com/blog/products/ai-machine-learning/improve-your-gen-ai-app-velocity-with-inference-as-a-service) — Google Cloud Blog
