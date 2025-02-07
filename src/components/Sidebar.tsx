'use client';

import { Category } from '../types';

interface SidebarProps {
  categories: Category[];
  onSelectCategory: (categoryId: string) => void;
  onSort: (sortBy: string) => void;
}

const Sidebar = ({ categories, onSelectCategory, onSort }: SidebarProps) => {
  return (
    <div className="w-64 bg-white dark:bg-gray-800 border-r border-gray-200 p-4 h-screen">
      <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-4">Filters</h2>

      {/* Category Filter */}
      <div className="mb-4">
        <label htmlFor="category" className="block text-gray-700 dark:text-gray-200 mb-2">Category</label>
        <select
          id="category"
          className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500"
          onChange={(e) => onSelectCategory(e.target.value)}
        >
          <option value="">All Categories</option>
          {categories.map((category) => (
            <option key={category.id} value={category.id.toString()}>
              {category.name}
            </option>
          ))}
        </select>
      </div>

      {/* Sort By Filter */}
      <div>
        <label htmlFor="sortBy" className="block text-gray-700 dark:text-gray-200 mb-2">Sort By</label>
        <select
          id="sortBy"
          className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500"
          onChange={(e) => onSort(e.target.value)}
        >
          <option value="">None</option>
          <option value="priceLowHigh">Price: Low to High</option>
          <option value="priceHighLow">Price: High to Low</option>
          <option value="nameAToZ">Name: A to Z</option>
          <option value="nameZToA">Name: Z to A</option>
        </select>
      </div>
    </div>
  );
};

export default Sidebar;
