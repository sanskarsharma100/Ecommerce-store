import { forwardRef, Ref } from "react";

type Props = {
  // eslint-disable-next-line no-unused-vars
  hamBtnHandler: (e: React.FormEvent) => void;
};

export const HamBtn = forwardRef(
  ({ hamBtnHandler }: Props, ref: Ref<HTMLInputElement>) => {
    return (
      <label
        className="absolute right-1 top-1/2 z-[999] -translate-y-1/2 hover:cursor-pointer"
        htmlFor="menuBtn"
        onClick={hamBtnHandler}
      >
        <span className="sr-only">Menubar Button</span>
        <div className="relative flex h-[32px] w-[32px] transform items-center justify-center overflow-hidden transition-all duration-200">
          <div className="ham-btn flex h-full w-full transform flex-col items-center justify-center gap-1 overflow-hidden transition-all duration-300">
            <input
              className="peer hidden"
              type="checkbox"
              id="menuBtn"
              ref={ref}
            />
            <div className="peer-checked:translate-y-0.3 peer-checked:translate-x-0.6 h-[3px] w-4 origin-left transform bg-primary-900 transition-all duration-300 peer-checked:rotate-[45deg]"></div>
            <div className="h-[3px] w-4 transform rounded bg-primary-900 transition-all duration-300 peer-checked:-translate-x-10"></div>
            <div className="peer-checked:translate-x-0.6 h-[3px] w-4 origin-left transform bg-primary-900 transition-all  duration-300 peer-checked:-translate-y-0.5 peer-checked:-rotate-[45deg]"></div>
          </div>
        </div>
      </label>
    );
  }
);
