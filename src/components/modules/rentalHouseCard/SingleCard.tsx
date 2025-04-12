import Image from "next/image";
import React, { useState } from "react";
import "./cardSlider.css";
import { useKeenSlider } from "keen-slider/react";
import "keen-slider/keen-slider.min.css";
import NLButton from "@/components/ui/core/ImageUploader/NLButton";
import Link from "next/link";
import { TRentalHouse } from "@/types/RentalHouse.type";

type TTRentalHouseProps = {
  info: TRentalHouse;
};

const SingleCard = ({ info }: TTRentalHouseProps) => {
  const [currentSlide, setCurrentSlide] = React.useState(0);
  const [loaded, setLoaded] = useState(false);
  const [sliderRef, instanceRef] = useKeenSlider<HTMLDivElement>({
    initial: 0,
    slideChanged(slider) {
      setCurrentSlide(slider.track.details.rel);
    },
    created() {
      setLoaded(true);
    },
  });

  return (
    <div className="shadow-xl border border-gray-300 rounded p-5">
      {/* card slider */}
      <div>
        <div className="navigation-wrapper">
          <div ref={sliderRef} className="keen-slider rounded">
            {info?.images?.map((img, index) => (
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

          {loaded && instanceRef.current && (
            <>
              <Arrow
                left
                onClick={(e: any) =>
                  e.stopPropagation() || instanceRef.current?.prev()
                }
                disabled={currentSlide === 0}
              />

              <Arrow
                onClick={(e: any) =>
                  e.stopPropagation() || instanceRef.current?.next()
                }
                disabled={
                  currentSlide ===
                  instanceRef.current.track.details.slides.length - 1
                }
              />
            </>
          )}
        </div>
        {loaded && instanceRef.current && (
          <div className="dots">
            {[
              ...Array(instanceRef.current.track.details.slides.length).keys(),
            ].map((idx) => {
              return (
                <button
                  key={idx}
                  onClick={() => {
                    instanceRef.current?.moveToIdx(idx);
                  }}
                  className={"dot" + (currentSlide === idx ? " active" : "")}
                ></button>
              );
            })}
          </div>
        )}
      </div>
      {/* card body */}

      <div className="space-y-2">
        <div className="flex justify-between">
          <p className="text-sm">Bedrooms: {info?.bedrooms}</p>
          <p className="text-sm">Rent: ${info?.rent}</p>
        </div>
        <p className="font-bold">
          Location: <span className="text-primary-500">{info?.location}</span>
        </p>
        <ul className="flex gap-3 flex-wrap py-1">
          {info?.amenities?.map((amenitie, index) => (
            <li
              style={{ fontSize: "10px" }}
              key={index}
              className="bg-gray-200 px-1 rounded border border-gray-300"
            >
              {amenitie}
            </li>
          ))}
        </ul>

        {/* <p className="!text-sm text-gray-700">{info?.description}</p> */}

        <Link href={`/details/${info.id}`}>
          <NLButton variant="primary" className="mt-2">
            View Details
          </NLButton>
        </Link>
      </div>
    </div>
  );
};

export default SingleCard;

function Arrow(props: {
  disabled: boolean;
  left?: boolean;
  onClick: (e: any) => void;
}) {
  const disabled = props.disabled ? " arrow--disabled" : "";
  return (
    <svg
      onClick={props.onClick}
      className={`arrow ${
        props.left ? "arrow--left" : "arrow--right"
      } ${disabled}`}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
    >
      {props.left && (
        <path d="M16.67 0l2.83 2.829-9.339 9.175 9.339 9.167-2.83 2.829-12.17-11.996z" />
      )}
      {!props.left && (
        <path d="M5 3l3.057-3 11.943 12-11.943 12-3.057-3 9-9z" />
      )}
    </svg>
  );
}
