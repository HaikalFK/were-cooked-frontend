import { useContext, useEffect, useState } from "react";
import { SearchContext } from "../context/SearchContext";
import {
  showErrorAlert,
  showLoadingAlert,
  hideLoadingAlert
} from "../utils/alerts";
import { apiGet } from "../utils/api";

function getRandomItems(arr, count) {
  return arr.sort(() => 0.5 - Math.random()).slice(0, count);
}

export default function useHomePresenter() {
  const { ingredients, setIngredients, filteredRecipes, setFilteredRecipes, page, setPage } = useContext(SearchContext);

  const recipesPerPage = 12;
  const [allRecipes, setAllRecipes] = useState([]);

  useEffect(() => {
    async function fetchRecipes() {
      showLoadingAlert("Mengambil data resep...");
      await new Promise(resolve => setTimeout(resolve, 300));
      try {
        const res = await apiGet('/recipes');
        if (!res.error) {
          setAllRecipes(res.data);
          if (!ingredients && filteredRecipes.length === 0) {
            setFilteredRecipes(getRandomItems(res.data, 12));
          }
        } else {
          showErrorAlert(res.message || "Gagal ambil data");
        }
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
    await new Promise(resolve => setTimeout(resolve, 300));

    const input = ingredients.toLowerCase().split(',').map(i => i.trim());
    const results = allRecipes.filter((recipe) =>
      input.every((bahan) =>
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
      await new Promise((resolve) => setTimeout(resolve, 300));
      const random = getRandomItems(allRecipes, 12);
      setFilteredRecipes(random);
      setIngredients("");
      hideLoadingAlert();
    }
  };

  const handlePageChange = (dir) => setPage((prev) => prev + dir);

  return {
    ingredients,
    setIngredients,
    filteredRecipes,
    handleSearch,
    handleRandom,
    page,
    handlePageChange,
    recipesPerPage,
  };
}
