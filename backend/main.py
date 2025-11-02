from fastapi import FastAPI, Depends, Body, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from sqlmodel import Session, select
from sqlalchemy import select as sa_select
from sqlalchemy import and_, or_
import os
import requests
from dotenv import load_dotenv
from models import Ingredient, Category, RecipeTag, YouTubeChannel,Recipe
from database import create_db, get_session
from typing import List, Optional
from pydantic import BaseModel
from fastapi.encoders import jsonable_encoder

load_dotenv()
YOUTUBE_API_KEY = os.getenv("YOUTUBE_API_KEY")

app = FastAPI()





app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:3000",
        "https://recipe-app-frontend-kappa.vercel.app"
    ],  # ReactのURL（末尾スラッシュなしで統一）
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def read_root():
    return {"message": "Hello from FastAPI!"}


###
## API
###

## Read （取得）　　GETメソッド
# フロントエンドでAPIを同時取得するため個別に定義

@app.get("/api/ingredients")
def read_ingredients(session: Session = Depends(get_session)):
    ingredients = session.exec(select(Ingredient)).all()
    return ingredients

@app.get("/api/categories")
def read_categories(session: Session = Depends(get_session)):
    categories = session.exec(select(Category)).all()
    return categories

@app.get("/api/recipe_tags")
def read_recipe_tags(session: Session = Depends(get_session)):
    tags = session.exec(select(RecipeTag)).all()
    return tags

@app.get("/api/youtube_channels")
def read_youtube_channels(session: Session = Depends(get_session)):
    channels = session.exec(select(YouTubeChannel)).all()
    return channels

@app.get("/api/recipes")
def read_recipes(
    ingredients: Optional[str] = None,
    category: Optional[int] = None,
    tag_ids: Optional[str] = None,
    youtube_channel_id: Optional[int] = None,
    session: Session = Depends(get_session),
):
    query = select(Recipe)
    if category:
        query = query.where(Recipe.category_id == category)
    if youtube_channel_id:
        query = query.where(Recipe.youtube_channel_id == youtube_channel_id)
    recipes = session.exec(query).all()
    # 食材フィルタ（全て含む場合のみヒット）
    if ingredients:
        ingredient_ids = [int(i) for i in ingredients.split(",") if i]
        if ingredient_ids:
            filtered = []
            for recipe in recipes:
                recipe_ing_ids = [ing.id for ing in recipe.ingredients]
                if all(i in recipe_ing_ids for i in ingredient_ids):
                    filtered.append(recipe)
            recipes = filtered
    # タグフィルタ（全て含む場合のみヒット）
    if tag_ids:
        tag_id_list = [int(i) for i in tag_ids.split(",") if i]
        if tag_id_list:
            filtered = []
            for recipe in recipes:
                recipe_tag_ids = [tag.id for tag in recipe.tags] if recipe.tags else []
                if all(tid in recipe_tag_ids for tid in tag_id_list):
                    filtered.append(recipe)
            recipes = filtered
    result = []
    for recipe in recipes:
        data = jsonable_encoder(recipe)
        data["ingredients"] = [jsonable_encoder(ing) for ing in recipe.ingredients] if recipe.ingredients else []
        data["category"] = jsonable_encoder(recipe.category) if recipe.category else None
        data["youtube_channel"] = jsonable_encoder(recipe.youtube_channel) if recipe.youtube_channel else None
        data["tags"] = [jsonable_encoder(tag) for tag in recipe.tags] if recipe.tags else []
        result.append(data)
    return result

@app.get("/api/recipes/{recipe_id}")
def read_recipe_detail(recipe_id: int, session: Session = Depends(get_session)):
    recipe = session.get(Recipe, recipe_id)
    if not recipe:
        raise HTTPException(status_code=404, detail="Recipe not found")
    # ingredients, categoryも含めて返す
    data = jsonable_encoder(recipe)
    # ingredients, categoryを明示的に追加
    data["ingredients"] = [jsonable_encoder(ing) for ing in recipe.ingredients] if recipe.ingredients else []
    data["category"] = jsonable_encoder(recipe.category) if recipe.category else None
    data["youtube_channel"] = jsonable_encoder(recipe.youtube_channel) if recipe.youtube_channel else None
    data["tags"] = [jsonable_encoder(tag) for tag in recipe.tags] if recipe.tags else []
    return data

