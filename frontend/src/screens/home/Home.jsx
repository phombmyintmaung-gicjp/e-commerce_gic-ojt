import React from "react";
import { Link } from "react-router-dom";
import Hero from "../../components/Home/Hero";
import Brands from "../../components/Home/Brands";
import Products from "../../components/Home/Products";
import Collections from "../../components/Home/Collections";
import Banner from "../../components/Home/Banner";

const Home = () => {
  return (
    <div className="home">
      <div data-aos="zoom-in">
        <Hero />
      </div>
      <div data-aos="zoom-up">
        <Brands />
      </div>
      <div data-aos="zoom-in">
        <Products />
      </div>
      <Collections />
      <div data-aos="fade-ina">
        <Banner />
      </div>
    </div>
  );
};

export default Home;
