from fastapi import FastAPI, Depends, Body
from fastapi.middleware.cors import CORSMiddleware
from sqlmodel import Session, select
import os
import requests
from dotenv import load_dotenv
from models import Ingredient, Category, Recipe
from database import create_db, get_session
load_dotenv()
YOUTUBE_API_KEY = os.getenv("YOUTUBE_API_KEY")

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



@app.post("/api/youtube/playlist")
def fetch_youtube_playlist(playlist_url: str = Body(..., embed=True)):
    # プレイリストID抽出
    import re
    match = re.search(r"[?&]list=([\w-]+)", playlist_url)
    if not match:
        return {"error": "Invalid playlist URL"}
    playlist_id = match.group(1)
    # playlistItems APIで動画ID一覧取得
    items = []
    nextPageToken = None
    while True:
        params = {
            "part": "snippet",
            "playlistId": playlist_id,
            "maxResults": 50,
            "key": YOUTUBE_API_KEY,
        }
        if nextPageToken:
            params["pageToken"] = nextPageToken
        r = requests.get("https://www.googleapis.com/youtube/v3/playlistItems", params=params)
        data = r.json()
        print(data)  # ← ここを追加
        items.extend(data.get("items", []))
        nextPageToken = data.get("nextPageToken")
        if not nextPageToken:
            break
    # 必要な情報を整形
    result = []
    for item in items:
        snippet = item["snippet"]
        result.append({
            "videoId": snippet["resourceId"]["videoId"],
            "title": snippet["title"],
            "description": snippet.get("description", ""),
            "thumbnail": snippet["thumbnails"]["default"]["url"],
            "url": f"https://www.youtube.com/watch?v={snippet['resourceId']['videoId']}"
        })
    return result

from typing import List

@app.post("/api/recipes/bulk")
def bulk_add_recipes(recipes: List[Recipe], session: Session = Depends(get_session)):
    for recipe in recipes:
        session.add(recipe)
    session.commit()
    return {"count": len(recipes)}