from sqlalchemy import Column, Integer, String, Text, ForeignKey, Table, DateTime
from sqlalchemy.orm import relationship
from datetime import datetime
from database import Base

# 中間テーブル（レシピ×食材）
recipe_ingredients = Table(
    "recipe_ingredients",
    Base.metadata,
    Column("id", Integer, primary_key=True),
    Column("recipe_id", Integer, ForeignKey("recipes.id")),
    Column("ingredient_id", Integer, ForeignKey("ingredients.id")),
)

# 中間テーブル（レシピ×カテゴリ）
recipe_categories = Table(
    "recipe_categories",
    Base.metadata,
    Column("id", Integer, primary_key=True),
    Column("recipe_id", Integer, ForeignKey("recipes.id")),
    Column("category_id", Integer, ForeignKey("categories.id")),
)

class Ingredient(Base):
    __tablename__ = "ingredients"
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String(100), unique=True, nullable=False)
    reading = Column(String(100), nullable=False)
    type = Column(String(50), nullable=False)

class Category(Base):
    __tablename__ = "categories"
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String(100), unique=True, nullable=False)

class Recipe(Base):
    __tablename__ = "recipes"
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String(100), unique=True, nullable=False)
    url = Column(String(255), unique=True, nullable=False)
    thumbnail = Column(String(255))
    notes = Column(Text)
    created_at = Column(DateTime, default=datetime.utcnow)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)

    ingredients = relationship(
        "Ingredient",
        secondary=recipe_ingredients,
        backref="recipes"
    )
    categories = relationship(
        "Category",
        secondary=recipe_categories,
        backref="recipes"
    )