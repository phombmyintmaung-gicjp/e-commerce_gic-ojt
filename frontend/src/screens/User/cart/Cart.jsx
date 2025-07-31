import React, { useState } from "react";
import deleteIcon from "../../../assets/delete_icon.svg";
import Payments from "../../../components/Cart/Payments";
import Recommendations from "../../../components/Cart/Recommendations";

const Cart = () => {
  const cartItems = [
    {
      id: 1,
      name: "Classic White T-Shirt Product’s Name Long Product Names Include",
      color: "White",
      size: "M",
      price: 200000,
      quantity: 1,
      image:
        "https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?auto=format&fit=crop&w=300&q=80",
    },
    {
      id: 2,
      name: "Denim Jeans",
      color: "Blue",
      size: "L",
      price: 350000,
      quantity: 2,
      image:
        "https://images.unsplash.com/photo-1514996937319-344454492b37?auto=format&fit=crop&w=300&q=80",
    },
    {
      id: 3,
      name: "Classic White T-Shirt Product’s Name Long Product Names Include",
      color: "White",
      size: "M",
      price: 200000,
      quantity: 1,
      image:
        "https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?auto=format&fit=crop&w=300&q=80",
    },
    {
      id: 4,
      name: "Denim Jeans",
      color: "Blue",
      size: "L",
      price: 350000,
      quantity: 2,
      image:
        "https://images.unsplash.com/photo-1514996937319-344454492b37?auto=format&fit=crop&w=300&q=80",
    },
    {
      id: 5,
      name: "Classic White T-Shirt Product’s Name Long Product Names Include",
      color: "White",
      size: "M",
      price: 200000,
      quantity: 1,
      image:
        "https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?auto=format&fit=crop&w=300&q=80",
    },
    {
      id: 6,
      name: "Denim Jeans",
      color: "Blue",
      size: "L",
      price: 350000,
      quantity: 2,
      image:
        "https://images.unsplash.com/photo-1514996937319-344454492b37?auto=format&fit=crop&w=300&q=80",
    },
  ];

  return (
    <section className="p-10 bg-[var(--color-dark-gray)] min-h-screen">
      <div className="flex flex-col lg:flex-row justify-between gap-8">
        {/* Left Section - Cart */}
        <div className="bg-[var(--color-white)] p-6 rounded-xl w-full lg:w-2/3">
          <h2 className="text-[var(--color-black)] text-2xl mb-6 border-b py-4 text-left">
            Shopping Cart
          </h2>
          {/* Header Row */}
          <div className="grid grid-cols-[2.5fr_0.5fr_0.5fr_0.3fr] items-center text-[14px] font-semibold text-[var(--color-black)] pb-2 px-2">
            <span className="justify-self-start">Product</span>
            <span className="justify-self-center">Quantity</span>
            <span className="justify-self-end">Price</span>
            <span className="justify-self-end w-4"> </span>
          </div>
          {/* Cart Items */}
          {cartItems.map((item) => (
            <div
              key={item.id}
              className="grid grid-cols-[2.5fr_0.5fr_0.5fr_0.3fr] items-center gap-2 border border-[var(--color-black)] p-3 mt-4 rounded-lg text-[var(--color-black)]">
              {/* Product */}
              <div className="flex gap-4 items-center">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-[65px] h-[65px] object-cover rounded-md border"
                />
                <div className="text-left">
                  <p className="font-bold text-sm">{item.name}</p>
                  <p className="text-[10px] text-[var(--color-dark-gray)] my-2.5">
                    Color: {item.color}
                  </p>
                  <p className="text-[10px] text-[var(--color-dark-gray)]">
                    Size: {item.size}
                  </p>
                </div>
              </div>

              {/* Quantity */}
              <div className="flex justify-center items-center">
                <button className="px-2 py-1 bg-[var(--color-dark-gray)] text-[var(--color-white)]">
                  -
                </button>
                <span className="px-3 py-1 text-[var(--color-black)]">
                  {item.quantity}
                </span>
                <button className="px-2 py-1 bg-[var(--color-dark-gray)] text-[var(--color-white)]">
                  +
                </button>
              </div>

              {/* Price */}
              <div className="justify-self-end text-sm">
                MMK {item.price.toLocaleString()}
              </div>

              {/* Delete */}
              <div className="justify-self-end">
                <button className="text-[var(--color-warning)] hover:text-[var(--color-warning)] text-lg">
                  <img
                    src={deleteIcon}
                    alt="password icon"
                    className="w-8 h-8"
                  />
                </button>
              </div>
            </div>
          ))}

          {/* Clear Cart Button */}
          <div className="flex justify-end mt-6">
            <button className="px-4 py-2 border border-[var(--color-warning)] text-[var(--color-black)] rounded hover:bg-[var(--color-warning)] hover:border-[var(--color-warning)] hover:text-white transition">
              Clear Cart
            </button>
          </div>
        </div>

        {/* Right Section - Summary & Payment */}
        <div className="lg:w-1/3">
          <div className="bg-[var(--color-white)] p-6 rounded-xl w-full mb-8">
            <h2 className="text-[var(--color-black)] text-2xl mb-6 border-b py-4 text-left">
              Cart Summary
            </h2>
            <div className="flex justify-between text-sm mb-2">
              <span className="text-[var(--color-dark-gray)]">Subtotal</span>
              <span>MMK 750,000</span>
            </div>
            <div className="flex justify-between text-sm mb-4">
              <span className="text-[var(--color-dark-gray)]">Shipping</span>
              <span>Free</span>
            </div>
            <div className="flex justify-between text-sm mb-4">
              <span className="text-[var(--color-dark-gray)]">Tax</span>
              <span>MMK 100</span>
            </div>
            <div className="flex justify-between font-semibold text-md border-t pt-2">
              <span className="text-[var(--color-dark-gray)]">Total</span>
              <span>MMK 750,000</span>
            </div>
          </div>
          <Payments />
        </div>
      </div>
      <Recommendations />
    </section>
  );
};

export default Cart;
