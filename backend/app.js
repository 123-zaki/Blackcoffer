import express from "express";
import dotenv from "dotenv";
import cors from "cors";

// Import different routes from the routes folder
import insightRouter from "./routes/insight.routes.js";

dotenv.config();

const app = express();

app.get("/", (req, res) => {
  res.send("Hello, World!");
});

app.use(express.json());

app.use(cors());

app.use("/api/v1/insights", insightRouter);

export default app;