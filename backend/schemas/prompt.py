from pydantic import BaseModel
from typing import Literal

class Form_Submission(BaseModel):
    Patient_ID: str
    Name: str
    Age: int
    Sex: Literal["Male", "Female"]
    Reason_For_Visit: str
    ICD10_Code: str
    Treatment: str
    Outcome: Literal["Admitted", "Outpatient", "ICU", "Discharged"]