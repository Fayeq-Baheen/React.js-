import { useState } from "react";
import "./index.css";

const products = [
  { id: 1, name: "Laptop", price: 800 },
  { id: 2, name: "Phone", price: 500 },
  { id: 3, name: "Mouse", price: 30 },
];

function ProductCard({ product, quantity, onAdd }) {
  return (
    <div className="product-card">
      <div>
        <h2>{product.name}</h2>
        <p>${product.price}</p>
      </div>

      <button onClick={() => onAdd(product.id)}>
        Add to Cart
      </button>

      {quantity > 0 && (
        <span className="quantity">
          x{quantity}
        </span>
      )}
    </div>
  );
}

function ProductList({
  products,
  cart,
  onAdd,
}) {
  return (
    <div className="product-list">
      {products.map((product) => {
        const item = cart.find(
          (item) => item.id === product.id
        );

        return (
          <ProductCard
            key={product.id}
            product={product}
            quantity={item ? item.quantity : 0}
            onAdd={onAdd}
          />
        );
      })}
    </div>
  );
}

function Cart({
  cart,
  products,
  onIncrease,
  onDecrease,
}) {
  const total = cart.reduce((sum, item) => {
    const product = products.find(
      (product) => product.id === item.id
    );

    return sum + product.price * item.quantity;
  }, 0);

  return (
    <div className="cart">
      <h2>Cart</h2>

      {cart.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <>
          {cart.map((item) => {
            const product = products.find(
              (product) => product.id === item.id
            );

            return (
              <div className="cart-item" key={item.id}>
                <span>
                  {product.name} x{item.quantity}
                </span>

                <div>
                  <button
                    onClick={() =>
                      onDecrease(item.id)
                    }
                  >
                    -
                  </button>

                  <button
                    onClick={() =>
                      onIncrease(item.id)
                    }
                  >
                    +
                  </button>
                </div>
              </div>
            );
          })}

          <h3>Total: ${total}</h3>
        </>
      )}
    </div>
  );
}

export default function App() {
  const [cart, setCart] = useState([]);

  function handleAdd(id) {
    const existing = cart.find(
      (item) => item.id === id
    );

    if (existing) {
      setCart(
        cart.map((item) =>
          item.id === id
            ? {
                ...item,
                quantity: item.quantity + 1,
              }
            : item
        )
      );
    } else {
      setCart([
        ...cart,
        {
          id: id,
          quantity: 1,
        },
      ]);
    }
  }

  function handleIncrease(id) {
    setCart(
      cart.map((item) =>
        item.id === id
          ? {
              ...item,
              quantity: item.quantity + 1,
            }
          : item
      )
    );
  }

  function handleDecrease(id) {
    setCart(
      cart
        .map((item) =>
          item.id === id
            ? {
                ...item,
                quantity: item.quantity - 1,
              }
            : item
        )
        .filter((item) => item.quantity > 0)
    );
  }

  return (
    <div className="container">
      <h1>Shopping Cart</h1>

      <ProductList
        products={products}
        cart={cart}
        onAdd={handleAdd}
      />

      <Cart
        cart={cart}
        products={products}
        onIncrease={handleIncrease}
        onDecrease={handleDecrease}
      />
    </div>
  );
}