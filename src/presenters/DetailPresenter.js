import { useState, useEffect } from 'react';
const baseUrl = import.meta.env.MODE === 'production' ? '/were-cooked-frontend' : '';
import html2pdf from 'html2pdf.js';
import {
  showErrorAlert,
  showLoadingAlert,
  hideLoadingAlert,
  showSuccessAlert
} from '../utils/alerts';

export default function useDetailPresenter(id) {
  const [recipe, setRecipe] = useState(null);
  const [saved, setSaved] = useState(false);

  
  useEffect(() => {
  async function loadRecipe() {
    showLoadingAlert("Membuka detail resep...");
    await new Promise(resolve => setTimeout(resolve, 300)); // ⏳ tambahkan di sini

    try {
      const res = await fetch(`${baseUrl}/data_with_image.json`);
      const data = await res.json();
      const found = data.find((r) => String(r.id) === id);
      setRecipe(found);

      const savedList = JSON.parse(localStorage.getItem("saved_recipes") || "[]");
      setSaved(savedList.some((r) => r.id === found?.id));
    } catch (e) {
      showErrorAlert("Gagal memuat detail resep.", e);
    } finally {
      hideLoadingAlert();
    }
  }

  loadRecipe();
}, [id]);


  const handleSave = () => {
  const savedList = JSON.parse(localStorage.getItem("saved_recipes") || "[]");
  if (!savedList.find((r) => r.id === recipe.id)) {
    savedList.push(recipe);
    localStorage.setItem("saved_recipes", JSON.stringify(savedList));
    setSaved(true);
    showSuccessAlert("Resep telah disimpan!");
  } else {
    showErrorAlert("Resep ini sudah ada di bookmark.");
  }
};


  const handlePrint = () => {
    window.print();
  };

  const handleTutorial = () => {
    const query = encodeURIComponent(recipe?.Title || '');
    window.open(`https://www.youtube.com/results?search_query=${query}+resep`, '_blank');
  };

  const handleExportPDF = () => {
  const detail = document.getElementById('recipe-detail');
  if (detail) {
    html2pdf().from(detail).save(`${recipe.Title}.pdf`);
  }
};

  return { recipe, saved, handleSave, handlePrint, handleTutorial, handleExportPDF };
}
