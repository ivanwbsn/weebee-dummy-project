'use client';
import ProductCard from './ProductCard';
import { Product } from '../types';

interface ProductGridProps {
  products: Product[];
  onAddToCart: (product: Product) => void; // Correct type here
}

const ProductGrid = ({ products, onAddToCart }: ProductGridProps) => {
  if (!products.length) {
    return <div className="text-center py-10">No products found</div>;
  }

  return (
    <div className="flex-1 px-4 py-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
        {products.map((product) => (
          <ProductCard 
            key={product.id} 
            product={product}
            onAddToCart={() => onAddToCart(product)} // Pass the product to the function
          />
        ))}
      </div>
    </div>
  );
};

export default ProductGrid;
