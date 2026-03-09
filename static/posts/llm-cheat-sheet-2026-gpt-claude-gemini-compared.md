---
title: 'LLM Cheat Sheet 2026: GPT-4o vs Claude 3.7 vs Gemini 2.0 vs DeepSeek — Which AI Model for What Task'
description: 'The definitive 2026 guide to every major LLM — strengths, weaknesses, pricing, and exactly which model to use for coding, writing, reasoning, and research.'
date: '2026-01-08'
tags: ['ai-tools', 'llm', 'claude', 'gpt', 'gemini', 'developer-tools']
published: true
featured: true
author: 'Jatinder (Jay) Bhola'
---

## The Model Explosion is Real

Six months ago, the choice was simple: GPT-4 or Claude. Today you're choosing between GPT-4o, o3, o3-mini, Claude 3.5 Sonnet, Claude 3.7 Sonnet, Claude 3.7 with extended thinking, Gemini 2.0 Flash, Gemini 2.0 Pro, Gemini 2.5, DeepSeek V3, DeepSeek R2, Llama 3.3, Mistral Large... 

It's overwhelming. And picking the wrong model for the wrong task means paying more for worse results.

This guide cuts through the noise.

---

## The 2026 Model Landscape at a Glance

| Model | Company | Context | Best At | Price/1M tokens |
|---|---|---|---|---|
| GPT-4o | OpenAI | 128k | Multimodal, general, speed | $5 in / $15 out |
| o3 | OpenAI | 200k | Hard reasoning, math, code | $10 in / $40 out |
| o3-mini | OpenAI | 200k | Fast reasoning (cheaper) | $1.10 in / $4.40 out |
| Claude 3.5 Sonnet | Anthropic | 200k | Coding, writing, general | $3 in / $15 out |
| Claude 3.7 Sonnet | Anthropic | 200k | Extended reasoning, complex code | $3 in / $15 out |
| Gemini 2.0 Flash | Google | 1M | Speed, long docs, multimodal | $0.10 in / $0.40 out |
| Gemini 2.0 Pro | Google | 2M | Long context, research | $1.25 in / $5 out |
| DeepSeek V3 | DeepSeek | 64k | General tasks (cheap) | $0.27 in / $1.10 out |
| DeepSeek R1 | DeepSeek | 64k | Reasoning (open source!) | Free (self-host) |
| Llama 3.3 70B | Meta | 128k | Local/private use | Free (self-host) |

*Prices as of March 2026. Subject to change frequently.*

---

## Deep Dive: Each Major Model

### OpenAI GPT-4o
**The Swiss Army Knife**

GPT-4o remains the most versatile model for general tasks. It's not the best at any one thing, but it's excellent at almost everything, processes images and audio natively, and has the largest third-party integrations ecosystem.

**Strengths:**
- Native multimodal: process images, PDFs, audio in the same conversation
- Fastest response times among frontier models
- Massive plugin and integration ecosystem
- Great for conversational interactions that need quick back-and-forth
- Vision: take a screenshot → get code

**Weaknesses:**
- Not the best at deep mathematical reasoning (o3 is better)
- Code quality slightly below Claude 3.7 for complex systems
- Context window (128k) smaller than Gemini/Claude

**Use it for:**
- Building quick prototypes from screenshots
- General coding assistance
- Content generation at scale
- Customer service automation
- Anything needing multimodal input

```python
# Example: Screenshot to Code
from openai import OpenAI
import base64

client = OpenAI()

with open("ui-screenshot.png", "rb") as img:
    image_data = base64.b64encode(img.read()).decode()

response = client.chat.completions.create(
    model="gpt-4o",
    messages=[{
        "role": "user",
        "content": [
            {
                "type": "image_url",
                "image_url": {
                    "url": f"data:image/png;base64,{image_data}"
                }
            },
            {
                "type": "text",
                "text": "Generate React + Tailwind CSS code that matches this UI exactly."
            }
        ]
    }]
)
```

---

### OpenAI o3 / o3-mini
**The Reasoning Powerhouse**

o3 is the model you reach for when a problem is genuinely hard — where GPT-4o and Claude give you a plausible-sounding wrong answer. o3 thinks step by step, checks its work, and catches errors that faster models miss.

**Strengths:**
- Best-in-class on mathematical and logical reasoning benchmarks
- Excellent for competitive programming (LeetCode hard, Codeforces)
- Catches its own mistakes through self-verification
- Strong for algorithm design and complexity analysis
- Scientific research and quantitative analysis

**Weaknesses:**
- Slow — extended thinking can take minutes
- Expensive — 4x more than GPT-4o
- Overkill for most everyday tasks
- Can overthink simple questions

**Use it for:**
- Hard LeetCode / interview prep problems
- Algorithm optimization challenges
- Mathematical proofs and derivations
- Complex SQL queries with multiple joins
- Debugging race conditions and concurrency issues
- Financial modeling and quantitative analysis

**Use o3-mini instead of o3** when you want the reasoning capability at 1/10th the cost. It's 90% as good for most reasoning tasks.

---

### Anthropic Claude 3.5 Sonnet
**The Developer's Best Friend**

