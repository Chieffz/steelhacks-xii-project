from typing import Annotated
from ..schemas import user_schema, prompt
import json

import requests

def submit_agent_prompt(submission: prompt.Form_Submission):
    patient_info = submission.model_dump()
    agent_url = "https://api.vogent.ai/api/dials"
    agent_prompt = (
        f"You are Sarah from ABC Medical Group. You are calling the insurance company for a prior authorization regarding the following patient:\n"
        f"- Name: {patient_info['Name']}\n"
        f"- Patient ID: {patient_info['Patient_ID']}\n"
        f"- Age: {patient_info['Age']}\n"
        f"- Sex: {patient_info['Sex']}\n"
        f"- Reason for Visit: {patient_info['Reason_For_Visit']}\n"
        f"- Injury/Diagnosis: {patient_info['Injury_Type']}\n"
        f"- ICD-10 Code: {patient_info['ICD10_Code']}\n"
        f"- Treatment: {patient_info['Treatment']}\n"
        f"- Outcome: {patient_info['Outcome']}\n\n"
        "Your objectives are:\n"
        "1. Provide the insurer with all patient and treatment details above.\n"
        "2. Request prior authorization approval.\n"
        "3. Record the approval number or note if the request is denied.\n\n"
        "If asked for details, always give the full information from the variables.\n"
        "Do not end the call until you have the authorization status.\n"
        "At the end of the call, say 'thank you' and hang up <|hangup|>."
    )

    call_agent_input = {
    "doctor_name": "John Smith, M.D.",
    "practice_name": "Springfield Family Clinic",
    "provider_npi": "1234567890",
    "provider_phone": "412-555-1212",
    "patient_name": patient_info["Name"],
    "patient_dob": "N/A",  # DOB not present in mock data
    "patient_id": patient_info["Patient_ID"],
    "patient_plan": "N/A",  # Plan not present in mock data
    "procedure_name": patient_info["Treatment"],
    "procedure_code": "N/A",  # Not present in mock data
    "diagnosis": patient_info["Injury_Type"],
    "diagnosis_code": patient_info["ICD10_Code"],
    "date_of_service": "2025-10-01",
    "prompt": agent_prompt  # Use 'prompt' key for agent instructions
}

    payload = {
        "fromNumberId": "794fb43b-e023-47d0-8654-e60e0c71704e",  # Your Vogent number ID
        "toNumber": "+18147466214",  # The phone number to call (user input)
        "aiVoiceId": "94c32748-865f-42e1-bb1a-3a6b4abc7d11",     # AI voice ID from Vogent voice library
        "callAgentId": "531155fb-e90d-4f35-80eb-da702ae93108",   # Your custom agent ID
        "versionedModelId": "a5948367-62d5-42be-a2df-6a2ee632d049", # Your model version ID
        "callAgentInput": call_agent_input  # Structured call details
    }

    headers = {
        "Authorization": f"Bearer elto_DfXARu0I6uEEENntZkWvoCIkQPodVvjA",
        "Content-Type": "application/json"
    }
    try:
        response = requests.post(agent_url, headers=headers, data=json.dumps(payload))
        response.raise_for_status()  # Raise error for bad HTTP status
        data = response.json()  # Parse JSON response
        print("Call triggered successfully!")
        return data
    except requests.exceptions.HTTPError as errh:
        print(f"HTTP error: {errh}")
        if errh.response is not None:
            print(errh.response.text)
    except requests.exceptions.RequestException as err:
        print(f"Request error: {err}")