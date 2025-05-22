import { useState, useEffect } from 'react';
const baseUrl = import.meta.env.MODE === 'production' ? '/were-cooked-frontend' : '';

export default function useDetailPresenter(id) {
  const [recipe, setRecipe] = useState(null);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    async function loadRecipe() {
    const res = await fetch(`${baseUrl}/data_with_image.json`);
    const data = await res.json();
    const found = data.find((r) => String(r.id) === id);
    setRecipe(found);

    const savedList = JSON.parse(localStorage.getItem("saved_recipes") || "[]");
    setSaved(savedList.some((r) => r.id === found?.id));}
    loadRecipe();
  }, [id]);

  const handleSave = () => {
    const savedList = JSON.parse(localStorage.getItem("saved_recipes") || "[]");
    savedList.push(recipe);
    localStorage.setItem("saved_recipes", JSON.stringify(savedList));
    setSaved(true);
  };

  const handlePrint = () => {
    window.print();
  };

  const handleTutorial = () => {
    const query = encodeURIComponent(recipe?.Title || '');
    window.open(`https://www.youtube.com/results?search_query=${query}+resep`, '_blank');
  };

  return { recipe, saved, handleSave, handlePrint, handleTutorial };
}
