import { RecipeModel } from "../../types/models";
import IngredientTag from "./IngredientTag";
import styles from "./RecipeCard.module.css";

// export type Recipe = {
//   id: number;
//   name: string;
//   url: string;
//   thumbnail: string;
//   notes: string;
//   ingredients: Ingredient[]; // 詳細取得時
//   categories: Category[];    // 詳細取得時
//   created_at?: string;

interface RecipeCardProps {
  recipe: RecipeModel;
  displayIngCat?: boolean; // 追加: 食材リストを表示するかどうか
  onClick: () => void; 
}

export default function RecipeCard({
  recipe,
  displayIngCat,
  onClick,
}: RecipeCardProps) {
  return (
    <div className={styles.card} onClick={onClick} style={{ cursor: "pointer" }}>
      <p style={{ fontWeight: "bold", fontSize: "16px", marginBottom: "3px" }}>
        {recipe.name.length > 23
          ? recipe.name.slice(0, 23) + "..."
          : recipe.name}
      </p>
      <a href={recipe.url} target="_blank" rel="noopener noreferrer">
        <img src={recipe.thumbnail} alt={recipe.name} />
      </a>
      {displayIngCat && (
        <>
          <div className={styles.tags}>
            {(recipe.ingredients || []).map((ing) => (
              <IngredientTag ingredient={ing} />
            ))}
          </div>
          <p className={styles.category}>
            カテゴリ: {recipe.category ? recipe.category.name : ""}
          </p>
        </>
      )}
    </div>
  );
}
