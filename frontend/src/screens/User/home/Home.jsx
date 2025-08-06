import React, { useRef, useState } from "react";
import { Link } from "react-router-dom";
import Hero from "../../../components/Home/Hero";
import Brands from "../../../components/Home/Brands";
import Products from "../../../components/Home/Products";
import Collections from "../../../components/Home/Collections";
import Banner from "../../../components/Home/Banner";

const Home = () => {
  const [activeTab, setActiveTab] = useState("All");
  const productsRef = useRef(null);

  const handleCategoryClick = (categoryTitle) => {
    setActiveTab(categoryTitle);
    productsRef.current?.scrollIntoView({ behavior: "smooth" });
  };
  return (
    <div className="home">
      <div data-aos="zoom-in">
        <Hero onCategoryClick={handleCategoryClick}/>
      </div>
      <div data-aos="zoom-up">
        <Brands />
      </div>
      <div data-aos="zoom-in" ref={productsRef}>
        <Products activeTab={activeTab} setActiveTab={setActiveTab} />
      </div>
      <Collections />
      <div data-aos="fade-in">
        <Banner />
      </div>
    </div>
  );
};

export default Home;
