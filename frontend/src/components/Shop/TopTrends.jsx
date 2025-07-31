import React from "react";
import { useNavigate } from "react-router-dom";

const TopTrends = () => {
  const products = [
    {
      id: 1,
      name: "Classic White T-Shirt",
      price: 19.99,
      image:
        "https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?auto=format&fit=crop&w=300&q=80",
    },
    {
      id: 2,
      name: "Blue Denim Jeans",
      price: 49.99,
      image:
        "https://images.unsplash.com/photo-1514996937319-344454492b37?auto=format&fit=crop&w=300&q=80",
    },
    {
      id: 3,
      name: "Leather Jacket",
      price: 129.99,
      image:
        "https://images.unsplash.com/photo-1512436991641-6745cdb1723f?auto=format&fit=crop&w=300&q=80",
    },
    {
      id: 4,
      name: "Running Sneakers",
      price: 79.99,
      image:
        "https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?auto=format&fit=crop&w=300&q=80",
    },
    {
      id: 5,
      name: "Casual Hat",
      price: 15.99,
      image:
        "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=300&q=80",
    },
    {
      id: 6,
      name: "Sunglasses",
      price: 29.99,
      image:
        "https://images.unsplash.com/photo-1512436991641-6745cdb1723f?auto=format&fit=crop&w=300&q=80",
    },
    {
      id: 7,
      name: "Slim Fit Chinos",
      price: 39.99,
      image:
        "https://images.unsplash.com/photo-1541099649105-f69ad21f3246?auto=format&fit=crop&w=300&q=80",
    },
    {
      id: 8,
      name: "Striped Polo Shirt",
      price: 25.99,
      image:
        "https://images.unsplash.com/photo-1521334884684-d80222895322?auto=format&fit=crop&w=300&q=80",
    },
    {
      id: 9,
      name: "Leather Wallet",
      price: 49.99,
      image:
        "https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?auto=format&fit=crop&w=300&q=80",
    },
  ];
  const navigate = useNavigate();

  const handleClick = (id) => {
    navigate(`/products/${id}`);
  };

  return (
    <div className="bg-[#C3A984] px-[10px] pt-[20px] py-[10px] rounded-lg">
      <p className="text-2xl font-semibold mb-[14px] text-[var(--color-white)] text-left">Top Trends</p>
      <div className="grid grid-cols-3 gap-3">
        {products.map((product) => (
          <div
            key={product.id}
            onClick={() => handleClick(product.id)}
            className="relative overflow-hidden rounded-md cursor-pointer transition-transform duration-500 "
          >
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-[100px] object-cover transition-transform duration-300 hover:scale-125"
            />
            <div className="absolute bottom-1 left-1/2 transform -translate-x-1/2 bg-black bg-opacity-50 text-white text-xs px-2 py-1 rounded">
              {product.price}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TopTrends;
