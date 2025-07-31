import React from "react";

const Recommendations = () => {
  const products = [
    {
      id: 1,
      name: "Classic White T-Shirt",
      brand: "UniStyle",
      price: 19.99,
      rating: 4.2,
      image:
        "https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?auto=format&fit=crop&w=300&q=80",
    },
    {
      id: 2,
      name: "Blue Denim Jeans",
      brand: "DenimCo",
      price: 49.99,
      rating: 4.5,
      image:
        "https://images.unsplash.com/photo-1514996937319-344454492b37?auto=format&fit=crop&w=300&q=80",
    },
    {
      id: 3,
      name: "Leather Jacket",
      brand: "UrbanWear",
      price: 129.99,
      rating: 4.8,
      image:
        "https://images.unsplash.com/photo-1512436991641-6745cdb1723f?auto=format&fit=crop&w=300&q=80",
    },
    {
      id: 4,
      name: "Running Sneakers",
      brand: "SpeedStep",
      price: 79.99,
      rating: 4.3,
      image:
        "https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?auto=format&fit=crop&w=300&q=80",
    },
    {
      id: 5,
      name: "Casual Hat",
      brand: "HeadSpace",
      price: 15.99,
      rating: 3.9,
      image:
        "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=300&q=80",
    },
    {
      id: 6,
      name: "Sunglasses",
      brand: "ShadeLine",
      price: 29.99,
      rating: 4.0,
      image:
        "https://images.unsplash.com/photo-1512436991641-6745cdb1723f?auto=format&fit=crop&w=300&q=80",
    },
    {
      id: 7,
      name: "Slim Fit Chinos",
      brand: "FlexForm",
      price: 39.99,
      rating: 4.4,
      image:
        "https://images.unsplash.com/photo-1541099649105-f69ad21f3246?auto=format&fit=crop&w=300&q=80",
    },
    {
      id: 8,
      name: "Striped Polo Shirt",
      brand: "StripeWear",
      price: 25.99,
      rating: 3.8,
      image:
        "https://images.unsplash.com/photo-1521334884684-d80222895322?auto=format&fit=crop&w=300&q=80",
    },
  ];
  return (
    <section className="my-10 px-32">
      <p className="text-[24px] mb-5">You Might Like to Fill with It</p>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6 justify-items-center">
        {products.map((product) => (
          <div
            key={product.id}
            className="product-card rounded-lg p-3 flex flex-col py-2 px-[10px] bg-[var(--color-light-gray)]">
            <img
              src={product.image}
              alt={product.name}
              className="w-[200px] h-[200px] object-cover rounded-3xl mb-2 border border-[var(--color-black)]"
            />
            <div className="w-full flex justify-between items-start">
              <p className="max-w-[50%] text-left text-[14px]">
                {product.name}
              </p>
              <span className="text-[16px]">MMK {product.price}</span>
            </div>
            <div>
              <div className="flex flex-row items-center justify-between">
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
                <span className="text-[var(--color-highlight)] cursor-pointer hover:underline text-[10px]">
                  View Details {">>"}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Recommendations;
