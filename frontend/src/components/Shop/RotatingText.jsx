import React, { useState, useEffect } from "react";

const RotatingText = () => {
  const messages = [
    {
      text: "🎉 Welcome to our store!",
      style: { color: "#0d6efd" },
    },
    {
      text: "🔥 Big Sale Today!",
      style: { color: "#dc3545" },
    },
    {
      text: "🚚 Free Shipping Worldwide!",
      style: { color: "#198754" },
    },
  ];
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prevIndex) => (prevIndex + 1) % messages.length);
    }, 2500);

    return () => clearInterval(timer);
  }, [messages.length]);

  return (
    <>
      <div className="rotating-text mb-2 w-[250px] text-left rounded-lg">
        <span key={index} style={messages[index].style} className="text-left">
          {messages[index].text}
        </span>
      </div>
    </>
  );
};

export default RotatingText;
