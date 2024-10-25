import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useAppSelector } from "../reduxAuth_Slices/store";
import { getUser } from "../api/userApi";
import useAxiosPrivate from "../api/interceptorUseAxiosPrivate";

const ProfilePage = () => {
  const { userId } = useParams();
  const axiosPrivate = useAxiosPrivate();
  const currentUser = useAppSelector((data) => data.user.userData);

  const [name, setName] = useState<string | null>(null);
  const [username, setUserName] = useState<string | null>(null);
  const [profileImgUrl, setProfileImgUrl] = useState<string | null>(null);
  const [followers, setFollowers] = useState<number | null>(null);
  const [following, setFollowing] = useState<number | null>(null);
  const [loading, setLoading] = useState<boolean>(true)

  useEffect(() => {
    const fetchUser = async () => {
      if (userId === currentUser._id) {
        setName(currentUser.name);
        setUserName(currentUser.username);
        setProfileImgUrl(currentUser.profileImg);
        setFollowers(currentUser.followers?.length ?? null);
        setFollowing(currentUser.following?.length ?? null);
        setLoading(false)
      } else {
        const fetchedUser = await getUser(axiosPrivate, userId as string);
        if (fetchedUser) {
          setName(fetchedUser.name);
          setUserName(fetchedUser.username);
          setProfileImgUrl(fetchedUser.profileImg);
          setFollowers(fetchedUser.followers?.length ?? null);
          setFollowing(fetchedUser.following?.length ?? null);
          setLoading(false)
        }
      }
    };
    fetchUser();
  }, [currentUser, userId, axiosPrivate]);

  return loading ? (
    <div className="w-full h-screen flex items-center justify-center">
      <h2 className="text-4xl font-semibold font-serif">Loading</h2>
    </div>
  ) : (
    <div className="">
      <p>name: {name}</p>
      <p>usernamr: {username}</p>
      <p>profileImg: {profileImgUrl}</p>
      <p>followers: {followers}</p>
      <p>following: {following}</p>
    </div>
  );
};

export default ProfilePage;
