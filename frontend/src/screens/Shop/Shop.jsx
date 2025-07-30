import React, { useState } from "react";
import Carousel from "../../components/Shop/Carousel";
import TopTrends from "../../components/Shop/TopTrends";
import Products from "../../components/Shop/Products";

const Shop = () => {
  // Data arrays
  const brandOptions = ["Nike", "Adidas", "Zara", "Uniqlo"];
  const categoryOptions = ["Men", "Women", "Kids", "Accessories"];
  const sortOptions = [
    { value: "low-high", label: "Price: Low → High" },
    { value: "high-low", label: "Price: High → Low" },
  ];

  // State
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("");
  const [selectedBrand, setSelectedBrand] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");

  return (
    <section className="px-[80px] py-[20px]">
      {/* Search & Filter Controls */}
      <div className="flex justify-center gap-[15px] items-center p-4 rounded-md">
        {/* Search */}
        <input
          type="text"
          placeholder="Search products..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="px-4 py-2 border rounded-md md:w-1/3"
        />
        {/* Sort by Price */}
        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
          className="px-4 py-2 border rounded-md">
          <option value="">Sort by Price</option>
          {sortOptions.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
        {/* Sort by Brand */}
        <select
          value={selectedBrand}
          onChange={(e) => setSelectedBrand(e.target.value)}
          className="px-4 py-2 border rounded-md">
          <option value="">Sort by Brand</option>
          {brandOptions.map((brand) => (
            <option key={brand} value={brand}>
              {brand}
            </option>
          ))}
        </select>
        {/* Filter by Category */}
        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          className="px-4 py-2 border rounded-md">
          <option value="">Filter by Category</option>
          {categoryOptions.map((cat) => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </select>
      </div>
      {/* Carousel Section */}
      <div className="flex gap-4 flex-wrap justify-center">
        <Carousel />
        <Carousel />
        <TopTrends />
      </div>
      {/* products */}
      <Products />
    </section>
  );
};

export default Shop;
