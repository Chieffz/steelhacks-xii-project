from pydantic import BaseModel
from typing import Literal

class Form_Submission(BaseModel):
    Patient_ID: str
    Name: str
    Age: int
    Sex: Literal["Male", "Female"]
    Reason_For_Visit: str
    Injury_Type: str
    ICD10_Code: str
    Treatment: str
    Outcome: str