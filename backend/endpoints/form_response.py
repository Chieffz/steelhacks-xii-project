from fastapi import APIRouter

router = APIRouter()

@router.get("/")
async def callback():
    return {"Attempt": "Success"}