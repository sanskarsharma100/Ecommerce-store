import { FC } from "react";

interface Props {
  children: React.ReactNode;
}

export const AuthBgWrapper: FC<Props> = ({ children }) => {
  return (
    <div className="flex h-screen before:absolute before:h-full before:w-full before:bg-primary-500 before:bg-shopBg before:bg-cover before:bg-no-repeat before:bg-blend-multiply before:content-['']">
      <section className="relative m-auto w-11/12 max-w-md rounded-lg border-2 border-primary-600 bg-primary-300 px-3 py-5 font-inter text-primary-900">
        {children}
      </section>
    </div>
  );
};
