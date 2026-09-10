import React from 'react'

const FilterBar = ({ options, onChange, filters, onReset }) => {
    const handleChange = (key, value) => {
        onChange({
            ...filters,
            [key]: value
        })
    }

    // Defined a reusable class for select elements to avoid repetition
    const selectClasses = `w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm outline-none transition focus:border-slate-500 focus:ring-2 focus:ring-slate-200`;

    return (
        <div className='rounded-xl border border-slate-200 bg-white p-5 shadow-sm'>
            <div className='grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-7'>
                {/* 1. End Year */}
                <div>
                    <label htmlFor="" className='mb-1.5 block text-sm font-medium text-slate-700'>
                        End Year
                    </label>

                    <select name="" id="" className={selectClasses} value={filters.endYear} onChange={(e) => handleChange('endYear', e.target.value)}>
                        <option value="">All Years</option>
                        {
                            options.endYears?.map((year) => (
                                <option key={year} value={year}>
                                    {year}
                                </option>
                            ))
                        }
                    </select>
                </div>

                {/* 2. Topic */}
                <div>
                    <label htmlFor="">
                        Topic
                    </label>
                    <select name="" id="" className={selectClasses} value={filters.topic} onChange={(e) => handleChange('topic', e.target.value)}>
                        <option value="">All Topics</option>
                        {
                            options.topics?.map((topic) => (
                                <option key={topic} value={topic}>
                                    {topic}
                                </option>
                            ))
                        }
                    </select>
                </div>

                {/* 3. Sector */}
                <div>
                    <label htmlFor="">
                        Sector
                    </label>
                    <select name="" id="" className={selectClasses} value={filters.sector} onChange={(e) => handleChange('sector', e.target.value)}>
                        <option value="">All Sectors</option>
                        {
                            options.sectors?.map((sector) => (
                                <option key={sector} value={sector}>
                                    {sector}
                                </option>
                            ))
                        }
                    </select>
                </div>

                {/* 4. Region */}
                <div>
                    <label htmlFor="">
                        Region
                    </label>
                    <select name="" id="" className={selectClasses} value={filters.region} onChange={(e) => handleChange('region', e.target.value)}>
                        <option value="">All Regions</option>
                        {
                            options.regions?.map((region) => (
                                <option key={region} value={region}>
                                    {region}
                                </option>
                            ))
                        }
                    </select>
                </div>

                {/* 5. Country */}
                <div>
                    <label htmlFor="">
                        Country
                    </label>
                    <select name="" id="" className={selectClasses} value={filters.country} onChange={(e) => handleChange('country', e.target.value)}>
                        <option value="">All Countries</option>
                        {
                            options.countries?.map((country) => (
                                <option key={country} value={country}>
                                    {country}
                                </option>
                            ))
                        }
                    </select>
                </div>

                {/* 6. Pestle */}
                <div>
                    <label htmlFor="">
                        Pestle
                    </label>
                    <select name="" id="" className={selectClasses} value={filters.pestle} onChange={(e) => handleChange('pestle', e.target.value)}>
                        <option value="">All Pestles</option>
                        {
                            options.pestles?.map((pestle) => (
                                <option key={pestle} value={pestle}>
                                    {pestle}
                                </option>
                            ))
                        }
                    </select>
                </div>

                {/* Source */}
                <div>
                    <label className="mb-1.5 block text-sm font-medium text-slate-700">
                        Source
                    </label>

                    <select
                        className={selectClasses}
                        value={filters.source}
                        onChange={(e) =>
                            handleChange("source", e.target.value)
                        }
                    >
                        <option value="">All Sources</option>

                        {options.sources?.map((source) => (
                            <option key={source} value={source}>
                                {source}
                            </option>
                        ))}
                    </select>
                </div>

                {/* Button */}
                <button
                    onClick={onReset}
                    className='height-10 rounded-lg bg-slate-900 px-4 py-2 text-sm font-medium text-white transition hover:bg-slate-700'
                >
                    Reset
                </button>
            </div>
        </div>
    )
}

export default FilterBar
