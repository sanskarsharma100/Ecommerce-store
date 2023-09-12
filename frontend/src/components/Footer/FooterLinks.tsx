import { FC } from "react";

type Props = {
  title: string;
  links: string[];
};

export const FooterLinks: FC<Props> = ({ title, links }) => {
  return (
    <div>
      <p className="text-sm font-semibold uppercase text-primary-100 ss:text-base">
        {title}
      </p>
      <ul>
        {links.map((link, i) => (
          <li key={i}>
            <a
              href="#"
              className="text-xs font-light text-primary-400 hover:underline ss:text-sm"
            >
              {link}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
};
