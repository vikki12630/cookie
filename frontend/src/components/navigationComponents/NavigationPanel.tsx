import { useState } from "react";
import { useAppSelector } from "../../reduxAuth_Slices/store";
import { handleLogout } from "../../api/userApi";
import { useAppDispatch } from "../../reduxAuth_Slices/store";
import useAxiosPrivate from "../../api/interceptorUseAxiosPrivate";
import { PanelItems, Navigation } from "./NavigationPanelItems";

const NavigationPanel = () => {
  const axiosPrivate = useAxiosPrivate();
  const dispatch = useAppDispatch();
  const userId = useAppSelector((data) => data.user.userData._id);
  const logout = () => handleLogout(axiosPrivate, dispatch);

  const [activeItem, setActiveItem] = useState<string>("Home");

  return (
    <div className="w-1/6 border-r-2 items-center justify-center flex relative ">
      <div className="">
        <Navigation>
          <PanelItems
            text={"Home"}
            link="/"
            active={activeItem === "Home"}
            onClick={() => [setActiveItem("Home")]}
          />
          <PanelItems
            text={"Messages"}
            link="/messages"
            active={activeItem === "Messages"}
            onClick={() => [setActiveItem("Messages")]}
          />
          <PanelItems
            text={"Search"}
            link="/search"
            active={activeItem === "Search"}
            onClick={() => [setActiveItem("Search")]}
          />
          <PanelItems
            text={"Profile"}
            link={`/profile/${userId}`}
            active={activeItem === "Profile"}
            onClick={() => [setActiveItem("Profile")]}
          />
          <PanelItems
            text={"Settings"}
            link="/settings"
            active={activeItem === "Settings"}
            onClick={() => [setActiveItem("Settings")]}
          />
        </Navigation>
        <button
          onClick={logout}
          className="text-2xl font-serif text-red-400 px-8 py-1 mt-2 "
        >
          logout
        </button>
      </div>
    </div>
  );
};

export default NavigationPanel;
