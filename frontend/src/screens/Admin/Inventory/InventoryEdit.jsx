import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const mockInventoryListItems = [
  {
    id: 1,
    name: "Levi T-Shirt",
    category: "Men Wears",
    price: 10000,
    quantity: 2,
    lowStockLimit: 3,
  },
  {
    id: 2,
    name: "Nike Running Shoes",
    category: "Footwear",
    price: 45000,
    quantity: 3,
    lowStockLimit: 5,
  },
  {
    id: 3,
    name: "Uniqlo Hoodie",
    category: "Men Wears",
    price: 25000,
    quantity: 12,
    lowStockLimit: 5,
  },
  {
    id: 4,
    name: "Adidas Backpack",
    category: "Accessories",
    price: 30000,
    quantity: 8,
    lowStockLimit: 5,
  },
  {
    id: 5,
    name: "Zara Skirt",
    category: "Women Wears",
    price: 22000,
    quantity: 1,
    lowStockLimit: 5,
  },
  {
    id: 6,
    name: "Casio Watch",
    category: "Accessories",
    price: 50000,
    quantity: 6,
    lowStockLimit: 5,
  },
  {
    id: 7,
    name: "Puma Socks Pack (3 pcs)",
    category: "Footwear",
    price: 8000,
    quantity: 50,
    lowStockLimit: 5,
  },
  {
    id: 8,
    name: "GU Blouse",
    category: "Women Wears",
    price: 18000,
    quantity: 2,
    lowStockLimit: 5,
  },
];
const sizes =["S", "M", "L", "XL"];
const colors =["Green", "Magenta", "Lavender", "Red"];

const InventoryEdit = () => {
  const { id } = useParams();
  const [selectedProductId, setSelectedProductId] = useState("");
  const [selectedProduct, setSelectedProduct] = useState("");
  const [hasVariants, setHasVariants] = useState(false);
  const [selectedSize, setSelectedSize] = useState("");
  const [selectedColor, setSelectedColor] = useState("");
  const [totalQty, setTotalQty] = useState("");
  const [lowStockLimit, setLowStockLimit] = useState("");
  const [stockType, setStockType] = useState("");
  const [stockQty, setStockQty] = useState("");
  const [isActiveOn, setIsActiveOn] = useState(false);

  useEffect(() => {
    const product = mockInventoryListItems.find(
      (item) => item.id === parseInt(id)
    );
    if (product) {
      setSelectedProduct(product.name);
      setTotalQty(product.quantity);
      setLowStockLimit(product.lowStockLimit);
    }
  }, [id]);
  const handleToggle = (e) => {
    e.preventDefault();
    setIsActiveOn(!isActiveOn);
  };
  const handleSave = () => {
    const payload = {
      product: selectedProduct,
      variant: hasVariants
        ? { size: selectedSize, color: selectedColor }
        : null,
      totalQty,
      lowStockLimit,
      stockType,
      stockQty,
    };
    alert(JSON.stringify(payload, null, 2));
    // Replace with API call
  };

  return (
    <div className="max-w-xl mx-auto p-6 space-y-4">
      <h2 className="text-xl font-bold mb-4">Add Inventory</h2>

      {/* Product Select */}
      <div>
        <label className="block mb-1 text-left">Product</label>
        <select
          value={selectedProduct}
          onChange={(e) => setSelectedProduct(e.target.value)}
          className="w-full border p-2 rounded">
          <option value="">Select Product</option>
          {mockInventoryListItems.map((product) => (
            <option key={product.id} value={product.name}>
              {product.name}
            </option>
          ))}
        </select>
      </div>

      {/* Toggle for Variants */}
      <div className="flex items-center gap-2">
        <label htmlFor="variants" className="font-medium">
          Has Variants (Size / Color)
        </label>
        <button
          onClick={(e) => {
            e.preventDefault();
            setHasVariants((prev) => !prev);
          }}
          className={`ml-3 w-12 h-6 items-center rounded-full p-1 transition duration-300 ${
            hasVariants ? "bg-[var(--color-highlight)]" : "bg-gray-300"
          }`}>
          <div
            className={`bg-white w-4 h-4 rounded-full shadow-md transform transition-transform ${
              hasVariants ? "translate-x-6" : "translate-x-0"
            }`}
          />
        </button>
      </div>

      {/* Variant Selectors */}
      {hasVariants && (
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block mb-1 font-medium">Size</label>
            <select
              value={selectedSize}
              onChange={(e) => setSelectedSize(e.target.value)}
              className="w-full border p-2 rounded">
              <option value="">Select Size</option>
              {sizes.map((size) => (
                <option key={size} value={size}>
                  {size}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block mb-1 font-medium">Color</label>
            <select
              value={selectedColor}
              onChange={(e) => setSelectedColor(e.target.value)}
              className="w-full border p-2 rounded">
              <option value="">Select Color</option>
              {colors.map((color) => (
                <option key={color} value={color}>
                  {color}
                </option>
              ))}
            </select>
          </div>
        </div>
      )}

      {/* Quantity & Low Stock */}
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block mb-1 font-medium">Total Quantity</label>
          <input
            disabled
            type="number"
            value={totalQty}
            onChange={(e) => setTotalQty(e.target.value)}
            className="w-full border p-2 rounded"
            min={0}
          />
        </div>
        <div>
          <label className="block mb-1 font-medium">Low Stock Threshold</label>
          <input
            type="number"
            value={lowStockLimit}
            onChange={(e) => setLowStockLimit(e.target.value)}
            className="w-full border p-2 rounded"
            min={0}
          />
        </div>
      </div>

      {/* Stock In/Out */}
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block mb-1 font-medium">Stock Type</label>
          <select
            value={stockType}
            onChange={(e) => setStockType(e.target.value)}
            className="w-full border p-2 rounded">
            <option value="">Select</option>
            <option value="in">Stock In</option>
            <option value="out">Stock Out</option>
          </select>
        </div>
        <div>
          <label className="block mb-1 font-medium">Stock Qty</label>
          <input
            type="number"
            value={stockQty}
            onChange={(e) => setStockQty(e.target.value)}
            className="w-full border p-2 rounded"
            min={0}
          />
        </div>
      </div>

      {/* Save Button */}
      <div className="pt-4 text-right">
        <button
          onClick={handleSave}
          className="bg-[var(--color-highlight)] text-white px-6 py-2 rounded hover:opacity-90">
          Save
        </button>
      </div>
    </div>
  );
};

export default InventoryEdit;
