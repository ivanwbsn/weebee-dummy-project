import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

interface Product {
  id: string;
  title: string;
  price: string;
  images: string[];
  description: string;
}

const ProductDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<Product | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    if (!id) {
      setError("Product ID is missing.");
      setLoading(false);
      return;
    }

    fetch(`https://api.escuelajs.co/api/v1/products/${id}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch product.");
        }
        return response.json();
      })
      .then((data) => {
        if (!data || !data.images || !Array.isArray(data.images)) {
          throw new Error("Invalid product data.");
        }
        setProduct(data);
        setError(null);
      })
      .catch((error) => {
        console.error('Error fetching product:', error);
        setError(error.message);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [id]);

  if (loading) {
    return <div className="text-center text-blue-600">Loading...</div>;
  }

  if (error) {
    return <div className="text-center text-red-600">{error}</div>;
  }

  if (!product) {
    return <div className="text-center text-red-600">Product not found.</div>;
  }

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-md rounded-lg mt-10">
      <div className="flex flex-col md:flex-row items-center">
        <img
          src={product.images.length > 0 ? product.images[0] : '/placeholder.png'}
          alt={product.title}
          className="w-64 h-64 object-cover rounded-md mb-6 md:mb-0 md:mr-6"
        />
        <div className="flex-1">
          <h1 className="text-3xl font-bold text-gray-800 mb-4">{product.title}</h1>
          <p className="text-gray-600 text-lg mb-4">{`$${product.price}`}</p>
          <p className="text-gray-700 mb-6">{product.description}</p>
          <button className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700">
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
