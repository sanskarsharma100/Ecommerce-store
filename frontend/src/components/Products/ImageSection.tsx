import { FC, useEffect, useRef, useState } from "react";
import { ImageType } from "../../utils/types";
import iconArrow from "../../assets/icons/iconArrow.svg";

type Props = {
  images: [ImageType];
};

export const ImageSection: FC<Props> = ({ images }) => {
  const [selectedImage, setSelectedImage] = useState<string>(images[0].url);

  const imagesRef = useRef(null);

  const scrollUp = () => {
    const section = document.querySelector("#productImages");
    if (section) {
      section.scrollBy(0, -175);
    }
  };

  const scrollDown = () => {
    const section = document.querySelector("#productImages");
    if (section) {
      section.scrollBy(0, 175);
    }
  };

  const imagesList = images?.map((image) => (
    <li
      key={image._id}
      className={`flex items-center justify-between ss:max-w-[5rem] ${
        image.url == selectedImage && "ring-1 ring-accent ring-offset-2"
      }`}
      onClick={() => setSelectedImage(image.url)}
    >
      <img
        src={image.url}
        alt="Product Image"
        className="m-auto h-16 ss:h-auto"
      />
    </li>
  ));

  return (
    <section className="flex flex-col-reverse gap-2 overflow-hidden ss:flex-row">
      <div className="flex gap-0.5 border p-0.5 ss:flex-col">
        <button
          className="min-w-[0.75rem] outline outline-1 outline-black hover:outline-accent ss:w-full"
          onClick={scrollUp}
        >
          <img
            src={iconArrow}
            alt="Scroll Up"
            className="m-auto w-2 rotate-180 ss:-rotate-90"
          />
        </button>
        <ul
          id="productImages"
          className="no-scrollbar flex h-full w-full justify-center gap-2 overflow-auto scroll-smooth p-1 ss:h-[4rem] ss:min-w-[4rem] ss:flex-col"
          ref={imagesRef}
        >
          {imagesList}
        </ul>
        <button
          className="min-w-[0.75rem] outline outline-1 outline-black hover:outline-accent ss:w-full"
          onClick={scrollDown}
        >
          <img
            src={iconArrow}
            alt="Scroll Down"
            className="m-auto w-2 ss:rotate-90"
          />
        </button>
      </div>
      <div className="flex aspect-square max-w-full items-center justify-center border border-light ss:max-h-full">
        <img
          src={selectedImage}
          alt="Selected Product Image"
          className="m-auto h-full ss:max-h-full"
        />
      </div>
    </section>
  );
};
