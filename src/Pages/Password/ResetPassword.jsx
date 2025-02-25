import { useState } from "react";
import { toast } from "react-hot-toast";
import { AiOutlineArrowLeft } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";

import HomeLayout from "../../Layouts/HomeLayout";
import { resetPassword } from "../../Redux/Slices/AuthSlice";

export default function ResetPassword() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState(false);
  const { isLoggedIn } = useSelector((state) => state.auth);
  const { resetToken } = useParams();
  const [data, setData] = useState({
    password: "",
  });

  function handleInputChange(e) {
    const { name, value } = e.target;
    setData({
      ...data,
      [name]: value,
    });
  }

  async function onChangePassword(event) {
    event.preventDefault();
    if (!data.password) {
      toast.error("password is required");
      return;
    }

    setIsLoading(true);

    // dispatch create account action
    const response = await dispatch(
      resetPassword({ resetToken, password: data.password })
    );
    if (response?.payload?.success) {
      setData({ password: "" });
      navigate("/");
    }
    setIsLoading(false);
  }

  return (
    <HomeLayout>
       <div className="flex items-center justify-center h-[100vh]">
        <form
          onSubmit={onChangePassword}
          noValidate
         className="flex flex-col  justify-center gap-5 rounded-lg p-4 text-white w-80 min-h-[20rem] shadow-[0_0_10px_black]"
        >
          <h1 className="text-center dark:text-purple-500 text-2xl font-bold font-inter">
            Reset Password
          </h1>

          {/* password */}
          <label htmlFor="password" className="text-lg font-semibold">
            New Password
          </label>
          <input
            type="password"
            name="password"
            id="password"
            className="bg-transparent px-2 py-1 border"
            placeholder={"Enter your new password..."}
            onChange={handleInputChange}
            value={data.password}
          />

          {/* submit btn */}
          <button
            type="submit"
            className="w-full bg-yellow-600 hover:bg-yellow-500 transition-all ease-in-out duration-300 rounded-sm py-2 text-lg cursor-pointer"
            disabled={isLoading}
          >
            {isLoading ? "Resetting..." : "Reset"}
          </button>

          {/* link */}
          {isLoggedIn && (
            <Link to="/user/profile">
              <p className="link text-accent cursor-pointer flex items-center justify-center w-full gap-2">
                <AiOutlineArrowLeft /> Go back to profile
              </p>
            </Link>
          )}
        </form>
      </div>
    </HomeLayout>
  );
}
