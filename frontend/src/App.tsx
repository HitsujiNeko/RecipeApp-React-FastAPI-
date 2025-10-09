import React, { useState } from "react";
import "./App.css";
import styles from "./components/App.module.css";
import Header from "./components/layout/Header";
import BottomNavigationbar from "./components/layout/BottomNavigationbar";

import HomeSection from "./components/pages/HomeSection";
import RecipeSuggestSection from "./components/pages/RecipeSuggestSection";
import RecipeAddSection from "./components/pages/RecipeAddSection";
import RecipeListSection from "./components/pages/RecipeListSection";
import RecipeDetailSection from "./components/pages/RecipeDetailSection";

function App() {
  const [nav, setNav] = useState("suggest");
  const [selectedRecipeId, setSelectedRecipeId] = useState<number | null>(null);

  let content;
  switch (nav) {
    case "suggest":
      content = <RecipeSuggestSection />;
      break;
    case "add":
      content = <RecipeAddSection />;
      break;
    case "list":
      content = (
        <RecipeListSection
          onRecipeClick={(id: number) => {
            setSelectedRecipeId(id);
            setNav("detail");
          }}
        />
      );
      break;
    case "detail":
      content =
        selectedRecipeId !== null ? (
          <RecipeDetailSection
            recipeId={selectedRecipeId}
            onBack={() => setNav("list")}
          />
        ) : (
          <div>レシピが選択されていません</div>
        );
      break;
    case "home":
      content = <HomeSection />;
      break;
    default:
      content = <RecipeSuggestSection />;
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
