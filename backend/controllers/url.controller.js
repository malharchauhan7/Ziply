import mongoose from "mongoose";
import Url from "../models/url.model.js";
import { nanoid } from "nanoid";

async function HandleGenerateNewUrl(req, res) {
  try {
    const body = req.body;

    if (!body.url)
      return res.status(400).json({ success: false, error: "Url is required" });

    // Validate URL format
    // try {
    //   new Url(body.url);
    // } catch (err) {
    //   return res.status(400).json({
    //     success: false,
    //     error: "Invalid URL format",
    //   });
    // }

    const shortID = nanoid(8); // Generate Unique shortID like 083yd7w1

    const shortURL = await Url.create({
      shortId: shortID,
      redirectURL: body.url,
      visitHistory: [],
      // createdBy: req.user._id,
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

export { HandleGenerateNewUrl };
