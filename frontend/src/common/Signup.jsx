import React from "react";
import { FaUser } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { RiLockPasswordFill } from "react-icons/ri";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";

const Signup = () => {
  const { register, handleSubmit } = useForm();
  const navigate = useNavigate();

  const SubmitHandler = async (data) => {
    console.log(data);
    try {
      const resp = await axios.post("/auth/signup", data);
      console.log(resp.data);
      if (resp.data.success) {
        toast.success(resp.data.message);
        setTimeout(() => {
          navigate("/login");
        }, 1500);
      } else {
        toast.error(resp.data.message);
      }
    } catch (error) {}
  };

  return (
    <div className="bg-gradient-to-b from-indigo-300  to-teal-200 h-screen p-8 flex flex-col items-center justify-center">
      <Toaster position="top-center" />
      <form
        onSubmit={handleSubmit(SubmitHandler)}
        className="w-[27%]  bg-amber-50/20 shadow-3xl rounded-2xl  p-5 px-7 flex flex-col gap-4 items-center "
      >
        <h1 className="font-black  text-4xl py-5 select-none">Ziply!</h1>

        <div className="relative w-full">
          <FaUser className="absolute top-3 left-3 text-gray-500 text-lg mt-1" />
          <input
            {...register("name", { required: true })}
            id="name"
            name="name"
            type="text"
            required
            className="w-full pl-10 pr-4 py-3 rounded-md bg-white text-gray-800 font-semibold font-mono placeholder-gray-400  border border-teal-500 focus:outline-none  transition-all"
            placeholder="Enter your name"
          />
        </div>
        <div className="relative w-full">
          <MdEmail className="absolute top-3 left-3 text-gray-500 text-lg mt-1" />
          <input
            {...register("email", { required: true })}
            id="email"
            name="email"
            type="email"
            required
            className="w-full pl-10 pr-4 py-3 rounded-md bg-white font-semibold  text-gray-800 placeholder-gray-400  border border-teal-500 focus:outline-none  transition-all"
            placeholder="Enter your mail"
          />
        </div>
        <div className="relative w-full">
          <RiLockPasswordFill className="absolute top-3 left-3 text-gray-500 text-lg mt-1" />
          <input
            {...register("password", { required: true })}
            id="password"
            name="password"
            type="text"
            required
            className="w-full pl-10 pr-4 py-3 rounded-md bg-white font-semibold  text-gray-800 placeholder-gray-400  border border-teal-500 focus:outline-none  transition-all"
            placeholder="Enter your password"
          />
        </div>

        <button
          className="bg-teal-400/50 w-full py-2 px-5 rounded-sm shadow-xl cursor-pointer font-semibold  select-none hover:bg-teal-500 hover:text-white text-lg font-mono transition-all"
          type="submit"
        >
          Sign up
        </button>
        <span className="font-semibold text-gray-800 font-mono">
          <h1>
            Already have an Account?{" "}
            <Link to={"/login"}>
              <span className="hover:text-indigo-500 transition-all">
                Sign in
              </span>
            </Link>
          </h1>
        </span>
      </form>
    </div>
  );
};

export default Signup;
