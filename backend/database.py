import os
from dotenv import load_dotenv
from sqlmodel import SQLModel, create_engine, Session

load_dotenv()

db_url = os.getenv("DATABASE_URL", "sqlite:///test.db")

engine = create_engine(
            db_url, 
            echo=True,
            pool_size=3,
            max_overflow=0,
            pool_recycle=1800,
        )

def create_db():
    SQLModel.metadata.create_all(engine)

def get_session():
    with Session(engine) as session:
        yield session

