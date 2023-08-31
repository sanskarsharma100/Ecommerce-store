import { FC } from "react";

interface Props {
  children: React.ReactNode;
}

export const AuthBgWrapper: FC<Props> = ({ children }) => {
  return (
    <div className="flex h-screen bg-shopBg">
      <section className="relative m-auto w-11/12 max-w-md border-3 border-secondary bg-primary px-3 py-5 font-inter text-textColor">
        {children}
      </section>
    </div>
  );
};
