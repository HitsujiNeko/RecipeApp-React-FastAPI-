start cmd /k "cd frontend && npm start"
start cmd /k "cd backend && call ..\.venv\Scripts\activate && uvicorn main:app --reload"