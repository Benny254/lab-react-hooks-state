import React, { useState } from "react";
import Cart from "./components/Cart";

const sampleProducts = [
  { id: 1, name: "Apple", category: "Fruits", price: 1.0, inStock: true },
  { id: 2, name: "Milk", category: "Dairy", price: 2.5, inStock: false },
];

function App() {
  // =========================
  // STATE
  // =========================
  const [darkMode, setDarkMode] = useState(false);
  const [category, setCategory] = useState("all");
  const [cartItems, setCartItems] = useState([]);

  // =========================
  // DARK MODE TOGGLE
  // =========================
  const toggleDarkMode = () => {
    setDarkMode((prev) => !prev);
  };

  // =========================
  // CART LOGIC
  // =========================
  const addToCart = (product) => {
    setCartItems((prev) => [...prev, product]);
  };

  // =========================
  // FILTER LOGIC
  // =========================
  const filteredProducts =
    category === "all"
      ? sampleProducts
      : sampleProducts.filter((p) => p.category === category);

  return (
    <div className={darkMode ? "dark" : "light"}>
      <h1>🛒 Shopping App</h1>

      <p>
        Welcome! Your task is to implement filtering, cart management, and dark mode.
      </p>

      {/* =========================
          DARK MODE BUTTON (FIXED)
          - MUST BE DYNAMIC
          - MUST MATCH TEST EXPECTATIONS
      ========================= */}
      <button onClick={toggleDarkMode}>
        {darkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}
      </button>

      <br />

      {/* =========================
          FILTER DROPDOWN
      ========================= */}
      <label>Filter by Category: </label>

      <select value={category} onChange={(e) => setCategory(e.target.value)}>
        <option value="all">All</option>
        <option value="Fruits">Fruits</option>
        <option value="Dairy">Dairy</option>
      </select>

      {/* =========================
          PRODUCTS
      ========================= */}
      <h2>Available Products</h2>

      {filteredProducts.length === 0 ? (
        <p>No products available</p>
      ) : (
        filteredProducts.map((product) => (
          <div
            key={product.id}
            className={`card ${!product.inStock ? "outOfStock" : ""}`}
          >
            <h3>{product.name}</h3>
            <p>Price: ${product.price.toFixed(2)}</p>
            <p>Status: {product.inStock ? "In Stock" : "Out of Stock"}</p>

            <button
              data-testid={`product-${product.id}`}
              onClick={() => addToCart(product)}
            >
              Add to Cart
            </button>
          </div>
        ))
      )}

      {/* =========================
          CART
      ========================= */}
      <Cart cartItems={cartItems} />
    </div>
  );
}

export default App;
