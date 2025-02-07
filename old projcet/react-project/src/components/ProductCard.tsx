import React from 'react';

interface ProductCardProps {
  title: string;
  price: string;
  image: string;
  time: string;
  onAddToCart: () => void;
  onProductClick: () => void; // Add this prop
}

const ProductCard: React.FC<ProductCardProps> = ({
  title,
  price,
  image,
  time,
  onAddToCart,
  onProductClick,
}) => {
  return (
    <div
      className="border rounded-md p-4 shadow-md cursor-pointer"
      onClick={onProductClick} // Trigger navigation
    >
      <img src={image} alt={title} className="w-full h-48 object-cover mb-4 rounded-md" />
      <h2 className="font-bold text-lg">{title}</h2>
      <p className="text-gray-600">{price}</p>
      <p className="text-sm text-gray-400">{time}</p>
      <button
        className="mt-4 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        onClick={(e) => {
          e.stopPropagation(); // Prevent navigation
          onAddToCart();
        }}
      >
        Add to Cart
      </button>
    </div>
  );
};

export default ProductCard;
