import React from "react";

const Brands = () => {
  const brands = ["asos", "adidas", "CELINE", "GUCCI", "CHANEL", "Zara", "H&M"];
  return (
    <section className="brands overflow-hidden py-10 border border-y">
      <div className="animate-marquee flex gap-[120px] text-[36px] max-w-screen-xl mx-auto text-center">
        {brands.concat(brands).map((brand, index) => (
          <span key={index} className="shrink-0 font-bold hover:scale-150 transition-transform duration-500">
            {brand}
          </span>
        ))}
      </div>
    </section>
  );
};

export default Brands;
