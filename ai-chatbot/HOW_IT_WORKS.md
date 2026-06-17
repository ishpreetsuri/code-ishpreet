# How It Works — Claude AI CLI Chatbot

## What It Does (One Line)

A Python command-line app that lets you have a multi-turn conversation with Claude AI, remembering the full chat history within each session.

---

## How It Works Step by Step

### 1. Start Up
When you run `python3 chatbot.py`, the script:
- Imports the Anthropic SDK
- Creates an API client (reads your `ANTHROPIC_API_KEY` from the environment automatically)
- Prints a welcome banner
- Starts a `while True` loop waiting for your input

### 2. You Type a Message
Your input is captured with `input("You: ")`. Empty input is silently skipped. Typing `quit` exits cleanly.

### 3. Your Message Is Added to History
Before calling the API, the script appends your message to a list called `conversation_history`:
```python
conversation_history.append({"role": "user", "content": "your message"})
```
This list grows with every exchange.

### 4. The Full History Is Sent to the Claude API
The script calls `client.messages.create()` and passes the **entire** `conversation_history` list, not just the latest message. This is how Claude "remembers" — it reads the whole conversation from scratch on every request.

```python
response = client.messages.create(
    model="claude-haiku-4-5-20251001",
    max_tokens=1024,
    messages=conversation_history   # full context every time
)
```

### 5. The Reply Is Extracted
The API response is an object. The text sits at `response.content[0].text`.

### 6. The Reply Is Saved and Printed
Claude's reply is appended to `conversation_history` (as `role: "assistant"`) and printed to the terminal. Now both sides of the conversation are in history, ready for the next turn.

### 7. Loop Repeats
Steps 2–6 repeat until the user types `quit` or presses `Ctrl+C`.

---

## Why Conversation History Matters

Large Language Models (LLMs) like Claude are **stateless** — each API call is independent. The model does not remember previous calls automatically. To create the *illusion* of memory, you pass the full conversation as a list of messages every single time. The longer the conversation, the more tokens you send (and pay for), but the richer the context Claude has.

---

## Key Python Concepts Used

| Concept | Where It Appears | Why It Matters |
|---|---|---|
| **Environment Variables** | `ANTHROPIC_API_KEY` read by SDK | Keeps secrets out of code |
| **List of Dicts** | `conversation_history` | Structured data Claude's API expects |
| **`while True` Loop** | Main chat loop | Keeps the app running until the user quits |
| **`try` / `except`** | Wraps the loop | Handles Ctrl+C, network errors, bad keys gracefully |
| **API Call** | `client.messages.create()` | Sends a request to a remote server, gets a response |
| **Functions** | `chat()`, `main()` | Organises code into reusable, readable blocks |
| **f-strings** | `f"\nClaude: {reply}"` | Clean, readable string formatting |
| **`if __name__ == "__main__"`** | Bottom of file | Standard Python entry-point guard |

---

## Interview Q&A

**Q1: What is an API?**
> An API (Application Programming Interface) is a way for two programs to communicate. Here, our Python script sends a request to Anthropic's servers over the internet, and the servers send back Claude's reply. We don't need to know how Claude works internally — we just use the documented interface.

**Q2: How does the chatbot remember the conversation?**
> It doesn't use a database or session storage. Instead, it keeps a Python list (`conversation_history`) in memory. Every time the user sends a message, the entire list — every prior user and assistant message — is sent to the API. Claude reads the full history and replies in context. If you restart the script, the list is empty and memory resets.

**Q3: Why use an environment variable for the API key instead of putting it in the code?**
> Hardcoding secrets in source code is dangerous. If you push to GitHub, your key is exposed publicly and could be stolen and misused. Environment variables live outside the code on your machine (or in a secure config system in production). The Anthropic SDK reads `ANTHROPIC_API_KEY` automatically so you never need to type the key in your script.

**Q4: What does `max_tokens` control?**
> `max_tokens` sets an upper limit on how long Claude's reply can be. One token ≈ 3–4 characters of English text. Setting it to 1024 allows replies of roughly 750–800 words. If you want longer answers, increase the value; for short answers (chat-style), 512 is fine. You're billed per token, so keeping it reasonable saves cost.

**Q5: How would you improve this chatbot?**
> Several ways:
> - **Streaming** — print each word as it arrives instead of waiting for the full reply (better UX for long answers).
> - **System prompt** — add a `system` parameter to give Claude a persona or instructions.
> - **Persistent memory** — save `conversation_history` to a JSON file so context survives restarts.
> - **Web UI** — wrap it in a Flask or FastAPI server and build a simple front-end.
> - **RAG (Retrieval-Augmented Generation)** — let Claude search your own documents before answering.

---

## Ideas to Extend It

| Idea | What to Add | Difficulty |
|---|---|---|
| **Streaming output** | Use `client.messages.stream()` and print chunks | Beginner |
| **System prompt / persona** | Add `system="You are a helpful coding tutor"` to `messages.create()` | Beginner |
| **Save chat to file** | Write `conversation_history` to a JSON file after each session | Beginner |
| **Colour output** | Use the `colorama` library for coloured terminal text | Beginner |
| **Web interface** | Wrap in FastAPI + a basic HTML page | Intermediate |
| **Multi-session memory** | Load past conversations from a database on start | Intermediate |
| **RAG pipeline** | Use LangChain + a vector store to search documents | Advanced |
| **Voice input/output** | Integrate OpenAI Whisper (input) + `pyttsx3` (output) | Advanced |

---

*Part of Ishpreet Singh's AI Engineering portfolio — [linkedin.com/in/ishpreet-singh-a81920291](https://www.linkedin.com/in/ishpreet-singh-a81920291)*