## Create (新規作成) POSTメソッド
class RecipeCreateRequest(BaseModel):
    name: str
    url: str
    thumbnail: str
    notes: Optional[str] = None
    ingredient_ids: List[int]
    category_id: Optional[int] = None
    youtube_channel_id: Optional[int] = None
    tag_ids: List[int] = []

class RecipeResponse(BaseModel):
    id: int
    name: str
    url: str
    thumbnail: str
    notes: Optional[str]
    created_at: str
    ingredients: List[dict]
    category: Optional[dict]
    tags: List[dict]
    youtube_channel: Optional[dict]


@app.post("/api/recipes")
def create_recipe(req: RecipeCreateRequest, session: Session = Depends(get_session)):
    recipe = Recipe(
        name=req.name,
        url=req.url,
        thumbnail=req.thumbnail,
        notes=req.notes,
        category_id=req.category_id,
        youtube_channel_id=req.youtube_channel_id,
    )
    # タグの関連付け
    if req.tag_ids:
        tags = session.exec(select(RecipeTag)).all()
        recipe.tags = [tag for tag in tags if tag.id in req.tag_ids]
    # 食材の関連付け
    if req.ingredient_ids:
        ingredients = session.exec(select(Ingredient)).all()
        recipe.ingredients = [ing for ing in ingredients if ing.id in req.ingredient_ids]
    session.add(recipe)
    try:
        session.commit()
    except Exception as e:
        from sqlalchemy.exc import IntegrityError
        if isinstance(e, IntegrityError) and 'unique constraint' in str(e).lower():
            session.rollback()
            raise HTTPException(status_code=409, detail="同じ名前のレシピが既に存在します")
        else:
            session.rollback()
            raise
    session.refresh(recipe)
    return recipe


# --- 共通関数 ---
def get_or_create_youtube_channel(channel_id: str, session: Session):
    """
    YouTubeチャンネルIDからDBのYouTubeChannelを取得。なければAPIから情報取得しDB登録。
    戻り値: (db_channel_id, channel_icon_url, channel_title, channel_url)
    """
    channel_icon_url = None
    channel_title = None
    channel_url = f"https://www.youtube.com/channel/{channel_id}"
    db_channel_id = None
    # DBに既存チャンネルがあるか
    db_channel = session.exec(select(YouTubeChannel).where(YouTubeChannel.url == channel_url)).first()
    if db_channel:
        return db_channel.id, db_channel.thumbnail, db_channel.name, db_channel.url
    # なければAPIで取得
    channel_params = {
        "part": "snippet",
        "id": channel_id,
        "key": YOUTUBE_API_KEY,
    }
    channel_resp = requests.get("https://www.googleapis.com/youtube/v3/channels", params=channel_params)
    channel_data = channel_resp.json()
    channel_items = channel_data.get("items", [])
    if channel_items:
        channel_snippet = channel_items[0]["snippet"]
        channel_icon_url = channel_snippet["thumbnails"]["default"]["url"]
        channel_title = channel_snippet["title"]
        db_channel = YouTubeChannel(
            name=channel_title,
            url=channel_url,
            thumbnail=channel_icon_url
        )
        session.add(db_channel)
        session.commit()
        session.refresh(db_channel)
        db_channel_id = db_channel.id
        return db_channel_id, channel_icon_url, channel_title, channel_url
    return None, None, None, channel_url

