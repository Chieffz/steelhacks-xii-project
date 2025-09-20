from fastapi import APIRouter, Depends
from fastapi.security import HTTPAuthorizationCredentials, HTTPBearer
from typing import Annotated

from ..schemas import prompt
from ..services import form_service, auth_service

router = APIRouter()
security = HTTPBearer()

@router.get("/")
async def callback():
    return {"Attempt": "Success"}

@router.post("/")
def start_process(submission: prompt.Form_Submission,
                        token: Annotated[HTTPAuthorizationCredentials, Depends(security)]):
    if auth_service.firebase_verification(token.credentials) != True:
        return "Invalid Token, please login again."
    return form_service.submit_agent_prompt(submission)