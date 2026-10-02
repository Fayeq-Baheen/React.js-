import {
  BrowserRouter,
  Routes,
  Route,
  Link,
  Navigate,
  useNavigate,
} from "react-router-dom";
import { useState } from "react";
import "./index.css";

function Login({ onLogin }) {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] =
    useState("");
  const [errors, setErrors] = useState({});

  function handleSubmit(e) {
    e.preventDefault();

    const newErrors = {};

    if (!email.includes("@")) {
      newErrors.email = "Invalid email.";
    }

    if (password.length < 6) {
      newErrors.password =
        "Password must be at least 6 characters.";
    }

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      onLogin({
        email,
        name: "Ahmad",
      });

      navigate("/dashboard");
    }
  }

  return (
    <div className="page">
      <h1>Login</h1>

      <form onSubmit={handleSubmit}>
        <label>Email</label>

        <input
          value={email}
          onChange={(e) =>
            setEmail(e.target.value)
          }
        />

        {errors.email && (
          <p className="error">{errors.email}</p>
        )}

        <label>Password</label>

        <input
          type="password"
          value={password}
          onChange={(e) =>
            setPassword(e.target.value)
          }
        />

        {errors.password && (
          <p className="error">
            {errors.password}
          </p>
        )}

        <button type="submit">
          Login
        </button>
      </form>
    </div>
  );
}

function ProtectedRoute({
  user,
  children,
}) {
  if (!user) {
    return <Navigate to="/login" />;
  }

  return children;
}

function Dashboard({ user, onLogout }) {
  const navigate = useNavigate();

  function logout() {
    onLogout();
    navigate("/login");
  }

  return (
    <div className="page">
      <h1>Dashboard</h1>

      <h2>Welcome, {user.name}</h2>

      <p>{user.email}</p>

      <Link to="/profile">Profile</Link>

      <br />

      <button onClick={logout}>
        Logout
      </button>
    </div>
  );
}

function Profile({ user }) {
  return (
    <div className="page">
      <h1>Profile</h1>

      <p>Name: {user.name}</p>
      <p>Email: {user.email}</p>
    </div>
  );
}

export default function App() {
  const [user, setUser] = useState(null);

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/login"
          element={
            <Login
              onLogin={setUser}
            />
          }
        />

        <Route
          path="/dashboard"
          element={
            <ProtectedRoute user={user}>
              <Dashboard
                user={user}
                onLogout={() => setUser(null)}
              />
            </ProtectedRoute>
          }
        />

        <Route
          path="/profile"
          element={
            <ProtectedRoute user={user}>
              <Profile user={user} />
            </ProtectedRoute>
          }
        />

        <Route
          path="*"
          element={<Navigate to="/login" />}
        />
      </Routes>
    </BrowserRouter>
  );
}