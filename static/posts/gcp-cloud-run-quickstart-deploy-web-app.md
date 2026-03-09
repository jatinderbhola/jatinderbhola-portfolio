---
title: 'Cloud Run Quickstart: Build and Deploy a Web App in Your Language'
description: 'Official Google Cloud quickstart — deploy a web app to Cloud Run from source with automatic Dockerfile generation. Go, Node, Python, Java, and more.'
date: '2026-02-01'
tags: ['gcp', 'google-cloud', 'cloud-run', 'tutorial', 'containers', 'serverless']
published: true
featured: false
author: 'Jatinder (Jay) Bhola'
---

## Deploy a Web App to Cloud Run Without Writing a Dockerfile

**Cloud Run** lets you deploy web apps and APIs as **serverless containers**: you bring code (or a container image), and Google handles scaling, HTTPS, and billing per request. You can deploy **from source** and let Cloud Run (and Cloud Build) generate a container image for you — no Dockerfile required for supported runtimes.

This post follows the **official quickstart**: [*Build and deploy a web app using the language of your choice*](https://cloud.google.com/run/docs/quickstarts/build-and-deploy/deploy-service-other-languages) (Cloud Run documentation). All links are to **Google sources only**.

![Deploy to Cloud Run: source → build → live URL](/portfolio-images/gcp/vertex-deploy-as-app-flow.svg)

---

## Prerequisites (Official Checklist)

Before you start, ensure you have:

1. **Google Cloud CLI (`gcloud`) installed** — [Install the Google Cloud CLI](https://cloud.google.com/sdk/docs/install).  
2. **gcloud initialized** — Run `gcloud init` and sign in; set your project with `gcloud config set project PROJECT_ID`.  
3. **A Google Cloud project** with **billing enabled** — [Create a project](https://cloud.google.com/resource-manager/docs/creating-managing-projects).  
4. **Required APIs enabled** — At least **Cloud Run** and **Cloud Build** (and often **Artifact Registry**). The quickstart or [Cloud Run quickstarts index](https://cloud.google.com/run/docs/quickstarts) will list the exact APIs.

---

## One Critical Requirement: Listen on PORT

Cloud Run injects the **port** your container must listen on via the **`PORT`** environment variable. Your app must:

- **Read `process.env.PORT`** (Node), **`os.environ['PORT']`** (Python), or the equivalent in your language.  
- **Bind the HTTP server to that port** (e.g. `0.0.0.0:PORT`).

If you ignore `PORT`, the health check will fail and the deployment will not become ready. This is documented in [Building containers for Cloud Run](https://cloud.google.com/run/docs/building/containers).

---

## Deploy from Source (No Dockerfile)

For supported languages and frameworks, you can deploy **from source** and let Google generate the container:

1. **Navigate to your app directory** (e.g. a Node.js, Python, or Go app with a standard layout).  
2. **Deploy with `gcloud run deploy`** and point to the source (e.g. current directory).  
   - Example pattern (check the [quickstart](https://cloud.google.com/run/docs/quickstarts/build-and-deploy/deploy-service-other-languages) for your language):

```bash
gcloud run deploy SERVICE_NAME \
  --source . \
  --region REGION \
  --allow-unauthenticated
```

- `--source .` tells Cloud Run / Cloud Build to build from the current directory.  
- For **private** services, omit `--allow-unauthenticated` and use IAM to control who can invoke the service.

Cloud Build will build an image (using buildpacks or a generated Dockerfile when applicable), push it to **Artifact Registry**, and deploy it to Cloud Run. The first build may take a few minutes.

---

## Other Ways to Deploy (Official Docs)

| Method | When to use | Doc link |
|--------|-------------|----------|
| **Deploy from source** | You have app code, want no Dockerfile | [Build and deploy (other languages)](https://cloud.google.com/run/docs/quickstarts/build-and-deploy/deploy-service-other-languages) |
| **Deploy a container image** | You already have an image in Artifact Registry or Docker Hub | [Deploying container images to Cloud Run](https://cloud.google.com/run/docs/deploying) |
| **Use Cloud Build in CI/CD** | You want a pipeline (e.g. on git push) | [Deploy a containerized application to Cloud Run using Cloud Build](https://cloud.google.com/build/docs/deploy-containerized-application-cloud-run) |

---

## Quickstarts by Language and Scenario

The Cloud Run docs provide **multiple quickstarts**. A few examples (all on [cloud.google.com](https://cloud.google.com/run/docs/quickstarts)):

- **Go, Node.js, Python, Java, C#, C++, PHP, Ruby** — language-specific “build and deploy” quickstarts.  
- **Prebuilt samples** — Deploy a sample container without writing code.  
- **Cloud Run jobs** — Run batch or one-off tasks.  
- **HTTP functions** — Deploy from a function (e.g. Cloud Functions-style) to Cloud Run.

Use the [Quickstarts index](https://cloud.google.com/run/docs/quickstarts) to pick the one that matches your stack.

---

## After Deployment

- You get a **URL** like `https://SERVICE_NAME-XXXXX-REGION.run.app`.  
- **Logs:** [Cloud Run logs](https://cloud.google.com/run/docs/logging) in Cloud Logging.  
- **Metrics:** [Cloud Run metrics](https://cloud.google.com/run/docs/monitoring) in the console or via Monitoring.  
- **Custom domain / auth:** See [Cloud Run documentation](https://cloud.google.com/run/docs) for mapping custom domains and IAM.

---

## References (Google sources only)

- [Quickstart: Build and deploy a web app (other languages)](https://cloud.google.com/run/docs/quickstarts/build-and-deploy/deploy-service-other-languages) — Cloud Run | Google Cloud Documentation  
- [Quickstarts index — Cloud Run](https://cloud.google.com/run/docs/quickstarts) — Google Cloud Documentation  
- [Deploying container images to Cloud Run](https://cloud.google.com/run/docs/deploying) — Google Cloud Documentation  
- [Building containers for Cloud Run](https://cloud.google.com/run/docs/building/containers) — Google Cloud Documentation  
- [Deploy a containerized application to Cloud Run using Cloud Build](https://cloud.google.com/build/docs/deploy-containerized-application-cloud-run) — Cloud Build | Google Cloud Documentation
