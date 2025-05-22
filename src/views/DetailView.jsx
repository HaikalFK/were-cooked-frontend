import React from 'react';

export default function DetailView({ presenter }) {
  const { recipe, saved, handleSave, handlePrint, handleTutorial } = presenter;

  if (!recipe) {
    return <p className="p-8 text-center text-red-600">Resep tidak ditemukan.</p>;
  }

  return (
    <div className="min-h-screen bg-gray-100 p-6 print-container">
      <div className="max-w-3xl mx-auto bg-white p-6 rounded-2xl shadow-xl">
        <h1 className="text-2xl font-bold mb-4">{recipe.Title}</h1>
        {recipe.Image && (
          <img src={recipe.Image} alt={recipe.Title} className="rounded-xl w-full mb-4 object-cover max-h-96" />
        )}
        <p className="mb-2"><strong>Bahan:</strong></p>
        <p className="whitespace-pre-line mb-4 text-sm">{recipe.Ingredients}</p>

        <p className="mb-2"><strong>Langkah-langkah:</strong></p>
        <p className="whitespace-pre-line mb-4 text-sm">{recipe.Steps}</p>

        <div className="flex gap-3 flex-wrap mt-6 no-print">
          <button
            className={`px-4 py-2 rounded-xl ${saved ? 'bg-green-600' : 'bg-blue-600'} text-white hover:opacity-90`}
            onClick={handleSave}
            disabled={saved}
          >
            {saved ? 'Resep Disimpan' : 'Simpan Resep'}
          </button>
          <button
            className="px-4 py-2 rounded-xl bg-orange-500 text-white hover:opacity-90"
            onClick={handlePrint}
          >
            Cetak Resep
          </button>
          <button
            className="px-4 py-2 rounded-xl bg-red-600 text-white hover:opacity-90"
            onClick={handleTutorial}
          >
            Lihat Tutorial YouTube
          </button>
        </div>
      </div>
    </div>
  );
}
