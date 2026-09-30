export default function Cart({ budget, showLowBudgetMessage }) {
  return (
    <div className="flex flex-row justify-between items-center w-150 text-xl border rounded-xl h-20 bg-gray-200 p-4 m-8">
      <h2 className="">Shopping Cart: </h2>
      <p className="">{budget} AFN</p>
      {showLowBudgetMessage && (
        <p>Insufficient budget to add this product to the cart.</p>
      )}
    </div>
  );
}
