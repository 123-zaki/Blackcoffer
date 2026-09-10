import {
    ResponsiveContainer,
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip
} from "recharts";


const metricLabels = {
    count: "Insights",
    avgIntensity: "Average Intensity",
    avgLikelihood: "Average Likelihood",
    avgRelevance: "Average Relevance"
};


const CategoryChart = ({
    title,
    description,
    data,
    dataKey,
    nameKey,
    metric
}) => {

    if (!Array.isArray(data) || data.length === 0) {
        return (
            <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">

                <h2 className="text-lg font-semibold text-slate-900">
                    {title}
                </h2>

                <p className="mt-1 text-sm text-slate-500">
                    {description}
                </p>

                <div className="flex h-[350px] items-center justify-center">
                    <p className="text-slate-400">
                        No data available
                    </p>
                </div>

            </div>
        );
    }


    const chartData = [...data]
        .sort((a, b) => {
            return (b[metric] ?? 0) - (a[metric] ?? 0);
        })
        .slice(0, 10);


    return (
        <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">

            <div className="mb-5">

                <h2 className="text-lg font-semibold text-slate-900">
                    {title}
                </h2>

                <p className="mt-1 text-sm text-slate-500">
                    {description}
                </p>

            </div>


            <div className="h-[350px] w-full">

                <ResponsiveContainer
                    width="100%"
                    height="100%"
                >

                    <BarChart
                        data={chartData}
                        layout="vertical"
                        margin={{
                            top: 5,
                            right: 25,
                            left: 20,
                            bottom: 5
                        }}
                    >

                        <CartesianGrid
                            strokeDasharray="3 3"
                        />

                        <XAxis
                            type="number"
                        />

                        <YAxis
                            type="category"
                            dataKey={nameKey}
                            width={130}
                            tick={{ fontSize: 11 }}
                        />

                        <Tooltip
                            formatter={(value) => [
                                Number(value).toFixed(2),
                                metricLabels[metric]
                            ]}
                        />

                        <Bar
                            dataKey={metric}
                            name={metricLabels[metric]}
                            fill="#0f172a"
                            radius={[0, 4, 4, 0]}
                        />

                    </BarChart>

                </ResponsiveContainer>

            </div>

        </div>
    );
};


export default CategoryChart;