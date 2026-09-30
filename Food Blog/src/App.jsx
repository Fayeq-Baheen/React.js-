import { useState } from "react";
import "./index.css";

const expenses = [
  { id: 1, title: "Food", amount: 15 },
  { id: 2, title: "Transport", amount: 10 },
  { id: 3, title: "Coffee", amount: 5 },
];

function ExpenseCard({ expense, onIncrease }) {
  return (
    <div className="expense-card">
      <div>
        <h2>{expense.title}</h2>
        <p>${expense.amount}</p>
      </div>

      <button onClick={() => onIncrease(expense.id)}>+</button>
    </div>
  );
}

function ExpenseList({ expenses, onIncrease }) {
  return (
    <div className="expense-list">
      {expenses.map((expense) => (
        <ExpenseCard
          key={expense.id}
          expense={expense}
          onIncrease={onIncrease}
        />
      ))}
    </div>
  );
}

export default function App() {
  const [items, setItems] = useState(expenses);

  function handleIncrease(id) {
    setItems(
      items.map((item) =>
        item.id === id
          ? { ...item, amount: item.amount + 1 }
          : item
      )
    );
  }

  const total = items.reduce(
    (sum, item) => sum + item.amount,
    0
  );

  return (
    <div className="container">
      <h1>My Expenses</h1>

      <ExpenseList
        expenses={items}
        onIncrease={handleIncrease}
      />

      <h2 className="total">Total: ${total}</h2>
    </div>
  );
}