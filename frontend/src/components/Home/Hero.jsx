import React from "react";

const Hero = ({ onCategoryClick }) => {
  const categories = ["Men", "Women", "Kids", "New", "Trends"];
  const chunkArray = (arr, size) => {
    const chunks = [];
    for (let i = 0; i < arr.length; i += size) {
      chunks.push(arr.slice(i, i + size));
    }
    return chunks;
  };
  const rows = chunkArray(categories, 3);

  return (
    <section className="hero py-14 bg-[var(--color-section)]">
      <div className="max-w-screen-xl mx-auto text-center">
        <p className="text-[64px]">Style begins</p>
        <p className="text-[64px]">with simplicity.</p>
      </div>

      {/* Category Buttons */}
      <div className="flex flex-col items-center mt-10 gap-6">
        {rows.map((row, rowIndex) => (
          <div
            key={rowIndex}
            className={`flex gap-6 ${
              row.length < 3 ? "justify-center" : "justify-between"
            }`}>
            {row.map((cat) => (
              <button
                key={cat}
                to={`/category/${cat.toLowerCase()}`}
                onClick={() => onCategoryClick(cat)}
                className="px-5 py-2 bg-[var(--color-black)] text-white transition-all hover:-translate-y-1 hover:text-[var(--color-white)] border border-[var(--color-black)] drop-shadow-lg rounded-lg text-center min-w-[120px]">
                {cat}
              </button>
            ))}
          </div>
        ))}
      </div>
    </section>
  );
};

export default Hero;
