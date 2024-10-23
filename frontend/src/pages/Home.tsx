import { Link } from "react-router-dom";
import { handleLogout } from "../api/userApi";
import { useAppDispatch } from "../reduxAuth_Slices/store";
import useAxiosPrivate from "../api/interceptorUseAxiosPrivate";
import UserSearch from "../components/UserSearch";

const Home = () => {
  const axiosPrivate = useAxiosPrivate();
  const dispatch = useAppDispatch();
  const logout = ()=> handleLogout(axiosPrivate, dispatch);
  return (
    <div className=" flex flex-col">
      <h2>Home</h2>
      <Link to={"/settings"}>settings</Link>
      <div>
        <button onClick={logout}>logout</button>
      </div>
      <div>
        <UserSearch />
      </div>
    </div>
  );
};

export default Home;
