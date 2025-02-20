from fastapi import FastAPI
from routers import chat
# from routers import auth
from routers.cors import setup_cors  # Import the function instead of a router

from database import engine, Base
from dotenv import load_dotenv

load_dotenv()

# Initialize database
Base.metadata.create_all(bind=engine)

app = FastAPI()

# Apply CORS Middleware
setup_cors(app)  # ✅ Proper way to add CORS

# Include routers
app.include_router(chat.router)
# app.include_router(auth.router)

@app.get("/")
def read_root():
    return {"message": "AI Chatbot API is running"}
