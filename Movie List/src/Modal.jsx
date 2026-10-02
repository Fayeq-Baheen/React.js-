import "./Modal.css";

export default function Modal({ onHandleAddMovie, onHandleCancelMovie }) {
  return (
    <div className="modal-backdrop">
      <div className="modal-content">
        <h2 className="text-2xl font-bold mb-4">Add Movie</h2>
        <input
          type="text"
          placeholder="Movie Name"
          className="border border-gray-300 rounded px-4 py-2 mb-4 w-full"
        />
        <input
          type="number"
          placeholder="Year"
          className="border border-gray-300 rounded px-4 py-2 mb-4 w-full"
        />
        <input
          type="text"
          placeholder="Description"
          defaultValue="Lorem ipsum dolor sit amet."
          className="border border-gray-300 rounded px-4 py-2 mb-4 w-full"
        />
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded mt-4 cursor-pointer"
          onClick={() => {
            const movieTitle = document.querySelector(
              'input[placeholder="Movie Name"]',
            ).value;
            const movieYear = document.querySelector(
              'input[placeholder="Year"]',
            ).value;
            const movieDescription = document.querySelector(
              'input[placeholder="Description"]',
            ).value;
            onHandleAddMovie(movieTitle, movieYear, movieDescription);
          }}
        >
          Add Movie
        </button>
        <button
          className="bg-gray-500 text-white px-4 py-2 rounded mt-4 ml-2 cursor-pointer"
          onClick={onHandleCancelMovie}
        >
          Cancel
        </button>
      </div>
    </div>
  );
}
