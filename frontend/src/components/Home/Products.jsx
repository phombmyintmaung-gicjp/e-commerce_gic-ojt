import React, { useEffect, useRef, useState } from "react";
import { getCategory } from "../../api/apiService";

const Products = ({ activeTab, setActiveTab }) => {
  const [categories, setCategories] = useState([]);
  const scrollRef = useRef(null);
  const [isDown, setIsDown] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);

  useEffect(() => {
    getCategoryNames();
  }, []);

  const getCategoryNames = async () => {
    try {
      const response = await getCategory();
      setCategories(response.data);
    } catch (error) {
      console.error("Failed to fetch categories:", error);
    }
  };

  const categoryImages = categories.reduce((acc, category) => {
    acc[category.title] = [
      "https://images-na.ssl-images-amazon.com/images/G/01/AmazonExports/Events/2024/Stores-Gaming/FinalGraphics/Fuji_Gaming_store_Dashboard_card_1x_EN._SY304_CB564799420_.jpg",
      "https://images-na.ssl-images-amazon.com/images/G/01/AmazonExports/Events/2025/BTS25/GenAIExperiment/Group_C/Fuji_SingleImageCard_BTS25_1x._SY304_CB789324272_.jpg",
      "https://m.media-amazon.com/images/I/81qsstEtrgL._AC_SY200_.jpg",
      "https://images-na.ssl-images-amazon.com/images/G/01/AmazonExports/Fuji/2021/June/Fuji_Quad_Figure_1x._SY116_CB667159060_.jpg",
    ];
    return acc;
  }, {});

  const handleMouseDown = (e) => {
    setIsDown(true);
    scrollRef.current.classList.add("cursor-grabbing");
    setStartX(e.pageX - scrollRef.current.offsetLeft);
    setScrollLeft(scrollRef.current.scrollLeft);
  };

  const handleMouseLeave = () => {
    setIsDown(false);
    scrollRef.current.classList.remove("cursor-grabbing");
  };

  const handleMouseUp = () => {
    setIsDown(false);
    scrollRef.current.classList.remove("cursor-grabbing");
  };

  const handleMouseMove = (e) => {
    if (!isDown) return;
    e.preventDefault();
    const x = e.pageX - scrollRef.current.offsetLeft;
    const walk = x - startX;
    scrollRef.current.scrollLeft = scrollLeft - walk;
  };

  return (
    <section className="products py-5 px-10 bg-[var(--color-white)]">
      <div className="max-w-screen-xl mx-auto text-center">
        {/* Category Tabs */}
        <div
          ref={scrollRef}
          onMouseDown={handleMouseDown}
          onMouseLeave={handleMouseLeave}
          onMouseUp={handleMouseUp}
          onMouseMove={handleMouseMove}
          className="overflow-x-auto whitespace-nowrap scrollbar-hide mb-6">
          <div className="inline-flex gap-4">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveTab(cat.title)}
                className={`px-6 py-2 rounded-full hover:bg-[var(--color-highlight)] border hover:border-[var(--color-highlight)] text-sm font-semibold transition-all shrink-0
                  ${
                    activeTab === cat.title
                      ? "bg-black text-white border-black"
                      : "bg-white text-black border-gray-300"
                  }`}>
                {cat.title}
              </button>
            ))}
          </div>
        </div>

        {/* Category Content */}
        {(categoryImages[activeTab] || []).length === 0 ? (
          <p className="text-gray-500">
            No products available in this category.
          </p>
        ) : (
          <>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6 justify-items-center">
              {categoryImages[activeTab].map((url, index) => (
                <div
                  key={index}
                  className="w-auto h-auto rounded-lg p-3 flex flex-col items-center">
                  <img
                    src={url}
                    alt={`${activeTab}-${index}`}
                    className="w-[250px] h-[250px] object-cover rounded-3xl mb-2 border border-[var(--color-black)]"
                  />
                  <div className="w-full flex justify-between items-start text-sm">
                    <p className="font-semibold text-gray-800 truncate max-w-[60%]">
                      {`${activeTab} Product ${index + 1}`}
                    </p>
                    <div className="flex flex-col items-end text-yellow-500">
                      <span className="font-semibold text-gray-900">
                        MMK {(10000).toFixed(2)}
                      </span>
                      <div>
                        {"★".repeat(4)}
                        <span className="text-gray-300">★</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* See More Button */}
            <div className="flex justify-center">
              <button
                onClick={() => console.log("Load more clicked!")}
                className="my-4 px-6 py-2 bg-black text-white rounded hover:bg-gray-800 transition">
                See More
              </button>
            </div>
          </>
        )}
      </div>
    </section>
  );
};

export default Products;
