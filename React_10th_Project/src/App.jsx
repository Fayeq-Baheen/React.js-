import ProductList from "./ProductList";
import Basket from "./Basket";
import { useState } from "react";

function App() {
  const [basket, setBasket] = useState([])

  function addToBasket(product){
    setBasket([...basket, product])
  }

  function deleteFromBasket(id){
    setBasket(basket.filter(item => {
      return item.id !== id
    }))
  }

  const totalPrice = basket.reduce((price, item) => price += item.price, 0)

  return (
    <div className="app">
      <header>
        <h1>Shopping Basket</h1>
        <p>Simple React Shopping Application</p>
      </header>

      <main className="shop-container">
        <ProductList onAddItem={addToBasket} />
        <Basket basket={basket} onDeleteItem={deleteFromBasket} totalPrice={totalPrice} />
      </main>
    </div>
  );
}

export default App;
