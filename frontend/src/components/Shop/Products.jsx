import React, { useRef, useState } from "react";
import RotatingText from "./RotatingText";
import { Link } from "react-router-dom";

const Products = () => {
  const products = [
    {
      id: 1,
      name: "Classic White T-Shirt",
      brand: "UniStyle",
      price: 19.99,
      rating: 4.2,
      category: "clothing",
      image:
        "https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?auto=format&fit=crop&w=300&q=80",
    },
    {
      id: 2,
      name: "Blue Denim Jeans",
      brand: "DenimCo",
      price: 49.99,
      rating: 4.5,
      category: "clothing",
      image:
        "https://images.unsplash.com/photo-1514996937319-344454492b37?auto=format&fit=crop&w=300&q=80",
    },
    {
      id: 3,
      name: "Leather Jacket",
      brand: "UrbanWear",
      price: 129.99,
      rating: 4.8,
      category: "clothing",
      image:
        "https://images.unsplash.com/photo-1512436991641-6745cdb1723f?auto=format&fit=crop&w=300&q=80",
    },
    {
      id: 4,
      name: "Running Sneakers",
      brand: "SpeedStep",
      price: 79.99,
      rating: 4.3,
      category: "footwear",
      image:
        "https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?auto=format&fit=crop&w=300&q=80",
    },
    {
      id: 5,
      name: "Casual Hat",
      brand: "HeadSpace",
      price: 15.99,
      rating: 3.9,
      category: "accessories",
      image:
        "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=300&q=80",
    },
    {
      id: 6,
      name: "Sunglasses",
      brand: "ShadeLine",
      price: 29.99,
      rating: 4.0,
      category: "accessories",
      image:
        "https://images.unsplash.com/photo-1512436991641-6745cdb1723f?auto=format&fit=crop&w=300&q=80",
    },
    {
      id: 7,
      name: "Slim Fit Chinos",
      brand: "FlexForm",
      price: 39.99,
      rating: 4.4,
      category: "clothing",
      image:
        "https://images.unsplash.com/photo-1541099649105-f69ad21f3246?auto=format&fit=crop&w=300&q=80",
    },
    {
      id: 8,
      name: "Striped Polo Shirt",
      brand: "StripeWear",
      price: 25.99,
      rating: 3.8,
      category: "clothing",
      image:
        "https://images.unsplash.com/photo-1521334884684-d80222895322?auto=format&fit=crop&w=300&q=80",
    },
    {
      id: 9,
      name: "Leather Wallet",
      brand: "PocketPro",
      price: 49.99,
      rating: 4.1,
      category: "accessories",
      image:
        "https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?auto=format&fit=crop&w=300&q=80",
    },
  ];

  const itemsPerPage = 4;
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = Math.ceil(products.length / itemsPerPage);

  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentProducts = products.slice(startIndex, startIndex + itemsPerPage);
  const imgRef = useRef();

  const goToPage = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };
  const handleAddToCart = (e) => {
    const img = e.currentTarget.closest(".product-card").querySelector("img");
    const cartIcon = document.getElementById("cart-icon");

    if (img && cartIcon) {
      const imgRect = img.getBoundingClientRect();
      const cartRect = cartIcon.getBoundingClientRect();

      const clone = img.cloneNode(true);
      clone.style.position = "fixed";
      clone.style.left = imgRect.left + "px";
      clone.style.top = imgRect.top + "px";
      clone.style.width = img.offsetWidth + "px";
      clone.style.height = img.offsetHeight + "px";
      clone.style.transition = "all 0.8s ease-in-out";
      clone.style.zIndex = 1000;
      document.body.appendChild(clone);

      requestAnimationFrame(() => {
        clone.style.left = cartRect.left + "px";
        clone.style.top = cartRect.top + "px";
        clone.style.width = "20px";
        clone.style.height = "20px";
        clone.style.opacity = 0.5;
      });

      clone.addEventListener("transitionend", () => {
        if (clone.parentNode) {
          clone.parentNode.removeChild(clone);
        }
        // dispatch(addToCart(product));
      });
    } else {
      // dispatch(addToCart(product));
    }
  };

  return (
    <section className="my-10">
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6 justify-items-center">
        {currentProducts.map((product) => (
          <div
            key={product.id}
            className="product-card rounded-lg p-3 flex flex-col py-5 px-[25px] border border-black">
            <img
              src={product.image}
              alt={product.name}
              className="w-[250px] h-[250px] object-cover rounded-3xl mb-2 border border-[var(--color-black)]"
            />
            <div className="w-full flex justify-between items-start">
              <p className="max-w-[50%] text-left text-[14px]">
                {product.name}
              </p>
              <span className="text-[20px]">MMK {product.price}</span>
            </div>
            <div className="w-full flex mb-2">
              <span className="max-w-[50%] text-[var(--color-dark-gray)] text-left text-[14px]">
                {product.brand}
              </span>
            </div>
            <RotatingText />
            <div className="flex justify-between items-center">
              <button
                onClick={(e) => handleAddToCart(e)}
                className="border border-[var(--color-black)] hover:bg-[var(--color-black)] text-[var(--color-black)] hover:text-[var(--color-white)] px-2 py-1 rounded-xl transition-transform duration-500">
                Add to Cart
              </button>
              <div className="flex flex-col items-start gap-1 mt-2">
                <div className="flex">
                  {[...Array(5)].map((_, i) => {
                    const full = i + 1 <= Math.floor(product.rating);
                    const half = i + 0.5 === Math.round(product.rating * 2) / 2;
                    return (
                      <span
                        key={i}
                        className="text-[var(--color-highlight)] text-[15px]">
                        {full ? "★" : half ? "⯨" : "☆"}
                      </span>
                    );
                  })}
                </div>
                <Link
                  to={`/${product.category}/products/${product.id}/details`}
                  state={{ product }}
                  className="text-[var(--color-highlight)] cursor-pointer hover:underline text-[10px]">
                  View Details {">>"}
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination */}
      <div className="flex justify-center mt-8 gap-2 text-[14px]">
        <button
          onClick={() => goToPage(currentPage - 1)}
          disabled={currentPage === 1}
          className="px-2">
          {"<"}
        </button>
        {Array.from({ length: totalPages }, (_, i) => i + 1).map((num) => (
          <button
            key={num}
            onClick={() => goToPage(num)}
            className={`px-3 py-1 rounded ${
              num === currentPage
                ? "bg-[var(--color-highlight)] text-[var(--color-black)]"
                : "text-[var(--color-black)]"
            }`}>
            {num}
          </button>
        ))}
        <button
          onClick={() => goToPage(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="px-2">
          {">"}
        </button>
      </div>
    </section>
  );
};

export default Products;
