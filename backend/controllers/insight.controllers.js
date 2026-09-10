import { asyncHandler } from "../utils/asynchandler.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { ApiError } from "../utils/ApiError.js";
import Insight from "../models/insight.model.js";

export const getInsights = asyncHandler(async (req, res) => {
    // destructure query parameters from the request
    const { page = 1, limit = 10, endYear, topic, sector, region, pestle, source, country } = req.query;

    // Build the query object based on the provided filters
    const query = {};
    if (endYear) query.end_year = { $lte: parseInt(endYear) };
    if (topic) query.topic = { $in: topic.split(",") };
    if (sector) query.sector = { $in: sector.split(",") };
    if (region) query.region = { $in: region.split(",") };
    if (pestle) query.pestle = { $in: pestle.split(",") };
    if (source) query.source = { $in: source.split(",") };
    if (country) query.country = { $in: country.split(",") };

    // calculate skip and limit for pagination
    const limitNum = parseInt(limit);
    const skip = (page - 1) * limitNum;

    // get all insights from the database
    const [insights, total] = await Promise.all([
        Insight.find(query)
            .select("title topic sector region country intensity likelihood relevance start_year end_year pestle source")
            .sort({ intensity: -1 })
            .skip(skip)
            .limit(limitNum),

        Insight.countDocuments(query)
    ]);

    // if no insights found, throw an error
    if (!insights) {
        throw new ApiError(404, "No insights found");
    }

    // return a successful response with the insights
    return res.status(200).json(new ApiResponse(200, "Insights retrieved successfully", {
        insights,
        pagination: {
            page: parseInt(page),
            limit: limitNum,
            totalPages: Math.ceil(total / limitNum),
            totalItems: total
        }
    }));
});

