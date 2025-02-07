import React from 'react';

interface SidebarProps {
  categories: { id: string; name: string }[];
  onCategorySelect: (category: string) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ categories, onCategorySelect }) => {
  return (
    <aside className="w-64 bg-white shadow-md p-4">
      <h2 className="text-lg font-semibold text-gray-700 mb-4">Categories</h2>
      <ul className="space-y-2">
        {categories.map((category) => (
          <li key={category.id}>
            <button
              className="w-full text-left text-gray-600 hover:text-blue-600"
              onClick={() => onCategorySelect(category.name)}
            >
              {category.name} {}
            </button>
          </li>
        ))}
      </ul>
    </aside>
  );
};

export default Sidebar;
