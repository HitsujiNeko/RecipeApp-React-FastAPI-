import { useState } from 'react';
import { RecipeModel , RecipeCreateRequest} from '../../types/models';
import { validateRecipeForm } from '../../utils/validation';
import { fetchAndParseYoutubeData } from '../../utils/youtubeData';
import RecipeForm from '../feature/recipeForm/RecipeForm';
import { toRecipeCreateRequest } from '../../utils/typeConverters';
import { useRecipeFormData } from '../../hooks/useRecipeFormData';
import { updateRecipe } from '../../api/api';


interface RecipeUpdateSectionProps {
  recipe: RecipeModel;
  recipeId: number;
	existingRecipes: RecipeModel[];
	refetchRecipes?: () => void;
}
export default function RecipeUpdateSection(props: RecipeUpdateSectionProps) {
	// 1. useStateでフォーム値・エラー・ローディング状態を管理
  // 2. useEffectで初期値セット
  // 3. onSubmitでバリデーション→API更新→遷移orメッセージ
  // 4. RecipeFormにpropsとして渡す
  // 5. YouTube URL変更時はfetchAndParseYoutubeDataで自動補完
  // 6. UIはTailwind CSSで統一
	const [formErrors, setFormErrors] = useState<{ [key: string]: string }>({});
	// 初期データ取得
	const { ingredients, categories, tags, loading } = useRecipeFormData();
	// props.recipeをRecipeCreateRequest型に変換して初期値セット
	const [initialValues, setInitialValues] = useState<RecipeCreateRequest>(toRecipeCreateRequest(props.recipe));

	const [ urlError, setUrlError ] = useState<string>("");
	const [ channelData, setChannelData ] = useState<null | any>(null);

	// YouTube動画情報取得・自動入力
	const fetchAndSetYoutubeData = async (url: string) => {
		if (!url || ingredients.length === 0) return;
		setUrlError("");
		const result = await fetchAndParseYoutubeData(url, ingredients);
		if (result.error) {
			setUrlError(result.error);
			setChannelData(null);
			return;
		}
		if (result.initialValues) {
			setInitialValues((prev) => ({ ...prev, ...result.initialValues }));
			setChannelData(result.channelData || null);
		}
	};
	  // RecipeFormからのYouTube URL変更を更新ページに反映
  const handleUrlChange = (url: string) => {
		fetchAndSetYoutubeData(url);
  };

	// 送信ハンドラ
	const handleSubmit = async (values: RecipeCreateRequest) => {
		// バリデーション
		const errors = validateRecipeForm(values, props.existingRecipes);
		if (Object.keys(errors).length > 0) {
			// エラーがあれば表示して終了
			console.log("バリデーションエラー:", errors);
			setFormErrors(errors);
			return;
		}
		// API更新処理
		await updateRecipe(props.recipeId, values);
		// 更新後の処理
		alert("レシピが更新されました");
		// 詳細ぺージへ遷移するなどの処理を追加
	};
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
				youtubeChannels={[]} // YouTubeチャンネルは未実装のため空配列
				loading={loading}
				errors={formErrors}
				onSubmit= {handleSubmit}
				editMode={true}
				onUrlChange={handleUrlChange}
			/>
		</div>
	);

}