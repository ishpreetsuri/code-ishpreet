/*
 * chatbot.js — Keyword matching engine + chat widget UI logic
 *
 * This file does two things:
 *   1. getAnswer(userMessage) — finds the best matching Q&A from chatbot-data.js
 *   2. Builds the floating chat widget and handles all user interaction
 *
 * UPGRADE PATH: To switch to real AI later, replace getAnswer() with a
 * fetch() to your API endpoint. All UI code stays exactly the same.
 */

// ── 1. Answer engine ──────────────────────────────────────────────────────────

function getAnswer(userMessage) {
  const msg = userMessage.toLowerCase().trim();

  // Score each Q&A entry by counting how many of its triggers appear in the message
  let bestScore = 0;
  let bestAnswer = ISHPREET.fallback;

  ISHPREET.qa.forEach(entry => {
    let score = 0;
    entry.triggers.forEach(trigger => {
      if (msg.includes(trigger.toLowerCase())) score++;
    });
    if (score > bestScore) {
      bestScore = score;
      bestAnswer = entry.answer;
    }
  });

  return bestAnswer;
}

// ── 2. Chat widget UI ─────────────────────────────────────────────────────────

// Inject the widget HTML and CSS into the page when the script loads
function buildWidget() {
  // --- CSS ---
  const style = document.createElement("style");
  style.textContent = `
    #cb-btn {
      position: fixed; bottom: 28px; right: 28px; z-index: 9999;
      background: #4f46e5; color: #fff; border: none; border-radius: 50px;
      padding: 14px 22px; font-size: 0.95rem; font-weight: 700;
      cursor: pointer; box-shadow: 0 6px 24px rgba(79,70,229,0.4);
      display: flex; align-items: center; gap: 8px;
      transition: transform .15s, box-shadow .15s;
    }
    #cb-btn:hover { transform: translateY(-2px); box-shadow: 0 10px 30px rgba(79,70,229,0.45); }

    #cb-box {
      position: fixed; bottom: 90px; right: 28px; z-index: 9998;
      width: 340px; max-width: calc(100vw - 40px);
      background: #fff; border-radius: 18px;
      box-shadow: 0 16px 48px rgba(2,6,23,0.18);
      display: none; flex-direction: column; overflow: hidden;
      font-family: "Segoe UI", system-ui, sans-serif;
    }
    #cb-box.open { display: flex; }

    #cb-header {
      background: linear-gradient(135deg, #0f172a, #312e81);
      color: #fff; padding: 16px 18px;
      display: flex; justify-content: space-between; align-items: center;
    }
    #cb-header h3 { margin: 0; font-size: 1rem; }
    #cb-header p  { margin: 3px 0 0; font-size: 0.78rem; color: #c7d2fe; }
    #cb-close { background: none; border: none; color: #fff; font-size: 1.3rem; cursor: pointer; line-height:1; }

    #cb-messages {
      flex: 1; overflow-y: auto; padding: 16px;
      max-height: 320px; display: flex; flex-direction: column; gap: 10px;
      background: #f8fafc;
    }

    .cb-msg {
      max-width: 85%; padding: 10px 13px; border-radius: 14px;
      font-size: 0.88rem; line-height: 1.5; white-space: pre-wrap; word-wrap: break-word;
    }
    .cb-msg.bot  { background: #fff; border: 1px solid #e2e8f0; align-self: flex-start; color: #1e293b; }
    .cb-msg.user { background: #4f46e5; color: #fff; align-self: flex-end; }

    #cb-suggestions {
      padding: 8px 12px; display: flex; flex-wrap: wrap; gap: 6px; background: #f8fafc;
      border-top: 1px solid #e2e8f0;
    }
    .cb-chip {
      background: #e0e7ff; color: #4338ca; border: none; border-radius: 20px;
      padding: 5px 11px; font-size: 0.75rem; font-weight: 600; cursor: pointer;
      transition: background .12s;
    }
    .cb-chip:hover { background: #c7d2fe; }

    #cb-input-row {
      display: flex; border-top: 1px solid #e2e8f0; background: #fff;
    }
    #cb-input {
      flex: 1; border: none; outline: none; padding: 13px 14px;
      font-size: 0.9rem; background: transparent;
    }
    #cb-send {
      background: #4f46e5; color: #fff; border: none;
      padding: 0 16px; cursor: pointer; font-size: 1.1rem;
      transition: background .12s;
    }
    #cb-send:hover { background: #4338ca; }
  `;
  document.head.appendChild(style);

  // --- HTML ---
  document.body.insertAdjacentHTML("beforeend", `
    <!-- Floating button -->
    <button id="cb-btn" onclick="toggleChat()">💬 Ask me anything</button>

    <!-- Chat box -->
    <div id="cb-box">
      <div id="cb-header">
        <div>
          <h3>Ask Ishpreet's Assistant</h3>
          <p>Powered by his CV — ask anything!</p>
        </div>
        <button id="cb-close" onclick="toggleChat()">✕</button>
      </div>

      <div id="cb-messages">
        <!-- Welcome message added by JS below -->
      </div>

      <!-- Quick-tap suggestion chips -->
      <div id="cb-suggestions">
        <button class="cb-chip" onclick="sendChip('What projects has he built?')">Projects</button>
        <button class="cb-chip" onclick="sendChip('What are his skills?')">Skills</button>
        <button class="cb-chip" onclick="sendChip('Is he available for internship?')">Hire?</button>
        <button class="cb-chip" onclick="sendChip('How can I contact him?')">Contact</button>
      </div>

      <div id="cb-input-row">
        <input id="cb-input" type="text" placeholder="Type a question..."
               onkeydown="if(event.key==='Enter') sendMessage()" />
        <button id="cb-send" onclick="sendMessage()">➤</button>
      </div>
    </div>
  `);

  // Add the welcome message
  addMessage("bot", `Hi! 👋 I'm Ishpreet's AI assistant.\n\nAsk me anything about his skills, projects, experience, or availability for internships. I'll do my best to answer!`);
}

// ── 3. Widget interaction functions ───────────────────────────────────────────

function toggleChat() {
  const box = document.getElementById("cb-box");
  box.classList.toggle("open");
  if (box.classList.contains("open")) {
    document.getElementById("cb-input").focus();
  }
}

function addMessage(type, text) {
  const messages = document.getElementById("cb-messages");
  const div = document.createElement("div");
  div.className = `cb-msg ${type}`;
  div.textContent = text;
  messages.appendChild(div);
  // Scroll to bottom so newest message is visible
  messages.scrollTop = messages.scrollHeight;
}

function sendMessage() {
  const input = document.getElementById("cb-input");
  const text = input.value.trim();
  if (!text) return;

  addMessage("user", text);
  input.value = "";

  // Small delay so it feels like the bot is "thinking"
  setTimeout(() => {
    const answer = getAnswer(text);
    addMessage("bot", answer);
  }, 400);
}

// Called when a suggestion chip is tapped
function sendChip(text) {
  document.getElementById("cb-input").value = text;
  sendMessage();
}

// ── 4. Initialise when the page is ready ──────────────────────────────────────
document.addEventListener("DOMContentLoaded", buildWidget);
