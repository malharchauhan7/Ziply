import mongoose from "mongoose";
import Url from "../models/url.model.js";
import { nanoid } from "nanoid";
import User from "../models/user.model.js";
async function HandleGenerateNewUrl(req, res) {
  try {
    const body = req.body;

    if (!body.url)
      return res.status(400).json({ success: false, error: "Url is required" });

    const shortID = nanoid(8);

    const shortURL = await Url.create({
      shortId: shortID,
      redirectURL: body.url,
      visitHistory: [],
      createdBy: body.user,
    });

    return res.status(200).json({
      success: true,
      shorturl: shortURL,
      message: "Url Created Successfully",
    });
  } catch (error) {
    console.error("Error in HandleGenerateNewUrl:", error);
    return res.status(500).json({
      success: false,
      error: "Internal server error",
      message: error.message,
    });
  }
}

async function HandleGetAllShortUrlsbyUserId(req, res) {
  try {
    const user_id = req.params.user_id;
    if (!mongoose.Types.ObjectId.isValid(user_id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid user ID format",
      });
    }

    const user = await User.findById(user_id);
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    const urls = await Url.find({ createdBy: user_id }).sort({ createdAt: -1 });

    return res.status(200).json({
      success: true,
      count: urls.length,
      urls: urls,
    });
  } catch (error) {
    console.error("Error in HandleGetAllShortUrlsbyUserId:", error);
    return res.status(500).json({
      success: false,
      error: "Internal server error",
      message: error.message,
    });
  }
}

async function HandleGetAnalytics(req, res) {
  try {
    const shortId = req.params.shortId;
    const result = await Url.findOne({ shortId });
    return res.json({
      totalClicks: result.visitHistory.length,
    });
  } catch (error) {
    console.error("Error in HandleGetAnalytics:", error);
    return res.status(500).json({
      success: false,
      error: "Internal server error",
      message: error.message,
    });
  }
}

export {
  HandleGenerateNewUrl,
  HandleGetAllShortUrlsbyUserId,
  HandleGetAnalytics,
};
