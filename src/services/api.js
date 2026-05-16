const API_URL = "https://ecommerce-backend-yc41.onrender.com";

export default API_URL;

export const getProducts = async () => {
  const res = await fetch(`${API_URL}/api/products`);

  if (!res.ok) {
    throw new Error("Failed to fetch products");
  }

  return await res.json();
};