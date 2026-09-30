import {
  BrowserRouter,
  Routes,
  Route,
  Link,
  useLocation,
} from "react-router-dom";
import { useState } from "react";
import "./index.css";

const courses = [
  {
    id: 1,
    title: "React",
    teacher: "John",
    progress: 60,
  },
  {
    id: 2,
    title: "JavaScript",
    teacher: "Alex",
    progress: 80,
  },
  {
    id: 3,
    title: "HTML & CSS",
    teacher: "Sarah",
    progress: 100,
  },
];

function Sidebar() {
  return (
    <aside>
      <h2>Student</h2>

      <Link to="/dashboard">Dashboard</Link>
      <Link to="/courses">Courses</Link>
      <Link to="/assignments">Assignments</Link>
      <Link to="/profile">Profile</Link>
    </aside>
  );
}

function Dashboard() {
  return (
    <div className="page">
      <h1>Dashboard</h1>
      <p>Welcome to your student dashboard.</p>
    </div>
  );
}

function Courses() {
  return (
    <div className="page">
      <h1>Courses</h1>

      {courses.map((course) => (
        <div className="card" key={course.id}>
          <h2>{course.title}</h2>

          <p>Teacher: {course.teacher}</p>

          <p>Progress: {course.progress}%</p>

          <Link to={`/courses/${course.id}`}>
            Open
          </Link>
        </div>
      ))}
    </div>
  );
}

function CourseDetails({ progress, onProgress }) {
  const location = useLocation();

  // Example: /courses/2
  const id = Number(
    location.pathname.split("/")[2]
  );

  const course = courses.find(
    (course) => course.id === id
  );

  if (!course) {
    return <h1>Course not found</h1>;
  }

  const completed = progress === 100;

  return (
    <div className="page">
      <h1>{course.title}</h1>

      <p>Teacher: {course.teacher}</p>

      <div className="progress">
        <div
          style={{
            width: `${progress}%`,
          }}
        ></div>
      </div>

      <p>Progress: {progress}%</p>

      {completed ? (
        <h3>✅ Completed</h3>
      ) : (
        <button onClick={onProgress}>
          +10% Progress
        </button>
      )}
    </div>
  );
}

function Assignments() {
  return (
    <div className="page">
      <h1>Assignments</h1>

      <p>React Assignment - Pending</p>
      <p>JavaScript Assignment - Done</p>
    </div>
  );
}

function Profile() {
  return (
    <div className="page">
      <h1>Profile</h1>

      <p>Name: Fayeq</p>
      <p>Role: Student</p>
    </div>
  );
}

function AppLayout() {
  return (
    <div className="layout">
      <Sidebar />

      <main>
        <Routes>
          <Route
            path="/dashboard"
            element={<Dashboard />}
          />

          <Route
            path="/courses"
            element={<Courses />}
          />

          <Route
            path="/courses/:id"
            element={<CoursePage />}
          />

          <Route
            path="/assignments"
            element={<Assignments />}
          />

          <Route
            path="/profile"
            element={<Profile />}
          />
        </Routes>
      </main>
    </div>
  );
}

function CoursePage() {
  const [progress, setProgress] = useState(() => {
    const location = window.location.pathname;

    const id = Number(
      location.split("/")[2]
    );

    const course = courses.find(
      (course) => course.id === id
    );

    return course ? course.progress : 0;
  });

  function handleProgress() {
    setProgress(
      Math.min(progress + 10, 100)
    );
  }

  return (
    <CourseDetails
      progress={progress}
      onProgress={handleProgress}
    />
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <AppLayout />
    </BrowserRouter>
  );
}