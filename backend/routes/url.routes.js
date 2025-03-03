import express, { Router } from "express";
import { HandleGenerateNewUrl } from "../controllers/url.controller.js";

const router = Router();

router.post("/", HandleGenerateNewUrl); // Generate New URL

// router.get("/analytics/:shortId"); // Get Analytics

export default router;
