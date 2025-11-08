import { useEffect, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { searchProducts } from "../Services/api";
import FoodCard from "../Components/FoodCard";

const CACHE_KEY = "productSearchCache";
const CACHE_TTL = 1000 * 60 * 10; // 10 minutes

function Product() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const query = searchParams.get("search") || "";
  const [products, setProducts] = useState([]);
  const [totalResults, setTotalResults] = useState(0);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

  const pageSize = 16;
  const maxPages = 5;
  const totalPages = Math.min(Math.ceil(totalResults / pageSize), maxPages);

  //  Load from localStorage if possible
  useEffect(() => {
    if (!query.trim()) return;

    const fetchData = async () => {
      setLoading(true);
      try {
        const cache = JSON.parse(localStorage.getItem(CACHE_KEY)) || {};
        const cacheKey = `${query.toLowerCase()}-page-${currentPage}`;
        const cachedEntry = cache[cacheKey];

        if (cachedEntry && Date.now() - cachedEntry.timestamp < CACHE_TTL) {
          setProducts(cachedEntry.products);
          setTotalResults(cachedEntry.total);
        } else {
          const { products, total } = await searchProducts(query, currentPage);

          // Save to state
          setProducts(products);
          setTotalResults(total);

          // Save to cache
          const updatedCache = {
            ...cache,
            [cacheKey]: {
              products,
              total,
              timestamp: Date.now(),
            },
          };
          localStorage.setItem(CACHE_KEY, JSON.stringify(updatedCache));
        }
      } catch (err) {
        console.error("Search failed", err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [query, currentPage]);

  return (
    <div className="product-page">
      {/*  Back Button */}
      <button className="back-to-search-btn" onClick={() => navigate(-1)}>
        ← Back
      </button>

      <h2 className="results-heading">
        Search Results for "<span className="highlight">{query}</span>"
      </h2>

      {loading ? (
        <h2 className="loading">Loading...</h2>
      ) : products.length === 0 ? (
        <h3 className="error-message">No results found.</h3>
      ) : (
        <div className="food-grid">
          {products.map((product, index) =>
            product.product_name ? (
              <FoodCard product={product} key={index} />
            ) : null
          )}
        </div>
      )}

      {/* Pagination */}
      {totalResults > pageSize && (
        <div className="pagination">
          <button
            className="prev-button"
            onClick={() => setCurrentPage((prev) => prev - 1)}
            disabled={currentPage === 1}
          >
            Prev
          </button>
          <span className="page-text">
            Page {currentPage} of {totalPages}
          </span>
          <button
            className="next-button"
            onClick={() => setCurrentPage((prev) => prev + 1)}
            disabled={currentPage >= totalPages}
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
}

export default Product;
