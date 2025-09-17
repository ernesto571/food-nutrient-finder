import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../css/Home.css";

function Home() {
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;

    navigate(`/product?search=${encodeURIComponent(searchQuery.trim())}`);
  };

  return (
    <div className="search_container">
      <h1 className="title">&#127860; Food Nutrition Lookup</h1>
      <p className="data-lct">
        Data from{" "}
        <a
          href="https://world.openfoodfacts.org/"
          target="_blank"
          rel="noreferrer"
        >
          OpenFoodFact.org
        </a>
      </p>
      <p className="text">Enter Product Keyword</p>
      <form onSubmit={handleSearch}>
        <input
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          type="text"
          placeholder="Search by keyword "
        />
        <button type="submit" className="search-button">
          Search
        </button>
      </form>
    </div>
  );
}

export default Home;
