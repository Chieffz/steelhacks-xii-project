from typing import Annotated
from ..schemas import user_schema
from ..models import firebase

## Handle logging in with firebase with this function
def firebase_verification(token: str):
    try:
        decoded_token = firebase.decode_token(token)

        return True
    except firebase.auth.InvalidIdTokenError:
        print("Token is invalid")
        return False
    except firebase.auth.ExpiredIdTokenError:
        print("Token has expired")
        return False
    except firebase.auth.RevokedIdTokenError:
        print("Token has been revoked")
        return False