import React, { FC } from "react";
import { useState } from "react";
import { ImageType } from "../../utils/types";
import useSwipe from "../../hooks/useSwipe";
import iconArrow from "../../assets/icons/iconArrow.svg";

type Props = {
  pictures: [ImageType];
};

const ImagesPreview: FC<Props> = ({ pictures }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const swipeHandlers = useSwipe({
    onSwipedLeft: nextSlide,
    onSwipedRight: previousSlide,
  });

  function previousSlide() {
    const newIndex = currentIndex == 0 ? pictures.length - 1 : currentIndex - 1;
    setCurrentIndex(newIndex);
    scrollToIndex(newIndex);
  }
  function nextSlide() {
    const newIndex = currentIndex == pictures.length - 1 ? 0 : currentIndex + 1;
    setCurrentIndex(newIndex);
    scrollToIndex(newIndex);
  }

  function scrollToIndex(index: number) {
    const imgNode = document.querySelectorAll(".imageContainer > img")[
      index
    ] as HTMLDivElement;
    if (imgNode) {
      imgNode.scrollIntoView({
        behavior: "smooth",
        block: "nearest",
      });
    }
  }

  function slideToImage(index: number) {
    setCurrentIndex(index);
    scrollToIndex(index);
  }

  const dots = pictures.map((img, index) => (
    <button
      role="button"
      key={img._id}
      className={`h-[8px] rounded-full duration-300 xs:h-[10px] ${
        index == currentIndex
          ? `w-[15px] bg-accent ss:w-[18px]`
          : `w-[8px] bg-grayDarker ss:w-[10px]`
      }`}
      onClick={() => slideToImage(index)}
    ></button>
  ));

  const slider = pictures.map((img) => (
    <React.Fragment key={img._id}>
      <figure
        style={{
          backgroundImage: `url(${img.url})`,
          transform: `translateX(${-(currentIndex * 100)}%)`,
        }}
        className="h-full min-w-full bg-contain bg-center bg-no-repeat duration-500 ease-in-out"
      ></figure>
    </React.Fragment>
  ));

  const imgList = pictures.map((img, index) => (
    <img
      src={img.url}
      alt="Game Photo"
      key={img._id}
      className={`w-20 hover:cursor-pointer sm:w-16 ${
        index == currentIndex && `border-2 border-accent`
      }`}
      onClick={() => slideToImage(index)}
      loading="lazy"
    />
  ));

  return (
    <div className="mx-auto my-0 flex flex-row-reverse overflow-hidden md:min-w-[60%]">
      <div
        className="relative flex aspect-[6/6] h-full w-full overflow-hidden border border-light"
        {...swipeHandlers}
      >
        {slider}
        <button
          role="button"
          className="group absolute left-0 top-1/2 m-1 flex h-8 w-8 -translate-y-1/2 items-center justify-center overflow-hidden rounded-full bg-white shadow-[0px_0px_10px_rgba(0,0,0,0.2)] duration-300"
          onClick={previousSlide}
        >
          <img src={iconArrow} alt="Next Image" className="h-4 rotate-180" />
        </button>
        <button
          role="button"
          className="group absolute right-0 top-1/2 m-1 flex h-8 w-8 -translate-y-1/2 items-center justify-center overflow-hidden rounded-full bg-white shadow-[0px_0px_10px_rgba(0,0,0,0.2)] duration-300"
          onClick={nextSlide}
        >
          <img src={iconArrow} alt="Next Image" className="h-4" />
        </button>
        <div className="absolute bottom-1 left-1/2 mt-1 flex w-fit -translate-x-1/2 justify-between gap-1 rounded-lg p-1">
          {dots}
        </div>
      </div>
      <div className="imageContainer slider-scrollbar relative mr-4 hidden h-full min-h-full w-fit flex-col gap-2 overflow-x-auto scroll-smooth border border-light ss:flex">
        {imgList}
      </div>
    </div>
  );
};

export default ImagesPreview;
