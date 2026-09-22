import ProductCard from "./ProductCard";

const products = [
  {
    imgURL: "img-1.jpg",
    name: "Laptop",
    price: 10000,
    description: "Dell Alienware X17 R2",
  },
  {
    imgURL: "img-2.jpg",
    name: "Phone",
    price: 100000,
    description: "IPhone 18 Pro Max Burgundy",
  },
  {
    imgURL: "img-3.jpg",
    name: "TV",
    price: 15000,
    description: "Samsung Brand New TV",
  },
  {
    imgURL: "img-4.jpg",
    name: "Car",
    price: 1800000,
    description: "2014 Lexus LS460 Sports Luxury Sedan",
  },
];

export default function ProductList({ onHandleAddToCart, onHandleAddOrder }) {
  return (
    <div className="h-100 w-auto items-center m-6 flex">
      {products.map((product, index) => (
        <ProductCard
          key={index}
          productDetails={product}
          onAddToCart={onHandleAddToCart}
          onAddOrder={onHandleAddOrder}
        />
      ))}
    </div>
  );
}
