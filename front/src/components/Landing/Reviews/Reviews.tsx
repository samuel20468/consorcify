import ReviewCard from "./ReviewCard/ReviewCard";
import "./style.css";
import { reviews } from "@/utils/data";
import React, { useState } from "react";
import { EmblaOptionsType } from "embla-carousel";
import useEmblaCarousel from "embla-carousel-react";
import AutoScroll from "embla-carousel-auto-scroll";

type PropType = {
  reviews: {
    profilePic: string;
    text: string;
    author: string;
    date: string;
    rating: number;
  }[];
  options?: EmblaOptionsType;
};

const Reviews: React.FC<PropType> = (props) => {
  const { reviews, options } = props;
  const [emblaRef] = useEmblaCarousel(options, [
    AutoScroll({ playOnInit: true, stopOnInteraction: false }),
  ]);

  //logica para cambiar el cursor cuando se hace click

  const [isDragging, setIsDragging] = useState(false);

  const handleMouseDown = () => setIsDragging(true);
  const handleMouseUp = () => setIsDragging(false);
  const handleMouseLeave = () => setIsDragging(false);

  return (
    <>
      <div className="h-screen">
        <div className="flex justify-center font-[clash-regular] text-4xl pt-[200px]  pb-[150px]">
          <h3 className="text-white text-center">
            Lorem ipsum dolor sit amet, consectetur.
            <br />
            Consectetur, adipisicing elit.
            <br />
            <span className="text-2xl text-[#474747]">
              +47k Lorem ipsum dolor sit amet 
            </span>
          </h3>
        </div>

        <div
          className={`embla ${isDragging ? "grabbing" : ""}`}
          onMouseDown={handleMouseDown}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseLeave}
        >
          <div className="embla__viewport" ref={emblaRef}>
            <div className="embla__container">
              {reviews.map((review, index) => (
                <div className="embla__slide" key={index}>
                  <ReviewCard review={review} />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Reviews;

{
  reviews.map((review, index) => <ReviewCard key={index} review={review} />);
}
