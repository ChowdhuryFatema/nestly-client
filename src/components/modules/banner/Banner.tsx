"use client";

import * as React from "react";
import "./Banner.css";
import { useKeenSlider } from "keen-slider/react";
import "keen-slider/keen-slider.min.css";
import Image from "next/image";
import banner1 from "@/app/assets/images/home1.jpg";
import banner2 from "@/app/assets/images/home2.jpg";
import banner3 from "@/app/assets/images/home3.jpg";
import banner4 from "@/app/assets/images/home4.jpg";
import banner5 from "@/app/assets/images/home5.jpg";
import banner6 from "@/app/assets/images/home1.jpg";
import banner7 from "@/app/assets/images/home1.jpg";
import banner8 from "@/app/assets/images/home1.jpg";
import NLButton from "@/components/ui/core/ImageUploader/NLButton";
import Link from "next/link";
import { getCurrentUser } from "@/services/AuthService";
import { TUser } from "@/types";
import { useEffect, useState } from "react";

const images = [
  banner1,
  banner2,
  banner3,
  banner4,
  banner5,
  banner6,
  banner7,
  banner8,
];

const animation = { duration: 1000, easing: (t: number) => t };

function Banner() {
  const [opacities, setOpacities] = useState<number[]>([]);
  const [user, setUser] = useState<TUser | null>(null);
  const [loading, setLoading] = useState(true);

  const handleUser = async () => {
    const user = await getCurrentUser();
    setUser(user);
    setLoading(false);
  };

  useEffect(() => {
    handleUser();
  }, [loading]);

  const [sliderRef] = useKeenSlider<HTMLDivElement>({
    slides: images.length,
    loop: true,
    created(s) {
      setTimeout(() => {
        s.moveToIdx(s.track.details.abs + 1, true, animation);
      }, 7000); // 2 minutes
    },
    animationEnded(s) {
      setTimeout(() => {
        s.moveToIdx(s.track.details.abs + 1, true, animation);
      }, 7000); // 2 minutes
    },
    detailsChanged(s) {
      const new_opacities = s.track.details.slides.map(
        (slide) => slide.portion
      );
      setOpacities(new_opacities);
    },
  });

  return (
    <div>
      <div ref={sliderRef} className="fader">
        {images.map((src, idx) => (
          <div key={idx}>
            <div className="bg-black w-full h-screen absolute z-10 opacity-10"></div>
            <div className="text-white absolute z-30 flex justify-center items-center w-full h-[60vh]">
              <div className="text-center lg:w-3xl px-5 py-5 space-y-2">
                <h2
                  className="text-2xl md:text-4xl lg:text-5xl leading-snug"
                  data-aos="fade-down"
                  data-aos-duration="500"
                >
                  Find Your Next{" "}
                  <span className="text-primary-500 !pt-5">Home</span> with Ease
                </h2>
                <p
                  // data-aos="fade-down"
                  // data-aos-duration="500"
                  // data-aos-delay="500"
                  className="text-sm md:text-xl !font-light"
                >
                  Find comfortable, stylish, and affordable rental homes in your
                  preferred location with ease. Nestly makes renting simple,
                  reliable, and stress-free
                </p>
                {user?.role === "landlord" ? (
                  <div className="flex justify-center items-center !mt-6 !px-5">
                    <Link href={"/create-rental"}>
                      <NLButton
                        variant="primary"
                        className="lg:px-5 lg:py-3 text-sm lg:text-lg"
                      >
                        Post Rental House Info
                      </NLButton>
                    </Link>
                  </div>
                ) : (
                  <div className="flex justify-center items-center !mt-6 !px-5">
                    <Link href={"/all-listings-rental"}>
                      <NLButton
                        variant="primary"
                        className="lg:px-5 lg:py-3 text-sm lg:text-lg"
                      >
                        All Listings Rental
                      </NLButton>
                    </Link>
                  </div>
                )}
              </div>
            </div>
            <div className="fader__slide" style={{ opacity: opacities[idx] }}>
              {/* <img src={src} /> */}
              <Image src={src} fill alt="Banner" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Banner;
