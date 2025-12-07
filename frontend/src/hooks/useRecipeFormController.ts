// フォームの状態管理・バリデーション・YouTubeデータの自動入力などを行う

import { RecipeCreateRequest } from "../types/models";
import { useRecipeFormData } from "./useRecipeFormData";
import {
  IngredientModel,
  CategoryModel,
  RecipeTagModel,
  RecipeModel,
  YouTubeChannelModel,
} from "../types/models";
import { fetchAndParseYoutubeData } from "../utils/youtubeData";
import React, { useState, useEffect } from "react";
import { validateRecipeForm } from "../utils/validation";

// 引数

type RecipeFormControllerProps = {
  mode: "add" | "update";
  initialRecipe?: RecipeModel | null; // 初期値(作成時はnullで編集時はRecipeModel)
  existingRecipes?: RecipeModel[]; // バリデーション用既存レシピ一覧
  onSubmit: (values: RecipeCreateRequest) => Promise<void>;
  defaultCategoryId?: number;
  currentRecipeId?: number; // 編集時の現在のレシピID
};

type UseRecipeFormControllerReturn = {
  ingredients: IngredientModel[];
  categories: CategoryModel[];
  tags: RecipeTagModel[];
  loading: boolean;
  initialValues: RecipeCreateRequest;
  setInitialValues: React.Dispatch<React.SetStateAction<RecipeCreateRequest>>;
  formErrors: { [key: string]: string };
  urlError: string;
  handleUrlChange: (url: string) => void;
  handleSubmit: (values: RecipeCreateRequest) => Promise<void>;
  channelData: YouTubeChannelModel | null;
  formSubmitting: boolean;
  resetForm: () => void;
};

export default function useRecipeFormController({
  mode,
  initialRecipe = null,
  existingRecipes = [],
  onSubmit,
  defaultCategoryId,
  currentRecipeId,
}: RecipeFormControllerProps): UseRecipeFormControllerReturn {
  // 状態管理
  const [urlError, setUrlError] = useState<string>("");
  const [formErrors, setFormErrors] = useState<{ [key: string]: string }>({});
  const [channelData, setChannelData] = useState<YouTubeChannelModel | null>(
    null
  );
  const [formSubmitting, setFormSubmitting] = useState(false);
  const resetForm = () => {
    setFormErrors({});
    setChannelData(null);
    setFormSubmitting(false);
  };

  // フォームデータの呼び出し
  const { ingredients, categories, tags, loading } = useRecipeFormData();

  // 入力値の状態管理
  const [initialValues, setInitialValues] = useState<RecipeCreateRequest>({
    name: "",
    url: "",
    thumbnail: "",
    notes: "",
    ingredient_ids: [],
    category_id: defaultCategoryId ?? 0,
    tag_ids: [],
    youtube_channel_id: null,
  });
  useEffect(() => {
    // 編集・一括登録・提案モードで初期値をセット
    if (mode !== "add" && initialRecipe) {
      setInitialValues({
        name: initialRecipe.name,
        url: initialRecipe.url,
        thumbnail: initialRecipe.thumbnail,
        notes: initialRecipe.notes || "",
        ingredient_ids: initialRecipe.ingredients.map((ing) => ing.id),
        category_id: initialRecipe.category.id,
        tag_ids: initialRecipe.tags
          ? initialRecipe.tags.map((tag) => tag.id)
          : [],
        youtube_channel_id: initialRecipe.youtube_channel
          ? initialRecipe.youtube_channel.id
          : null,
      });
    }
  }, [mode, initialRecipe]);

  // categoriesが取得できたらcategory_idを初期値にセット（初回のみ）
  useEffect(() => {
    // 追加モードかつcategory_id未設定時のみセット
    if (
      mode === "add" &&
      categories.length > 0 &&
      (!initialValues.category_id || initialValues.category_id === 0)
    ) {
      setInitialValues((prev) => ({ ...prev, category_id: categories[0].id }));
    }
    // eslint-disable-next-line
  }, [categories, initialRecipe, mode]);

  // YouTube動画情報取得・自動入力（外部utilsに委譲）

  const fetchAndSetYoutubeData = async (url: string) => {
    if (!url || ingredients.length === 0) return;
    setUrlError("");
    const result = await fetchAndParseYoutubeData(url, ingredients);
    if (result.error) {
      setUrlError(result.error);
      setInitialValues((prev) => ({
        ...prev,
        name: "",
        ingredient_ids: [],
        youtube_channel_id: null,
        thumbnail: "",
      }));
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
  }, [initialValues.url]);
  // changeUrlハンドラ
  const handleUrlChange = (url: string) => {
    fetchAndSetYoutubeData(url);
  };

  //　送信ハンドラ
  const handleSubmit = async (values: RecipeCreateRequest) => {
    const errors = validateRecipeForm(values, existingRecipes ?? [], currentRecipeId);
    setFormErrors(errors);
    if (Object.keys(errors).length > 0) return;
    setFormSubmitting(true);
    await onSubmit(values);
    setFormSubmitting(false);
  };

  return {
    ingredients,
    categories,
    tags,
    loading,
    initialValues,
    setInitialValues,
    formErrors,
    urlError,
    handleUrlChange,
    handleSubmit: handleSubmit,
    channelData,
    formSubmitting,
    resetForm,
  };
}
