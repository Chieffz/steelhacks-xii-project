from fastapi import APIRouter

from ..schemas import user_schema
from ..services import auth_service

router = APIRouter()

@router.get("/")
async def root():
    return {"Auth Service: " : "Running"}

@router.post("/verify/{token}")
def verify_token(token):
    return auth_service.firebase_verification(token) == True