"use client";

import { TRentalHouse } from "@/types/RentalHouse.type";
import React, { MutableRefObject } from "react";
import "./detailsSlider.css";
import {
  useKeenSlider,
  KeenSliderPlugin,
  KeenSliderInstance,
} from "keen-slider/react";
import "keen-slider/keen-slider.min.css";
import Image from "next/image";
import RequestRentalModal from "@/components/ui/core/RequestRentalModal";

function ThumbnailPlugin(
  mainRef: MutableRefObject<KeenSliderInstance | null>
): KeenSliderPlugin {
  return (slider) => {
    function removeActive() {
      slider.slides.forEach((slide) => {
        slide.classList.remove("active");
      });
    }
    function addActive(idx: number) {
      slider.slides[idx].classList.add("active");
    }

    function addClickEvents() {
      slider.slides.forEach((slide, idx) => {
        slide.addEventListener("click", () => {
          if (mainRef.current) mainRef.current.moveToIdx(idx);
        });
      });
    }

    slider.on("created", () => {
      if (!mainRef.current) return;
      addActive(slider.track.details.rel);
      addClickEvents();
      mainRef.current.on("animationStarted", (main: any) => {
        removeActive();
        const next = main.animator.targetIdx || 0;
        addActive(main.track.absToRel(next));
        slider.moveToIdx(Math.min(slider.track.details.maxIdx, next));
      });
    });
  };
}

const RentalHouseDetailsCard = ({
  singleData,
}: {
  singleData: TRentalHouse;
}) => {
  const [sliderRef, instanceRef] = useKeenSlider<HTMLDivElement>({
    initial: 0,
  });
  const [thumbnailRef] = useKeenSlider<HTMLDivElement>(
    {
      initial: 0,
      slides: {
        perView: 3,
        spacing: 10,
      },
    },
    [ThumbnailPlugin(instanceRef)]
  );
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
      <div>
        <div ref={sliderRef} className="keen-slider">
          {singleData?.images?.map((img, index) => (
            <div
              key={index}
              className={`keen-slider__slide number-slide${index + 1}`}
            >
              <Image
                className="rounded"
                src={img}
                fill
                alt={`Apartment image ${index + 1}`}
              />
            </div>
          ))}
        </div>

        <div ref={thumbnailRef} className="keen-slider thumbnail">
          {singleData?.images?.map((img, index) => (
            <div
              key={index}
              className={`keen-slider__slide number-slide${index + 1}`}
            >
              <Image
                className="rounded"
                src={img}
                fill
                alt={`Apartment image ${index + 1}`}
              />
            </div>
          ))}
        </div>
      </div>

      <div className="space-y-3">
        <h3 className="font-bold text-2xl">
          Location:{" "}
          <span className="text-primary-500">{singleData?.location}</span>
        </h3>
        <hr />
        <div className="flex justify-between">
          <p className="text-sm">Bedrooms: {singleData?.bedrooms}</p>
          <p className="text-sm">Rent: ${singleData?.rentAmount}</p>
        </div>

        <ul className="flex gap-3 flex-wrap py-1">
          {singleData?.amenities?.map((amenitie, index) => (
            <li
              style={{ fontSize: "10px" }}
              key={index}
              className="bg-gray-200 px-1 rounded border border-gray-300"
            >
              {amenitie}
            </li>
          ))}
        </ul>

        <p className="!text-sm text-gray-700">{singleData?.description}</p>
        <hr />
        <p className="!text-sm text-gray-700">
          This beautifully designed 3-bedroom, 2-bathroom family home is nestled
          in a peaceful and safe neighborhood, perfect for families, working
          professionals, or students looking for a comfortable and convenient
          place to stay. The house features a spacious open-concept living and
          dining area with large windows that allow plenty of natural light to
          flood the space. The modern kitchen comes fully equipped with
          essential appliances, ample cabinet space, and sleek countertops.
        </p>
        <RequestRentalModal
          rentalHouse={singleData}
        />
      </div>
    </div>
  );
};

export default RentalHouseDetailsCard;
