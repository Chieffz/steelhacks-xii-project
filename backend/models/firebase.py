from firebase_admin import credentials, firestore, auth, initialize_app
import os

script_dir = os.path.dirname(os.path.abspath(__file__))  # folder of the script
cred_path = os.path.join(script_dir, "steelhacksxii-firebase-adminsdk-fbsvc-f6de888a58.json")
cred = credentials.Certificate(cred_path)
initialize_app(cred)

def decode_token(token: str):
    return auth.verify_id_token(token)