import { IngredientModel } from "../../types/models";

interface IngredientTagProps {
  ingredient: IngredientModel;
}

function getTypeStyle(type: string) {
  switch (type) {
    case "肉":
      return "text-red-700 border-red-700";
    case "魚":
      return "text-blue-700 border-blue-700";
    case "野菜":
      return "text-green-700 border-green-700";
    case "炭水化物":
      return "text-yellow-700 border-yellow-700";
    default:
      return "text-gray-700 border-gray-300";
  }
}

export default function IngredientTag({ ingredient }: IngredientTagProps) {
  return (
    <span
      className={`
        border text-sm font-medium rounded-2xl px-2 py-1
        ${getTypeStyle(ingredient.type)}
        `}
    >
      {ingredient.name}
    </span>
  );
}
