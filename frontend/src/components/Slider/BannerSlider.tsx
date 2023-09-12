import React, { FC, useEffect } from "react";
import { useState } from "react";
import useSwipe from "../../hooks/useSwipe";
import { Link } from "react-router-dom";
import { FaAnglesDown } from "react-icons/fa6";

type Props = {
  pictures: {
    image: string;
    link: string;
  }[];
};

const BannerSlider: FC<Props> = ({ pictures }) => {
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

  const dots = pictures.map((picture, index) => (
    <button
      role="button"
      key={picture.image}
      className={`m-1 h-[8px] w-[8px] rounded-full duration-300 xs:h-[10px] xs:w-[10px] ${
        index == currentIndex ? `bg-primary-900` : `bg-primary-400`
      }`}
      onClick={() => slideToImage(index)}
    ></button>
  ));

  const slider = pictures.map((picture) => (
    <React.Fragment key={picture.image + picture.link}>
      <Link
        to={picture.link}
        style={{
          backgroundImage:
            "linear-gradient(0deg, rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.2))," +
            `url(${picture.image})`,
          transform: `translateX(${-(currentIndex * 100)}%)`,
        }}
        className="group relative min-w-full bg-cover bg-top bg-no-repeat duration-500 ease-in-out ss:min-h-full"
      >
        <div className="absolute bottom-3 flex flex-col gap-1.5 xs:bottom-5 xs:left-5 xs:max-w-xs xs:gap-2.5 ss:bottom-20 ss:left-10 ss:max-w-lg md:bottom-40 md:left-20">
          <div className="m-auto max-w-[80%] text-center text-dynamic text-white xs:max-w-max xs:text-left xs:text-sm ss:text-lg sm:text-xl">
            Revamp your wardrobe with the latest fashion trends, delivered
            straight to your doorstep.
          </div>
          <button className="m-auto w-fit border-2 border-white px-1 py-0.5 text-dynamic text-primary-050 duration-300 group-hover:border-primary-900 group-hover:bg-primary-900 group-hover:text-primary-100 group-active:border-primary-900 group-active:bg-primary-900 group-active:text-primary-100 xs:m-0 xs:px-2 xs:py-1 xs:text-xs ss:px-4 ss:py-2 ss:text-base">
            Shop Now
          </button>
        </div>
      </Link>
    </React.Fragment>
  ));

  useEffect(() => {
    const timerId = setInterval(() => {
      nextSlide();
    }, 4000);

    return () => {
      clearInterval(timerId);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentIndex]);

  return (
    <section className="mx-auto my-0 overflow-hidden md:min-w-[60%]">
      <div
        className="relative flex aspect-[16/9] h-full w-full ss:aspect-auto ss:min-h-[660px]"
        {...swipeHandlers}
      >
        {slider}
        <a
          href="#featured-products"
          className="absolute bottom-1 left-2/4 hidden -translate-x-2/4 flex-col gap-1 text-white ss:flex"
        >
          <div>Scroll Down</div>
          <FaAnglesDown className="m-auto motion-safe:animate-bounce" />
        </a>
        <button
          role="button"
          className="group absolute left-0 top-0 hidden h-full w-[5%] overflow-hidden duration-300 hover:bg-black/40 xs:block"
          onClick={previousSlide}
        >
          <span className="left float-left ml-[40%] rotate-[135deg] -skew-x-12 -skew-y-12 border-b-4 border-r-4 p-2 drop-shadow-[0px_0px_5px_rgb(0,0,0)] duration-300 group-hover:ml-[30%] xs:p-1 sm:border-b-8 sm:border-r-8 sm:p-3"></span>
        </button>
        <button
          role="button"
          className="group absolute right-0 top-0 hidden h-full w-[5%] duration-300 hover:bg-black/40 xs:block"
          onClick={nextSlide}
        >
          <span className=" right float-right mr-[40%] -rotate-45 -skew-x-12 -skew-y-12 border-b-4 border-r-4 p-2 drop-shadow-[0px_0px_5px_rgb(0,0,0)] duration-300 group-hover:mr-[30%] xs:p-1 sm:border-b-8 sm:border-r-8 sm:p-3"></span>
        </button>
      </div>
      <div className="m-auto mt-1 flex w-fit justify-center rounded-lg p-0 xs:p-0.5">
        {dots}
      </div>
    </section>
  );
};

export default BannerSlider;
