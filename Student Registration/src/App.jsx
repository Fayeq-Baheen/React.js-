import {
  BrowserRouter,
  Routes,
  Route,
  Link,
  useLocation,
} from "react-router-dom";
import { useState } from "react";
import "./index.css";

const initialStudents = [
  {
    id: 1,
    name: "Ahmad",
    email: "ahmad@example.com",
    age: 20,
    course: "Java",
  },
];

function Students({ students }) {
  return (
    <div className="page">
      <h1>Students</h1>

      <Link className="button" to="/students">
        Register Student
      </Link>

      <div className="list">
        {students.map((student) => (
          <div className="card" key={student.id}>
            <h2>{student.name}</h2>
            <p>{student.course}</p>
            <p>Age: {student.age}</p>

            <Link to={`/students/${student.id}`}>
              View
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}

function Register({ onRegister }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [age, setAge] = useState("");
  const [course, setCourse] = useState("");
  const [errors, setErrors] = useState({});

  function handleSubmit(e) {
    e.preventDefault();

    const newErrors = {};

    if (name.trim().length < 3) {
      newErrors.name =
        "Name must be at least 3 characters.";
    }

    if (!email.includes("@")) {
      newErrors.email = "Enter a valid email.";
    }

    if (Number(age) < 16 || Number(age) > 60) {
      newErrors.age = "Age must be between 16 and 60.";
    }

    if (!course) {
      newErrors.course = "Select a course.";
    }

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      onRegister({
        name,
        email,
        age: Number(age),
        course,
      });

      setName("");
      setEmail("");
      setAge("");
      setCourse("");
    }
  }

  return (
    <div className="page">
      <h1>Register Student</h1>

      <form onSubmit={handleSubmit}>
        <label>Name</label>

        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        {errors.name && (
          <p className="error">{errors.name}</p>
        )}

        <label>Email</label>

        <input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        {errors.email && (
          <p className="error">{errors.email}</p>
        )}

        <label>Age</label>

        <input
          type="number"
          value={age}
          onChange={(e) => setAge(e.target.value)}
        />

        {errors.age && (
          <p className="error">{errors.age}</p>
        )}

        <label>Course</label>

        <select
          value={course}
          onChange={(e) => setCourse(e.target.value)}
        >
          <option value="">Select Course</option>
          <option value="React">React</option>
          <option value="Java">Java</option>
          <option value="JavaScript">
            JavaScript
          </option>
        </select>

        {errors.course && (
          <p className="error">{errors.course}</p>
        )}

        <button type="submit">
          Register
        </button>
      </form>
    </div>
  );
}

function StudentDetails({ students }) {
  const location = useLocation();

  const id = Number(
    location.pathname.split("/")[2]
  );

  const student = students.find(
    (student) => student.id === id
  );

  if (!student) {
    return <h1>Student not found</h1>;
  }

  return (
    <div className="page">
      <h1>{student.name}</h1>

      <p>Email: {student.email}</p>
      <p>Age: {student.age}</p>
      <p>Course: {student.course}</p>

      <Link to="/students">Back</Link>
    </div>
  );
}

export default function App() {
  const [students, setStudents] =
    useState(initialStudents);

  function handleRegister(student) {
    const newStudent = {
      ...student,
      id: students.length + 1,
    };

    setStudents([...students, newStudent]);
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={<Students students={students} />}
        />

        <Route
          path="/students"
          element={
            <Register
              onRegister={handleRegister}
            />
          }
        />

        <Route
          path="/students/:id"
          element={
            <StudentDetails students={students} />
          }
        />
      </Routes>
    </BrowserRouter>
  );
}