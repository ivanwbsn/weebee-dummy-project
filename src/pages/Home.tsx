import React, { useEffect, useState } from 'react';
import Sidebar from '../components/Sidebar';
import ProductCard from '../components/ProductCard';

interface Product {
  id: string;
  title: string;
  price: string;
  images: string[];
  category: { id: string; name: string };
  quantity: number;
}

interface Category {
  id: string;
  name: string;
}

const Home: React.FC<{ onAddToCart: (product: Product) => void }> = ({ onAddToCart }) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([{ id: 'all', name: 'All' }]);

  useEffect(() => {
    fetch('https://api.escuelajs.co/api/v1/products')
      .then((response) => response.json())
      .then((data: Product[]) => {
        setProducts(data);
        setFilteredProducts(data);

        const uniqueCategories = [
          { id: 'all', name: 'All' },
          ...Array.from(
            new Map(
              data.map((product) => [
                product.category.id,
                { id: product.category.id, name: product.category.name },
              ])
            ).values()
          ),
        ];
        setCategories(uniqueCategories);
      })
      .catch((error) => console.error('Error fetching products:', error));
  }, []);

  const handleCategorySelect = (categoryName: string) => {
    if (categoryName === 'All') {
      setFilteredProducts(products);
    } else {
      setFilteredProducts(
        products.filter((product) => product.category.name === categoryName)
      );
    }
  };

  return (
    <div className="flex bg-gray-100 min-h-screen">
      <Sidebar categories={categories} onCategorySelect={handleCategorySelect} />
      <main className="flex-1 p-6">
        <h1 className="text-2xl font-bold text-gray-800 mb-6">Product List</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProducts.map((product) => (
            <div key={product.id}>
              <ProductCard
                title={product.title}
                price={`$${product.price}`}
                image={product.images[0]}
                time="Recently Added"
                onAddToCart={() => onAddToCart({ ...product, quantity: 1 })}
              />
            </div>
          ))}
        </div>
      </main>
    </div>
  );
};

export default Home;