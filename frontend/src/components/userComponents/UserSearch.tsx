import { ChangeEvent, FC, useEffect, useState } from "react";
import useAxiosPrivate from "../../api/interceptorUseAxiosPrivate";
import { searchUser } from "../../api/userApi";
import { useAppDispatch } from "../../reduxAuth_Slices/store";

interface ChildComponentProps {
  style: string;
  searchInput: string;
  setSearchInput: React.Dispatch<React.SetStateAction<string>>;
}
const UserSearch: FC<ChildComponentProps> = ({ style,searchInput, setSearchInput }) => {
  const axiosPrivate = useAxiosPrivate();
  const dispatch = useAppDispatch();
  // const [searchInput, setSearchInput] = useState<string>("");
  const [debouncedInput, setDebouncedInput] = useState<string>(searchInput);

  const searchInputHandler = (event: ChangeEvent<HTMLInputElement>) => {
    setSearchInput(event.target.value);
  };

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedInput(searchInput);
    }, 500);

    return () => {
      clearTimeout(handler);
    };
  }, [searchInput]);

  useEffect(() => {
    if (debouncedInput) {
      searchUser(axiosPrivate, debouncedInput, dispatch);
    }
  }, [debouncedInput, axiosPrivate, dispatch]);

  return (
    <>
      <label className="hidden" htmlFor="search"></label>
      <input
        type="text"
        id="search"
        name="search"
        className={style}
        onChange={searchInputHandler}
        value={searchInput}
        placeholder="Search"
      />
    </>
  );
};

export default UserSearch;
