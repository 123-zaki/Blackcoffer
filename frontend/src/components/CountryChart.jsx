import {
    ResponsiveContainer,
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip
} from "recharts";


const CountryChart = ({ data, metric }) => {
    const chartData = [...data]
        .sort((a, b) => (b[metric] ?? 0) - (a[metric] ?? 0))
        .slice(0, 10);

    return (
        <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">

            <div className="mb-5">
                <h2 className="text-lg font-semibold text-slate-900">
                    Top Countries
                </h2>

                <p className="mt-1 text-sm text-slate-500">
                    Number of insights by country
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
                            left: 30,
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
                            dataKey="country"
                            width={130}
                            tick={{ fontSize: 11 }}
                        />

                        <Tooltip />

                        <Bar
                            dataKey={metric}
                            name={metric}
                            fill="#0f172a"
                            radius={[0, 4, 4, 0]}
                        />

                    </BarChart>

                </ResponsiveContainer>

            </div>

        </div>
    );
};


export default CountryChart;