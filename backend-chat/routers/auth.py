from fastapi import APIRouter, Depends, HTTPException, status
from fastapi.security import OAuth2PasswordBearer, OAuth2PasswordRequestForm
from sqlalchemy.orm import Session
from database import get_db
# from backend.models import RevokedToken
from jose import jwt, JWTError
from passlib.context import CryptContext
from pydantic import BaseModel
import os
from datetime import datetime, timedelta

router = APIRouter()
SECRET_KEY = os.getenv("SECRET_KEY", "supersecretkey")
REFRESH_SECRET_KEY = os.getenv("REFRESH_SECRET_KEY", "superrefreshkey")
ALGORITHM = "HS256"
oauth2_scheme = OAuth2PasswordBearer(tokenUrl="/auth/token")
pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

# Dummy user database (replace with actual DB)
users_db = {
    "test@example.com": {"password": pwd_context.hash("password123")}
}

class TokenResponse(BaseModel):
    access_token: str
    token_type: str

def create_access_token(data: dict, expires_delta: timedelta):
    to_encode = data.copy()
    expire = datetime.utcnow() + expires_delta
    to_encode.update({"exp": expire})
    return jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)

@router.post("/api/login", response_model=TokenResponse)
def login(form_data: OAuth2PasswordRequestForm = Depends(), db: Session = Depends(get_db)):
    user = users_db.get(form_data.username)
    if not user or not pwd_context.verify(form_data.password, user["password"]):
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Invalid credentials")

    access_token = create_access_token({"sub": form_data.username}, timedelta(hours=1))
    return {"access_token": access_token, "token_type": "bearer"}
