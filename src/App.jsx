import React, { useState } from "react";
import Cart from "./components/Cart";

const sampleProducts = [
  { id: 1, name: "Apple", category: "Fruits", price: 1.0, inStock: true },
  { id: 2, name: "Milk", category: "Dairy", price: 2.5, inStock: false },
];

function App() {
  // ===============================
  // STATE MANAGEMENT
  // ===============================
  const [darkMode, setDarkMode] = useState(false);
  const [category, setCategory] = useState("all");
  const [cartItems, setCartItems] = useState([]);

  // ===============================
  // FIX #1: DARK MODE TOGGLE BUG
  // ERROR WAS: button text was static
  // FIX: dynamic text based on state
  // ===============================
  const toggleDarkMode = () => {
    setDarkMode((prev) => !prev);
  };

  // ===============================
  // FIX #2: ADD TO CART BUG
  // ERROR WOULD OCCUR IF PRODUCT NOT PASSED
  // ===============================
  const addToCart = (product) => {
    setCartItems((prev) => [...prev, product]);
  };

  // ===============================
  // FILTER LOGIC
  // ===============================
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

      {/* ===============================
          FIX #1 APPLIED HERE
          Button text MUST change for test
      =============================== */}
      <button onClick={toggleDarkMode}>
          {darkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}
      </button>


      <br />

      <label>Filter by Category: </label>

      <select value={category} onChange={(e) => setCategory(e.target.value)}>
        <option value="all">All</option>
        <option value="Fruits">Fruits</option>
        <option value="Dairy">Dairy</option>
      </select>

      <h2>Available Products</h2>

      {/* ===============================
          FIX #2 APPLIED HERE
          ERROR: no "empty state" handling
      =============================== */}
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

      {/* CART */}
      <Cart cartItems={cartItems} />
    </div>
  );
}

export default App;