# YouTube動画情報取得API
@app.post("/api/youtube/video")
def fetch_youtube_video(video_url: str = Body(..., embed=True), session: Session = Depends(get_session)):
    import re
    # 動画ID抽出
    patterns = [
        r"youtu\.be/([\w-]+)",
        r"v=([\w-]+)",
        r"embed/([\w-]+)",
        r"/v/([\w-]+)",
    ]
    video_id = None
    for pat in patterns:
        m = re.search(pat, video_url)
        if m:
            video_id = m.group(1)
            break
    if not video_id:
        return {"error": "Invalid YouTube URL"}
    # videos APIで動画情報取得
    params = {
        "part": "snippet",
        "id": video_id,
        "key": YOUTUBE_API_KEY,
    }
    r = requests.get("https://www.googleapis.com/youtube/v3/videos", params=params)
    data = r.json()
    items = data.get("items", [])
    if not items:
        return {"error": "Video not found"}
    snippet = items[0]["snippet"]
    channel_id = snippet.get("channelId")
    db_channel_id, channel_icon_url, channel_title, channel_url = (None, None, None, None)
    if channel_id:
        db_channel_id, channel_icon_url, channel_title, channel_url = get_or_create_youtube_channel(channel_id, session)
    result = {
        "videoId": video_id,
        "title": snippet["title"],
        "description": snippet.get("description", ""),
        "thumbnail": snippet["thumbnails"]["default"]["url"],
        "url": f"https://www.youtube.com/watch?v={video_id}",
        "channelTitle": snippet["channelTitle"],
        "channelIcon": channel_icon_url,
        "channelId": channel_id,
        "dbChannelId": db_channel_id
    }
    return result

# YouTubeプレイリストから動画情報を取得
@app.post("/api/youtube/playlist")
def fetch_youtube_playlist(playlist_url: str = Body(..., embed=True), session: Session = Depends(get_session)):
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
        items.extend(data.get("items", []))
        nextPageToken = data.get("nextPageToken")
        if not nextPageToken:
            break
    # 必要な情報を整形
    result = []
    for item in items:
        snippet = item["snippet"]
        channel_id = snippet.get("channelId")
        db_channel_id, channel_icon_url, channel_title, channel_url = (None, None, None, None)
        if channel_id:
            db_channel_id, channel_icon_url, channel_title, channel_url = get_or_create_youtube_channel(channel_id, session)
        result.append({
            "videoId": snippet["resourceId"]["videoId"],
            "title": snippet["title"],
            "description": snippet.get("description", ""),
            "thumbnail": snippet["thumbnails"]["default"]["url"],
            "url": f"https://www.youtube.com/watch?v={snippet['resourceId']['videoId']}",
            "channelTitle": snippet.get("channelTitle", ""),
            "channelIcon": channel_icon_url,
            "channelId": channel_id,
            "dbChannelId": db_channel_id
        })
    return result




@app.post("/api/recipes/bulk")
def bulk_add_recipes(recipes: List[RecipeCreateRequest], session: Session = Depends(get_session)):
    for req in recipes:
        recipe = Recipe(
            name=req.name,
            url=req.url,
            thumbnail=req.thumbnail,
            notes=req.notes,
            category_id=req.category_id,
            youtube_channel_id=req.youtube_channel_id,
            tags=req.tags,
        )
        if req.ingredient_ids:
            ingredients = session.exec(select(Ingredient)).all()
            recipe.ingredients = [ing for ing in ingredients if ing.id in req.ingredient_ids]
        session.add(recipe)
    session.commit()
    return {"count": len(recipes)}

## Update (更新)  PUTメソッド
@app.put("/api/ingredients/{ingredient_id}")
def update_ingredient(ingredient_id: int, updated: Ingredient, session: Session = Depends(get_session)):
    ingredient = session.get(Ingredient, ingredient_id)  # GETメソッドで取得
    if not ingredient:
        raise HTTPException(status_code=404, detail="食材が見つかりません")
    for field, value in updated.model_dump(exclude_unset=True).items():
        setattr(ingredient, field, value)  # クライアントから送られた更新データだけを既存のデータに反映する処理
    session.add(ingredient)  # 変更をセッションに追加
    session.commit() # データベースにコミット
    session.refresh(ingredient) # 最新の状態に更新
    return ingredient

