import React from 'react'
import { RecipeTagModel } from '../../types/models'


interface RecipeTagProps {
    recipeTag: RecipeTagModel;
    hideIcon?: boolean;
    // Define any props if needed in the future
}

function getTagStyle(name: string) {
    switch (name) {
        case "お気に入り":
            return "text-yellow-700 border-yellow-700 bg-yellow-100";
        case "ヘルシー":
            return "text-green-700 border-green-700 bg-green-100";
        case "お弁当":
            return "text-blue-700 border-blue-700 bg-blue-100";
        case "時短":
            return "text-red-700 border-red-700 bg-red-100";
        case "節約":
            return "text-purple-700 border-purple-700 bg-purple-100";
        case "複数レシピ":
            return "text-indigo-700 border-indigo-700 bg-indigo-100";
        default:
            return "text-gray-700 border-gray-300 bg-gray-100";
    }
}

export default function RecipeTag( {recipeTag} : RecipeTagProps) {

  return (
    <div className={`
        text-xs px-2 py-0.5 rounded shadow-sm font-medium
        ${getTagStyle(recipeTag.name)}
    `}>
        <span>{recipeTag.name}</span>
    </div>
  )
}
