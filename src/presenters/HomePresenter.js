import { useContext, useEffect, useState } from 'react';
import { SearchContext } from '../context/SearchContext';
import { saveRecipesToIndexedDB, getAllRecipesFromIndexedDB } from '../utils/db';
const baseUrl = import.meta.env.MODE === 'production' ? '/were-cooked-frontend' : '';
import {
  showErrorAlert,
  showLoadingAlert,
  hideLoadingAlert
} from '../utils/alerts';


function getRandomItems(arr, count) {
  return arr.sort(() => 0.5 - Math.random()).slice(0, count);
}

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
    showLoadingAlert("Mengambil data resep...");
    await new Promise(resolve => setTimeout(resolve, 300));
    try {
      const fromIndexed = await getAllRecipesFromIndexedDB();
      if (fromIndexed?.length > 0) {
        setAllRecipes(fromIndexed);
        setFilteredRecipes(getRandomItems(fromIndexed, 12));
        hideLoadingAlert();
        return;
      }

      const res = await fetch(`${baseUrl}/data_with_image.json`);
      const json = await res.json();
      setAllRecipes(json);
      saveRecipesToIndexedDB(json);
      setFilteredRecipes(getRandomItems(json, 12));
    } catch (e) {
      showErrorAlert("Gagal mengambil data resep. Silakan coba lagi.", e);
    } finally {
      hideLoadingAlert();
    }
  }

  fetchRecipes();
}, []);


  const handleSearch = async () => {
  if (!ingredients.trim()) {
    showErrorAlert("Masukkan minimal satu bahan.");
    return;
  }

  showLoadingAlert("Mencari resep...");
  await new Promise(resolve => setTimeout(resolve, 300)); // ⏳ tambahkan di sini

  const input = ingredients.toLowerCase().split(',').map(i => i.trim());
  const results = allRecipes.filter(recipe =>
    input.every(bahan =>
      recipe["Ingredients Cleaned"]?.toLowerCase().includes(bahan) ||
      recipe["Title"]?.toLowerCase().includes(bahan)
    )
  );

  setFilteredRecipes(results);
  setPage(1);

  hideLoadingAlert();

  if (results.length === 0) {
    showErrorAlert("Resep tidak ditemukan untuk bahan tersebut.");
  }
};


const handleRandom = async () => {
  if (allRecipes.length > 0) {
    showLoadingAlert("Mengacak resep...");
    await new Promise(resolve => setTimeout(resolve, 300));
    const random = getRandomItems(allRecipes, 12);
    setFilteredRecipes(random);
    setIngredients('');
    hideLoadingAlert();
  }
};


  const handlePageChange = (dir) => {
    setPage(prev => prev + dir);
  };

  return {
    ingredients, setIngredients,
    filteredRecipes,
    handleSearch,
    handleRandom,
    page, handlePageChange,
    recipesPerPage
  };
}
