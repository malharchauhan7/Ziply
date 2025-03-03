import React from "react";
import { FaUser } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { RiLockPasswordFill } from "react-icons/ri";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";

const Signup = () => {
  return (
    <div className="bg-gradient-to-b from-indigo-300  to-teal-200 h-screen p-8 flex flex-col items-center justify-center">
      <form
        action=""
        className="w-[30%]  bg-amber-50/20 shadow-3xl rounded-2xl  p-5 flex flex-col gap-4 items-center "
      >
        <h1 className="font-semibold font-mono text-4xl py-5 select-none">
          Ziply!
        </h1>

        <div className="relative w-full">
          <FaUser className="absolute top-3 left-3 text-gray-500 text-lg mt-1" />
          <input
            id="name"
            name="name"
            type="text"
            required
            className="w-full pl-10 pr-4 py-3 rounded-md bg-teal-200/50 text-gray-800 font-semibold font-mono placeholder-gray-400  border border-teal-500 focus:outline-none  transition-all"
            placeholder="Enter your name"
          />
        </div>
        <div className="relative w-full">
          <MdEmail className="absolute top-3 left-3 text-gray-500 text-lg mt-1" />
          <input
            id="name"
            name="name"
            type="text"
            required
            className="w-full pl-10 pr-4 py-3 rounded-md bg-teal-200/50 font-semibold  text-gray-800 placeholder-gray-400  border border-teal-500 focus:outline-none  transition-all"
            placeholder="Enter your mail"
          />
        </div>
        <div className="relative w-full">
          <RiLockPasswordFill className="absolute top-3 left-3 text-gray-500 text-lg mt-1" />
          <input
            id="name"
            name="name"
            type="text"
            required
            className="w-full pl-10 pr-4 py-3 rounded-md bg-teal-200/50 font-semibold  text-gray-800 placeholder-gray-400  border border-teal-500 focus:outline-none  transition-all"
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
