export default function ProductCard({ productDetails, onAddToCart, onAddOrder }) {
  return (
    <div className="h-full w-full flex flex-col justify-center border-2 border-gray-300 bg-slate-100 rounded-lg gap-1 p-2 m-2  shadow-lg shadow-gray-400 hover:scale-105 transition-all duration-300">
      <img
        src={productDetails.imgURL}
        className="w-full h-50 object-cover flex flex-col rounded-sm"
      />
      <h2 className="text-xl p-1">{productDetails.name}</h2>
      <h3 className="text-lg font-bold p-1">{productDetails.price}</h3>
      <p className="pt-2 pb-2">{productDetails.description}</p>
      <button
        className="bg-blue-500 text-white p-2 rounded-lg hover:bg-blue-600 hover:cursor-pointer"
        onClick={() => {
            onAddToCart(productDetails.price)
            onAddOrder(productDetails)
        }}
      >
        Add To Cart
      </button>
    </div>
  );
}
