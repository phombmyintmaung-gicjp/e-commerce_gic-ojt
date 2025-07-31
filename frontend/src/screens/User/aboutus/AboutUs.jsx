import React from "react";
import member1 from "../../../assets/member1.svg";
import member2 from "../../../assets/member2.svg";
import member3 from "../../../assets/member3.svg";

const AboutUs = () => {
  return (
    <>
      <section className="hero bg-[var(--color-white)]" data-aos="fade-in">
        <div className="text-left py-32 bg-cover bg-center bg-[url('https://images.unsplash.com/photo-1527576539890-dfa815648363?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3MjAxN3wwfDF8c2VhcmNofDEwfHxidWlsZGluZ3xlbnwwfHx8fDE3NTM4NDI0ODJ8MA&ixlib=rb-4.1.0&q=85&q=85&fmt=jpg&crop=entropy&cs=tinysrgb&w=450')]">
          <p className="text-[64px] pl-[360px]">About Us</p>
          <p className="text-[16px] pl-[520px]">
            Our mission is to provide the exccellent fashion-social life with
            the
            <br />
            latest design and fashion they need to thrive in Today’s Market.
          </p>
        </div>
        <div className="bg-[var(--color-white)] pt-[60px] pb-[40px] px-[80px]">
          <p className="text-[36px] mb-[60px]">Our Story</p>
          {/* titles */}
          <div className="flex justify-between px-[80px] mb-[28px]">
            <div>
              <p className="text-[24px]">History of Company</p>
            </div>
            <div>
              <p className="text-[24px]">Mission</p>
            </div>
            <div>
              <p className="text-[24px] mr-[80px]">Company Values</p>
            </div>
          </div>
          {/* contents */}
          <div className="flex justify-between pl-[40px] pr-[80px] divide-x divide-[var(--color-dark-gray)]">
            <p className="mr-[43px]">
              Founded in 2022, Clothique was born from a desire to create
              fashion that feels effortless, timeless, and personal. Starting as
              a small online boutique, we’ve grown into a curated fashion
              destination that blends minimalist design with everyday luxury.
              Every piece we offer is thoughtfully chosen to inspire confidence
              and comfort.
            </p>
            <p className="px-[63px]">
              Our mission is simple: to make modern, refined fashion accessible
              without compromising quality or values. We believe in slowing down
              trends and offering pieces that last beyond the season — curated
              for those who value bsimplicity, individuality, and style that
              speaks softly but clearly.
            </p>
            <p className="pl-[85px]">
              At the heart of Clothique are three values: Integrity,
              Intentionality, and Inclusion. We work with ethical suppliers,
              minimize excess in both design and production, and celebrate the
              diversity of our customers — empowering self-expression through
              wearable art.
            </p>
          </div>
        </div>
      </section>
      <section className="our-team bg-[var(--color-section)] py-[60px] px-[110px]" data-aos="fade-in">
        <p className="text-[36px] text-left mb-[40px]">Meet Our Team</p>
        <div className="flex justify-between gap-x-[60px]">
          <div className="place-items-center bg-[var(--color-white)] pt-[40px] pb-[26px] px-[20px] rounded-3xl">
            <img
              src={member1}
              alt="Our Team"
              className="w-[150px] h-[150px] object-cover border rounded-full mb-[10px]"
            />
            <p className="text-[16px] mb-[20px]">David Bo Bo</p>
            <p className="text-[16px] text-var[--color-light-gray] mb-[20px]">CEO</p>
            <p className="mb-[26px]">
              Lorem ipsum asjdnsa jbasdnsa jdsnfjksdnfnkajsn kdnslkfnlssnlfk
              kjsdgfksjdnf jksnbdfkjnsdnfn kjbbsdjkdfjknslkdmlkcjsjzic
              ibvnfsdvg.
            </p>
          </div>
          <div className="place-items-center bg-[var(--color-white)] pt-[40px] pb-[26px] px-[20px] rounded-3xl">
            <img
              src={member2}
              alt="Our Team"
              className="w-[150px] h-[150px] object-cover border rounded-full mb-[10px]"
            />
            <p className="text-[16px] mb-[20px]">David Bo Bo</p>
            <p className="text-[16px] text-var[--color-light-gray] mb-[20px]">CEO</p>
            <p className="mb-[26px]">
              Lorem ipsum asjdnsa jbasdnsa jdsnfjksdnfnkajsn kdnslkfnlssnlfk
              kjsdgfksjdnf jksnbdfkjnsdnfn kjbbsdjkdfjknslkdmlkcjsjzic
              ibvnfsdvg.
            </p>
          </div>
          <div className="place-items-center bg-[var(--color-white)] pt-[40px] pb-[26px] px-[20px] rounded-3xl">
            <img
              src={member3}
              alt="Our Team"
              className="w-[150px] h-[150px] object-cover border rounded-full mb-[10px]"
            />
            <p className="text-[16px] mb-[20px]">David Bo Bo</p>
            <p className="text-[16px] text-var[--color-light-gray] mb-[20px]">CEO</p>
            <p className="mb-[26px]">
              Lorem ipsum asjdnsa jbasdnsa jdsnfjksdnfnkajsn kdnslkfnlssnlfk
              kjsdgfksjdnf jksnbdfkjnsdnfn kjbbsdjkdfjknslkdmlkcjsjzic
              ibvnfsdvg.
            </p>
          </div>
        </div>
      </section>
    </>
  );
};

export default AboutUs;