Claude 3.5 Sonnet has been the most widely praised coding model since its release in June 2024. It writes clean, idiomatic code, follows instructions precisely, and doesn't hallucinate APIs or function signatures as often as competitors.

**Strengths:**
- Best overall code quality among generally available models
- Follows complex, multi-part instructions reliably
- Great for large refactors and multi-file edits
- Excellent at explaining its reasoning
- Long context (200k tokens) handles large codebases
- Good at nuanced writing and analysis

**Weaknesses:**
- Slower than GPT-4o for simple tasks
- No native multimodal (can understand images but not generate)
- Sometimes over-cautious ("I can't help with...")

**Use it for:**
- Writing production code
- Code review and security analysis
- Architecture documentation
- Complex multi-step reasoning
- Writing that requires nuance (technical blog posts, proposals)

```typescript
// Example: Using Claude for code review via API
import Anthropic from '@anthropic-ai/sdk';

const client = new Anthropic();

const codeToReview = `
  async function getUser(id: string) {
    const user = await db.query('SELECT * FROM users WHERE id = ' + id);
    return user[0];
  }
`;

const message = await client.messages.create({
  model: "claude-3-5-sonnet-20241022",
  max_tokens: 1024,
  messages: [
    {
      role: "user",
      content: `Review this code for security vulnerabilities and performance issues:
      
${codeToReview}

Be specific about what's wrong and provide corrected code.`
    }
  ]
});

console.log(message.content[0].text);
// Output: "This code has a critical SQL injection vulnerability..."
```

---

### Anthropic Claude 3.7 Sonnet (with Extended Thinking)
**The New Standard for Complex Problems**

Claude 3.7 adds an extended thinking mode that lets Claude reason through hard problems before responding. Think of it as the difference between a quick answer and a considered one.

**Strengths:**
- Extended thinking for genuinely complex problems
- Better at following nuanced constraints
- Improved at code that requires multi-step planning
- Excellent at system design and architectural decisions
- Strong at long-horizon tasks (tasks that take many steps)

**When to use Extended Thinking:**
- Designing a system from scratch
- Debugging a subtle bug that quick models can't find
- Complex data transformations with many edge cases
- Multi-step business logic with many constraints

```python
# Using Claude 3.7 with extended thinking
import anthropic

client = anthropic.Anthropic()

response = client.messages.create(
    model="claude-3-7-sonnet-20250219",
    max_tokens=16000,
    thinking={
        "type": "enabled",
        "budget_tokens": 10000  # Let Claude think for up to 10k tokens
    },
    messages=[{
        "role": "user",
        "content": """Design a distributed rate limiting system for a REST API 
        that handles 1M requests/second across 50 global regions. 
        Requirements:
        - Sub-10ms latency for limit checks
        - Eventual consistency acceptable (within 100ms)
        - Handle region failures gracefully
        - Support burst limits and rolling windows
        
        Provide: architecture diagram (text), data structures, algorithms, and failure scenarios."""
    }]
)
```

---

### Google Gemini 2.0 Flash / Pro
**The Long Context Champion**

Gemini's headline feature is its **1M–2M token context window**. This is an order of magnitude larger than competitors and enables use cases that are simply impossible elsewhere.

**Strengths:**
- 1M token context (Flash) / 2M token context (Pro)
- Fastest model at this quality tier (Flash)
- Can process entire codebases at once
- Native Google Workspace integration
- Strong multimodal (video, audio, images, code)
- YouTube video analysis natively

**Weaknesses:**
- Code quality still below Claude 3.5/3.7
- Can lose track of instructions in very long contexts
- Less nuanced writing than Claude

**Use it for:**
- Analyzing entire repositories at once
- "Explain this 50,000 line codebase to me"
- Processing large documents (legal contracts, research papers)
- YouTube video summarization
- Long-running conversations that need full history

**The 1M token trick:**
```python
# Feed an entire codebase to Gemini
import google.generativeai as genai
import os

genai.configure(api_key=os.getenv("GOOGLE_API_KEY"))
model = genai.GenerativeModel("gemini-2.0-flash")

# Build codebase context
codebase = ""
for root, _, files in os.walk("./src"):
    for file in files:
        if file.endswith(('.ts', '.tsx', '.js', '.py')):
            path = os.path.join(root, file)
            with open(path) as f:
                codebase += f"\n\n# File: {path}\n{f.read()}"

response = model.generate_content(
    f"Here is the entire codebase:\n{codebase}\n\nQuestion: Where are all the security vulnerabilities?"
)
```

---

### DeepSeek V3 / R1
**The Open Source Disruptor**

DeepSeek, a Chinese AI lab, released models in late 2024 that match or exceed OpenAI's models at a fraction of the cost — and R1 is open source. This is a big deal.

**Strengths:**
- DeepSeek V3: GPT-4o quality at 1/20th the price
- DeepSeek R1: o1-level reasoning, fully open source (MIT license)
- R1 can be run locally with sufficient hardware
- Excellent for cost-sensitive production applications

**Concerns:**
- Chinese company — privacy and data sovereignty concerns for sensitive code
- Self-hosted R1 requires significant GPU hardware (70B model)

**Use it for:**
- High-volume API applications where cost matters
- Open source projects that need free reasoning capability
- Running AI locally (R1 via Ollama)

```bash
# Run DeepSeek R1 locally with Ollama
ollama pull deepseek-r1:7b  # 7B parameter version, runs on laptop
ollama run deepseek-r1:7b

