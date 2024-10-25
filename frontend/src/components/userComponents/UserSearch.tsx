import { ChangeEvent, useEffect, useState } from "react";
import useAxiosPrivate from "../../api/interceptorUseAxiosPrivate";
import { searchUser } from "../../api/userApi";

const UserSearch = () => {
  const axiosPrivate = useAxiosPrivate()
  const [searchInput, setSearchInput] = useState<string>("");
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
     searchUser(axiosPrivate, debouncedInput); 
   }
 }, [debouncedInput, axiosPrivate]);




  // useEffect(() => {
  //    if (!searchInput.trim()) {
  //      return;
  //    }
  //   searchUser(axiosPrivate, searchInput)
   

  // }, [searchInput])
  


  return (
    <>
      <label htmlFor="search"></label>
      <input
        type="text"
        id="search"
        name="search"
        className="text-gray-950"
        onChange={searchInputHandler}
        value={searchInput}
      />
    </>
  );
};

export default UserSearch;
