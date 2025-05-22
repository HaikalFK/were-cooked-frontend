import { useEffect, useState } from 'react';

export default function useBookmarkPresenter() {
  const [savedRecipes, setSavedRecipes] = useState([]);

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem('saved_recipes') || '[]');
    setSavedRecipes(saved);
  }, []);

  const handleRemove = (id) => {
    const updated = savedRecipes.filter((r) => r.id !== id);
    setSavedRecipes(updated);
    localStorage.setItem('saved_recipes', JSON.stringify(updated));
  };

  return { savedRecipes, handleRemove };
}
