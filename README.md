# CashTaka Digital Wallet Frontend

**Digital Wallet System Frontend** built with **React, Redux Toolkit, and RTK Query**, designed for Users, Agents, and Admins to manage wallets and transactions seamlessly. Inspired by apps like bKash and Nagad.

---

## 🚀 Project Overview

This frontend application provides a **secure, role-based, and responsive interface** for a digital wallet system:

- **Public landing pages**: Home, About, Features, Contact, FAQ.
- **Authentication**: JWT-based login, registration with role selection, logout, and persisted sessions.
- **User Dashboard**: Wallet overview, deposit, withdraw, send money, transaction history, and profile management.
- **Agent Dashboard**: Cash-in/out management, transaction tracking, and profile management.
- **Admin Dashboard**: Overview of users, agents, transactions, filtering, charts, and profile management.
- **Advanced Features**: Data visualization (charts/cards), search & filters, pagination, guided tour, toast notifications, light/dark mode, and responsive design.

---

## 💻 Tech Stack

**Frontend:**
- React 18 + TypeScript
- React Router DOM
- Redux Toolkit + RTK Query
- Tailwind CSS (styling)
- Recharts (charts & data visualization)
- react-toastify (notifications)
- react-joyride (guided tours)
- Axios

**Backend (API):**
- Node.js + Express
- MongoDB + Mongoose
- JWT + bcrypt for authentication

---

## ⚡ Features

### Public Pages
- Home, About, Features, Contact, FAQ
- Responsive hero banner and footer
- Skeleton loaders and smooth transitions

### Authentication
- Role-based login and registration (User/Agent)
- JWT authentication with persisted sessions
- Logout functionality

### User Dashboard
- Wallet overview with balance and quick actions
- Deposit, withdraw, send money
- Transaction history with filters and pagination
- Profile management

### Agent Dashboard
- Cash-in/out overview
- Add/Withdraw money to/from user wallets
- View all transactions handled by the agent
- Profile management

### Admin Dashboard
- Overview of total users, agents, transactions, and volume
- Manage users and agents (approve, block/unblock)
- Transaction management with advanced filters
- Data visualization: cards, bar charts, tables
- Profile management

### General Features
- Role-based navigation
- Loading indicators and global error handling
- Form validation for numeric inputs and positive amounts
- Toast notifications for success/error messages
- Light/Dark mode toggle
- Fully responsive and accessible design

---

## 📦 Installation

1. Clone the repository:

```bash
git clone https://github.com/Ananna-Datta/CashTaka-Frontend.git
cd CashTaka-Frontend
