'use client';

import { useEffect, useState } from 'react';
import ProductGrid from '../components/ProductGrid';
import Sidebar from '../components/Sidebar';
import { Product, Category } from '../types';
import { fetchProducts, fetchCategories } from '../services/api';
import { useCart } from '../context/CartContext';

export default function Home() {
  const { addToCart } = useCart();
  const [mounted, setMounted] = useState(false);
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentSort, setCurrentSort] = useState('');
  
  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;

    const loadData = async () => {
      try {
        const [productsData, categoriesData] = await Promise.all([
          fetchProducts(),
          fetchCategories(),
        ]);
        setProducts(productsData);
        setCategories(categoriesData);
        setFilteredProducts(productsData); // Initially display all products
      } catch {
        setError('Failed to load data');
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, [mounted]);

  const handleAddToCart = (product: Product) => {
    addToCart({
      id: product.id,
      title: product.title,
      price: product.price,
      image: product.images[0] || null,
      quantity: 1,
    });
  };

  const sortProducts = (productsToSort: Product[], sortBy: string): Product[] => {
    if (!sortBy) return productsToSort;
    
    return [...productsToSort].sort((a, b) => {
      switch (sortBy) {
        case 'priceLowHigh':
          return a.price - b.price;
        case 'priceHighLow':
          return b.price - a.price;
        case 'nameAToZ':
          return a.title.localeCompare(b.title);
        case 'nameZToA':
          return b.title.localeCompare(a.title);
        default:
          return 0;
      }
    });
  };

  const handleSelectCategory = (categoryId: string) => {
    // Filter the products based on the selected category
    const filtered = categoryId === '' 
      ? products 
      : products.filter(p => p.category.id.toString() === categoryId);

    // Sort the filtered products
    const sorted = sortProducts(filtered, currentSort);
    setFilteredProducts(sorted);
  };

  const handleSort = (sortBy: string) => {
    setCurrentSort(sortBy);

    // Apply sorting to the current filtered products
    const sortedProducts = sortProducts(filteredProducts, sortBy);
    setFilteredProducts(sortedProducts);
  };

  if (!mounted || loading) {
    return <div className="text-center py-10">Loading...</div>;
  }

  if (error) {
    return <div className="text-center py-10 text-red-600">{error}</div>;
  }

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 transition-all duration-300">
      <div className="flex bg-gray-50 pt-16 dark:bg-gray-800">
        <Sidebar
          categories={categories}
          onSelectCategory={handleSelectCategory}
          onSort={handleSort}
        />
        <ProductGrid
          products={filteredProducts}
          onAddToCart={handleAddToCart}
        />
      </div>
    </div>
  );
}
