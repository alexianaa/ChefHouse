import uvicorn
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List

from routers import user
from routers import receitas
from routers import auth

app = FastAPI(debug=True)

origins = [
  'http://localhost:5173'
]

app.add_middleware(
  CORSMiddleware,
  allow_origins=origins,
  allow_credentials=True,
  allow_methods=["*"],
  allow_headers=["*"],
)

@app.get("/")
def welcome():
  return 'welcome'

app.include_router(user.router, prefix="/usuarios")
app.include_router(receitas.router, prefix="/receitas")
app.include_router(auth.router, prefix="/auth")

if __name__ == '__main__':
  uvicorn.run("main:app", host="localhost", port=8000, reload=True)