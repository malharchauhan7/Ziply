import axios from "axios";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { FaUser } from "react-icons/fa";
import toast, { Toaster } from "react-hot-toast";
import Linkify from "linkify-react";
import { Link, useNavigate } from "react-router-dom";
const Home = () => {
  const navigate = useNavigate();
  const { register, handleSubmit, reset } = useForm();
  const [shortUrls, setshortUrls] = useState([]);
  const [username, setusername] = useState("");
  const [isLogoutOpen, setisLogoutOpen] = useState(false);

  const HandleGetName = () => {
    const name = localStorage.getItem("name");
    setusername(name);
  };

  const GetAllUrlsByUserId = async () => {
    try {
      const id = localStorage.getItem("id");
      if (!id) {
        return { success: false, message: "Please Login" };
      }
      const resp = await axios.get(`/api/v1/url/${id}`);
      setshortUrls(resp.data.urls);
    } catch (error) {
      console.error("Error Fetching Urls" + error);
      toast.error("No Urls Found");
    }
  };

  const GenerateShortUrl = async (data) => {
    // console.log(data);
    try {
      const user_id = localStorage.getItem("id");
      data.user = user_id;
      console.log(data);
      const resp = await axios.post("/api/v1/url", data);
      const response = resp.data;
      const { success, message } = response;
      console.log(response);
      if (success) {
        toast.success(message);
        setshortUrls((prevUrl) => [...prevUrl, response.shorturl]);
        reset();
      }
    } catch (error) {
      console.error(error);
      toast.error("Error generating ShortUrl");
    }
  };
  useEffect(() => {
    HandleGetName();
    GetAllUrlsByUserId();
  }, []);

  const HandleLogOut = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("id");
    localStorage.removeItem("name");
    toast.success("Logout Successfully");
    setTimeout(() => {
      navigate("/login");
    }, 1200);
  };

  return (
    <div className="bg-gradient-to-b from-indigo-300  to-teal-200 h-screen p-8 flex flex-col items-center justify-top">
      <Toaster />
      <div className=" flex  justify-between lg:w-[35%] md:w-[60%] sm:w-[95%] p-10">
        <div className="flex flex-col items-left justify-center">
          <h1 className="font-bold  text-4xl py-2 select-none ">Ziply!</h1>
          <h2 className="font-mono text-2xl select-none ">
            Generate Short Url
          </h2>
        </div>
        <div className="flex flex-col mt-5 ">
          <h1
            className="text-2xl font-mono font-semibold cursor-pointer select-none"
            onClick={() => setisLogoutOpen((prev) => !prev)}
          >
            {username}
          </h1>

          {isLogoutOpen === true && (
            <div>
              <button
                className="cursor-pointer bg-white py-2 px-5 rounded-sm hover:bg-red-400 hover:text-white transitions-all font-mono font-semibold "
                onClick={() => HandleLogOut()}
              >
                Logout
              </button>
            </div>
          )}
        </div>
      </div>

      <div className=" flex justify-center items-center p-8 w-[35%]">
        <form
          className="flex gap-4 w-full "
          onSubmit={handleSubmit(GenerateShortUrl)}
        >
          <input
            type="text"
            className=" shadow-2xl rounded-sm w-full bg-teal-100 py-2 px-4 font-medium text-lg"
            {...register("url", { required: true })}
          />
          <button
            className="bg-teal-400/50 py-2 px-5 rounded-sm shadow-xl cursor-pointer font-semibold font-mono select-none hover:bg-teal-500 hover:text-white text-lg"
            type="submit"
          >
            Generate
          </button>
        </form>
      </div>
      <div className="w-[35%]  rounded-md p-4">
        {shortUrls.length > 0 && (
          <div className="flex flex-col gap-2">
            <h3 className="font-mono text-xl mb-2">Your Short URLs:</h3>
            {shortUrls?.map((url, index) => (
              <div
                key={index}
                className="bg-teal hover:bg-teal-100 p-3 rounded flex justify-between items-center transition-all duration-200"
              >
                <span className="cursor-pointer text-lg font-semibold">
                  http://localhost:8001/{url.shortId}
                </span>

                <a
                  href={url.redirectURL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:text-blue-800"
                >
                  Original URL ↗
                </a>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;
