from pydantic import BaseModel

class Token(BaseModel):
    data: str