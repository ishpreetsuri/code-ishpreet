# ============================================================
# Claude AI CLI Chatbot
# Author: Ishpreet Singh
# Run: pip install anthropic && set ANTHROPIC_API_KEY=your_key
# ============================================================
#
# This script creates a command-line chatbot powered by Claude.
# It maintains full conversation history so Claude remembers
# everything said earlier in the same session.
# ============================================================

import anthropic  # Official Anthropic Python SDK — pip install anthropic
import os         # Built-in Python module for environment variables

# ------------------------------------------------------------
# MODEL CONFIGURATION
# ------------------------------------------------------------
# We use claude-haiku-4-5 — Anthropic's fast and affordable model.
# Full model ID is used here for explicitness.
MODEL = "claude-haiku-4-5-20251001"

# ------------------------------------------------------------
# ANTHROPIC CLIENT
# ------------------------------------------------------------
# The SDK automatically reads the ANTHROPIC_API_KEY environment variable.
# You never hardcode your API key in code — that would be a security risk.
# Set it in your terminal: export ANTHROPIC_API_KEY="sk-ant-..."
client = anthropic.Anthropic()

# ------------------------------------------------------------
# CONVERSATION HISTORY
# ------------------------------------------------------------
# This list stores every message exchanged in the session.
# Each message is a dict with two keys:
#   "role"    -> either "user" or "assistant"
#   "content" -> the text of the message
#
# We send the full history to the API on every request so that
# Claude has context from earlier in the conversation.
conversation_history = []


def chat(user_message: str) -> str:
    """
    Send a user message to Claude and return the assistant's reply.

    Steps:
      1. Append the user message to conversation_history.
      2. Call the Claude API with the full history.
      3. Extract the text from the response.
      4. Append the assistant reply to conversation_history.
      5. Return the reply text.

    Args:
        user_message (str): The text typed by the user.

    Returns:
        str: Claude's reply.
    """

    # Step 1 — Add the user's message to history
    conversation_history.append({
        "role": "user",
        "content": user_message
    })

    # Step 2 — Call the Claude API
    # We send the FULL conversation_history every time so Claude
    # remembers what was said before. This is how multi-turn memory works.
    response = client.messages.create(
        model=MODEL,
        max_tokens=1024,            # Maximum tokens Claude can use in its reply
        messages=conversation_history   # Full history = context = memory
    )

    # Step 3 — Extract the reply text from the API response object
    # response.content is a list of content blocks.
    # For a simple text response, the first block's .text holds the reply.
    assistant_message = response.content[0].text

    # Step 4 — Add Claude's reply to history so future turns remember it
    conversation_history.append({
        "role": "assistant",
        "content": assistant_message
    })

    # Step 5 — Return the reply so main() can print it
    return assistant_message


def main():
    """
    Entry point — shows the welcome banner and runs the chat loop.
    """

    # ------------------------------------------------------------
    # WELCOME BANNER
    # ------------------------------------------------------------
    print()
    print("=" * 52)
    print("        Claude AI Chatbot — CLI Edition")
    print("  Powered by Anthropic Python SDK + Haiku model")
    print("  Type 'quit', 'exit', or press Ctrl+C to stop")
    print("=" * 52)
    print()

    # ------------------------------------------------------------
    # MAIN CHAT LOOP
    # ------------------------------------------------------------
    # We loop forever until the user quits or presses Ctrl+C.
    while True:
        try:
            # Prompt the user for input; .strip() removes leading/trailing spaces
            user_input = input("You: ").strip()

            # Skip empty input — if the user just pressed Enter, loop again
            if not user_input:
                continue

            # Allow the user to exit gracefully by typing a quit command
            if user_input.lower() in ["quit", "exit", "bye"]:
                print("\nGoodbye! Thanks for chatting.")
                break

            # Send the message to Claude and get a reply
            reply = chat(user_input)

            # Print Claude's reply
            print(f"\nClaude: {reply}\n")

        except KeyboardInterrupt:
            # This runs when the user presses Ctrl+C
            print("\n\nGoodbye! Thanks for chatting.")
            break

        except anthropic.APIConnectionError:
            # Network error — couldn't reach the API
            print("\n[Error] Could not connect to the Anthropic API.")
            print("Check your internet connection and try again.\n")

        except anthropic.AuthenticationError:
            # Wrong or missing API key
            print("\n[Error] Invalid API key.")
            print("Make sure ANTHROPIC_API_KEY is set correctly.\n")
            break

        except anthropic.APIStatusError as e:
            # Any other API-level error (rate limit, server error, etc.)
            print(f"\n[API Error {e.status_code}] {e.message}\n")


# ------------------------------------------------------------
# ENTRY POINT GUARD
# ------------------------------------------------------------
# This block runs only when you execute this file directly:
#   python3 chatbot.py
#
# It does NOT run when this file is imported as a module.
if __name__ == "__main__":
    main()
