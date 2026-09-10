import {
    ResponsiveContainer,
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip
} from "recharts";


const TopicChart = ({ data }) => {

    return (
        <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">

            <div className="mb-5">
                <h2 className="text-lg font-semibold text-slate-900">
                    Top Topics
                </h2>

                <p className="mt-1 text-sm text-slate-500">
                    Number of insights by topic
                </p>
            </div>

            <div className="h-[380px] w-full">

                <ResponsiveContainer width="100%" height="100%">

                    <BarChart
                        data={data}
                        layout="vertical"
                        margin={{
                            top: 5,
                            right: 20,
                            left: 20,
                            bottom: 5
                        }}
                    >

                        <CartesianGrid strokeDasharray="3 3" />

                        <XAxis
                            type="number"
                            tick={{ fontSize: 12 }}
                        />

                        <YAxis
                            type="category"
                            dataKey="topic"
                            width={110}
                            tick={{ fontSize: 11 }}
                        />

                        <Tooltip />

                        <Bar
                            dataKey="count"
                            name="Insights"
                            fill="#2563eb"
                            radius={[0, 4, 4, 0]}
                        />

                    </BarChart>

                </ResponsiveContainer>

            </div>

        </div>
    );
};


export default TopicChart;