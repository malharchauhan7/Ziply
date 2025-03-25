import axios from "axios";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import {
  FaUser,
  FaLink,
  FaExternalLinkAlt,
  FaEye,
  FaCopy,
} from "react-icons/fa";
import toast, { Toaster } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();
  const { register, handleSubmit, reset } = useForm();
  const [shortUrls, setshortUrls] = useState([]);
  const [username, setusername] = useState("");
  const [isLogoutOpen, setisLogoutOpen] = useState(false);
  const [isModelOpen, setisModelOpen] = useState(false);
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
      console.log(resp.data.urls);
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

  const handleCopy = async (shortId) => {
    try {
      await navigator.clipboard.writeText(`localhost:8001/${shortId}`);
      toast.success("URL copied to clipboard!");
    } catch (err) {
      toast.error("Failed to copy URL");
      console.error("Copy failed:", err);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-white to-teal-50 p-8">
      <Toaster position="top-center" />

      {/* Header Section */}
      <div className="max-w-4xl mx-auto flex justify-between items-center mb-12">
        <div>
          <h1 className="text-4xl font-bold text-gray-800">Ziply!</h1>
          <p className="text-gray-600 mt-1">Generate Short URLs instantly</p>
        </div>

        <div className="relative">
          <button
            onClick={() => setisLogoutOpen(!isLogoutOpen)}
            className="flex items-center space-x-2 bg-white px-4 py-2 rounded-lg shadow-sm hover:shadow-md transition-all cursor-pointer"
          >
            <FaUser className="text-teal-500" />
            <span className="font-medium text-gray-700">{username}</span>
          </button>

          {isLogoutOpen && (
            <button
              onClick={HandleLogOut}
              className="absolute right-0 mt-2 w-full bg-white py-2 px-4 rounded-lg shadow-lg hover:bg-red-50 transition-all text-red-600 font-medium cursor-pointer"
            >
              Logout
            </button>
          )}
        </div>
      </div>

      {/* URL Input Section */}
      <div className="max-w-4xl mx-auto mb-12">
        <form onSubmit={handleSubmit(GenerateShortUrl)} className="flex gap-4">
          <div className="relative flex-1">
            <FaLink className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              {...register("url", { required: true })}
              placeholder="Enter your URL here"
              className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-200 focus:border-teal-500 focus:ring-1 focus:ring-teal-500 outline-none transition-all"
            />
          </div>
          <button
            type="submit"
            className="px-6 py-3 bg-teal-500 text-white rounded-lg font-medium hover:bg-teal-600 transition-all flex items-center gap-2 cursor-pointer"
          >
            Generate
          </button>
        </form>
      </div>

      {/* URLs List Section */}
      {shortUrls.length > 0 && (
        <div className="max-w-4xl mx-auto">
          <h3 className="text-xl font-semibold text-gray-700 mb-4">
            Your Short URLs
          </h3>
          <div className="space-y-3">
            {shortUrls.map((url, index) => (
              <div
                key={index}
                className="bg-white p-4 rounded-lg shadow-sm hover:shadow-md transition-all"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <span className="text-teal-500 font-medium">
                      localhost:8001/{url.shortId}
                    </span>
                    <button
                      onClick={() => handleCopy(url.shortId)}
                      className="p-2 hover:bg-gray-100 rounded-full transition-all cursor-pointer"
                      title="Copy to clipboard"
                    >
                      <FaCopy className="text-gray-400 hover:text-teal-500" />
                    </button>
                  </div>

                  <div className="flex items-center gap-6">
                    <div className="flex items-center gap-2 text-gray-600">
                      <FaEye className="text-teal-500" />
                      <span>{url.visitHistory.length} clicks</span>
                    </div>

                    <a
                      href={url.redirectURL}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 text-teal-500 hover:text-teal-600 font-medium"
                    >
                      Original URL <FaExternalLinkAlt size={12} />
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;
