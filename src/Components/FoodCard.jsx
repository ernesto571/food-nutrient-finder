import "../css/ProductCard.css";
import { useNavigate } from "react-router-dom";

function FoodCard({ product }) {
  const navigate = useNavigate();

  const handleClick = () => {
    if (product.code) {
      navigate(`/product/${product.code}`);
    }
  };

  return (
    <div className="product-container">
      <div className="product-card">
        <div className="product-poster" onClick={handleClick}>
          <img src={product.image_url} alt={product.product_name} />
        </div>
        <div className="product-info">
          <h3>{product.product_name}</h3>
          <p>{product.brands}</p>
        </div>
      </div>
    </div>
  );
}

export default FoodCard;
