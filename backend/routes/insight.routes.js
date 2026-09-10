import express from "express";
import { getAnalytics, getFilterOptions, getInsights } from "../controllers/insight.controllers.js";

const router = express.Router();

router.get("/", getInsights);

router.get("/analytics", getAnalytics);

router.get("/filters", getFilterOptions);

export default router;