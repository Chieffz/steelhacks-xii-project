from typing import Annotated
from ..schemas import user_schema

## Handle logging in with firebase with this function
async def firebase_login(user: user_schema.User):
    return "temp log in feature"

async def firebase_register(new_user: user_schema.RegisterUser):
    return "temp register feature"