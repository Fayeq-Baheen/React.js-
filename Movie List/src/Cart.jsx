export default function Cart({ movie }) {
  return (
    <div className="border-2 border-gray-300 rounded-lg p-4 mb-4 w-1/2 mx-auto">
      <span
        className="font-bold cursor-pointer ml-0 flex bg-red-500 text-white px-2 py-1 rounded w-6.5"
        onClick={() => {
          fetch(`http://localhost:3000/movies/${movie.id}`, {
            method: "DELETE",
          });
        }}
      >
        X
      </span>
      <h2 className="text-xl font-bold">{movie.name}</h2>
      <span className="text-gray-600">{movie.year}</span>
      <p className="text-gray-700">{movie.description}</p>
    </div>
  );
}
