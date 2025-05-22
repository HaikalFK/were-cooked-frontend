import { useEffect, useState } from 'react';
import {
  showConfirmationAlert, showSuccessAlert
} from '../utils/alerts';

export default function useBookmarkPresenter() {
  const [savedRecipes, setSavedRecipes] = useState([]);

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem('saved_recipes') || '[]');
    setSavedRecipes(saved);
  }, []);

 const handleRemove = (id) => {
  showConfirmationAlert(
    "Resep akan dihapus dari bookmark.",
    () => {
      const updated = savedRecipes.filter((r) => r.id !== id);
      setSavedRecipes(updated);
      localStorage.setItem('saved_recipes', JSON.stringify(updated));
      showSuccessAlert("Resep berhasil dihapus.");
    }
  );
};


  return { savedRecipes, handleRemove };
}
