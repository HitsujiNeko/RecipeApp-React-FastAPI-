


import React, { useState } from "react";
import IngredientSearch from "../../common/IngredientSearch";
import TagSelect from "../../common/TagSelect";
import RecipeTag from "../../common/RecipeTag";
import { IngredientModel, CategoryModel, RecipeTagModel } from "../../../types/models";

interface PlaylistBulkAddRowProps {
	row: any;
	index: number;
	categories: CategoryModel[];
	ingredients: IngredientModel[];
	tags: RecipeTagModel[];
	onChange: (index: number, key: string, value: any) => void;
}

export default function PlaylistBulkAddRow({ row, index, categories, ingredients, tags, onChange }: PlaylistBulkAddRowProps) {
	const [tagSelectOpen, setTagSelectOpen] = useState(false);

	// タグ選択のonToggle
	const handleTagToggle = (id: number) => {
		const tagIds: number[] = row.tagIds || [];
		const newTagIds = tagIds.includes(id)
			? tagIds.filter((tagId) => tagId !== id)
			: [...tagIds, id];
		onChange(index, "tagIds", newTagIds);
	};

	return (
		<div className="bg-gray-100 border  border-orange-300 rounded-xl shadow p-4 flex flex-col gap-2">
			<div className="flex items-center gap-3">
				<img src={row.thumbnail} className="w-20 h-20 object-cover rounded-lg border" alt="thumb" />
				<input
					type="text"
					value={row.name}
					onChange={e => onChange(index, "name", e.target.value)}
					className="flex-1 border rounded px-2 py-2 text-sm mt-3"
					placeholder="レシピ名"
				/>
			</div>
			<div className="flex flex-col sm:flex-row gap-2 w-full">
				<div className="flex-2">
					<IngredientSearch
						selectedIds={row.ingredientIds}
						onChange={ids => onChange(index, "ingredientIds", ids)}
						ingredients={ingredients}
					/>
				</div>
				<div className="flex flex-col gap-2  min-w-80px">
					<select
						value={row.categoryId || ""}
						onChange={e => onChange(index, "categoryId", Number(e.target.value))}
						className="border rounded px-2 py-2 bg-white focus:ring-2 focus:ring-orange-300"
					>
						<option value="">カテゴリ選択</option>
						{categories.map((cat) => (
							<option key={cat.id} value={cat.id}>{cat.name}</option>
						))}
					</select>
					<div className="flex items-center flex-wrap gap-2">
						<button
							type="button"
							onClick={() => setTagSelectOpen(true)}
							className="bg-orange-400 hover:bg-orange-500 text-white border border-orange-500 rounded px-3 py-1 text-xs font-bold shadow-sm transition"
						>
							タグを選ぶ
							{row.tagIds && row.tagIds.length > 0 && (
								<span className="ml-2 bg-white text-orange-500 rounded-full px-2 py-0.5 text-xs font-bold border border-orange-400">{row.tagIds.length}</span>
							)}
						</button>
						<div className="flex items-center flex-wrap gap-1">
							<span className="font-bold text-xs text-gray-700">選択中：</span>
							{row.tagIds && row.tagIds.length > 0 ? (
								tags
									.filter((tag) => row.tagIds.includes(tag.id))
									.map((tag) => <RecipeTag key={tag.id} recipeTag={tag} />)
							) : (
								<span className="text-gray-400 text-xs">未選択</span>
							)}
						</div>
					</div>
				</div>
			</div>
			<textarea
				value={row.notes}
				onChange={e => onChange(index, "notes", e.target.value)}
				className="w-full h-15 p-2 border rounded resize-none"
				placeholder="メモ（任意）"
			></textarea>
			<div className="flex text-sm text-gray-600">
				<span className="font-bold text-sm mr-2">URL:</span>
				<a href={row.url} className="text-blue-600 underline text-xs break-all" target="_blank" rel="noopener noreferrer">{row.url}</a>
			</div>
			<TagSelect
				open={tagSelectOpen}
				tags={tags}
				selectedTagIds={row.tagIds || []}
				onToggle={handleTagToggle}
				onClose={() => setTagSelectOpen(false)}
			/>
		</div>
	);
}