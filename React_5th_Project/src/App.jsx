import Header from "./Header";
import ProductList from "./ProductList";
import Cart from "./Cart";
import Footer from "./Footer";
import OrderList from "./OrderList";
import { useState } from "react";

export default function App() {
  const [budget, setBudget] = useState(3000000);
  const [showLowBudgetMessage, setShowLowBudgetMessage] = useState(false);
  const [orders, setOrders] = useState([]);

  function handleAddToCart(price) {
    if (budget >= price) {
      setBudget(budget - price);
      setShowLowBudgetMessage(false);
    } else {
      setShowLowBudgetMessage(true);
    }
  }

  function handleAddOrder(order) {
    setOrders([...orders, order]);
  }

  return (
    <div>
      <Header />
      <ProductList onHandleAddToCart={handleAddToCart} onHandleAddOrder={handleAddOrder} />
      <Cart budget={budget} showLowBudgetMessage={showLowBudgetMessage} />
      <OrderList orders={orders} />
      <Footer />
    </div>
  );
}
