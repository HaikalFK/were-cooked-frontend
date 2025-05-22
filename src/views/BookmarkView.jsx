import { Link } from 'react-router-dom';

export default function BookmarkView({ presenter }) {
  const { savedRecipes, handleRemove } = presenter;

  return (
    <div className="min-h-screen bg-gray-100 px-4 py-8">
      <div className="max-w-6xl mx-auto bg-white p-6 rounded-2xl shadow-xl">
        <h1 className="text-2xl font-bold mb-4">Resep Tersimpan</h1>

        {savedRecipes.length === 0 ? (
          <p className="text-gray-500">Belum ada resep yang disimpan.</p>
        ) : (
          <div className="grid grid-cols-[repeat(auto-fit,minmax(250px,1fr))] gap-6">
            {savedRecipes.map((recipe) => (
              <div key={recipe.id} className="bg-gray-50 p-4 rounded-xl shadow">
                <img src={recipe.Image} alt={recipe.Title} className="w-full h-40 object-cover rounded-lg mb-2" />
                <h2 className="text-lg font-semibold text-blue-700 hover:underline">
                  <Link to={`/resep/${recipe.id}`}>{recipe.Title}</Link>
                </h2>
                <p className="text-sm text-gray-600 truncate">{recipe["Ingredients Cleaned"]}</p>
                <button
                  onClick={() => handleRemove(recipe.id)}
                  className="mt-2 px-3 py-1 text-sm bg-red-500 text-white rounded hover:bg-red-600"
                >
                  Hapus dari Bookmark
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
