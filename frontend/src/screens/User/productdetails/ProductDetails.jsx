import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import Recommendations from "../../../components/Cart/Recommendations";

const ProductDetails = () => {
  const location = useLocation();
  const { product } = location.state || {};

  const [selectedColor, setSelectedColor] = useState("black");
  const [selectedSize, setSelectedSize] = useState("M");
  const [quantity, setQuantity] = useState(1);
  const [rating, setRating] = useState(0.0);

  const sizes = ["XS", "S", "M", "L", "XL"];
  const colors = [
    { name: "Black", value: "black", hex: "#000000" },
    { name: "Navy", value: "navy", hex: "#001f3f" },
    { name: "Gray", value: "gray", hex: "#808080" },
    {
      name: "White",
      value: "white",
      hex: "#ffffff",
      border: "border border-gray-300",
    },
  ];

  if (!product) {
    return (
      <div className="p-6 text-red-600">
        Product not found or page was refreshed.
      </div>
    );
  }

  return (
    <section className="px-16 py-5">
      <div className="flex flex justify-center w-full gap-16">
        <div className="flex-shrink-0 flex flex-col gap-4">
          <img
            src={product.image}
            alt={product.name}
            className="w-[600px] h-[513px] object-cover rounded-3xl border border-[var(--color-black)]"
          />
          <div className="flex gap-4">
            {/* Summary Box */}
            <div className="flex flex-col items-center mb-2 bg-[var(--color-black)] py-2 px-4 rounded-xl shadow-2xl">
              <span className="ml-2 text-[var(--color-white)]">4.0 /5</span>
              <div className="flex text-[50px] text-[var(--color-white)]">
                {[1, 2, 3, 4, 5].map((star) => "★")}
              </div>
              <p className="mb-6 text-[var(--color-white)]">100,000 Reviews</p>
            </div>
            {/* Breakdown Box */}
            <div className="flex flex-col py-2 px-4 bg-[var(--color-black)] rounded-xl shadow-2xl">
              {[5, 4, 3, 2, 1].map((rating) => (
                <div key={rating} className="flex items-center mb-1">
                  <span className="w-8 mr-4 text-[var(--color-white)]">
                    {rating} ★
                  </span>
                  <span className="text-[var(--color-white)]">100,000</span>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="text-left">
          {/* category */}
          <span className="text-[var(--color-black)] border border-[var(--color-black)] mb-4 p-1 rounded-full ">
            {product.category}
          </span>

          {/* Product title and price */}
          <h1 className="text- mb-2 mt-2">{product.name}</h1>
          <p className="text- mb-2.5">MMK {product.price}</p>

          {/* Size selection */}
          <div className="mb-6">
            <h2 className="text-lg font-medium mb-2">Select Size</h2>
            <div className="flex space-x-2 mb-2.5">
              {sizes.map((size) => (
                <button
                  key={size}
                  onClick={() => setSelectedSize(size)}
                  className={`px-4 py-2 border rounded hover:bg-gray-100 ${
                    selectedSize === size
                      ? "border-black bg-black text-white hover:bg-gray-800"
                      : "border-gray-300"
                  }`}>
                  {size}
                </button>
              ))}
            </div>
          </div>

          {/* Color selection */}
          <div className="mb-6">
            <h2 className="text-lg font-medium mb-2">Select Color</h2>
            <div className="flex space-x-3 items-center">
              {colors.map((color) => (
                <button
                  key={color.value}
                  onClick={() => setSelectedColor(color.value)}
                  className={`w-10 h-10 rounded-full ${
                    selectedColor === color.value
                      ? "ring-2 ring-offset-2 ring-gray-400"
                      : ""
                  } ${color.border || ""}`}
                  style={{ backgroundColor: color.hex }}
                  title={color.name}
                  aria-label={color.name}
                />
              ))}
            </div>
          </div>

          {/* Quantity selection */}
          <div className="mb-6">
            <h2 className="text-lg font-medium mb-2">Choose Quantity</h2>
            <div className="flex items-center">
              <button className="px-3 py-1 border border-gray-300 rounded-r">
                -
              </button>
              <div className="px-4 py-1 border-t border-b border-gray-300">
                {quantity}
              </div>
              <button className="px-3 py-1 border border-gray-300 rounded-l">
                +
              </button>
            </div>
          </div>
          {/* Add to cart button */}
          <button className="bg-black text-white py-3 px-28 rounded-full mb-4 transition">
            ADD TO CART
          </button>
          {/* Description */}
          <div className="mb-4">
            <h3 className="font-semibold mb-2">Description and Fit</h3>
            <p className="">
              At the heart of Clothique are three values: integrity,
              intentionality, and inclusion. We work with ethical suppliers,
              minimize excess in both design and production, and celebrate the
              diversity of our customers — empowering self-expression through
              wearable art.
            </p>
          </div>
          {/* rating */}
          <div className="mb-6">
            <h3 className="font-semibold mb-2">
              Give feedbacks about this product
            </h3>
            <div className="flex">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  onClick={() => setRating(star)}
                  className={`text-[30px] p-2 ${
                    rating >= star ? "text-yellow-400" : "text-gray-300"
                  }`}>
                  ★
                </button>
              ))}
            </div>
          </div>
          {/* Back button */}
          <Link
            to="/shop"
            className="border border-[var(--color-black)] p-2 rounded-lg">
            Go Back
          </Link>
        </div>
      </div>
      <Recommendations />
    </section>
  );
};

export default ProductDetails;
