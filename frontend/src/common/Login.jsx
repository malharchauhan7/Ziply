import React from "react";
import { MdEmail } from "react-icons/md";
import { RiLockPasswordFill } from "react-icons/ri";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import toast, { Toaster } from "react-hot-toast";
import axios from "axios";

const Login = () => {
  const { register, handleSubmit } = useForm();
  const navigate = useNavigate();

  const SubmitHandler = async (data) => {
    try {
      const resp = await axios.post("/auth/login", data);
      if (resp.data.success) {
        localStorage.setItem("token", resp.data.jwt_token);
        localStorage.setItem("id", resp.data.user.id);
        localStorage.setItem("name", resp.data.user.name);
        toast.success(resp.data.message);
        setTimeout(() => navigate("/"), 1000);
      } else {
        toast.error(resp.data.message);
      }
    } catch (error) {
      console.error(error);
      toast.error("Unable to login. Please try again.");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-white to-teal-50 flex items-center justify-center p-4">
      <Toaster position="top-center" />

      <div className="w-full max-w-md bg-white rounded-lg shadow-lg p-8 space-y-6">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-800">Welcome Back</h1>
          <p className="text-gray-500 mt-2">Login to your account</p>
        </div>

        <form onSubmit={handleSubmit(SubmitHandler)} className="space-y-4">
          <div className="space-y-4">
            <div className="relative">
              <MdEmail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                {...register("email", { required: true })}
                type="email"
                placeholder="Email address"
                className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-200 focus:border-teal-500 focus:ring-1 focus:ring-teal-500 outline-none transition-all"
              />
            </div>

            <div className="relative">
              <RiLockPasswordFill className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                {...register("password", { required: true })}
                type="password"
                placeholder="Password"
                className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-200 focus:border-teal-500 focus:ring-1 focus:ring-teal-500 outline-none transition-all"
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-teal-500 text-white py-3 rounded-lg font-medium hover:bg-teal-600 transition-colors cursor-pointer"
          >
            Sign in
          </button>
        </form>

        <p className="text-center text-gray-600">
          Don't have an account?{" "}
          <Link
            to="/signup"
            className="text-teal-500 hover:text-teal-600 font-medium"
          >
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
