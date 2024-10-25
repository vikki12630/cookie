import { FaArrowRotateLeft } from "react-icons/fa6";
import UserSearch from "../components/userComponents/UserSearch";
import { useAppDispatch, useAppSelector } from "../reduxAuth_Slices/store";
import { CgProfile } from "react-icons/cg";
import { useState } from "react";
import { setSearchUsers } from "../reduxAuth_Slices/userSearch";
import { Link } from "react-router-dom";

const Search = () => {
  const dispatch = useAppDispatch();
  const searchedUser = useAppSelector((data) => data.search.searchedUsers);
  const [searchInput, setSearchInput] = useState<string>("");

  const resetHandle = () => {
    setSearchInput("");
    dispatch(setSearchUsers(null))
  };
  return (
    <div className="w-5/6 h-screen">
      <div className="w-1/2 border-r-2 border-black h-screen flex flex-col items-center">
        <div className="my-2 flex justify-center items-center gap-3 border-2 w-3/5 px-4 py-2 rounded-xl mb-6">
          <UserSearch
            style={"w-full text-lg py-2 px-3 bg-slate-950 outline-none"}
            searchInput={searchInput}
            setSearchInput={setSearchInput}
          />
          {searchedUser ? (
            <FaArrowRotateLeft
              onClick={resetHandle}
              className="text-2xl text-red-300 cursor-pointer"
            />
          ) : (
            ""
          )}
        </div>
        <div className=" w-3/5 items-start">
          <ul className="flex flex-col gap-4">
            {searchedUser?.map((user) => (
              <li key={user._id} className="">
                <Link
                  to={`/profile/${user._id}`}
                  className="flex items-center cursor-pointer border py-2 px-4 rounded-xl bg-blue-900 hover:scale-105 transition-all hover:bg-blue-400"
                >
                  <div className="w-14 h-14 mr-3">
                    {user.profileImg ? (
                      <img src={user.profileImg} className="w-14 h-14" alt="" />
                    ) : (
                      <CgProfile className="w-14 h-14" />
                    )}
                  </div>
                  <div>
                    <p className="font-semibold text-xl">{user.name}</p>
                    <p className="font-semibold text-md">{user.username}</p>
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Search;