@app.put("/api/categories/{category_id}")
def update_category(category_id: int, updated: Category, session: Session = Depends(get_session)):
    category = session.get(Category, category_id)
    if not category:
        raise HTTPException(status_code=404, detail="カテゴリーが見つかりません")
    for field, value in updated.model_dump(exclude_unset=True).items():
        setattr(category, field, value)
    session.add(category)
    session.commit()
    session.refresh(category)
    return category

@app.put("/api/youtube_channels/{youtube_channel_id}")
def update_youtube_channel(youtube_channel_id: int, updated: YouTubeChannel, session
    : Session = Depends(get_session)):
    channel = session.get(YouTubeChannel, youtube_channel_id)
    if not channel:
        raise HTTPException(status_code=404, detail="YouTubeチャンネルが見つかりません")
    for field, value in updated.model_dump(exclude_unset=True).items():
        setattr(channel, field, value)
    session.add(channel)
    session.commit()
    session.refresh(channel)
    return channel

@app.put("/api/recipe_tags/{recipe_tag_id}")
def update_recipe_tag(recipe_tag_id: int, updated: RecipeTag, session: Session =
    Depends(get_session)):
    tag = session.get(RecipeTag, recipe_tag_id)
    if not tag:
        raise HTTPException(status_code=404, detail="タグが見つかりません")
    for field, value in updated.model_dump(exclude_unset=True).items():
        setattr(tag, field, value)
    session.add(tag)
    session.commit()
    session.refresh(tag)
    return tag

@app.put("/api/recipes/{recipe_id}")
def update_recipe(recipe_id: int, updated: Recipe, session: Session = Depends(get_session)):
    recipe = session.get(Recipe, recipe_id)
    if not recipe:
        raise HTTPException(status_code=404, detail="レシピが見つかりません")
    for field, value in updated.model_dump(exclude_unset=True).items():
        setattr(recipe, field, value)
    session.add(recipe)
    session.commit()
    session.refresh(recipe)
    return recipe

## Delete (削除) DELETEメソッド
@app.delete("/api/ingredients/{ingredient_id}")
def delete_ingredient(ingredient_id: int, session: Session = Depends(get_session)):
    ingredient = session.get(Ingredient, ingredient_id)
    if not ingredient:
        raise HTTPException(status_code=404, detail="食材が見つかりません")
    session.delete(ingredient)
    session.commit()
    return {"ok": True}

@app.delete("/api/categories/{category_id}")
def delete_category(category_id: int, session: Session = Depends(get_session)):
    category = session.get(Category, category_id)
    if not category:
        raise HTTPException(status_code=404, detail="カテゴリーが見つかりません")
    session.delete(category)
    session.commit()
    return {"ok": True}

@app.delete("/api/youtube_channels/{youtube_channel_id}")
def delete_youtube_channel(youtube_channel_id: int, session: Session = Depends(get_session)):
    channel = session.get(YouTubeChannel, youtube_channel_id)
    if not channel:
        raise HTTPException(status_code=404, detail="YouTubeチャンネルが見つかりません")
    session.delete(channel)
    session.commit()
    return {"ok": True}

@app.delete("/api/recipe_tags/{recipe_tag_id}")
def delete_recipe_tag(recipe_tag_id: int, session: Session = Depends(get_session)):
    tag = session.get(RecipeTag, recipe_tag_id)
    if not tag:
        raise HTTPException(status_code=404, detail="タグが見つかりません")
    session.delete(tag)
    session.commit()
    return {"ok": True}

@app.delete("/api/recipes/{recipe_id}")
def delete_recipe(recipe_id: int, session: Session = Depends(get_session)):
    recipe = session.get(Recipe, recipe_id)
    if not recipe:
        raise HTTPException(status_code=404, detail="レシピが見つかりません")
    session.delete(recipe)
    session.commit()
    return {"ok": True}