import { FC } from "react";

interface Props {
  children: React.ReactNode;
}

export const AuthBgWrapper: FC<Props> = ({ children }) => {
  return (
    <div className="flex h-screen bg-shopBg">
      <section className="relative m-auto w-11/12 max-w-xl rounded-lg bg-green-600 px-3 py-5 font-inter text-white shadow-cardShadow brightness-90 xs:px-5 xs:py-7">
        {children}
      </section>
    </div>
  );
};
