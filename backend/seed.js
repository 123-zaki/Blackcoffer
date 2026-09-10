import mongoose from "mongoose";
import dotenv from "dotenv";
import Insight from "./models/insight.model.js";
import fs from "fs";
import {fileURLToPath} from "url";
import path from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config();

async function seedInsight() {
    const filePath = path.join(__dirname, "data", "data.json");
    console.log("File path: ", filePath);
    console.log("Curr file directory: ", __dirname);
    console.log("Curr file name: ", __filename);

    try {
        await mongoose.connect(process.env.MONGO_URI);

        const data = JSON.parse(fs.readFileSync(filePath, "utf-8"));
        console.log(`Seeding ${data.length} insights...`);

        await Insight.deleteMany({});

        // Normalise data to ensure all necessary fields are present and have the correct type
        const normalisedData = data.map((item) => ({
            end_year: item.end_year ?? null,
            intensity: item.intensity ?? null,
            sector: item.sector ?? "",
            topic: item.topic ?? "",
            insight: item.insight ?? "",
            url: item.url ?? "",
            region: item.region ?? "",
            start_year: item.start_year ?? null,
            impact: item.impact ?? null,
            added: item.added ? new Date(item.added) : null,
            published: item.published ? new Date(item.published) : null,
            country: item.country ?? "",
            relevance: item.relevance ?? null,
            pestle: item.pestle ?? "",
            source: item.source ?? "",
            title: item.title ?? "",
            likelihood: item.likelihood ?? null
        }));

        await Insight.insertMany(normalisedData);

        console.log("Successfully seeded insights....");

        await mongoose.connection.close();
        console.log("Mongo DB connection closed");
        
        process.exit(0);
    } catch (error) {
        console.error("Error seeding insights:", error);
        process.exit(1);
    }
};


seedInsight();