# Glimmer Technical Challenge

## Overview

Build a simple **Task Manager application** with a React frontend and an Express + PostgreSQL backend.

This challenge is designed to evaluate your ability to:

- Design and implement a REST API
- Work with a PostgreSQL database
- Build a simple frontend that consumes an API
- Write clean, maintainable code

## ⏱ Time Expectation

This challenge is designed to take **3–5 hours**.

You are not expected to build a production-ready app. Focus on clarity and correctness.

## 🧱 Tech Stack

- Frontend: React
- Backend: Node.js + Express
- Database: PostgreSQL

## 📦 Project Structure

A starter repository is provided with the following structure:

```
/backend
/frontend
README.md
```

You are free to organize code inside these folders as you see fit.

## 🖥 Backend Requirements

### Task Model

Each task should have:

- id (number)
- title (string, required)
- description (string, optional)
- completed (boolean)
- created_at (timestamp)

### API Endpoints

Implement the following endpoints:

- `GET /tasks` → return all tasks
- `POST /tasks` → create a new task
- `PUT /tasks/:id` → update a task
- `DELETE /tasks/:id` → delete a task

### Expectations

- Use PostgreSQL
- Provide a SQL schema or migration file
- Implement basic validation (e.g., title cannot be empty)
- Handle errors properly

## 🎨 Frontend Requirements

Build a simple UI that allows users to:

- View all tasks
- Create a new task
- Mark a task as completed
- Delete a task

### Notes

- UI does not need to be visually polished
- Focus on functionality and clarity

## ⭐ Bonus (Optional)

You may implement any of the following if time allows:

- Edit task
- Filter tasks (completed / pending)
- Add due date
- Pagination or search on backend
- Use TypeScript
- Add tests
- Docker setup

## 📄 Deliverables

Please submit:

- A GitHub repository
- A README including setup instructions

## 🚀 Getting Started (Starter Repo)

### Backend

```
cd backend
npm install
npm run dev
```

### Frontend

```
cd frontend
npm install
npm start
```

## Good luck! 🚀

We’re looking forward to seeing your solution.
