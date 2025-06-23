import React from "react";
import "./App.css";
import IngredientSearch from "./components/IngredientSearch";
import { MyComponent, MyClassComponent } from "./components/MyComponent";
import Header from "./components/Header";
import CategorySelect from "./components/CategorySelect";
// https://www.youtube.com/watch?v=mwQtDfV5CXU
//  コンポーネントの分岐から

function App() {
  return (
    <div className="App">
      <Header />
      <div>
        <MyComponent />
        <MyClassComponent />
        <IngredientSearch />
        <CategorySelect
          value={null}
          onChange={(categoryId) =>
            console.log("Selected category ID:", categoryId)
          }
        />
      </div>
    </div>
  );
}

export default App;
