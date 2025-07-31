import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/autoplay";
import { useRef } from "react";

const slides = [
  {
    src: "https://images.unsplash.com/photo-1512436991641-6745cdb1723f?auto=format&fit=crop&w=300&q=80",
    title: "🔥 Mega Sale Week",
    text: "Up to 50% off on selected items!",
  },
  {
    src: "https://images.unsplash.com/photo-1541099649105-f69ad21f3246?auto=format&fit=crop&w=300&q=80",
    title: "🚚 Free Shipping",
    text: "On all orders over $99",
  },
  {
    src: "https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?auto=format&fit=crop&w=300&q=80",
    title: "🎉 New Arrivals",
    text: "Explore our latest collections today",
  },
];

export default function Carousel() {
  const prevRef = useRef(null);
  const nextRef = useRef(null);

  return (
    <div className="relative w-[347px] h-[400px]">
      <Swiper
        modules={[Navigation, Autoplay, Pagination]}
        autoplay={{ delay: 3000 }}
        loop
        pagination={{ clickable: true, type: 'bullets' }}
        navigation={{
          prevEl: prevRef.current,
          nextEl: nextRef.current,
        }}
        onInit={(swiper) => {
          swiper.params.navigation.prevEl = prevRef.current;
          swiper.params.navigation.nextEl = nextRef.current;
          swiper.navigation.init();
          swiper.navigation.update();
        }}
        className="h-full w-full rounded-lg overflow-hidden">
        {slides.map((slide, index) => (
          <SwiperSlide key={index}>
            <div className="relative w-full h-full">
              <img
                src={slide.src}
                alt={slide.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-black bg-opacity-40 flex flex-col justify-center items-center text-white px-2 text-center">
                <h3 className="text-lg font-bold">{slide.title}</h3>
                <p className="text-sm">{slide.text}</p>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Navigation Buttons */}
      <button
        ref={prevRef}
        className="absolute top-1/2 left-2 -translate-y-1/2 z-10 bg-black bg-opacity-50 text-white px-2 py-1 rounded-full hover:bg-opacity-80">
        &lt;
      </button>
      <button
        ref={nextRef}
        className="absolute top-1/2 right-2 -translate-y-1/2 z-10 bg-black bg-opacity-50 text-white px-2 py-1 rounded-full hover:bg-opacity-80">
        &gt;
      </button>
    </div>
  );
}
