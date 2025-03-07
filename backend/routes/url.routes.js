import express, { Router } from "express";
import {
  HandleGenerateNewUrl,
  HandleGetAllShortUrlsbyUserId,
  HandleGetAnalytics,
} from "../controllers/url.controller.js";

const router = Router();

router.post("/", HandleGenerateNewUrl); // Generate New URL
router.get("/:user_id", HandleGetAllShortUrlsbyUserId);
router.get("/analytics/:shortId", HandleGetAnalytics); // Get Analytics

export default router;
