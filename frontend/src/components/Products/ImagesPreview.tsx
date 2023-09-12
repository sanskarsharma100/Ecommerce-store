import React, { FC } from "react";
import { useState } from "react";
import { ImageType } from "../../utils/types";
import useSwipe from "../../hooks/useSwipe";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa6";

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
      key={img._id + index}
      className={`h-[8px] rounded-full duration-300 xs:h-[10px] ${
        index == currentIndex
          ? `w-[15px] bg-primary-900 ss:w-[18px]`
          : `w-[8px] bg-primary-400 ss:w-[10px]`
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
    <button
      key={img.url + img._id}
      className={`m-1 flex aspect-square items-center justify-center hover:cursor-pointer ${
        index == currentIndex && `outline-3 outline outline-primary-400`
      }`}
      onClick={() => slideToImage(index)}
    >
      <img src={img.url} alt="Game Photo" className="w-20 sm:w-16" />
    </button>
  ));

  return (
    <div className="mx-auto my-0 flex flex-row-reverse overflow-hidden md:min-w-[60%]">
      <div
        className="relative flex aspect-[6/6] h-full w-full overflow-hidden border border-primary-200"
        {...swipeHandlers}
      >
        {slider}
        <button
          role="button"
          className="group absolute left-0 top-1/2 m-1 flex h-8 w-8 -translate-y-1/2 items-center justify-center overflow-hidden rounded-full bg-white shadow-[0px_0px_10px_rgba(0,0,0,0.2)] duration-300"
          onClick={previousSlide}
        >
          <FaAngleLeft className="m-auto text-lg" />
        </button>
        <button
          role="button"
          className="group absolute right-0 top-1/2 m-1 h-8 w-8 -translate-y-1/2 overflow-hidden rounded-full bg-white shadow-[0px_0px_10px_rgba(0,0,0,0.2)] duration-300"
          onClick={nextSlide}
        >
          <FaAngleRight className="m-auto text-lg text-primary-900" />
        </button>
        <div className="absolute bottom-1 left-1/2 mt-1 flex w-fit -translate-x-1/2 justify-between gap-1 rounded-lg p-1">
          {dots}
        </div>
      </div>
      <div className="imageContainer slider-scrollbar relative mr-4 hidden h-full min-h-full w-fit flex-col overflow-x-auto scroll-smooth ss:flex">
        {imgList}
      </div>
    </div>
  );
};

export default ImagesPreview;
