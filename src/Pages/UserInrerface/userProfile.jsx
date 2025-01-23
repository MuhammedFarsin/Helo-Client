import Navbar from "./Navbar";
import { useSelector } from "react-redux";
import { useMediaQuery } from "react-responsive";
import ToasterHot from "../Common/ToasterHot";
import LargeScreenProfile from "../UserInrerface/UserProfile/LargeScreen"
import MobileScreenProfile from "../UserInrerface/UserProfile/MobileScreen"
import TabletScreenProfile from "../UserInrerface/UserProfile/TabletScreen"

function UserProfile() {
  const user = useSelector((state) => state.user);
  const posts = []; 

  const isLargeScreen = useMediaQuery({ minWidth: 1024 });
  const isTabletScreen = useMediaQuery({ minWidth: 768, maxWidth: 1023 });
  const isMobileScreen = useMediaQuery({ maxWidth: 767 });

  return (
    <div className="min-h-screen flex">
      <div
        className={`bg-gray-100 h-full ${
          isMobileScreen ? "w-0" : "w-16 sm:w-20 md:w-24 lg:w-64"
        } flex-shrink-0`}
      >
        <Navbar />
      </div>

      <div className={`flex-1 bg-white ${isMobileScreen ? "px-0" : "px-4"}`}>
        {isLargeScreen && <LargeScreenProfile user={user} posts={posts} />}
        {isTabletScreen && <TabletScreenProfile user={user} posts={posts} />}
        {isMobileScreen && <MobileScreenProfile user={user} posts={posts} />}
      </div>
      <ToasterHot />
    </div>
  );
}

export default UserProfile;
