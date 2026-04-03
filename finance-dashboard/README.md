# Zorvyn Finance Dashboard

A clean, interactive, and responsive financial dashboard built for the Zorvyn Frontend Developer Intern screening assessment. 

##  Live Demo
*(Paste your deployed Vercel/Netlify link here later)*

##  Features
*   **Dashboard Overview:** Displays calculated Total Balance, Income, and Expenses.
*   **Visualizations:** Uses `recharts` for a Spending Breakdown (Pie Chart) and a Spending Trend (Line Chart).
*   **Transactions Management:** Search, filter, and view transactions.
*   **Role-Based Access Control (RBAC):** Simulated frontend roles. Viewers can only see data; Admins can add new transactions.
*   **Automated Insights:** Automatically calculates the highest spending category and largest single expense.
*   **Data Persistence:** Utilizes browser `localStorage` to save user-added transactions across page reloads.

##  Tech Stack & Approach
*   **Framework:** React (Bootstrapped with Vite for performance).
*   **Styling:** Pure CSS (CSS Grid and Flexbox for responsive design).
*   **State Management:** React Context API (`FinanceContext`). Chose this over Redux to keep the architecture clean and lightweight, which is perfect for this scale.
*   **Charts:** Recharts.

##  Setup Instructions
To run this project locally:

1. Clone the repository:
   ```bash
   git clone <your-repo-url>