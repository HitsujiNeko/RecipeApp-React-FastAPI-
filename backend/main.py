from fastapi import FastAPI, Depends
from fastapi.middleware.cors import CORSMiddleware
from sqlmodel import Session, select

from models import Ingredient, Category, Recipe
from database import create_db, get_session


app = FastAPI()


# メモ：↓　残しておいて問題ない 既にテーブルがある場合は作成しないため
create_db()


app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],  # ReactのURL
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def read_root():
    return {"message": "Hello from FastAPI!"}



### API

## GET（取得）メソッド
# フロントエンドでAPIを同時取得するため個別に定義

@app.get("/api/ingredients")
def read_ingredients(session: Session = Depends(get_session)):
    ingredients = session.exec(select(Ingredient)).all()
    return ingredients

@app.get("/api/categories")
def read_categories(session: Session = Depends(get_session)):
    categories = session.exec(select(Category)).all()
    return categories

@app.get("/api/recipes")
def read_recipes(session: Session = Depends(get_session)):
    recipes = session.exec(select(Recipe)).all()
    return recipes

## POST(新規作成)メソッド

@app.post("/api/recipes")
def create_recipe(recipe: Recipe, session: Session = Depends(get_session)):
    session.add(recipe)
    session.commit()
    session.refresh(recipe)
    return recipe