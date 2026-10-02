import {
  BrowserRouter,
  Routes,
  Route,
  Link,
  useNavigate,
} from "react-router-dom";
import { useState } from "react";
import "./index.css";

const products = [
  { id: 1, name: "Laptop", price: 800 },
  { id: 2, name: "Mouse", price: 30 },
];

function Cart() {
  return (
    <div className="page">
      <h1>Your Cart</h1>

      <div className="card">
        <p>Laptop x1 ........ $800</p>
        <p>Mouse x2 ........ $60</p>
        <hr />
        <h2>Total: $860</h2>
      </div>

      <Link className="button" to="/checkout">
        Checkout
      </Link>
    </div>
  );
}

function Checkout() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    address: "",
    city: "",
    phone: "",
  });

  const [errors, setErrors] = useState({});

  function handleChange(e) {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  }

  function handleSubmit(e) {
    e.preventDefault();

    const newErrors = {};

    if (form.name.trim() === "") {
      newErrors.name = "Name is required.";
    }

    if (!form.email.includes("@") || !form.email.includes(".")) {
      newErrors.email = "Invalid email.";
    }

    if (form.address.trim().length < 10) {
      newErrors.address = "Address must be at least 10 characters.";
    }

    if (form.city.trim() === "") {
      newErrors.city = "City is required.";
    }

    if (!/^\d{10,}$/.test(form.phone)) {
      newErrors.phone = "Phone must contain at least 10 digits.";
    }

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      navigate("/success");
    }
  }

  return (
    <div className="page">
      <h1>Checkout</h1>

      <form onSubmit={handleSubmit}>
        <label>Full Name</label>

        <input name="name" value={form.name} onChange={handleChange} />

        {errors.name && <p className="error">{errors.name}</p>}

        <label>Email</label>

        <input name="email" value={form.email} onChange={handleChange} />

        {errors.email && <p className="error">{errors.email}</p>}

        <label>Address</label>

        <input name="address" value={form.address} onChange={handleChange} />

        {errors.address && <p className="error">{errors.address}</p>}

        <label>City</label>

        <input name="city" value={form.city} onChange={handleChange} />

        {errors.city && <p className="error">{errors.city}</p>}

        <label>Phone</label>

        <input name="phone" value={form.phone} onChange={handleChange} />

        {errors.phone && <p className="error">{errors.phone}</p>}

        <button type="submit">Place Order</button>
      </form>
    </div>
  );
}

function Success() {
  return (
    <div className="page success">
      <h1>✅ Order Placed!</h1>

      <p>Your order has been successfully placed.</p>

      <h2>Total: $860</h2>

      <Link to="/cart">Back to Cart</Link>
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Cart />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/success" element={<Success />} />
      </Routes>
    </BrowserRouter>
  );
}
