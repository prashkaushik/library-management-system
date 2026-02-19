# 📚 Library Management System (LMS)

A Full Stack Library Management System built using **React, Node.js, Express, and MongoDB**.

This project allows administrators to manage books, movies, users, and memberships, while users can issue and return books, pay fines, and track their borrowing history.

---

## 🚀 Tech Stack

### Frontend
- React (Vite)
- React Router
- Axios
- Custom CSS

### Backend
- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT Authentication
- bcryptjs

---

## 🔐 Authentication & Authorization

- User Registration
- User Login
- Password Hashing using bcrypt
- JWT Token-based Authentication
- Role-Based Access Control (Admin / User)
- Protected Routes

---

## 📚 Book Management

### Admin Features
- Add Books
- Update Books
- Delete Books
- View All Books
- Track Book Availability

### User Features
- View Available Books
- Issue Books
- Return Books
- View Issue History

---

## 🎬 Movie Management

### Admin
- Add Movies
- Update Movies
- Delete Movies
- View All Movies

---

## 🔁 Issue & Return System

- Users issue books with a selected return date
- Book availability decreases automatically
- On return:
  - Availability increases
  - Status changes to returned
  - Fine is calculated if overdue

---

## 💰 Fine System

- Fine Calculation: ₹10 per day (for late returns)
- Fine displayed in user dashboard
- Fine payment option
- Fine Paid status tracking

---

## 👥 Membership System

Admin can:
- Create membership plans (Basic, Premium, etc.)
- Set:
  - Membership duration
  - Maximum books allowed

Users:
- Are assigned membership by Admin
- Can issue books based on membership limit

Example:
- Basic → 1 Book
- Premium → 5 Books

---

## 📊 Admin Reports

- View Active Issues
- View Overdue Returns
- View User Borrowing Records
- Manage User Memberships

---

## 🏗 Project Structure

LMS/
│
├── backend/
│ ├── models/
│ ├── controllers/
│ ├── routes/
│ ├── middleware/
│ └── server.js
│
├── frontend/
│ ├── pages/
│ ├── components/
│ ├── context/
│ └── src/
│
└── README.md

---

## ⚙️ Installation & Setup

### 1️⃣ Clone Repository

```bash
git clone https://github.com/prashkaushik/library-management-system


2️⃣ Backend Setup
cd backend
npm install

MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
PORT=5000

Start backend server:

npm run dev

3️⃣ Frontend Setup
cd frontend
npm install
npm run dev