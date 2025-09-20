from pydantic import BaseModel

class User(BaseModel):
    id: int | None
    email: str
    password: str

class RegisterUser(BaseModel):
    email: str
    password: str