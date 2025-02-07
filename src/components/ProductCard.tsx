'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { Product } from '@/types';

interface ProductCardProps {
  product: Product;
  onAddToCart: (product: Product) => void;
}

const ProductCard = ({ product, onAddToCart }: ProductCardProps) => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow hover:shadow-lg transition-shadow dark:border dark:border-gray-700">
      <div className="relative h-64">
        {(() => {
          try {
            const url = product.images[0];
            if (url && url.startsWith('http')) {
              return (
                <Image
                  src={url}
                  alt={product.title}
                  fill
                  className="object-contain"
                />
              );
            } else {
              return (
                <div className="w-full h-full flex items-center justify-center bg-gray-100 dark:bg-gray-600">
                  <span className="text-gray-400 dark:text-gray-300">No Image</span>
                </div>
              );
            }
          } catch {
            return (
              <div className="w-full h-full flex items-center justify-center bg-gray-100 dark:bg-gray-600">
                <span className="text-gray-400 dark:text-gray-300">No Image</span>
              </div>
            );
          }
        })()}
      </div>
      <div className="p-4">
        <h3 className="font-semibold text-lg mb-2 text-gray-800 dark:text-gray-200">{product.title}</h3>
        <div className="flex items-center justify-between">
          <span className="text-xl font-bold text-gray-800 dark:text-gray-100">${product.price}</span>
          <button
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors duration-200 active:bg-blue-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            onClick={(e) => {
              e.preventDefault();
              onAddToCart(product);
            }}
          >
            Add to cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
