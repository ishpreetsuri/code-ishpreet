"""
==========================================================
  EXPENSE TRACKER  -  a simple command-line app in Python
  Author: Ishpreet Singh
==========================================================

WHAT THIS PROGRAM DOES
----------------------
It lets you keep track of your spending. You can:
  1. Add a new expense (date, category, description, amount)
  2. View all your expenses in a neat table
  3. See a summary of how much you spent per category
  4. See your total spending
  5. Exit

HOW THE DATA IS SAVED
---------------------
Every expense is saved as one line in a file called "expenses.csv".
CSV means "Comma Separated Values" - it is just a plain text file where
each value is separated by a comma. Because we save to a file, your data
is still there the next time you run the program.

This program only uses Python's built-in tools (the 'csv' and 'os'
modules), so it runs anywhere Python is installed - nothing to download.
"""

# ----------------------------------------------------------------------
# IMPORTS  (built-in tools we borrow from Python)
# ----------------------------------------------------------------------
import csv   # helps us read and write CSV files easily
import os    # lets us check if the data file already exists

# ----------------------------------------------------------------------
# CONSTANTS  (values we set once and reuse - written in CAPS by convention)
# ----------------------------------------------------------------------
FILE_NAME = "expenses.csv"                       # where we store the data
HEADER = ["Date", "Category", "Description", "Amount"]  # column titles


# ----------------------------------------------------------------------
# FUNCTION: load_expenses
# Reads every expense from the CSV file and returns them as a list.
# Each expense is a dictionary like:
#   {"Date": "2026-06-04", "Category": "Food", "Description": "Lunch", "Amount": "120"}
# ----------------------------------------------------------------------
def load_expenses():
    expenses = []  # start with an empty list

    # If the file does not exist yet, there is nothing to load.
    if not os.path.exists(FILE_NAME):
        return expenses

    # Open the file for reading ("r"). The 'with' block closes it for us.
    with open(FILE_NAME, "r", newline="") as file:
        reader = csv.DictReader(file)   # reads each row as a dictionary
        for row in reader:
            expenses.append(row)        # add each expense to our list

    return expenses


# ----------------------------------------------------------------------
# FUNCTION: save_expense
# Adds ONE new expense to the end of the CSV file.
# ----------------------------------------------------------------------
def save_expense(date, category, description, amount):
    # Does the file already exist? We need to know whether to write the
    # header row (the column titles) first.
    file_exists = os.path.exists(FILE_NAME)

    # Open the file in "append" mode ("a") so we add to the end
    # without erasing what is already there.
    with open(FILE_NAME, "a", newline="") as file:
        writer = csv.writer(file)

        # If the file is brand new, write the column titles first.
        if not file_exists:
            writer.writerow(HEADER)

        # Write the actual expense as a new row.
        writer.writerow([date, category, description, amount])


# ----------------------------------------------------------------------
# FUNCTION: add_expense
# Asks the user for the details of a new expense, then saves it.
# ----------------------------------------------------------------------
def add_expense():
    print("\n--- Add a New Expense ---")

    # input() pauses and waits for the user to type something.
    # .strip() removes any extra spaces at the start/end.
    date = input("Date (e.g. 2026-06-04): ").strip()
    category = input("Category (e.g. Food, Travel, Books): ").strip()
    description = input("Description (e.g. Lunch with friends): ").strip()

    # Amount must be a number. We use a loop to keep asking until the
    # user types a valid number. This is called "input validation".
    while True:
        amount_text = input("Amount (e.g. 120): ").strip()
        try:
            # float() turns text like "120" into the number 120.0
            amount = float(amount_text)
            break  # the number was valid, so leave the loop
        except ValueError:
            # If the user typed letters, float() fails and we land here.
            print("  Please enter a valid number (like 120).")

    # Save the expense to the file.
    save_expense(date, category, description, amount)
    print("Expense added successfully!\n")


# ----------------------------------------------------------------------
# FUNCTION: view_expenses
# Prints all saved expenses in a simple table.
# ----------------------------------------------------------------------
def view_expenses():
    expenses = load_expenses()

    print("\n--- All Expenses ---")

    # If the list is empty, tell the user and stop here.
    if not expenses:
        print("No expenses recorded yet.\n")
        return

    # Print the column headers, neatly spaced using f-strings.
    # The numbers (e.g. <12) set the column width for alignment.
    print(f"{'Date':<12}{'Category':<15}{'Description':<25}{'Amount':>10}")
    print("-" * 62)

    # Go through each expense and print it as a row.
    for e in expenses:
        print(f"{e['Date']:<12}{e['Category']:<15}{e['Description']:<25}{e['Amount']:>10}")

    print()  # blank line for spacing


# ----------------------------------------------------------------------
# FUNCTION: view_summary
# Shows the TOTAL amount spent in each category.
# ----------------------------------------------------------------------
def view_summary():
    expenses = load_expenses()

    print("\n--- Spending by Category ---")

    if not expenses:
        print("No expenses recorded yet.\n")
        return

    # A dictionary to add up totals per category.
    # Example result: {"Food": 300.0, "Travel": 150.0}
    totals = {}

    for e in expenses:
        category = e["Category"]
        amount = float(e["Amount"])

        # If we have seen this category before, add to it.
        # Otherwise, start it at this amount.
        if category in totals:
            totals[category] += amount
        else:
            totals[category] = amount

    # Print each category and its total.
    for category, total in totals.items():
        print(f"{category:<15} : {total:>10.2f}")

    print()


# ----------------------------------------------------------------------
# FUNCTION: view_total
# Shows the grand total of ALL spending.
# ----------------------------------------------------------------------
def view_total():
    expenses = load_expenses()

    # Add up the "Amount" of every expense.
    total = 0.0
    for e in expenses:
        total += float(e["Amount"])

    print(f"\nTotal spending: {total:.2f}\n")


# ----------------------------------------------------------------------
# FUNCTION: show_menu
# Prints the list of choices the user can pick from.
# ----------------------------------------------------------------------
def show_menu():
    print("=" * 35)
    print("        EXPENSE TRACKER")
    print("=" * 35)
    print("1. Add an expense")
    print("2. View all expenses")
    print("3. View spending by category")
    print("4. View total spending")
    print("5. Exit")


# ----------------------------------------------------------------------
# FUNCTION: main
# This is the "engine" of the program. It shows the menu again and again
# until the user chooses to exit.
# ----------------------------------------------------------------------
def main():
    while True:
        show_menu()
        choice = input("Choose an option (1-5): ").strip()

        # Decide what to do based on what the user typed.
        if choice == "1":
            add_expense()
        elif choice == "2":
            view_expenses()
        elif choice == "3":
            view_summary()
        elif choice == "4":
            view_total()
        elif choice == "5":
            print("Goodbye! Your expenses are saved.")
            break  # leave the loop, which ends the program
        else:
            print("Invalid choice. Please type a number from 1 to 5.\n")


# ----------------------------------------------------------------------
# This special line means: "only run main() if this file is run directly".
# It is a standard Python pattern you will see in almost every program.
# ----------------------------------------------------------------------
if __name__ == "__main__":
    main()
