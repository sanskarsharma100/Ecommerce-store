import React, { FC, useEffect, useRef } from "react";
import { useState } from "react";

type Props = {
  pictures: Array<string>;
};

const BannerSlider: FC<Props> = ({ pictures }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

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
    const imgNode = document.querySelectorAll(".imgListDiv > img")[
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
      key={img + index}
      className={`m-1 h-[10px] w-[10px] rounded-lg duration-300 ${
        index == currentIndex ? `bg-accent` : `bg-semiDarkOverlay`
      }`}
      onClick={() => slideToImage(index)}
    ></button>
  ));

  const slider = pictures.map((img, index) => (
    <React.Fragment key={index + img}>
      <figure
        style={{
          backgroundImage: `url(${img})`,
          transform: `translateX(${-(currentIndex * 100)}%)`,
        }}
        className="h-full min-w-full rounded-lg bg-cover bg-left-top duration-500 ease-in-out"
      ></figure>
    </React.Fragment>
  ));

  useEffect(() => {
    const timerId = setInterval(() => {
      nextSlide();
    }, 4000);

    return () => {
      clearInterval(timerId);
    };
  }, [currentIndex]);

  return (
    <section className="mx-auto my-0 overflow-hidden md:min-w-[60%]">
      <div className="relative flex aspect-[16/6] h-full w-full">
        {slider}
        <button
          role="button"
          className="group absolute left-0 top-0 hidden h-full w-[5%] overflow-hidden rounded-l-lg duration-300 hover:bg-semiDarkOverlay xs:block"
          onClick={previousSlide}
        >
          <span className="left float-left ml-[40%] rotate-[135deg] -skew-x-12 -skew-y-12 border-b-4 border-r-4 p-2 drop-shadow-[0px_0px_5px_rgb(0,0,0)] duration-300 group-hover:ml-[30%] xs:p-1 sm:border-b-8 sm:border-r-8 sm:p-3"></span>
        </button>
        <button
          role="button"
          className="group absolute right-0 top-0 hidden h-full w-[5%] rounded-r-lg duration-300 hover:bg-semiDarkOverlay xs:block "
          onClick={nextSlide}
        >
          <span className=" right float-right mr-[40%] -rotate-45 -skew-x-12 -skew-y-12 border-b-4 border-r-4 p-2 drop-shadow-[0px_0px_5px_rgb(0,0,0)] duration-300 group-hover:mr-[30%] xs:p-1 sm:border-b-8 sm:border-r-8 sm:p-3"></span>
        </button>
      </div>
      <div className="flex justify-center">{dots}</div>
    </section>
  );
};

export default BannerSlider;
