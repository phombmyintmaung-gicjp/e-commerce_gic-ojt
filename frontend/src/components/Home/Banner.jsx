import React from "react";
import returnIcon from "../../assets/return_icon.svg";
import secureIcon from "../../assets/secure_icon.svg";
import shippingIcon from "../../assets/shipping_icon.svg";

const Banner = () => {
  return (
    <section className="banner px-5 py-10">
      <div className="flex justify-between">
        <div className="flex items-center">
          <img src={shippingIcon} alt="banner" className="h-50 w-50 p-1 transition-transform duration-500 hover:-translate-y-2" />
          <span className="text-[32px]">Shipping</span>
        </div>
        <div className="flex items-center">
          <img src={secureIcon} alt="banner" className="h-50 w-50 p-1 transition-transform duration-500 hover:-translate-y-2" />
          <span className="text-[32px]">Secure Payment</span>
        </div>
        <div className="flex items-center">
          <img src={returnIcon} alt="banner" className="h-50 w-50 p-1 transition-transform duration-500 hover:rotate-180 " />
          <span className="text-[32px]">Easy Returns</span>
        </div>
      </div>
    </section>
  );
};

export default Banner;
