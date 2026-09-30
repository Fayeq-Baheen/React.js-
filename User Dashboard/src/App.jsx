import { BrowserRouter, Routes, Route, Link, Outlet } from "react-router-dom";
import { useState } from "react";
import "./index.css";

function Layout() {
  return (
    <div className="layout">
      <aside>
        <h2>Dashboard</h2>

        <Link to="/">Home</Link>
        <Link to="/profile">Profile</Link>
        <Link to="/settings">Settings</Link>
      </aside>

      <main>
        <Outlet />
      </main>
    </div>
  );
}

function Dashboard() {
  return (
    <>
      <h1>Welcome!</h1>
      <p>This is your dashboard.</p>
    </>
  );
}

function Profile() {
  return (
    <>
      <h1>Profile</h1>
      <p>Name: Ahmad</p>
      <p>Role: Student</p>
    </>
  );
}

function Settings() {
  const [darkMode, setDarkMode] = useState(false);
  const [notifications, setNotifications] = useState(true);

  return (
    <div className={darkMode ? "dark settings" : "settings"}>
      <h1>Settings</h1>

      <label>
        <input
          type="checkbox"
          checked={darkMode}
          onChange={() => setDarkMode(!darkMode)}
        />
        Dark Mode
      </label>

      <br />

      <label>
        <input
          type="checkbox"
          checked={notifications}
          onChange={() => setNotifications(!notifications)}
        />
        Notifications
      </label>
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Dashboard />} />
          <Route path="profile" element={<Profile />} />
          <Route path="settings" element={<Settings />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
