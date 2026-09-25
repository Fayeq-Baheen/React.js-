import { useState } from "react";
import "./index.css";

const foods = [
  { id: 1, name: "Burger", price: 5 },
  { id: 2, name: "Pizza", price: 8 },
  { id: 3, name: "Fries", price: 3 },
];

function FoodCard({ food, quantity, onIncrease, onDecrease }) {
  return (
    <div className="food-card">
      <div>
        <h2>{food.name}</h2>
        <p>${food.price}</p>
      </div>

      <div className="quantity-controls">
        <button onClick={() => onDecrease(food.id)}>
          -
        </button>

        <span>{quantity}</span>

        <button onClick={() => onIncrease(food.id)}>
          +
        </button>
      </div>
    </div>
  );
}

function FoodList({
  foods,
  order,
  onIncrease,
  onDecrease,
}) {
  return (
    <div className="food-list">
      {foods.map((food) => {
        const item = order.find(
          (item) => item.id === food.id
        );

        return (
          <FoodCard
            key={food.id}
            food={food}
            quantity={item ? item.quantity : 0}
            onIncrease={onIncrease}
            onDecrease={onDecrease}
          />
        );
      })}
    </div>
  );
}

function OrderSummary({ order, foods }) {
  const selectedItems = order.filter(
    (item) => item.quantity > 0
  );

  const total = selectedItems.reduce(
    (sum, item) => {
      const food = foods.find(
        (food) => food.id === item.id
      );

      return sum + food.price * item.quantity;
    },
    0
  );

  return (
    <div className="summary">
      <h2>Order Summary</h2>

      {selectedItems.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <>
          {selectedItems.map((item) => {
            const food = foods.find(
              (food) => food.id === item.id
            );

            return (
              <div className="summary-item" key={item.id}>
                <span>
                  {food.name} x{item.quantity}
                </span>

                <span>
                  ${food.price * item.quantity}
                </span>
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
  const [order, setOrder] = useState(
    foods.map((food) => ({
      id: food.id,
      quantity: 0,
    }))
  );

  function handleIncrease(id) {
    setOrder(
      order.map((item) =>
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
    setOrder(
      order.map((item) =>
        item.id === id && item.quantity > 0
          ? {
              ...item,
              quantity: item.quantity - 1,
            }
          : item
      )
    );
  }

  return (
    <div className="container">
      <h1>Food Order</h1>

      <FoodList
        foods={foods}
        order={order}
        onIncrease={handleIncrease}
        onDecrease={handleDecrease}
      />

      <OrderSummary
        order={order}
        foods={foods}
      />
    </div>
  );
}