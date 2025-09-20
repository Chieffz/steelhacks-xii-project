from fastapi import APIRouter

from ..schemas import user_schema
from ..services import auth_service

router = APIRouter()

@router.get("/")
async def root():
    return {"Auth Service: " : "Running"}

@router.post("/login")
async def login(user: user_schema.User):
    return auth_service.firebase_login(user)

@router.post("register")
async def register(new_user: user_schema.RegisterUser):
    return auth_service.firebase_register(new_user)