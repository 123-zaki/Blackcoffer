import React from 'react'

const MetricSelector = ({metric, onChange}) => {
    const metrics = [
        {
            value: "count",
            label: "Number of Insights"
        },
        {
            value: "avgIntensity",
            label: "Average Intensity"
        },
        {
            value: "avgLikelihood",
            label: "Average Likelihood"
        },
        {
            value: "avgRelevance",
            label: "Average Relevance"
        }
    ];

    return (
        <div className='flex items-center gap-2'>
            <label htmlFor="metric" className='text-sm font-medium text-slate-600'>Metric</label>

            <select name="" id="metric" value={metric} onChange={(e) => onChange(e.target.value)} className='rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm outline-none focus:border-slate-500 focus:ring-slate-200'>
                {
                    metrics.map((item) => (
                        <option value={item.value} key={item.value}>
                            {item.label}
                        </option>
                    ))
                }
            </select>
        </div>
    )
}

export default MetricSelector