# Or the 70B version (requires ~48GB RAM)
ollama pull deepseek-r1:70b
```

---

## The Decision Framework: Which Model for What

### Quick Reference

| Task | Best Model | Why |
|---|---|---|
| Writing production code | Claude 3.5 Sonnet | Best code quality |
| Complex system design | Claude 3.7 + Extended Thinking | Deep reasoning |
| Hard algorithm (LeetCode) | o3-mini | Best reasoning, cost-efficient |
| Screenshot → code | GPT-4o | Native vision |
| Analyze large codebase | Gemini 2.0 Flash | 1M context |
| Fast prototyping | GPT-4o | Speed |
| Cost-sensitive bulk tasks | DeepSeek V3 | 1/20th the price |
| Local/private use | Llama 3.3 / DeepSeek R1 | Self-hosted |
| Math/quantitative | o3 | Best benchmark scores |
| Long document analysis | Gemini 2.0 Pro | 2M context |

---

## API Quick Start: Using Models Directly

### Unified SDK Pattern (TypeScript)

```typescript
// You can switch models with one line change
const MODEL_CONFIG = {
  // Fast and cheap
  fast: { provider: 'openai', model: 'gpt-4o-mini' },
  // Best coding
  code: { provider: 'anthropic', model: 'claude-3-5-sonnet-20241022' },
  // Best reasoning  
  reason: { provider: 'openai', model: 'o3-mini' },
  // Long context
  long: { provider: 'google', model: 'gemini-2.0-flash' },
};

// Use LangChain for model-agnostic code:
// npm install langchain @langchain/openai @langchain/anthropic @langchain/google-genai

import { ChatOpenAI } from "@langchain/openai";
import { ChatAnthropic } from "@langchain/anthropic";
import { ChatGoogleGenerativeAI } from "@langchain/google-genai";

function getModel(task: 'fast' | 'code' | 'reason' | 'long') {
  switch(task) {
    case 'fast': return new ChatOpenAI({ model: "gpt-4o-mini" });
    case 'code': return new ChatAnthropic({ model: "claude-3-5-sonnet-20241022" });
    case 'reason': return new ChatOpenAI({ model: "o3-mini" });
    case 'long': return new ChatGoogleGenerativeAI({ model: "gemini-2.0-flash" });
  }
}
```

---

## The Student's Recommended Stack

For a CS student in 2026, here's the optimal setup for different budgets:

### Free Tier Stack
- **Claude.ai free** — 3.5 Sonnet with limits
- **ChatGPT free** — GPT-4o with limits
- **Google AI Studio** — Gemini 2.0 Flash, generous free tier
- **Ollama + Llama 3.3 / DeepSeek R1** — unlimited, local
- **GitHub Copilot** — free with student pack

**Total cost: $0**

### $20/month Stack (Best Value)
- **Claude Pro ($20)** — unlimited 3.5/3.7 Sonnet + Projects feature
- Free tiers for everything else

### $40/month Stack (Power User)
- **Claude Pro ($20)** — primary coding + writing assistant  
- **ChatGPT Plus ($20)** — multimodal tasks + DALL-E + Advanced Data Analysis
- Local Ollama for anything sensitive

---

## The Benchmarks Are Lying to You

One important caveat: **model benchmarks are gamed**.

Labs increasingly train models specifically to do well on standardized benchmarks (HumanEval for code, MMLU for knowledge, MATH for math). The result is models that score highly on benchmarks but don't always translate to real-world performance.

**How to actually evaluate models:**
1. Take your hardest actual work problem
2. Give it to each model under consideration
3. Grade the output on what matters to you
4. Ignore the leaderboards

The "best" model is the one that works best for *your* specific tasks. Test before committing.

---

## What's Coming Next

The pace of development is genuinely unprecedented. In the next 6-12 months, expect:

- **100M+ context windows** to become standard (today's 200k will feel tiny)
- **Multimodal as baseline** — text-only models become niche
- **Cheaper reasoning** — o3-level reasoning at o3-mini prices
- **Local models go mainstream** — Llama 4 / DeepSeek next gen on consumer hardware
- **Agents everywhere** — models that autonomously use tools becoming reliable

The model you should use today is probably not the one you'll use in 6 months. Build model-agnostic code and stay flexible.

---

## Resources

- [Artificial Analysis (model benchmarks)](https://artificialanalysis.ai)
- [LMSYS Chatbot Arena (human preference rankings)](https://lmarena.ai)
- [Anthropic API Docs](https://docs.anthropic.com)
- [OpenAI API Docs](https://platform.openai.com/docs)
- [Google AI Studio (free Gemini access)](https://aistudio.google.com)
- [Ollama (run models locally)](https://ollama.com)
- [DeepSeek API](https://platform.deepseek.com)
