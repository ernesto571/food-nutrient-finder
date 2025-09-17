const BASE_URL = "https://world.openfoodfacts.org";

//  Search for products by keyword and page number
export const searchProducts = async (query, page = 1) => {
  const url = `${BASE_URL}/cgi/search.pl?search_terms=${encodeURIComponent(query)}&search_simple=1&action=process&json=1&page=${page}&page_size=16`;

  try {
    const response = await fetch(url);
    const data = await response.json();

    console.log("Search API response:", data); // Optional for debugging

    return {
      products: data.products || [],
      total: data.count || 0,
    };
  } catch (err) {
    console.error("Search fetch failed:", err);
    throw err;
  }
};

//  Get full product details using the barcode
export const getProductDetails = async (barcode) => {
  const url = `${BASE_URL}/api/v0/product/${barcode}.json`;

  try {
    const response = await fetch(url);
    const data = await response.json();

    console.log("Product details API response:", data); // Optional

    return data.product || null; // Only return the product object
  } catch (err) {
    console.error("Product details fetch failed:", err);
    throw err;
  }
};
