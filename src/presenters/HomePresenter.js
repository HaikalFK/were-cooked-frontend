// src/presenters/HomePresenter.js
import { useContext, useEffect, useState } from 'react';
import { SearchContext } from '../context/SearchContext';

export default function useHomePresenter() {
  const {
    ingredients, setIngredients,
    filteredRecipes, setFilteredRecipes,
    page, setPage
  } = useContext(SearchContext);

  const recipesPerPage = 12;
  const [allRecipes, setAllRecipes] = useState([]);

  useEffect(() => {
    async function fetchRecipes() {
      try {
        const res = await fetch('/data/data_with_image.json');
        const json = await res.json();
        setAllRecipes(json);
      } catch (error) {
        console.error('Gagal memuat data resep:', error);
      }
    }

    fetchRecipes();
  }, []);

  const handleSearch = () => {
    const input = ingredients.toLowerCase().split(',').map(i => i.trim());
    const results = allRecipes.filter(recipe =>
      input.every(bahan =>
        recipe["Ingredients Cleaned"]?.toLowerCase().includes(bahan)
      )
    );
    setFilteredRecipes(results);
    setPage(1);
  };

  const handlePageChange = (direction) => {
    setPage(prev => prev + direction);
  };

  return {
    ingredients, setIngredients,
    filteredRecipes,
    handleSearch,
    page, handlePageChange,
    recipesPerPage
  };
}
