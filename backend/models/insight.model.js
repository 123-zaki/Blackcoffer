import mongoose from "mongoose";

const insightSchema = new mongoose.Schema({
    end_year: {
        type: Number,
        default: null
    },
    intensity: {
        type: Number,
        default: null
    },
    sector: {
        type: String,
        default: "",
        trim: true
    },
    topic: {
        type: String,
        default: "",
        trim: true
    },
    insight: {
        type: String,
        default: "",
        trim: true
    },
    url: {
        type: String,
        default: "",
        trim: true
    },
    region: {
        type: String,
        default: "",
        trim: true
    },
    start_year: {
        type: Number,
        default: null
    },
    impact: {
        type: Number,
        default: null
    },
    added: {
        type: Date,
        default: null
    },
    published: {
        type: Date,
        default: null
    },
    country: {
        type: String,
        default: "",
        trim: true
    },
    relevance: {
        type: Number,
        default: null
    },
    pestle: {
        type: String,
        default: "",
        trim: true
    },
    source: {
        type: String,
        default: "",
        trim: true
    },
    title: {
        type: String,
        default: "",
        trim: true
    },
    likelihood: {
        type: Number,
        default: null
    }
}, { timestamps: true });

insightSchema.index({ end_year: 1 });
insightSchema.index({ topic: 1 });
insightSchema.index({ sector: 1 });
insightSchema.index({ region: 1 });
insightSchema.index({ pestle: 1 });
insightSchema.index({ source: 1 });
insightSchema.index({ country: 1 });
insightSchema.index({ title: 1 });

export default mongoose.model("Insight", insightSchema);