import axios from "axios";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import toast, { Toaster } from "react-hot-toast";
import Linkify from "linkify-react";
const Home = () => {
  const { register, handleSubmit, reset } = useForm();
  const [shortUrls, setshortUrls] = useState([]);

  const GenerateShortUrl = async (data) => {
    // console.log(data);
    try {
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

  return (
    <div className="bg-gradient-to-b from-indigo-300  to-teal-200 h-screen p-8 flex flex-col items-center justify-center">
      <Toaster />
      <div className="w-full  flex flex-col items-center justify-center ">
        <h1 className="font-semibold font-mono text-4xl py-2 select-none">
          Ziply!
        </h1>
        <h2 className="font-mono text-2xl select-none ">Generate Short Url</h2>
      </div>
      <div className=" flex justify-center items-center p-10 w-[35%]">
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
                className="bg-white/50 p-3 rounded flex justify-between items-center"
              >
                <span className="cursor-pointer text-lg font-semibold">
                  <Linkify> http://localhost:8001/{url.shortId}</Linkify>
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
