import React from 'react';

interface CartProps {
  cart: { id: string; title: string; price: string; quantity: number }[];
  onRemoveFromCart: (id: string) => void;
  onUpdateQuantity: (id: string, quantity: number) => void;
}

const Cart: React.FC<CartProps> = ({ cart, onRemoveFromCart, onUpdateQuantity }) => {
  return (
    <div className="max-w-6xl mx-auto p-6">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">Shopping Cart</h1>
      {cart.length === 0 ? (
        <p>Your cart is currently empty.</p>
      ) : (
        <ul className="space-y-4">
          {cart.map((item) => (
            <li key={item.id} className="p-4 bg-white shadow-md rounded">
              <h2 className="text-lg font-bold">{item.title}</h2>
              <p>{item.price}</p>
              <div className="flex items-center space-x-4">
                <button
                  className="bg-red-600 text-white px-2 py-1 rounded hover:bg-red-700"
                  onClick={() => onRemoveFromCart(item.id)}
                >
                  Remove
                </button>
                <div className="flex items-center space-x-2">
                  <button
                    className="bg-gray-300 px-2 py-1 rounded"
                    onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}
                    disabled={item.quantity <= 1}
                  >
                    -
                  </button>
                  <span>{item.quantity}</span>
                  <button
                    className="bg-gray-300 px-2 py-1 rounded"
                    onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
                  >
                    +
                  </button>
                </div>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Cart;
