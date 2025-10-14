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
  displayIngCat?: boolean; // 追加: 食材リストを表示するかどうか
}

export default function RecipeCard({
  recipe,
  displayIngCat,
}: RecipeCardProps) {
  return (
    <div className={styles.card}>
      <p style={{ fontWeight: "bold", fontSize: "16px", marginBottom: "3px" }}>
        {recipe.name.length > 23
          ? recipe.name.slice(0, 23) + "..."
          : recipe.name}
      </p>
      <img src={recipe.thumbnail} alt={recipe.name} />
      {displayIngCat && (
        <>
          <div className={styles.tags}>
            {(recipe.ingredients || []).map((ing) => (
              <span key={ing.id} className={styles.tag}>
                {ing.name}
              </span>
            ))}
          </div>
          <p>
            カテゴリ: {recipe.category ? recipe.category.name : ""}
          </p>
        </>
      )}
      <a href={recipe.url} target="_blank" rel="noopener noreferrer">
        YouTubeを見る
      </a>
    </div>
  );
}
