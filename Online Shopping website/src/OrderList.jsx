export default function OrderList({ orders }) {
  return (
    <div className="h-full w-auto items-center m-6 grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
      {orders.map((order, index) => (
        <div key={index} className="pl-6 h-35 p-4 m-2 rounded-lg shadow-lg shadow-gray-400 bg-slate-100 hover:scale-105 transition-all duration-300">
          <h3 className="text-xl font-bold">{order.name}</h3>
          <p className="font-semibold mt-1">Price: {order.price} AFN</p>
          <p className="text-gray-600 mt-2">Description: {order.description}</p>
        </div>
      ))}
    </div>
  );
}
