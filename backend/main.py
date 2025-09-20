from typing import Union

from fastapi import FastAPI, Depends
from fastapi.security import HTTPAuthorizationCredentials, HTTPBearer

from .endpoints import form, auth

app = FastAPI()
security = HTTPBearer()

app.include_router(form.router,
                   prefix="/form",
                   tags=["frontend form"],
                   dependencies=[Depends(security)])
app.include_router(auth.router,
                   prefix="/auth",
                   tags=["auth"])

@app.get("/")
async def root():
    return {"Welcome to: ": "Prior Authorization Callback System"}