export const getAnalytics = asyncHandler(async (req, res) => {
    const { endYear, topic, sector, region, pestle, source, country } = req.query;

    // Build the query object based on the provided filters
    const query = {};

    // end year filter
    if (endYear) query.end_year = { $lte: parseInt(endYear) };

    // topic filter
    if (topic) query.topic = { $in: topic.split(",") };

    // sector filter
    if (sector) query.sector = { $in: sector.split(",") };

    // region filter
    if (region) query.region = { $in: region.split(",") };

    // pestle filter
    if (pestle) query.pestle = { $in: pestle.split(",") };

    // source filter
    if (source) query.source = { $in: source.split(",") };

    // country filter
    if (country) query.country = { $in: country.split(",") };

    // now get analytics data based on the query
    const analyticsData = await Insight.aggregate([
        {
            $match: query
        },
        {
            $facet: {
                // Summary statistics
                summary: [
                    {
                        $group: {
                            _id: null,
                            total: { $sum: 1 },
                            avgIntensity: { $avg: "$intensity" },
                            avgLikelihood: { $avg: "$likelihood" },
                            avgRelevance: { $avg: "$relevance" },
                        }
                    },
                    {
                        $project: {
                            _id: 0,
                            total: 1,
                            avgIntensity: { $round: ["$avgIntensity", 2] },
                            avgLikelihood: { $round: ["$avgLikelihood", 2] },
                            avgRelevance: { $round: ["$avgRelevance", 2] },
                        }
                    }
                ],

                // Yearly statistics
                yearly: [
                    {
                        $match: { start_year: { $ne: null } },
                    },
                    {
                        $group: {
                            _id: "$start_year",
                            count: { $sum: 1 },
                            avgIntensity: { $avg: "$intensity" },
                            avgLikelihood: { $avg: "$likelihood" },
                            avgRelevance: { $avg: "$relevance" },
                        }
                    },
                    {
                        $sort: { _id: 1 },
                    },
                    {
                        $project: {
                            _id: 0,
                            year: "$_id",
                            count: 1,
                            avgIntensity: { $round: ["$avgIntensity", 2] },
                            avgLikelihood: { $round: ["$avgLikelihood", 2] },
                            avgRelevance: { $round: ["$avgRelevance", 2] },
                        }
                    }
                ],

                // Country statistics
                country: [
                    { $match: { country: { $nin: [null, ""] } } },
                    {
                        $group: {
                            _id: "$country",
                            count: { $sum: 1 },
                            avgIntensity: { $avg: "$intensity" },
                            avgLikelihood: { $avg: "$likelihood" },
                            avgRelevance: { $avg: "$relevance" },
                        }
                    },
                    {
                        $sort: { count: -1 } // Sort by count descending
                    },
                    {
                        $limit: 15 // Limit to top 15 countries
                    },
                    {
                        $project: {
                            _id: 0,
                            country: "$_id",
                            count: 1,
                            avgIntensity: { $round: ["$avgIntensity", 2] },
                            avgLikelihood: { $round: ["$avgLikelihood", 2] },
                            avgRelevance: { $round: ["$avgRelevance", 2] },
                        }
                    }
                ],

                // Topic statistics
                topic: [
                    { $match: { topic: { $nin: [null, ""] } } },
                    {
                        $group: {
                            _id: "$topic",
                            count: { $sum: 1 },
                            avgIntensity: { $avg: "$intensity" },
                            avgLikelihood: { $avg: "$likelihood" },
                            avgRelevance: { $avg: "$relevance" },
                        }
                    },
                    {
                        $sort: { count: -1 } // Sort by count descending
                    },
                    {
                        $limit: 15 // Limit to top 15 topics
                    },
                    {
                        $project: {
                            _id: 0,
                            topic: "$_id",
                            count: 1,
                            avgIntensity: { $round: ["$avgIntensity", 2] },
                            avgLikelihood: { $round: ["$avgLikelihood", 2] },
                            avgRelevance: { $round: ["$avgRelevance", 2] },
                        }
                    }
                ],

                // Region statistics
                region: [
                    { $match: { region: { $nin: [null, ""] } } },
                    {
                        $group: {
                            _id: "$region",
                            count: { $sum: 1 },
                            avgIntensity: { $avg: "$intensity" },
                            avgLikelihood: { $avg: "$likelihood" },
                            avgRelevance: { $avg: "$relevance" },
                        }
                    },
                    {
                        $sort: { count: -1 } // Sort by count descending
                    },
                    {
                        $project: {
                            _id: 0,
                            region: "$_id",
                            count: 1,
                            avgIntensity: { $round: ["$avgIntensity", 2] },
                            avgLikelihood: { $round: ["$avgLikelihood", 2] },
                            avgRelevance: { $round: ["$avgRelevance", 2] },
                        }
                    }
                ],

                // Sector statistics
                sector: [
                    { $match: { sector: { $nin: [null, ""] } } },
                    {
                        $group: {
                            _id: "$sector",
                            count: { $sum: 1 },
                            avgIntensity: { $avg: "$intensity" },
                            avgLikelihood: { $avg: "$likelihood" },
                            avgRelevance: { $avg: "$relevance" },
                        }
                    },
                    {
                        $sort: { count: -1 } // Sort by count descending
                    },
                    {
                        $project: {
                            _id: 0,
                            sector: "$_id",
                            count: 1,
                            avgIntensity: { $round: ["$avgIntensity", 2] },
                            avgLikelihood: { $round: ["$avgLikelihood", 2] },
                            avgRelevance: { $round: ["$avgRelevance", 2] },
                        }
                    }
                ],

                // Pestle statistics
                pestle: [
                    { $match: { pestle: { $nin: [null, ""] } } },
                    {
                        $group: {
                            _id: "$pestle",
                            count: { $sum: 1 },
                            avgIntensity: { $avg: "$intensity" },
                            avgLikelihood: { $avg: "$likelihood" },
                            avgRelevance: { $avg: "$relevance" },
                        }
                    },
                    {
                        $sort: { count: -1 } // Sort by count descending
                    },
                    {
                        $project: {
                            _id: 0,
                            pestle: "$_id",
                            count: 1,
                            avgIntensity: { $round: ["$avgIntensity", 2] },
                            avgLikelihood: { $round: ["$avgLikelihood", 2] },
                            avgRelevance: { $round: ["$avgRelevance", 2] },
                        }
                    }
                ],

                // Source statistics
                source: [
                    { $match: { source: { $nin: [null, ""] } } },
                    {
                        $group: {
                            _id: "$source",
                            count: { $sum: 1 },
                        }
                    },
                    {
                        $sort: { count: -1 } // Sort by count descending
                    },
                    {
                        $limit: 15 // Limit to top 15 sources
                    },
                    {
                        $project: {
                            _id: 0,
                            source: "$_id",
                            count: 1,
                        }
                    }
                ],
            }
        }
    ]);

    const result = analyticsData[0];

    return res.status(200).json(new ApiResponse(200, "Analytics data retrieved successfully", {
        filters: {
            endYear: endYear || null,
            topic: topic ? topic.split(",") : null,
            sector: sector ? sector.split(",") : null,
            region: region ? region.split(",") : null,
            pestle: pestle ? pestle.split(",") : null,
            source: source ? source.split(",") : null,
            country: country ? country.split(",") : null,
        },
        data: {
            summary: result.summary[0] || { total: 0, avgIntensity: 0, avgLikelihood: 0, avgRelevance: 0 },
            yearly: result.yearly || [],
            country: result.country || [],
            topic: result.topic || [],
            region: result.region || [],
            sector: result.sector || [],
            pestle: result.pestle || [],
            source: result.source || [],
        }
    }))
});

export const getFilterOptions = asyncHandler(async (req, res) => {
    const [
        endYears,
        topics,
        sectors,
        regions,
        pestles,
        sources,
        countries
    ] = await Promise.all([
        Insight.distinct("end_year", {
            end_year: { $ne: null }
        }),
        Insight.distinct("topic", {
            topic: { $nin: [null, ""] }
        }),
        Insight.distinct("sector", {
            sector: { $nin: [null, ""] }
        }),
        Insight.distinct("region", {
            region: { $nin: [null, ""] }
        }),
        Insight.distinct("pestle", {
            pestle: { $nin: [null, ""] }
        }),
        Insight.distinct("source", {
            source: { $nin: [null, ""] }
        }),
        Insight.distinct("country", {
            country: { $nin: [null, ""] }
        })
    ]);

    (endYears || []).sort((a, b) => a - b);
    (topics || []).sort();
    (sectors || []).sort();
    (regions || []).sort();
    (pestles || []).sort();
    (sources || []).sort();
    (countries || []).sort();


    return res.status(200).json(new ApiResponse(200, "Filter options retrieved successfully", {
        endYears,
        topics,
        sectors,
        regions,
        pestles,
        sources,
        countries
    }));
});