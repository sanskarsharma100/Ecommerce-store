import { FC } from "react";
import { FooterLinks } from "./FooterLinks";
import BrandName from "../../assets/images/BrandName.svg";
import iconFacebook from "../../assets/icons/iconFacebook.svg";
import iconInstagram from "../../assets/icons/iconInstagram.svg";
import iconTwitter from "../../assets/icons/iconTwitter.svg";
import iconYoutube from "../../assets/icons/iconYoutube.svg";

export const Footer: FC = () => {
  const help = [
    "Track You Orders",
    "Return Policy",
    "Warranty & Support",
    "Service Centers",
    "FAQs",
  ];
  const company = [
    "About",
    "Careers",
    "Security",
    "Terms of Service",
    "Privacy Policy",
    "Warranty Policy",
  ];

  const socialIcons = [
    { src: iconFacebook, alt: "Facebook" },
    { src: iconTwitter, alt: "Twitter" },
    { src: iconInstagram, alt: "Instagram" },
    { src: iconYoutube, alt: "Youtube" },
  ];

  const socials = socialIcons.map((icon, i) => (
    <li key={i}>
      <img
        src={icon.src}
        alt={icon.alt}
        className="w-6 hover:cursor-pointer hover:drop-shadow-[0_0_5px_hsl(0,0%,40%)]"
      />
    </li>
  ));

  return (
    <footer className="bg-background-2 p-2 font-inter ss:mt-6 ss:px-6">
      <div className="mt-2 flex flex-col gap-2 ss:flex-row">
        <div>
          <img
            src={BrandName}
            alt="ShopeeFast"
            className="m-auto mb-4 w-40 ss:w-60"
          />
        </div>
        <div className="flex w-full justify-evenly">
          <FooterLinks title={"help"} links={help} />
          <FooterLinks title={"company"} links={company} />
        </div>
        <ul className="mt-2 flex justify-evenly ss:flex-col">{socials}</ul>
      </div>
      <div className="mt-4 text-center text-xs text-white ss:text-left">
        <p>&#169; 2022 ShopeeFast Private Limited.</p>
      </div>
    </footer>
  );
};
