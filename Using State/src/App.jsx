import { useState } from "react";

export default function App() {
  const [number, setNum] = useState(1);

  return (
    <div>
      <p className="p-5 ml-13 text-2xl">{number}</p>
      <button
        className="p-6 bg-slate-600 ml-2"
        onClick={() => {
          setNum((number) => number - 1);
        }}
      >
        Pre
      </button>

      <button
        className="p-6 bg-slate-200 ml-2"
        onClick={() => {
          setNum((number) => number + 1);
        }}
      >
        Next
      </button>
    </div>
  );
}
