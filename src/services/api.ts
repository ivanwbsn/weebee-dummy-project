import { Product, Category, User } from '@/types'; // Import the types
const BASE_URL = 'https://api.escuelajs.co/api/v1';

const fetchWithErrorHandling = async (url: string) => {
  try {
    const response = await fetch(url, {
      headers: {
        'Cache-Control': 'no-cache',
        'Pragma': 'no-cache'
      }
    });
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error(`Failed to fetch from ${url}:`, error);
    return [];
  }
};

export const fetchProducts = async (): Promise<Product[]> => {
  return fetchWithErrorHandling(`${BASE_URL}/products`);
};

export const fetchProduct = async (id: string): Promise<Product | null> => {
  const result = await fetchWithErrorHandling(`${BASE_URL}/products/${id}`);
  return result ? result : null;  // Returning result or null if no result
};

export const fetchCategories = async (): Promise<Category[]> => {
  return fetchWithErrorHandling(`${BASE_URL}/categories`);
};

export const fetchUsers = async (): Promise<User[]> => {
  return fetchWithErrorHandling(`${BASE_URL}/users`);
};
