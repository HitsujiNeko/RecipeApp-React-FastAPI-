import React, { useState, useEffect } from "react";
import "./App.css";
import styles from "./components/App.module.css";
import Header from "./components/layout/Header";
import BottomNavigationbar from "./components/layout/BottomNavigationbar";

import HomeSection from "./components/pages/HomeSection";
import RecipeSuggestSection from "./components/pages/RecipeSuggestSection";
import RecipeAddSection from "./components/pages/RecipeAddSection";
import RecipeListSection from "./components/pages/RecipeListSection";
import RecipeDetailSection from "./components/pages/RecipeDetailSection";
import AdminDashboard from "./components/admin/AdminDashboard";
import PlaylistBulkAddSection from "./components/pages/PlaylistBulkAddSection";
import RecipeUpdateSection from "./components/pages/RecipeUpdateSection";
import { RecipeModel } from "./types/models";
import { useRecipes } from "./hooks/useRecipes";


function App() {
  const [nav, setNav] = useState("home");
  const [selectedRecipeId, setSelectedRecipeId] = useState<number | null>(null);
  const { recipes, loading, error, refetchRecipes } = useRecipes();

  useEffect(() => {
    const handler = () => setNav("playlist");
    window.addEventListener("navigateToPlaylist", handler);
    return () => window.removeEventListener("navigateToPlaylist", handler);
  }, []);

  let content;
  switch (nav) {
    case "suggest":
      content = <RecipeSuggestSection 
                    onRecipeClick={(id) =>{
                      setSelectedRecipeId(id);
                      setNav("detail")
                    }} 
                />;
      break;
    case "add":
      content = <RecipeAddSection refetchRecipes={refetchRecipes} />;
      break;
    case "list":
      content = <RecipeListSection 
                  recipes={recipes}
                  loading={loading}
                  error={error}
                  onRecipeClick={(id) =>{
                    setSelectedRecipeId(id);
                    setNav("detail")
                  }} 
                  refetchRecipes={refetchRecipes}
                 />;
      break;
    case "detail":
      content = selectedRecipeId !== null ? (
        <RecipeDetailSection 
          recipeId={ selectedRecipeId }
          setNav={setNav}
          setSelectedRecipeId={setSelectedRecipeId}
          refetchRecipes={refetchRecipes}
        />
      ) : (
        <div className="text-red-500 text-3xl font-bold">レシピが選択されていません</div>
      );
      break;
    case "home":
      content = <HomeSection setNav={setNav} />;
      break;
    case "admin":
      content = <AdminDashboard />;
      break;
    case "playlist":
      content = <PlaylistBulkAddSection recipes={recipes} refetchRecipes={refetchRecipes}/>;
      break;
    case "update":
      content = selectedRecipeId !== null ? (
        <RecipeUpdateSection
          recipeId={ selectedRecipeId }
          recipe={ recipes.find(r => r.id === selectedRecipeId)! }
          existingRecipes={ recipes }
          refetchRecipes={refetchRecipes}
        />
      ) : (
        <div className="text-red-500 text-3xl font-bold">レシピが選択されていません</div>
      );
      break;
    default:
      content = <RecipeSuggestSection 
                  onRecipeClick={(id) =>{
                    setSelectedRecipeId(id);
                    setNav("detail")
                  }} 
                />;
  }

  return (
    <div className={styles.appContainer}>
      <Header nav={nav} setNav={setNav} />
      <main>{content}</main>
      <BottomNavigationbar current={nav} onChange={(key) => setNav(key)} />
    </div>
  );
}

export default App;
