import { useState } from "react";
import { toast } from "react-hot-toast";
import { AiOutlineArrowLeft } from "react-icons/ai";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";

import HomeLayout from "../../Layouts/HomeLayout";
// import InputBox from "../../Components/InputBox/InputBox";
// import Layout from "../../Layout/Layout";
import { forgetPassword } from "../../Redux/Slices/AuthSlice";

export default function ForgotPassword() {
  const dispatch = useDispatch();

  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState({
    email: "",
  });

  function handleInputChange(e) {
    const { name, value } = e.target;
    setData({
      ...data,
      [name]: value,
    });
  }

  async function onForgotPassword(event) {
    event.preventDefault();
    if (!data.email) {
      toast.error("email is required to reset password!");
      return;
    }

    setIsLoading(true);

    // dispatch create account action
    const response = await dispatch(forgetPassword(data));
    if (response?.payload?.success) {
      setData("");
    }
    setIsLoading(false);
  }

  return (
    <HomeLayout>
     <div className="flex items-center justify-center h-[90vh]">
        <form
          onSubmit={onForgotPassword}
          noValidate
          className="flex flex-col  justify-center gap-5 rounded-lg p-4 text-white w-80 min-h-[20rem] shadow-[0_0_10px_black]"
        >
          <h1 className="text-center dark:text-purple-500 text-2xl font-bold">
            Forgot Password
          </h1>

          <p className="text-gray-400 text-center">Enter your email address to receive password reset link</p>

          {/* email */}
          <label htmlFor="email" className="text-lg font-semibold">
            Email
          </label>
          <input
            type="email"
            name="email"
            id="email"
            className="bg-transparent px-2 py-1 border"
            placeholder={"Enter your email..."}
            onChange={handleInputChange}
            value={data.email}
          />

          {/* submit btn */}
          <button
            type="submit"
           className="w-full bg-yellow-600 hover:bg-yellow-500 transition-all ease-in-out duration-300 rounded-sm py-2 text-lg cursor-pointer"
            disabled={isLoading}
          >
            {isLoading ? "sending email..." : "Submit"}
          </button>

          {/* link */}
          <Link to="/user/profile">
            <p className="link text-accent cursor-pointer flex items-center justify-center w-full gap-2">
              <AiOutlineArrowLeft /> Go back to profile
            </p>
          </Link>
        </form>
      </div>
    </HomeLayout>
  );
}
