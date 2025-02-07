'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { fetchProduct } from '@/services/api';
import { Product } from '@/types';
import { useCart } from '../../../context/CartContext';
import Image from 'next/image';

interface Props {
  params: {
    id: string;
  };
}

const ProductPage = ({ params }: Props) => {
  const { id } = params;
  const { addToCart, updateCartQuantity, cartItems } = useCart();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [quantity, setQuantity] = useState(1);
  const router = useRouter();

  useEffect(() => {
    const fetchProductData = async () => {
      try {
        const data = await fetchProduct(id);
        setProduct(data);
      } catch {
        setError('Failed to fetch product');
      } finally {
        setLoading(false);
      }
    };

    fetchProductData();
  }, [id]);

  const handleAddToCart = () => {
    if (product) {
      const itemExists = cartItems.find(item => item.id === product.id);
      if (itemExists) {
        updateCartQuantity(product.id, quantity);
      } else {
        addToCart({
          ...product,
          image: product.images[0] || '/default-image.jpg', // Ensure the image property is set
          quantity
        });
      }
      router.push('/cart');
    }
  };

  const handleQuantityChange = (change: number) => {
    if (quantity + change >= 1) {
      setQuantity(quantity + change);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  if (!product) {
    return <div>Product not found</div>;
  }

  return (
    <div className="container mx-auto px-4 py-20">
      <h1 className="text-3xl font-bold mb-8">{product.title}</h1>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Product Image */}
        <div className="relative w-full h-80 lg:h-96">
          <Image
            src={product.images[0] || '/default-image.jpg'}
            alt={product.title}
            width={500}
            height={500}
            className="object-contain w-full h-full rounded-lg"
          />
        </div>

        {/* Product Info */}
        <div>
          <h2 className="text-xl font-semibold">${product.price}</h2>
          <p className="text-gray-600">{product.category.name}</p>
          <p className="text-gray-800 mt-4">{product.description}</p>

          {/* Quantity Selection */}
          <div className="mt-4">
            <div className="flex items-center">
              <button
                className="text-2xl font-bold"
                onClick={() => handleQuantityChange(-1)}
              >
                -
              </button>
              <span className="mx-4 text-lg">{quantity}</span>
              <button
                className="text-2xl font-bold"
                onClick={() => handleQuantityChange(1)}
              >
                +
              </button>
            </div>
          </div>

          {/* Add to Cart Button */}
          <button
            onClick={handleAddToCart}
            className="mt-6 bg-blue-600 text-white py-3 px-6 rounded-lg hover:bg-blue-700"
          >
            Add to Cart
          </button>

          {/* Product Info */}
          <div className="mt-6">
            <h3 className="font-semibold">Free Shipping on orders over $100</h3>
            <p className="text-sm text-gray-500">30-day return policy</p>
          </div>
        </div>
      </div>

      {/* Product Tabs (Description, Reviews, Shipping) */}
      <div className="mt-8">
        <div className="flex border-b">
          <button className="px-6 py-2 text-sm font-medium">Description</button>
          <button className="px-6 py-2 text-sm font-medium">Reviews</button>
          <button className="px-6 py-2 text-sm font-medium">Shipping</button>
        </div>
        <div className="mt-4">
          <p>{product.description}</p>
        </div>
      </div>
    </div>
  );
};

export default ProductPage;
