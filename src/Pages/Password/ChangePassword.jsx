import { useState } from "react";
import { toast } from "react-hot-toast";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

import HomeLayout from "../../Layouts/HomeLayout";
import { changePassword } from "../../Redux/Slices/AuthSlice";

export default function ChangePassword() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState(false);
  const [userPassword, setUserPassword] = useState({
    oldPassword: "",
    newPassword: "",
  });

  function handleUserInput(e) {
    const { name, value } = e.target;
    setUserPassword({
      ...userPassword,
      [name]: value,
    });
  }

  async function onChangePassword(event) {
    event.preventDefault();
    if (!userPassword.oldPassword || !userPassword.newPassword) {
      toast.error("Please fill all the details");
      return;
    }

    setIsLoading(true);

    // dispatch create account action
    const response = await dispatch(changePassword(userPassword));
    if (response?.payload?.success) {
      setUserPassword({
        oldPassword: "",
        newPassword: "",
      });
      navigate("/");
    }
    setIsLoading(false);
  }

  return (
    <HomeLayout>
      <div className="flex items-center justify-center h-[90vh]">
        <form
          onSubmit={onChangePassword}
          noValidate
          className="flex flex-col  justify-center gap-5 rounded-lg p-4 text-white w-80 min-h-[20rem] shadow-[0_0_10px_black]"
        >
          <h1 className="text-center dark:text-purple-500 text-2xl font-bold py-2">
            Change Password Page
          </h1>

          {/* old password */}
          <label htmlFor="oldPass" className="text-lg font-semibold">
            Old Password
          </label>
          <input
            type="password"
            name="oldPassword"
            id="oldPass"
            placeholder="Enter your old password..."
            className="bg-transparent px-2 py-1 border"
            onChange={handleUserInput}
            value={userPassword.oldPassword}
          />
          {/* new password */}
          <label htmlFor="newPass" className="text-lg font-semibold">
            New Password
          </label>
          <input
            type="password"
            name="newPassword"
            id="newPass"
            placeholder="Enter your new password..."
            className="bg-transparent px-2 py-1 border"
            onChange={handleUserInput}
            value={userPassword.newPassword}
          />

          {/* submit btn */}
          <button
            type="submit"
            className="w-full bg-yellow-600 hover:bg-yellow-500 transition-all ease-in-out duration-300 rounded-sm py-2 text-lg cursor-pointer"
            disabled={isLoading}
          >
            {isLoading ? "Submitting..." : "Submit"}
          </button>

          {/* link */}
          <Link
            to="/forgot-password"
            className="text-center link text-accent cursor-pointer"
          >
            Forgot your password?
          </Link>
        </form>
      </div>
    </HomeLayout>
  );
}
