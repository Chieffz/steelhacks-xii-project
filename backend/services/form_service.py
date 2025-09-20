from typing import Annotated
from ..schemas import user_schema, prompt

from fastapi import Depends

def submit_agent_prompt(submission: prompt.Form_Submission):
    return "test"