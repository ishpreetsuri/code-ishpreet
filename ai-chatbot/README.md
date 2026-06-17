# Claude AI CLI Chatbot

A command-line chatbot built with Python and the Anthropic SDK. Type messages in your terminal and have a full multi-turn conversation with Claude — the chatbot remembers everything said earlier in the session.

---

## Prerequisites

**1. Install the Anthropic Python SDK**
```bash
pip install anthropic
```

**2. Set your Anthropic API key**

Get a free key at [console.anthropic.com](https://console.anthropic.com).

```bash
# macOS / Linux
export ANTHROPIC_API_KEY="sk-ant-..."

# Windows (Command Prompt)
set ANTHROPIC_API_KEY=sk-ant-...

# Windows (PowerShell)
$env:ANTHROPIC_API_KEY="sk-ant-..."
```

> The key is read automatically by the SDK — you never paste it into the code.

---

## How to Run

```bash
python3 chatbot.py
```

Type your message and press Enter. Type `quit` or press `Ctrl+C` to exit.

```
====================================================
        Claude AI Chatbot — CLI Edition
  Powered by Anthropic Python SDK + Haiku model
  Type 'quit', 'exit', or press Ctrl+C to stop
====================================================

You: What is machine learning?
Claude: Machine learning is a branch of AI where systems learn from data...

You: Can you give me a simple Python example?
Claude: Sure! Here's a basic linear regression example...
```

---

## Concepts Demonstrated

- **Anthropic Python SDK** — calling Claude via `client.messages.create()`
- **Multi-turn conversation memory** — passing full message history on every API call
- **Environment variables** — keeping API keys out of source code
- **CLI input loop** — `while True` with graceful exit handling
- **Error handling** — `try/except` for API errors and `KeyboardInterrupt`
- **Clean code structure** — separate `chat()` and `main()` functions, full comments

---

## Project Structure

```
ai-chatbot/
├── chatbot.py       # Main chatbot script
├── HOW_IT_WORKS.md  # Plain-English explanation + interview Q&A
└── README.md        # This file
```

---

## Learn More

See [HOW_IT_WORKS.md](HOW_IT_WORKS.md) for:
- Step-by-step breakdown of how the code works
- Key Python concepts explained
- 5 interview Q&As
- Ideas to extend the project (streaming, web UI, RAG)

---

## Model Used

`claude-haiku-4-5-20251001` — Anthropic's fast, lightweight model. Ideal for interactive chat.

---

*Built by **Ishpreet Singh** — [linkedin.com/in/ishpreet-singh-a81920291](https://www.linkedin.com/in/ishpreet-singh-a81920291)*
