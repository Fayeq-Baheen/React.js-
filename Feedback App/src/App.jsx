import {
  BrowserRouter,
  Routes,
  Route,
  Link,
  useNavigate,
} from "react-router-dom";
import { useState } from "react";
import "./index.css";

function Home({ feedbacks }) {
  const average =
    feedbacks.length === 0
      ? 0
      : feedbacks.reduce(
          (sum, item) => sum + item.rating,
          0
        ) / feedbacks.length;

  return (
    <div className="page">
      <h1>Feedback App</h1>

      <div className="stats">
        <h2>Total Reviews: {feedbacks.length}</h2>
        <h2>Average Rating: {average.toFixed(1)} ⭐</h2>
      </div>

      <Link className="button" to="/feedback">
        Give Feedback
      </Link>
    </div>
  );
}

function Feedback({ onSubmit }) {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [rating, setRating] = useState(0);
  const [message, setMessage] = useState("");
  const [errors, setErrors] = useState({});

  function handleSubmit(e) {
    e.preventDefault();

    const newErrors = {};

    if (name.trim().length < 3) {
      newErrors.name = "Name must be at least 3 characters.";
    }

    if (rating === 0) {
      newErrors.rating = "Please select a rating.";
    }

    if (message.trim().length < 10) {
      newErrors.message =
        "Message must be at least 10 characters.";
    }

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      onSubmit({
        name,
        rating,
        message,
      });

      navigate("/feedback/success");
    }
  }

  return (
    <div className="page">
      <h1>Give Feedback</h1>

      <form onSubmit={handleSubmit}>
        <label>Name</label>

        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        {errors.name && (
          <p className="error">{errors.name}</p>
        )}

        <label>Rating</label>

        <div className="stars">
          {[1, 2, 3, 4, 5].map((star) => (
            <button
              type="button"
              key={star}
              onClick={() => setRating(star)}
            >
              {star <= rating ? "★" : "☆"}
            </button>
          ))}
        </div>

        {errors.rating && (
          <p className="error">{errors.rating}</p>
        )}

        <label>Message</label>

        <textarea
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />

        {errors.message && (
          <p className="error">{errors.message}</p>
        )}

        <button className="submit" type="submit">
          Submit Feedback
        </button>
      </form>
    </div>
  );
}

function Success() {
  return (
    <div className="page">
      <h1>✅ Thank You!</h1>
      <p>Your feedback has been submitted.</p>

      <Link to="/">Back Home</Link>
    </div>
  );
}

export default function App() {
  const [feedbacks, setFeedbacks] = useState([]);

  function handleSubmit(feedback) {
    setFeedbacks([...feedbacks, feedback]);
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={<Home feedbacks={feedbacks} />}
        />

        <Route
          path="/feedback"
          element={<Feedback onSubmit={handleSubmit} />}
        />

        <Route
          path="/feedback/success"
          element={<Success />}
        />
      </Routes>
    </BrowserRouter>
  );
}