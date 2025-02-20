from fastapi import APIRouter, WebSocket, WebSocketDisconnect, Depends, HTTPException
from sqlalchemy.orm import Session
from database import get_db
from models import ChatSession, ChatMessage
from groq import Groq
import os
import asyncio
import logging

# Setup logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

router = APIRouter()
GROQ_API_KEY = os.getenv("GROQ_API_KEY")

if not GROQ_API_KEY:
    logger.error("GROQ_API_KEY is not set. Ensure the API key is properly configured.")

def get_groq_client():
    return Groq(api_key=GROQ_API_KEY)

@router.websocket("/ws/{session_id}")
async def websocket_endpoint(websocket: WebSocket, session_id: str, db: Session = Depends(get_db)):
    await websocket.accept()

    # Ensure session exists
    session = db.query(ChatSession).filter_by(session_id=session_id).first()
    if not session:
        session = ChatSession(session_id=session_id)
        db.add(session)
        db.commit()
        db.refresh(session)

    try:
        while True:
            data = await websocket.receive_text()
            logger.info(f"Received message from {session_id}: {data}")

            # Store user message in DB
            db.add(ChatMessage(session_id=session_id, sender="User", text=data))
            db.commit()

            # Fetch AI response asynchronously with timeout
            try:
                response = await asyncio.wait_for(fetch_groq_response(data), timeout=10.0)
            except asyncio.TimeoutError:
                response = "Server is busy. Please try again later."
                logger.warning(f"Groq response timeout for session {session_id}")

            # Store AI response in DB
            db.add(ChatMessage(session_id=session_id, sender="AI", text=response))
            db.commit()

            # Send AI response to client
            await websocket.send_text(response)

    except WebSocketDisconnect:
        logger.info(f"Client {session_id} disconnected")
    except Exception as e:
        logger.error(f"Error in WebSocket: {e}")
        await websocket.close()
    finally:
        # Ensure WebSocket is closed only if it's still open
        try:
            await websocket.close()
        except RuntimeError:
            pass 
        
async def fetch_groq_response(message: str) -> str:
    try:
        client = get_groq_client()
        response = await asyncio.wait_for(
            asyncio.to_thread(
                client.chat.completions.create,
                model="deepseek-r1-distill-qwen-32b",
                messages=[{"role": "user", "content": message}]
            ),
            timeout=5000
        )
        return response.choices[0].message.content
    except asyncio.TimeoutError:
        logger.error("Groq API request timed out after 8 seconds.")
        return "Request timed out. Please try again."
    except Exception as e:
        logger.error(f"Groq API Error: {e}")
        return "Sorry, something went wrong."

@router.get("/history/{session_id}")
def get_chat_history(session_id: str, db: Session = Depends(get_db)):
    chat_history = db.query(ChatMessage).filter_by(session_id=session_id).order_by(ChatMessage.timestamp.asc()).all()
    
    if not chat_history:
        raise HTTPException(status_code=404, detail="No chat history found")

    return [{"sender": msg.sender, "text": msg.text, "timestamp": msg.timestamp} for msg in chat_history]
