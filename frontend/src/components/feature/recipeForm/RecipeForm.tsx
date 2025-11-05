
import React, { useState, useEffect } from 'react';
import { RecipeCreateRequest, IngredientModel } from '../../../types/models';
import IngredientSearch from '../../common/IngredientSearch';
import CategorySelect from '../../common/CategorySelect';
import TagSelect from '../../common/TagSelect';
import RecipeTag from '../../common/RecipeTag';
import ThumbnailInput from './ThumbnailInput';

interface RecipeFormProps {
  initialValues: RecipeCreateRequest;
  onSubmit: (values: RecipeCreateRequest) => Promise<void>;
  onUrlChange?: (url: string) => void;
  loading: boolean;
  errors: { [key: string]: string };
  ingredients: IngredientModel[];
  categories: { id: number; name: string }[];
  tags: { id: number; name: string }[];
  youtubeChannels: { id: number; name: string }[];
  editMode?: boolean;
  urlerror?: string;
}

export default function RecipeForm(props: RecipeFormProps) {
  // フォーム値を一元管理
  const [values, setValues] = useState<RecipeCreateRequest>(props.initialValues);
  // タグ選択モーダル
  const [tagSelectOpen, setTagSelectOpen] = useState(false);

  // 初期値が変わったらフォーム値をリセット
  useEffect(() => {
    setValues(props.initialValues);
  }, [props.initialValues]);

  // 値変更ハンドラ
  const handleChange = <K extends keyof RecipeCreateRequest>(key: K, value: RecipeCreateRequest[K]) => {
    setValues((prev) => ({ ...prev, [key]: value }));
    // YouTube URL変更時は親にも通知
    if (key === 'url' && props.onUrlChange) {
      props.onUrlChange(value as string);
    }
  };

  // タグ選択のonToggle
  const handleTagToggle = (id: number) => {
    setValues((prev) => ({
      ...prev,
      tag_ids: prev.tag_ids && prev.tag_ids.includes(id)
        ? prev.tag_ids.filter((tagId) => tagId !== id)
        : [...(prev.tag_ids || []), id],
    }));
  };

  // サムネイル変更
  const handleThumbnailChange = (url: string) => {
    setValues((prev) => ({ ...prev, thumbnail: url }));
  };

  // 送信
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await props.onSubmit(values);
  };
  
  // フォームエラー表示コンポーネント
  const FormError = ({ message }: { message?: string }) =>
    message ? (
      <div className="flex items-center text-red-500 text-sm mt-1">
        <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01M21 12c0 4.97-4.03 9-9 9s-9-4.03-9-9 4.03-9 9-9 9 4.03 9 9z" />
        </svg>
        {message}
      </div>
    ) : null;

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-orange-100 px-2 py-1 rounded-lg border-2 border-orange-400 outline-none mt-3 max-w-lg"
    >
      {/* YouTube URL */}
      <div className="mb-1">
        <div className="flex items-center justify-between">
          <label className="font-bold" htmlFor="youtube-url-input">
            YouTube URL
          </label>
          <button
            type="button"
            className="text-sm bg-red-500 text-white px-2 py-1 border border-black rounded hover:bg-red-800 ml-2"
            onClick={() => window.open('https://youtube.com', '_blank')}
          >
            YouTubeへ
          </button>
        </div>
        <input
          id="youtube-url-input"
          type="text"
          name="url"
          value={values.url}
          onChange={(e) => handleChange('url', e.target.value)}
          required
          className="bg-white rounded-md w-full p-1.5 common-border-orange text-sm"
          placeholder="URLをコピーするとサムネイルとレシピ名は自動で入るよ"
        />
        <FormError message={props.errors.youtubeUrl} />
        <FormError message={props.urlerror} />
      </div>


      {/* レシピ名 */}
      <div>
        <label className="block font-bold">
          レシピ名
          <input
            type="text"
            name="name"
            value={values.name}
            onChange={(e) => handleChange('name', e.target.value)}
            required
            className="bg-white rounded-md w-full mt-1 p-1.5 border common-border-orange "
          />
        </label>
        <FormError message={props.errors.name} />
      </div>
      {/* サムネイル */}
      <div>
        <ThumbnailInput youtubeUrl={values.url} onChange={handleThumbnailChange} />
        <FormError message={props.errors.thumbnail} />
      </div>
      {/* 食材選択 */}
      <IngredientSearch
        selectedIds={values.ingredient_ids}
        onChange={(ids) => handleChange('ingredient_ids', ids)}
        ingredients={props.ingredients}
      />
      {/* カテゴリ選択 */}
      <CategorySelect
        value={values.category_id}
        onChange={(id) => {
          if (typeof id === 'number') handleChange('category_id', id);
        }}
        categories={props.categories}
        enableSelectAll={false}
      />
      {/* タグ選択 */}
      <div className="flex items-center flex-wrap gap-2 mt-2 mb-2">
        <button
          type="button"
          onClick={() => setTagSelectOpen(true)}
          className=""
        >
          タグを選ぶ
        </button>
        <div className="flex items-center flex-wrap gap-1">
          <span className="font-bold mr-1">選択中：</span>
          {values.tag_ids && values.tag_ids.length > 0 ? (
            props.tags
              .filter((tag) => values.tag_ids && values.tag_ids.includes(tag.id))
              .map((tag) => <RecipeTag key={tag.id} recipeTag={tag} />)
          ) : (
            <span className="text-gray-400">未選択</span>
          )}
        </div>
      </div>
      {/* メモ */}
      <div>
        <label className="block font-bold mb-2 mt-2">
          メモ（任意）
          <textarea
            name="notes"
            value={values.notes || ''}
            onChange={(e) => handleChange('notes', e.target.value)}
            className="w-full h-24 p-3 rounded-lg mt-1 resize-none common-border-orange outline-none"
            placeholder="🖊調理時間や必要な調味料などを自由に記述"
          ></textarea>
        </label>
      </div>
      {/* 送信ボタン */}
      <button
        type="submit"
        disabled={props.loading}
        className="bg-orange-400 w-full text-white font-bold py-2 px-4 rounded hover:bg-orange-600 disabled:opacity-50"
      >
        {props.editMode ? '更新する' : 'レシピを追加する'}
      </button>
      {/* エラー表示（食材 or カテゴリのみボタン↓ */}
      <FormError message={props.errors.ingredients} />
      <FormError message={props.errors.category} />
      {/* タグ選択モーダル */}
      <TagSelect
        open={tagSelectOpen}
        tags={props.tags}
        selectedTagIds={values.tag_ids || []}
        onToggle={handleTagToggle}
        onClose={() => setTagSelectOpen(false)}
      />
    </form>
  );
};

