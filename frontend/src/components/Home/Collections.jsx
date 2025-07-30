import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import image1 from "../../assets/collections1.svg";
import image2 from "../../assets/collections2.svg";
import image3 from "../../assets/collections3.svg";
import image4 from "../../assets/collections4.svg";

const Collections = () => {
  const images = [image1, image2, image3, image4, image1];
  return (
    <section className="collections px-10 pt-10 pb-24 border border-y">
      <div className="flex justify-between mb-10">
        <span className="text-4xl text-left leading-relaxed">
          Elevate Your Look with Our
          <br />
          Trending Setting Collections
        </span>
        <span className="text-2xl text-[var(--color-dark-gray)] text-right">
          Discover the Latest Fashion Trends
          <br /> and enhance your style with our
          <br />
          unique and fashionable collections
        </span>
      </div>
      <div className="relative overflow-x-visible ">
        <Swiper
          modules={[Navigation]}
          spaceBetween={20}
          slidesPerView={"auto"}
          navigation={{
            nextEl: ".next",
            prevEl: ".prev",
          }}
          loop={true}>
          {images.map((url, i) => (
            <SwiperSlide
              key={i}
              style={{ width: "500px" }}
              className="rounded-xl overflow-hidden">
              <img
                src={url}
                alt={`slide-${i}`}
                className="w-[500px] h-[400px] object-cover"
              />
            </SwiperSlide>
          ))}
        </Swiper>

        {/* Custom navigation buttons */}
        <div className="absolute right-14 -bottom-20 flex gap-3 z-10">
          <button className="prev text-lg bg-black text-white p-4 rounded-full hover:bg-gray-700">
            &lt;
          </button>
          <button className="next text-lg bg-black text-white p-4 rounded-full hover:bg-gray-700">
            &gt;
          </button>
        </div>
      </div>
    </section>
  );
};

export default Collections;
