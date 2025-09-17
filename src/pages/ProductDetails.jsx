import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getProductDetails } from "../Services/api";
import "../css/ProductDetails.css";

function ProductDetails() {
  const { code } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showAllNutrients, setShowAllNutrients] = useState(false);

  useEffect(() => {
    async function fetchDetails() {
      try {
        const data = await getProductDetails(code);
        setProduct(data);
      } catch (err) {
        console.error("Error fetching product details", err);
      } finally {
        setLoading(false);
      }
    }
    fetchDetails();
  }, [code]);

  if (loading) return <h2 className="loading">Loading product details...</h2>;
  if (!product) return <h2 className="error-message">No product details found.</h2>;

  // Get nutrient entries and limit to first 10 if not showing all
  const nutrientEntries = product.nutriments ? Object.entries(product.nutriments) : [];
  const displayedNutrients = showAllNutrients ? nutrientEntries : nutrientEntries.slice(0, 10);
  const hasMoreNutrients = nutrientEntries.length > 10;

  return (
    <div className="product-details">
      {/* ✅ Dynamic back navigation */}
      <button className="back-button" onClick={() => navigate(-1)}>
        ← Back
      </button>
      
      <h1>{product.product_name}</h1>
      
      {product.image_url && (
        <img src={product.image_url} alt={product.product_name} />
      )}
      
      <p><strong>Brand:</strong> {product.brands || "N/A"}</p>
      <p><strong>Ingredients:</strong> {product.ingredients_text || "N/A"}</p>
      <p><strong>Nutrition Grade:</strong> {product.nutrition_grades || "N/A"}</p>
      
      <h3 className="nutrient-title">Nutrient Content per 100g</h3>
      
      <div className="nutrients-info">
        {displayedNutrients.map(([key, value]) => (
          <p key={key}>
            <strong>{key.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}:</strong> {value}
          </p>
        ))}
      </div>

      {/* Show More/Show Less button */}
      {hasMoreNutrients && (
        <button 
          className="show-more-button" 
          onClick={() => setShowAllNutrients(!showAllNutrients)}
        >
          {showAllNutrients ? 'Show Less' : `Show More (${nutrientEntries.length - 10} more)`}
        </button>
      )}
    </div>
  );
}

export default ProductDetails;