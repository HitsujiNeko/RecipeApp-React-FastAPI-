import { addRecipe } from "../../api/api";
import { RecipeModel, RecipeCreateRequest } from "../../types/models";
import RecipeForm from "../feature/recipeForm/RecipeForm";
import Loading from "../common/Loading";
import useRecipeFormController from "../../hooks/useRecipeFormController";

type RecipeAddSectionProps = {
  existingRecipes?: RecipeModel[];
  refetchRecipes?: () => void;
};

export default function RecipeAddSection({
  existingRecipes,
  refetchRecipes,
}: RecipeAddSectionProps) {
  const {
    ingredients,
    categories,
    tags,
    loading,
    initialValues,
    setInitialValues,
    formErrors,
    urlError,
    handleUrlChange,
    handleSubmit,
    channelData,
    formSubmitting,
    resetForm,
  } = useRecipeFormController({
    mode: "add",
    initialRecipe: null,
    existingRecipes: existingRecipes ?? [],
    onSubmit: async (values: RecipeCreateRequest) => {
      try {
        await addRecipe(values);
        alert("レシピを追加しました！");
        if (refetchRecipes) refetchRecipes();
        // リセット: initialValues をデフォルトに戻す
        setInitialValues({
          name: "",
          url: "",
          thumbnail: "",
          notes: "",
          ingredient_ids: [],
          category_id: categories.length > 0 ? categories[0].id : 1,
          tag_ids: [],
          youtube_channel_id: null,
        });
        resetForm();
      } catch (e) {
        console.error("レシピの追加に失敗しました", e);
        alert("レシピの追加に失敗しました");
      }
    },
  });

  if (loading) return <Loading />;
  if (ingredients.length === 0 || categories.length === 0) {
    return (
      <div>食材またはカテゴリが登録されていません。先に登録してください。</div>
    );
  }
  if (formSubmitting) return <div>送信中...</div>;
  return (
    <section>
      <details>
        <summary>YouTubeプレイリスト一括追加</summary>
        <div className="my-2 text-sm text-gray-700">
          YouTubeの再生リストから複数レシピを一括登録したい場合は、下記の専用ページをご利用ください。
        </div>
        <button
          type="button"
          className="inline-block bg-orange-500 text-white font-bold px-4 py-2 rounded hover:bg-orange-600 transition-colors border border-orange-600"
          onClick={() => {
            // App.tsxのsetNavを使うため、カスタムイベントで親に通知
            const event = new CustomEvent("navigateToPlaylist", {
              bubbles: true,
            });
            window.dispatchEvent(event);
          }}
        >
          プレイリスト一括追加ページへ
        </button>
        <div className="mt-2 text-xs text-gray-500">
          ※通常のレシピ追加はこのまま下のフォームから行えます。
        </div>
      </details>
      <RecipeForm
        initialValues={initialValues}
        ingredients={ingredients}
        categories={categories}
        youtubeChannels={channelData ? [channelData] : []}
        tags={tags}
        onSubmit={handleSubmit}
        errors={formErrors}
        loading={loading}
        onUrlChange={handleUrlChange}
        urlerror={urlError}
      />
    </section>
  );
}
