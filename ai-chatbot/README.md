AI Chatbot - Frontend (Next.js + TypeScript)

📌 Project Overview

This is the frontend of the AI Chatbot project, built with Next.js 14+, TypeScript, TailwindCSS, and ShadCN. It provides a ChatGPT-style UI and communicates with the backend via WebSockets and REST APIs.

🚀 Features

✅ Real-time AI chat via WebSockets✅ NextAuth.js authentication (JWT-based)✅ ChatGPT-like UI using TailwindCSS & ShadCN✅ Protected routes for authenticated users✅ Optimized WebSocket connection for smooth communication

📂 Project Structure

ai-chatbot-frontend/
│-- app/            # Next.js App Router
│   │-- api/auth/   # NextAuth API
│   │-- global.css  # Global styles
│   │-- layout.tsx  # Root Layout with SessionProvider
│   │-- page.tsx    # Main Chat UI
│
│-- components/     # UI Components
│   │-- ChatBox.tsx
│   │-- MessageBubble.tsx
│
│-- utils/          # Utility functions
│   │-- websocket.ts # WebSocket client logic
│
│-- public/         # Static assets
│-- .env.local      # Environment variables
│-- next.config.js  # Next.js configuration
│-- tailwind.config.js  # TailwindCSS configuration
│-- tsconfig.json   # TypeScript configuration
│-- package.json    # Dependencies and scripts
│-- README.md       # Project documentation

🔧 Installation & Setup

1️⃣ Clone the Repository

git clone https://github.com/med-salah-ben/Taho/ai-chatbot-frontend.git
cd ai-chatbot-frontend

2️⃣ Install Dependencies

npm install  # or yarn install

3️⃣ Configure Environment Variables

Create a .env.local file and set up your API & Auth variables:

NEXT_PUBLIC_API_URL=http://localhost:8000  # Backend FastAPI URL
NEXTAUTH_URL=http://localhost:3000  # Next.js Auth URL
NEXTAUTH_SECRET=your_secret_key

4️⃣ Run the Development Server

npm run dev  # Runs on http://localhost:3000

