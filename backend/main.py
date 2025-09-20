from typing import Union

from fastapi import FastAPI

from .endpoints import form_response

app = FastAPI()

app.include_router(form_response.router,
                   prefix="/form",
                   tags=["frontend form"])

@app.get("/")
async def root():
    return {"Welcome to:": "Prior Authorization Callback System"}