import { Link } from 'react-router-dom';

export default function HomeView({ presenter }) {
  const {
    ingredients, setIngredients,
    filteredRecipes, handleSearch,
    page, handlePageChange, recipesPerPage
  } = presenter;

  const paginated = filteredRecipes.slice(
    (page - 1) * recipesPerPage,
    page * recipesPerPage
  );

  return (
    <div className="min-h-screen bg-gray-100 px-4 py-8">
      <div className="max-w-6xl mx-auto bg-white p-6 rounded-2xl shadow-xl">
        <h1 className="text-2xl font-bold mb-4">Cari Resep Berdasarkan Bahan</h1>
        <textarea
          className="w-full p-3 border rounded-xl mb-4"
          rows="2"
          placeholder="Contoh: ayam, kecap, cabai"
          value={ingredients}
          onChange={(e) => setIngredients(e.target.value)}
        />
        <button
          className="bg-blue-600 text-white px-4 py-2 rounded-xl hover:bg-blue-700"
          onClick={handleSearch}
        >
          Cari Resep
        </button>

        <div className="mt-6 overflow-x-auto">
          <div className="grid grid-cols-[repeat(auto-fit,minmax(250px,1fr))] gap-6">
            {paginated.length > 0 ? (
              paginated.map((recipe) => (
                <div key={recipe.id} className="bg-gray-50 p-4 rounded-xl shadow ">
                  <img src={recipe.Image} alt={recipe.Title} className="w-full h-40 object-cover rounded-lg mb-2" />
                  <h2 className="text-lg font-semibold text-blue-700 hover:underline">
                    <Link to={`/resep/${recipe.id}`}>{recipe.Title}</Link>
                  </h2>
                  <p className="text-sm text-gray-600 truncate">{recipe["Ingredients Cleaned"]}</p>
                </div>
              ))
            ) : (
              <p className="text-gray-500 col-span-full">Masukkan bahan dan klik cari untuk melihat rekomendasi resep.</p>
            )}
          </div>
        </div>

        {/* Pagination */}
        {filteredRecipes.length > recipesPerPage && (
          <div className="mt-4 flex justify-center gap-4">
            <button
              onClick={() => handlePageChange(-1)}
              disabled={page === 1}
              className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400 disabled:opacity-50"
            >
              Prev
            </button>
            <span className="py-2 px-4">{page}</span>
            <button
              onClick={() => handlePageChange(1)}
              disabled={page * recipesPerPage >= filteredRecipes.length}
              className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400 disabled:opacity-50"
            >
              Next
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
