// no local state required; controller hook manages form state
import { RecipeModel, RecipeCreateRequest } from "../../types/models";
import RecipeForm from "../feature/recipeForm/RecipeForm";
import { updateRecipe } from "../../api/api";
import useRecipeFormController from "../../hooks/useRecipeFormController";

interface RecipeUpdateSectionProps {
  recipe: RecipeModel;
  recipeId: number;
  existingRecipes: RecipeModel[];
  refetchRecipes?: () => void;
}
export default function RecipeUpdateSection(props: RecipeUpdateSectionProps) {
  const {
    ingredients,
    categories,
    tags,
    loading,
    initialValues,
    formErrors,
    urlError,
    handleUrlChange,
    handleSubmit,
    channelData,
  } = useRecipeFormController({
    mode: "update",
    initialRecipe: props.recipe,
    existingRecipes: props.existingRecipes,
    currentRecipeId: props.recipeId,
    onSubmit: async (values: RecipeCreateRequest) => {
      await updateRecipe(props.recipeId, values);
      alert("レシピが更新されました");
      if (props.refetchRecipes) props.refetchRecipes();
    },
  });
  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <span className="animate-spin rounded-full border-4 border-orange-400 border-t-transparent w-12 h-12 mr-3"></span>
        <span className="text-orange-500 text-xl font-bold">読み込み中...</span>
      </div>
    );
  }
  return (
    <div>
      <RecipeForm
        initialValues={initialValues}
        ingredients={ingredients}
        categories={categories}
        tags={tags}
        youtubeChannels={channelData ? [channelData] : []}
        loading={loading}
        errors={formErrors}
        onSubmit={handleSubmit}
        editMode={true}
        onUrlChange={handleUrlChange}
        urlerror={urlError}
      />
    </div>
  );
}
