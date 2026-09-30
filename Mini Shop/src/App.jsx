import { BrowserRouter, Routes, Route, Link, useParams } from "react-router-dom";
import { useState } from "react";
import "./index.css";

const products = [
  { id: 1, name: "Laptop", price: 800, description: "Powerful laptop for programming." },
  { id: 2, name: "Phone", price: 500, description: "Modern smartphone." },
  { id: 3, name: "Headphones", price: 100, description: "Wireless headphones." },
];

function Header({ cart }) {
  return (
    <nav>
      <Link to="/">Home</Link>
      <Link to="/products">Products</Link>
      <Link to="/cart">Cart ({cart.length})</Link>
    </nav>
  );
}

function Home() {
  return (
    <div className="page">
      <h1>Mini Shop</h1>
      <p>Welcome to our small shop.</p>
      <Link className="button" to="/products">
        View Products
      </Link>
    </div>
  );
}

function Products() {
  return (
    <div className="page">
      <h1>Products</h1>

      <div className="grid">
        {products.map((product) => (
          <div className="card" key={product.id}>
            <h2>{product.name}</h2>
            <p>${product.price}</p>

            <Link to={`/products/${product.id}`}>
              Details
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}

function ProductDetails({ onAdd }) {
  const { id } = useParams();

  const product = products.find(
    (product) => product.id === Number(id)
  );

  if (!product) return <h1>Product not found</h1>;

  return (
    <div className="page">
      <h1>{product.name}</h1>
      <h2>${product.price}</h2>
      <p>{product.description}</p>

      <button onClick={() => onAdd(product)}>
        Add to Cart
      </button>
    </div>
  );
}

function Cart({ cart }) {
  return (
    <div className="page">
      <h1>Cart</h1>

      {cart.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        cart.map((product) => (
          <div className="card" key={product.id}>
            {product.name} - ${product.price}
          </div>
        ))
      )}
    </div>
  );
}

export default function App() {
  const [cart, setCart] = useState([]);

  function handleAdd(product) {
    setCart([...cart, product]);
  }

  return (
    <BrowserRouter>
      <Header cart={cart} />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/products" element={<Products />} />
        <Route
          path="/products/:id"
          element={<ProductDetails onAdd={handleAdd} />}
        />
        <Route path="/cart" element={<Cart cart={cart} />} />
      </Routes>
    </BrowserRouter>
  );
}