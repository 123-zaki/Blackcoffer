import React from "react";

const InsightTable = ({ insights, pagination, onPageChange }) => {
    if (!insights || insights.length === 0) {
        return (
            <div className="rounded-xl border border-slate-200 bg-white p-8 text-center shadow-sm">
                <p className="text-slate-500">
                    No insights found for the selected filters.
                </p>
            </div>
        );
    }

    return (
        <div className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
            <div className="border-b border-slate-200 p-6">
                <h2 className="text-lg font-semibold text-slate-900">
                    Insight Explorer
                </h2>

                <p className="mt-1 text-sm text-slate-500">
                    Explore the underlying insights behind the dashboard
                </p>
            </div>

            <div className="overflow-x-auto">
                <table className="w-full text-left text-sm">

                    <thead className="bg-slate-50 text-xs uppercase text-slate-500">
                        <tr>
                            <th className="px-5 py-3">Title</th>
                            <th className="px-5 py-3">Topic</th>
                            <th className="px-5 py-3">Sector</th>
                            <th className="px-5 py-3">Country</th>
                            <th className="px-5 py-3">Region</th>
                            <th className="px-5 py-3">Source</th>
                            <th className="px-5 py-3">Intensity</th>
                            <th className="px-5 py-3">Likelihood</th>
                            <th className="px-5 py-3">Relevance</th>
                        </tr>
                    </thead>

                    <tbody className="divide-y divide-slate-100">
                        {insights.map((insight) => (
                            <tr
                                key={insight._id}
                                className="transition hover:bg-slate-50"
                            >
                                {/* Title */}
                                <td className="max-w-[350px] px-5 py-4 font-medium text-slate-900">
                                    {insight.title || "Untitled"}
                                </td>

                                {/* Topic */}
                                <td className="px-5 py-4 text-slate-600">
                                    {insight.topic || "—"}
                                </td>

                                {/* Sector */}
                                <td className="px-5 py-4 text-slate-600">
                                    {insight.sector || "—"}
                                </td>

                                {/* Country */}
                                <td className="px-5 py-4 text-slate-600">
                                    {insight.country || "—"}
                                </td>

                                {/* Region */}
                                <td className="px-5 py-4 text-slate-600">
                                    {insight.region || "—"}
                                </td>

                                {/* Source */}
                                <td className="px-5 py-4 text-slate-600">
                                    {insight.source || "—"}
                                </td>

                                {/* Intensity */}
                                <td className="px-5 py-4 font-medium text-slate-900">
                                    {insight.intensity ?? "—"}
                                </td>

                                {/* Likelihood */}
                                <td className="px-5 py-4 text-slate-600">
                                    {insight.likelihood ?? "—"}
                                </td>

                                {/* Relevance */}
                                <td className="px-5 py-4 text-slate-600">
                                    {insight.relevance ?? "—"}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>

                {/* Pagination */}
                <div className="flex flex-col gap-4 border-t border-slate-200 px-5 py-4 sm:flex-row sm:items-center sm:justify-between">

                    <p className="text-sm text-slate-500">
                        Showing{" "}
                        {((pagination?.page || 1) - 1) *
                            (pagination?.limit || 10) +
                            1}
                        {" "}–{" "}
                        {Math.min(
                            (pagination?.page || 1) *
                            (pagination?.limit || 10),
                            pagination?.totalItems || 0
                        )}
                        {" "}of{" "}
                        {pagination?.totalItems || 0} insights
                    </p>

                    <div className="flex items-center gap-2">

                        <button
                            disabled={pagination?.page <= 1}
                            onClick={() =>
                                onPageChange(pagination.page - 1)
                            }
                            className="rounded-lg border border-slate-300 px-3 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-40"
                        >
                            Previous
                        </button>

                        <span className="px-2 text-sm text-slate-500">
                            Page {pagination?.page || 1} of{" "}
                            {pagination?.totalPages || 1}
                        </span>

                        <button
                            disabled={
                                pagination?.page >=
                                pagination?.totalPages
                            }
                            onClick={() =>
                                onPageChange(pagination.page + 1)
                            }
                            className="rounded-lg border border-slate-300 px-3 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-40"
                        >
                            Next
                        </button>

                    </div>
                </div>
            </div>
        </div>
    );
};

export default InsightTable;