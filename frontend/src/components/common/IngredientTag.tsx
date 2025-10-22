import { IngredientModel } from "../../types/models"

interface IngredientTagProps {
  ingredient: IngredientModel; 
}

export default function IngredientTag(ing : IngredientTagProps) {
  return (
    <span className="bg-orange-100 border border-orange-700 text-sm font-medium rounded-2xl px-2 py-1">
      {ing.ingredient.name}
    </span>
  )
}
