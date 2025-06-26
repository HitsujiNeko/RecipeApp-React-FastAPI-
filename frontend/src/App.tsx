import React, { useState } from "react";
import "./App.css";
import Header from "./components/Header";
import Footer from "./components/Footer";
import HomeSection from "./components/HomeSection";
import RecipeSuggestSection from "./components/RecipeSuggestSection";
import RecipeAddSection from "./components/RecipeAddSection";
import RecipeListSection from "./components/RecipeListSection";
import RecipeDetailSection from "./components/RecipeDetailSection";
import PlaylistBulkAdd from "./components/PlaylistBulkAdd";

function App() {
  const [nav, setNav] = useState("suggest");

  let content;
  switch (nav) {
    case "suggest":
      content = <RecipeSuggestSection />;
      break;
    case "add":
      content = <RecipeAddSection />;
      break;
    case "list":
      content = <RecipeListSection />;
      break;
    case "detail":
      content = <RecipeDetailSection />;
      break;
    case "about":
      content = <HomeSection />;
      break;
    case "playlistBulkAdd":
      content = <PlaylistBulkAdd />;
      break;
    default:
      content = <RecipeSuggestSection />;
  }

  return (
    <div className="App">
      <Header nav={nav} setNav={setNav} />
      <nav style={{ margin: "1em 0" }}>
        <button onClick={() => setNav("playlistBulkAdd")}>
          YouTubeプレイリスト一括追加
        </button>
      </nav>
      <main>{content}</main>
      <Footer />
    </div>
  );
}

export default App;
