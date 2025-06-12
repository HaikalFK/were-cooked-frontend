import { useContext, useEffect, useState } from "react";
import { SearchContext } from "../context/SearchContext";
import { useAuth } from "../context/AuthContext";
import {
  showErrorAlert,
  showLoadingAlert,
  hideLoadingAlert,
} from "../utils/alerts";
import { apiGet } from "../utils/api";

export default function useHomePresenter() {
  const {
    ingredients,
    setIngredients,
    filteredRecipes,
    setFilteredRecipes,
    page,
    setPage,
  } = useContext(SearchContext);
  const { token } = useAuth();

  const recipesPerPage = 12;

  useEffect(() => {
    async function fetchInitialRecipes() {
      showLoadingAlert("Mengambil resep untukmu...");

      try {
        const res = await apiGet("/resep", token);
        hideLoadingAlert();

        if (!res.error) {
          setFilteredRecipes(res.data);
        } else {
          showErrorAlert(res.message || "Gagal mengambil data");
        }
      } catch (e) {
        hideLoadingAlert();
        showErrorAlert("Gagal mengambil data resep. Silakan coba lagi.");
      }
    }
    fetchInitialRecipes();
  }, [setFilteredRecipes, token]);

  const handleSearch = async () => {
    if (!ingredients.trim()) {
      showErrorAlert("Masukkan minimal satu bahan.");
      return;
    }

    showLoadingAlert("Mencari resep...");
    try {
      const res = await apiGet(`/resep?search=${ingredients}`, token);
      hideLoadingAlert();

      if (res.error) {
        showErrorAlert(res.message);
        setFilteredRecipes([]);
      } else {
        setFilteredRecipes(res.data);
        if (res.data.length === 0) {
          showErrorAlert("Resep tidak ditemukan untuk bahan tersebut.");
        }
      }
    } catch (error) {
      hideLoadingAlert();
      showErrorAlert("Gagal melakukan pencarian.");
    }
    setPage(1);
  };

  const handleRandom = () => {
    window.location.reload();
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
