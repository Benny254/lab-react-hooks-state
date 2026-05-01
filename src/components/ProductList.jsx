import React from 'react'
import ProductCard from './ProductCard'

// Sample product data (for display purposes only)
export const sampleProducts = [
  { id: 1, name: 'Apple', price: '$1.00', category: 'Fruits', inStock: true },
  { id: 2, name: 'Milk', price: '$2.50', category: 'Dairy', inStock: false }
]

const ProductList = ({ category, addToCart }) => {
  // 🔎 Filter products based on selected category
  const filteredProducts =
    category === "all"
      ? sampleProducts
      : sampleProducts.filter(
          (product) => product.category === category
        )

  return (
    <div>
      <h2>Available Products</h2>

      {/* ✅ Show message if no products */}
      {filteredProducts.length === 0 ? (
        <p>No products available</p>
      ) : (
        filteredProducts.map((product) => (
          <ProductCard 
            key={product.id} 
            product={product} 
            addToCart={addToCart}
          />
        ))
      )}
    </div>
  )
}

export default ProductList
