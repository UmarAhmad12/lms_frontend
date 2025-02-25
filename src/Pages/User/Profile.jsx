import { useState } from "react";
import toast from "react-hot-toast";
import { FaUserEdit } from "react-icons/fa";
import { FiMoreVertical } from "react-icons/fi";
import { IoIosLock } from "react-icons/io";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import HomeLayout from "../../Layouts/HomeLayout";
import { getUserData } from "../../Redux/Slices/AuthSlice";
import { cancelCourseBundle } from "../../Redux/Slices/RazorpaySlice";

function Profile() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const userData = useSelector((state) => state?.auth?.data);

  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const toggleDialog = () => {
    setIsDialogOpen((prev) => !prev);
  };

  async function handleCancellation() {
    if (
      window.confirm("Are you sure you want to cancel the course subscription?")
    ) {
      toast("Initiating cancellation");
      await dispatch(cancelCourseBundle());
      await dispatch(getUserData());
      toast.success("Cancellation completed");
      navigate("/");
    }
  }
  return (
    <HomeLayout>
      <div className="min-h-[90vh] flex items-center justify-center">
        <div className="my-10 flex flex-col gap-4 rounded-lg p-4 text-white w-96 shadow-[0_0_10px_black]">
          <div className="relative flex">
            <img
              src={userData?.avatar?.secure_url}
              className="w-40 m-auto rounded-full border border-black"
            />
            <div>
              <FiMoreVertical
                onClick={toggleDialog}
                size={20}
                className="cursor-pointer"
              />
              {isDialogOpen && (
                <div className="absolute right-0 mt-2 bg-white dark:bg-base-300 transition-all ease-in-out duration-500 border-[1px] border-gray-200 dark:border-gray-500 rounded-s-xl rounded-ee-xl py-2 shadow-lg z-10">
                  <button
                    className="text-gray-700 w-full flex items-center gap-2 dark:text-white px-3 pb-2 border-b-[1px] border-gray-300"
                    onClick={() => navigate("change-password")}
                  >
                    <IoIosLock /> Change password
                  </button>
                  <button
                    className="text-[#ff1414] dark:text-red-300 px-3 pt-2 w-full flex items-center gap-2"
                    onClick={() => navigate("/user/editprofile")}
                  >
                    <FaUserEdit /> Edit Profile
                  </button>
                </div>
              )}
            </div>
          </div>
          <h3 className="text-xl font-semibold text-center capitalize">
            {userData?.fullName}
          </h3>
          <div className="grid grid-cols-2">
            <p>Email: </p>
            <p>{userData?.email}</p>
            <p>Role: </p>
            <p>{userData?.role}</p>
            <p>Subscription: </p>
            <p>
              {userData?.subscription?.status === "active"
                ? "Active"
                : "Inactive"}
            </p>
          </div>
          {/* <div className="flex items-center justify-between gap-2">
            <Link
              to="/changepassword"
              className="w-1/2 bg-yellow-600 hover:bg-yellow-500 transition-all ease-in-out duration-300 rounded-sm font-semibold cursor-pointer py-2 text-center"
            >
              <button>Change password</button>
            </Link> */}
          {/* <Link
              to="/user/editprofile"
              className="w-full bg-yellow-600 hover:bg-yellow-500 transition-all ease-in-out duration-300 rounded-sm font-semibold cursor-pointer py-2 text-center"
            >
              <button>Edit profile</button>
            </Link> */}
          {/* </div> */}
          {userData?.subscription?.status === "active" && (
            <button
              onClick={handleCancellation}
              className="w-full bg-red-600 hover:bg-red-500 transition-all ease-in-out duration-300 rounded-sm font-semibold cursor-pointer py-2 text-center"
            >
              Cancel Subscription
            </button>
          )}
        </div>
      </div>
    </HomeLayout>
  );
}

export default Profile;
