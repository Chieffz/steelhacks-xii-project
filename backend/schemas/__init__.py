from datetime import datetime

from pydantic import BaseModel

class Response_Form(BaseModel):
    id: int
    name: str
    date_of_birth: datetime | None
    illness: str
    