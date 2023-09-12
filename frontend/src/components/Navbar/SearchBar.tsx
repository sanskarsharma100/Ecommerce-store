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
import { TextInputField } from "../Inputs/TextInputField";

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

  const navigate = useNavigate();

  const handleSearch = (e: FormEvent) => {
    e.preventDefault();
    if (searchText) {
      navigate(`/products?keyword=${encodeURIComponent(searchText.trim())}`);
    } else {
      navigate(`/products`);
    }
  };

  useEffect(() => {
    const handleOutsideClick = (e: Event) => {
      const target = e.target as HTMLElement;
      const currentTarget = e.currentTarget as HTMLElement;
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
        className={`relative hidden h-full w-full self-center overflow-hidden rounded-xl xs:!flex xs:h-fit ${
          isSearchBarFocused && "!flex"
        }`}
        ref={searchBarRef}
        onSubmit={handleSearch}
      >
        <TextInputField
          type="search"
          name="search bar"
          className="w-full overflow-ellipsis rounded-xl bg-primary-100 p-1 pr-12 font-medium text-primary-900 focus:bg-primary-200"
          placeholder="Search Products"
          value={searchText}
          autoFocus={true}
          onChange={(e) => setSearchText(e.target.value.trim())}
        />
        <button
          className="absolute right-0 top-0 flex h-full items-center justify-center bg-primary-100 p-1 px-3"
          type="submit"
        >
          <FaMagnifyingGlass size="16px" />
        </button>
      </form>
      <button
        className={`ml-auto flex h-full items-center justify-center rounded-lg bg-primary-100 p-2 xs:!hidden ${
          isSearchBarFocused && "hidden"
        }`}
        onClick={() => setIsSearchBarFocused(true)}
      >
        <FaMagnifyingGlass className="text-xl" />
      </button>
    </>
  );
};
