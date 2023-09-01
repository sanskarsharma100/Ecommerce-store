import {
  Dispatch,
  FC,
  FormEvent,
  SetStateAction,
  useEffect,
  useRef,
  useState,
} from "react";
import { FaMagnifyingGlass } from "react-icons/fa6";
import { useLocation, useNavigate } from "react-router-dom";

type Props = {
  isSearchBarFocused: boolean;
  setIsSearchBarFocused: Dispatch<SetStateAction<boolean>>;
};

export const SearchBar: FC<Props> = ({
  isSearchBarFocused,
  setIsSearchBarFocused,
}) => {
  const location = useLocation();
  const urlParams = new URLSearchParams(location.search);
  const [searchText, setSearchText] = useState<string>(
    urlParams.get("keyword") || ""
  );
  const searchBarRef = useRef<HTMLFormElement>(null);
  const searchBtnRef = useRef<HTMLButtonElement>(null);
  // const [isSearchBarFocused, setIsSearchBarFocused] = useState<boolean>(false);
  const navigate = useNavigate();

  const handleSearch = (e: FormEvent) => {
    e.preventDefault();
    if (searchText) {
      navigate(`/products?keyword=${encodeURIComponent(searchText.trim())}`);
    } else {
      navigate(`/products`);
    }
  };

  console.log("isSearchBarFocused", isSearchBarFocused);

  useEffect(() => {
    const handleOutsideClick = (e: Event) => {
      const target = e.target as HTMLElement;
      const currentTarget = e.currentTarget as HTMLElement;
      console.log("target", target);

      if (
        searchBarRef.current &&
        !searchBarRef.current.contains(target) &&
        searchBtnRef.current != currentTarget
      ) {
        setIsSearchBarFocused(false);
      }
    };
    document.addEventListener("mousedown", handleOutsideClick);
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, [setIsSearchBarFocused]);

  return (
    <>
      <form
        className={`relative hidden h-full w-full self-center xs:!flex xs:h-fit ${
          isSearchBarFocused && "!flex"
        }`}
        ref={searchBarRef}
        onSubmit={handleSearch}
      >
        <input
          type="search"
          className="w-full overflow-ellipsis !border-black p-1 pr-8 focus:bg-slate-100 focus:ring-[none]"
          placeholder="Search Products"
          value={searchText}
          autoFocus={true}
          onChange={(e) => setSearchText(e.target.value.trim())}
        />
        <button
          className="absolute right-0 top-0 flex h-full items-center justify-center border border-black bg-background p-1 px-2 "
          type="submit"
        >
          <FaMagnifyingGlass size="16px" />
        </button>
      </form>
      <button
        className={`right-0 ml-auto flex items-center justify-center border border-black bg-background p-2 xs:!hidden ${
          isSearchBarFocused && "hidden"
        }`}
        onClick={() => setIsSearchBarFocused(true)}
      >
        <FaMagnifyingGlass size="16px" />
      </button>
    </>
  );
};
