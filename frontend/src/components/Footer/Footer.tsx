import { FC } from "react";
import { FooterLinks } from "./FooterLinks";
import BrandName from "../../assets/images/BrandName.svg";
import iconGithub from "../../assets/icons/iconGithub.svg";
import iconLinkedin from "../../assets/icons/iconLinkedin.svg";

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
    {
      link: "https://github.com/sanskarsharma100",
      src: iconGithub,
      alt: "Github",
    },
    {
      link: "https://www.linkedin.com/in/sanskarsharma100",
      src: iconLinkedin,
      alt: "Linkedin",
    },
  ];

  const socials = socialIcons.map((icon, i) => (
    <li key={i}>
      <a href={icon.link} target="_blank">
        <img
          src={icon.src}
          alt={icon.alt}
          className="w-6 hover:cursor-pointer hover:drop-shadow-[0_0_5px_hsl(0,0%,40%)]"
        />
      </a>
    </li>
  ));

  return (
    <footer className="bg-primary-900 p-2 font-inter ss:px-6">
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
        <ul className="mt-2 flex justify-center gap-4 ss:flex-col">
          {socials}
        </ul>
      </div>
      <div className="mt-4 text-center text-xs text-primary-050 ss:text-left">
        <p>&#169; 2022 ShopeeFast Private Limited.</p>
      </div>
    </footer>
  );
};
