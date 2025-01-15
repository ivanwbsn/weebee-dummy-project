import React from 'react';

interface ProductCardProps {
  title: string;
  price: string;
  image: string;
  time: string;
  onAddToCart: () => void;
}

const ProductCard: React.FC<ProductCardProps> = ({ title, price, image, time, onAddToCart }) => {
  return (
    <div className="bg-white shadow-md rounded-lg p-4 flex flex-col items-center">
      <img src={image} alt={title} className="h-40 w-full object-cover rounded-md mb-4" />
      <h3 className="text-lg font-semibold text-gray-800 mb-2">{title}</h3>
      <p className="text-gray-500 mb-2">{price}</p>
      <p className="text-gray-400 text-sm mb-4">{time}</p>
      <button
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        onClick={onAddToCart}
      >
        Add to Cart
      </button>
    </div>
  );
};

export default ProductCard;
