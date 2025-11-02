import React, { useState } from 'react'
import { RecipeTagModel } from '../../types/models'
import RecipeTag from './RecipeTag';

interface TagSelectProps {
	open: boolean;
	tags: RecipeTagModel[];
	selectedTagIds: number[];
	onToggle: (tagId: number) => void;
	onClose: () => void;
}

export default function TagSelect({ 
	open, 
	tags, 
	selectedTagIds, 
	onToggle, 
	onClose }
	: TagSelectProps) {
	if (!open) return null;

	return (
    <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50" onClick={onClose}>
      <div className="bg-white rounded-lg p-4 w-80 shadow-lg" onClick={e => e.stopPropagation()}>
        <div className="flex flex-wrap gap-2 mb-4">
          {tags.map(tag => (
            <div
              key={tag.id}
              onClick={() => onToggle(tag.id)}
              className={`cursor-pointer ${selectedTagIds.includes(tag.id) ? 'rounded-sm ring-2 ring-orange-400' : ''}`}
            >
              <RecipeTag recipeTag={tag} />
            </div>
          ))}
        </div>
        <button
          className="bg-orange-400 text-white px-4 py-1 rounded font-bold w-full"
          onClick={onClose}
        >
          タグをセット
        </button>
      </div>
    </div>
  );
}

