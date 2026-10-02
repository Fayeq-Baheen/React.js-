import {
  BrowserRouter,
  Routes,
  Route,
  Link,
  useNavigate,
} from "react-router-dom";
import { useState } from "react";
import "./index.css";

function Step1({ form, setForm }) {
  const navigate = useNavigate();

  const [errors, setErrors] = useState({});

  function handleNext() {
    const newErrors = {};

    if (form.firstName.trim().length < 2) {
      newErrors.firstName =
        "First name is required.";
    }

    if (form.lastName.trim().length < 2) {
      newErrors.lastName =
        "Last name is required.";
    }

    if (!form.email.includes("@")) {
      newErrors.email = "Invalid email.";
    }

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      navigate("/register/step2");
    }
  }

  return (
    <div className="page">
      <h1>Step 1</h1>

      <label>First Name</label>

      <input
        value={form.firstName}
        onChange={(e) =>
          setForm({
            ...form,
            firstName: e.target.value,
          })
        }
      />

      {errors.firstName && (
        <p className="error">
          {errors.firstName}
        </p>
      )}

      <label>Last Name</label>

      <input
        value={form.lastName}
        onChange={(e) =>
          setForm({
            ...form,
            lastName: e.target.value,
          })
        }
      />

      {errors.lastName && (
        <p className="error">
          {errors.lastName}
        </p>
      )}

      <label>Email</label>

      <input
        value={form.email}
        onChange={(e) =>
          setForm({
            ...form,
            email: e.target.value,
          })
        }
      />

      {errors.email && (
        <p className="error">{errors.email}</p>
      )}

      <button onClick={handleNext}>
        Next
      </button>
    </div>
  );
}

function Step2({ form, setForm }) {
  const navigate = useNavigate();

  const [errors, setErrors] = useState({});

  function handleNext() {
    const newErrors = {};

    if (Number(form.age) < 18) {
      newErrors.age =
        "You must be at least 18.";
    }

    if (form.password.length < 6) {
      newErrors.password =
        "Password must be at least 6 characters.";
    }

    if (form.password !== form.confirmPassword) {
      newErrors.confirmPassword =
        "Passwords do not match.";
    }

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      navigate("/register/step3");
    }
  }

  return (
    <div className="page">
      <h1>Step 2</h1>

      <label>Age</label>

      <input
        type="number"
        value={form.age}
        onChange={(e) =>
          setForm({
            ...form,
            age: e.target.value,
          })
        }
      />

      {errors.age && (
        <p className="error">{errors.age}</p>
      )}

      <label>Password</label>

      <input
        type="password"
        value={form.password}
        onChange={(e) =>
          setForm({
            ...form,
            password: e.target.value,
          })
        }
      />

      {errors.password && (
        <p className="error">
          {errors.password}
        </p>
      )}

      <label>Confirm Password</label>

      <input
        type="password"
        value={form.confirmPassword}
        onChange={(e) =>
          setForm({
            ...form,
            confirmPassword: e.target.value,
          })
        }
      />

      {errors.confirmPassword && (
        <p className="error">
          {errors.confirmPassword}
        </p>
      )}

      <div className="actions">
        <button
          onClick={() =>
            navigate("/register")
          }
        >
          Back
        </button>

        <button onClick={handleNext}>
          Next
        </button>
      </div>
    </div>
  );
}

function Step3({ form }) {
  const navigate = useNavigate();

  return (
    <div className="page">
      <h1>Review</h1>

      <div className="summary">
        <p>
          Name: {form.firstName}{" "}
          {form.lastName}
        </p>

        <p>Email: {form.email}</p>

        <p>Age: {form.age}</p>
      </div>

      <button
        onClick={() =>
          navigate("/register/success")
        }
      >
        Submit
      </button>
    </div>
  );
}

function Success() {
  return (
    <div className="page success">
      <h1>✅ Registration Successful</h1>

      <p>Your account has been created.</p>

      <Link to="/">
        Register Another User
      </Link>
    </div>
  );
}

export default function App() {
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    age: "",
    password: "",
    confirmPassword: "",
  });

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <Step1
              form={form}
              setForm={setForm}
            />
          }
        />

        <Route
          path="/register/step2"
          element={
            <Step2
              form={form}
              setForm={setForm}
            />
          }
        />

        <Route
          path="/register/step3"
          element={<Step3 form={form} />}
        />

        <Route
          path="/register/success"
          element={<Success />}
        />
      </Routes>
    </BrowserRouter>
  );
}