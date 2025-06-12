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
  const { user, token } = useAuth(); // <-- 2. Dapatkan status user dan token

  const recipesPerPage = 12; // const [allRecipes, setAllRecipes] = useState([]);
  // State ini tidak lagi menyimpan SEMUA resep, hanya hasil yang relevan
  useEffect(() => {
    async function fetchInitialRecipes() {
      showLoadingAlert("Mengambil resep untukmu...");

      // 3. Tentukan endpoint berdasarkan status login
      const endpoint = user ? "/recommendations" : "/resep";

      try {
        // Gunakan token jika ada (diperlukan untuk /recommendations)
        const res = await apiGet(endpoint, token);
        hideLoadingAlert();

        if (!res.error) {
          // Langsung set resep yang ditampilkan dari hasil API
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
    // 4. Jalankan ulang efek ini jika status 'user' berubah (misal: setelah login/logout)
  }, [user, token, setFilteredRecipes]);

  const handleSearch = async () => {
    if (!ingredients.trim()) {
      showErrorAlert("Masukkan minimal satu bahan.");
      return;
    }

    // PENTING: Logika pencarian sekarang harus ke backend
    showLoadingAlert("Mencari resep...");
    try {
      // Untuk tamu, panggil /resep?search=...
      // Untuk user login, panggil /recommendations?search=... (endpoint ini perlu di-update di backend)
      const searchEndpoint = user
        ? `/recommendations?search=${ingredients}`
        : `/resep?search=${ingredients}`;
      const res = await apiGet(searchEndpoint, token);
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

  // Fungsi handleRandom bisa dinonaktifkan atau diubah untuk memanggil API
  const handleRandom = () => {
    // Implementasi baru: panggil API untuk resep acak
    // atau cukup refresh data awal
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
