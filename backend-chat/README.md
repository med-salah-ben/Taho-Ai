AI Chatbot - Backend (FastAPI + PostgreSQL)

📌 Project Overview

This is the backend for the AI Chatbot project, built with FastAPI, PostgreSQL, and WebSockets. It provides authentication, real-time AI chat functionality, and data storage.

🚀 Features

✅ FastAPI-based REST API for AI chat interactions✅ WebSockets for real-time messaging✅ JWT Authentication using FastAPI & OAuth2✅ Database: PostgreSQL with SQLAlchemy ORM✅ CORS Support for frontend communication

📂 Project Structure

backend-chat/
│-- backend/
│   │-- main.py        # FastAPI entry point
│   │-- database.py    # Database connection setup
│   │-- models.py      # SQLAlchemy ORM models
│   │-- routers/
│   │   │-- chat.py    # WebSocket chat functionality
│   │   │-- auth.py    # Authentication (JWT-based login/logout)
│   │   │-- cors.py    # CORS configuration
│-- .env               # Environment variables
│-- requirements.txt   # Python dependencies
│-- README.md          # Backend documentation

🔧 Installation & Setup

1️⃣ Clone the Repository

git clone https://github.com/med-salah-ben/Taho-Ai/blob/master/backend-chat
cd ai-chatbot-backend

2️⃣ Create a Virtual Environment

python -m venv venv
source venv/bin/activate  # macOS/Linux
venv\Scripts\activate    # Windows

3️⃣ Install Dependencies

pip install -r requirements.txt

4️⃣ Configure Environment Variables

Create a .env file and set up the following variables:

DATABASE_URL=postgresql://user:password@localhost:5432/ai_chatbot
SECRET_KEY=supersecretkey
REFRESH_SECRET_KEY=superrefreshkey

5️⃣ Apply Database Migrations

python -c "from database import Base, engine; Base.metadata.create_all(bind=engine)"

6️⃣ Start the FastAPI Server

uvicorn backend.main:app --reload --host 0.0.0.0 --port 8000

🔹 API Documentation: http://localhost:8000/docs

