import React from 'react'

const SummaryCard = ({ summary }) => {
    const cards = [
        {
            title: "Total Insights",
            value: summary?.total ?? 0
        },
        {
            title: "Avg Intensity",
            value: summary?.avgIntensity ?? 0
        },
        {
            title: "Avg Likelihood",
            value: summary?.avgLikelihood ?? 0
        },
        {
            title: "Avg Relevance",
            value: summary?.avgRelevance ?? 0
        }
    ];

    return (
        <div className='grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4'>
            {
                cards.map((card) => (
                    <div key={card.title} className='rounded-xl border border-slate-200 bg-white p-6 shadow-sm'>
                        <p className='text-sm font-medium text-slate-500'>
                            {card.title}
                        </p>

                        <h2 className='mt-2 text-3xl font-bold text-slate-900'>
                            {card.value}
                        </h2>
                    </div>
                ))
            }
        </div>
    )
}

export default SummaryCard
