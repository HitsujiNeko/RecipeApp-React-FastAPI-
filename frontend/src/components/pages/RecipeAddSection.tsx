
import { useState, useEffect } from "react";
import { 
  addRecipe, 
  fetchRecipes
  } from "../../api/api";
import { 
        RecipeModel, 
        YouTubeChannelModel , 
        RecipeCreateRequest 
      } from "../../types/models";

import RecipeForm from "../feature/recipeForm/RecipeForm";
import { validateRecipeForm } from "../../utils/validation";
import { fetchAndParseYoutubeData } from "../../utils/youtubeData";
import { useRecipeFormData } from "../../hooks/useRecipeFormData";

export default function RecipeAddSection() {
  const [urlError, setUrlError] = useState<string>("");
  const [channelData, setChannelData] = useState<YouTubeChannelModel | null>(null);
  const [formErrors, setFormErrors] = useState<{ [key: string]: string }>({});
  const [existingRecipes, setExistingRecipes] = useState<RecipeModel[]>([]);
  // フォーム用初期データ取得
  const { ingredients, categories, tags, loading } = useRecipeFormData();
  const [formSubmitting, setFormSubmitting] = useState(false);
  const defaultCategoryId = categories.length > 0 ? categories[0].id : 1;

  // initialValuesを一元管理
  const [initialValues, setInitialValues] = useState<RecipeCreateRequest>({
    name: "",
    url: "",
    thumbnail: "",
    notes: "",
    ingredient_ids: [],
    category_id: defaultCategoryId, // nullではなくnumber型
    tag_ids: [],
    youtube_channel_id: null,
  });


  useEffect(() => {
    fetchRecipes().then(setExistingRecipes);
  }, []);

  // categoriesが取得できたらcategory_idを初期値にセット（初回のみ）
  useEffect(() => {
    if (categories.length > 0) {
      setInitialValues((prev) => ({ ...prev, category_id: categories[0].id }));
    }
    // eslint-disable-next-line
  }, [categories]);

  // YouTube動画情報取得・自動入力（外部utilsに委譲）
  const fetchAndSetYoutubeData = async (url: string) => {
    if (!url || ingredients.length === 0) return;
    setUrlError("");
    const result = await fetchAndParseYoutubeData(url, ingredients);
    if (result.error) {
      setUrlError(result.error);
      setInitialValues((prev) => ({ ...prev, name: "", ingredient_ids: [], youtube_channel_id: null, thumbnail: "" }));
      setChannelData(null);
      return;
    }
    if (result.initialValues) {
      setInitialValues((prev) => ({ ...prev, ...result.initialValues }));
      setChannelData(result.channelData || null);
    }
  };

  // YouTube URL変更時に自動取得
  useEffect(() => {
    // ingredientsが取得済み、かつURLが空でなければfetch
    if (initialValues.url && ingredients.length > 0) {
      fetchAndSetYoutubeData(initialValues.url);
    }
    // eslint-disable-next-line
  }, [initialValues.url]);

  const handleFormSubmit = async (values: RecipeCreateRequest) => {
    const errors = validateRecipeForm(values, existingRecipes);
    setFormErrors(errors);
    if (Object.keys(errors).length > 0) return;
    setFormSubmitting(true);
    try {
      await addRecipe(values);
      //  ここはあとで　表示の仕方を考える（デザイン）
      alert("レシピを追加しました！");
      // フォームリセット
      setInitialValues({
        name: "",
        url: "",
        thumbnail: "",
        notes: "",
        ingredient_ids: [],
        category_id: defaultCategoryId,
        tag_ids: [],
        youtube_channel_id: null,
      });
      setChannelData(null);
    } catch (e) {
      console.error("レシピの追加に失敗しました", e);
      alert("レシピの追加に失敗しました");
    }
    setFormSubmitting(false);
  };

  // RecipeFormからのYouTube URL変更を親のinitialValuesに反映
  const handleUrlChange = (url: string) => {
    setInitialValues((prev) => ({ ...prev, url }));
  };
  if (loading) 
    return (
      <div className="flex justify-center items-center h-64">
        <span className="animate-spin rounded-full border-4 border-orange-400 border-t-transparent w-10 h-10 mr-3"></span>
        <span className="text-orange-500 text-3xl font-bold ml-3">読み込み中...</span>
      </div>
  );
  if (ingredients.length === 0 || categories.length === 0) {
    return <div>食材またはカテゴリが登録されていません。先に登録してください。</div>;
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
            const event = new CustomEvent("navigateToPlaylist", { bubbles: true });
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
        onSubmit={handleFormSubmit}
        errors={formErrors}
        loading={loading}
        onUrlChange={handleUrlChange}
      />
    </section>
  );
}
