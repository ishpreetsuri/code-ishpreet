# 🧠 How It Works — Expense Tracker (Interview Notes)

This page explains the project in plain English so you can confidently
talk about it in an interview. Read it once and you'll be able to answer
any "walk me through your project" question.

---

## 1. What the project is (one-line answer)

> "It's a command-line expense tracker in Python that lets you add expenses
> and saves them to a file, so you can view all your spending, see totals by
> category, and see your grand total."

---

## 2. What it does (the features)

- **Add an expense** — you type a date, category, description, and amount.
- **View all expenses** — shows everything in a neat table.
- **Spending by category** — adds up how much you spent on Food, Travel, etc.
- **Total spending** — adds up everything.
- **Data is saved** — everything is stored in a file called `expenses.csv`,
  so your data is still there next time you open the app.

---

## 3. How it works, step by step

1. The program shows a **menu** (options 1–5).
2. It uses a **loop** (`while True`) so the menu keeps coming back until
   you choose "Exit". This is the heart of the program.
3. Based on your choice, it calls the matching **function**
   (for example, choosing `1` runs `add_expense()`).
4. When you add an expense, it is written to the **CSV file** using Python's
   built-in `csv` module.
5. When you view or summarise, the program **reads** all rows back from the
   file into a **list of dictionaries**, then processes them.

---

## 4. The key Python concepts I used (and can explain)

| Concept | Where I used it | One-line explanation |
|--------|------------------|----------------------|
| **Functions** | `add_expense()`, `view_summary()`, etc. | Reusable blocks of code, each doing one job. |
| **Loops** | the menu `while True`, and looping over expenses | Repeating actions without copy-pasting code. |
| **Conditionals** | `if choice == "1"` | Making decisions based on the user's input. |
| **Dictionaries** | each expense + the category totals | Storing data as key→value pairs. |
| **Lists** | all expenses together | Holding many items in order. |
| **File handling** | reading/writing `expenses.csv` | Saving data so it isn't lost when the program closes. |
| **Error handling** | `try/except` around `float()` | Stopping the app from crashing if the user types text instead of a number. |

---

## 5. Questions an interviewer might ask (with answers)

**Q: Why did you use a CSV file instead of a database?**
> "It keeps the project simple and dependency-free, and CSV is easy to open
> in Excel. For a bigger version I'd move to an SQL database."

**Q: How do you stop the program from crashing on bad input?**
> "I wrap the number conversion in a `try/except` block. If the user types
> text instead of a number, it catches the error and asks again."

**Q: How would you improve it?**
> "Add the ability to delete or edit an expense, filter by date, and store
> the data in an SQL database instead of a CSV file." *(These are real next
> steps — see below.)*

---

## 6. Ideas to extend it yourself (great for learning)

- Add a **delete** option to remove an expense.
- Add a **date filter** ("show only this month").
- Save to an **SQL database** instead of CSV (combines two of my skills).
- Add a **budget limit** warning when spending crosses a set amount.

> 💡 Tip: Try adding the **delete** feature yourself — it's the best way to
> truly own this project and have a genuine story to tell in interviews.
