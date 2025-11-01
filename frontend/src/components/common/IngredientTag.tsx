import { IngredientModel } from "../../types/models";

interface IngredientTagProps {
  ingredient: IngredientModel;
  hideIcon?: boolean;
}

function getTypeStyle(type: string) {
  switch (type) {
    case "肉":
      return "text-red-700 border-red-700 bg-red-100";
    case "魚":
      return "text-blue-700 border-blue-700 bg-blue-100";
    case "野菜":
      return "text-green-700 border-green-700 bg-green-100";
    case "炭水化物":
      return "text-yellow-700 border-yellow-700 bg-yellow-100";
    default:
      return "text-gray-700 border-gray-300 bg-gray-100";
  }
}

export default function IngredientTag({ ingredient, hideIcon}: IngredientTagProps) {
  return (
    <div>
      <span
        className={`
          border text-xs font-medium rounded-2xl px-1 py-0.5
          ${getTypeStyle(ingredient.type)}
          `}
          >
        {ingredient.name}
      </span> 
    </div>
  );
}
