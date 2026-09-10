import React from 'react'
import { CartesianGrid, Legend, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"

const YearlyChart = ({ data }) => {
    return (
        <div className='rounded-xl border border-slate-200 bg-white p-6 shadow-sm'>
            <div className='mb-5'>
                <h2 className='text-lg font-semibold text-slate-900'>
                    Year-wise Analysis
                </h2>

                <p className='mt-1 text-sm text-slate-500'>
                    Average intensity, likelihood, and relevance by year.
                </p>
            </div>

            <div className='h-[380px] w-full'>
                <ResponsiveContainer width="100%" height="100%">
                    {/* Charts */}
                    <LineChart
                        data={data}
                        margin={{
                            top: 10,
                            right: 20,
                            left: 0,
                            bottom: 10
                        }}
                    >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="year" tick={{ fontSize: 12 }} />
                        <YAxis tick={{ fontSize: 12 }} />
                        <Tooltip />
                        <Legend />

                        <Line
                            type="monotone"
                            dataKey="avgIntensity"
                            name="Intensity"
                            stroke="#0f172a"
                            strokeWidth={2}
                            dot={{ r: 3 }}
                            activeDot={{ r: 5 }}
                        />

                        <Line
                            type="monotone"
                            dataKey="avgLikelihood"
                            name="Likelihood"
                            stroke="#2563eb"
                            strokeWidth={2}
                            dot={{ r: 3 }}
                            activeDot={{ r: 5 }}
                        />

                        <Line
                            type="monotone"
                            dataKey="avgRelevance"
                            name="Relevance"
                            stroke="#16a34a"
                            strokeWidth={2}
                            dot={{ r: 3 }}
                            activeDot={{ r: 5 }}
                        />
                    </LineChart>
                </ResponsiveContainer>
            </div>
        </div>
    )
}

export default YearlyChart
