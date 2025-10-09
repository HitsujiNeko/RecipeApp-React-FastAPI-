import { RecipeModel } from "../../types/models";
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
  displayIngredients?: boolean; // 追加: 食材リストを表示するかどうか
}

export default function RecipeCard({
  recipe,
  displayIngredients,
}: RecipeCardProps) {
  return (
    <div className={styles.card}>
      <h3>{recipe.name}</h3>
      <img src={recipe.thumbnail} alt={recipe.name} />
      {displayIngredients && (
        <>
          <p>つかう食材</p>
          <ul>
            {recipe.ingredients.map((ing) => (
              <li key={ing.id}>{ing.name}</li>
            ))}
          </ul>
        </>
      )}
      <p>カテゴリ: {recipe.categories.map((cat) => cat.name).join(", ")}</p>
      <a href={recipe.url} target="_blank" rel="noopener noreferrer">
        YouTubeを見る
      </a>
    </div>
  );
}
