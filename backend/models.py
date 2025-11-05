from sqlmodel import SQLModel, Field, Relationship
from typing import List, Optional
from datetime import datetime

# 中間テーブル
class RecipeIngredientLink(SQLModel, table=True):
    recipe_id: int = Field(default=None, foreign_key="recipe.id", primary_key=True)
    ingredient_id: int = Field(default=None, foreign_key="ingredient.id", primary_key=True)

class RecipeTagLink(SQLModel, table=True):
    recipe_id: int = Field(default=None, foreign_key="recipe.id", primary_key=True)
    tag_id: int = Field(default=None, foreign_key="recipetag.id", primary_key=True)


# 個別のテーブル
class Ingredient(SQLModel, table=True):
    id: int | None = Field(default=None, primary_key=True)
    name: str
    reading: str = Field(max_length=20, description="食材の読み")
    type: str
    recipes: List["Recipe"] = Relationship(back_populates="ingredients", link_model=RecipeIngredientLink) # 多対多の関係

class Category(SQLModel, table=True):
    id: int | None = Field(default=None, primary_key=True)
    name: str
    recipes: List["Recipe"] = Relationship(back_populates="category") # 1対多の関係

class RecipeTag(SQLModel, table=True):
    id: int | None = Field(default=None, primary_key=True)
    name: str
    recipes: List["Recipe"] = Relationship(back_populates="tags", link_model=RecipeTagLink)  # 多対多の関係

class YouTubeChannel(SQLModel, table=True):
    id: int | None = Field(default=None, primary_key=True)
    name: str
    url: str
    thumbnail: str = Field(max_length=255, unique=True, description="チャンネルサムネイルのURL")
    recipes: List["Recipe"] = Relationship(back_populates="youtube_channel")  # 1対多の関係

class Recipe(SQLModel, table=True):
    id: int | None = Field(default=None, primary_key=True)
    name: str = Field(max_length=255, unique=True)
    url: str = Field(max_length=255, unique=True)
    thumbnail: str = Field(max_length=255, unique=True, description="サムネイル画像のURL")
    notes: str | None = Field(default=None, nullable=True)
    created_at: Optional[datetime] = Field(default_factory=datetime.utcnow)

    ingredients: List[Ingredient] = Relationship(back_populates="recipes",link_model=RecipeIngredientLink) # 多対多の関係

    category_id: Optional[int]= Field(default=None, foreign_key="category.id")
    category: Optional[Category] = Relationship(back_populates="recipes")  # 多対1の関係

    tags: List[RecipeTag] = Relationship(back_populates="recipes", link_model=RecipeTagLink)  # 多対多の関係

    youtube_channel_id: Optional[int] = Field(default=None, foreign_key="youtubechannel.id")
    youtube_channel: Optional[YouTubeChannel] = Relationship(back_populates="recipes")  # 多対1の関係










