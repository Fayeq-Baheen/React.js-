import { useState } from "react";
import "./index.css";

const initialProducts = [
  { id: 1, name: "Laptop", rating: 0 },
  { id: 2, name: "Phone", rating: 0 },
  { id: 3, name: "Headphones", rating: 0 },
];

function ProductCard({ product, onRate }) {
  return (
    <div className="product-card">
      <h2>{product.name}</h2>

      <div className="stars">
        {[1, 2, 3, 4, 5].map((star) => (
          <button
            key={star}
            onClick={() =>
              onRate(product.id, star)
            }
          >
            {star <= product.rating ? "★" : "☆"}
          </button>
        ))}
      </div>

      <p>
        Rating: {product.rating} / 5
      </p>
    </div>
  );
}

function ProductList({ products, onRate }) {
  return (
    <div className="product-list">
      {products.map((product) => (
        <ProductCard
          key={product.id}
          product={product}
          onRate={onRate}
        />
      ))}
    </div>
  );
}

export default function App() {
  const [products, setProducts] =
    useState(initialProducts);

  function handleRate(id, rating) {
    setProducts(
      products.map((product) =>
        product.id === id
          ? { ...product, rating: rating }
          : product
      )
    );
  }

  const ratedProducts = products.filter(
    (product) => product.rating > 0
  );

  const average =
    ratedProducts.length === 0
      ? 0
      : ratedProducts.reduce(
          (sum, product) =>
            sum + product.rating,
          0
        ) / ratedProducts.length;

  return (
    <div className="container">
      <h1>Product Reviews</h1>

      <ProductList
        products={products}
        onRate={handleRate}
      />

      <div className="average">
        Average Rating: {average.toFixed(1)} ⭐
      </div>
    </div>
  );
}