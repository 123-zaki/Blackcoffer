import { useEffect, useState } from 'react';
import {
  getAnalytics,
  getFilterOptions,
  getInsights
} from './services/api';

import FilterBar from './components/FilterBar';
import SummaryCard from './components/SummaryCard';
import YearlyChart from './components/YearlyChart';
import CountryChart from './components/CountryChart';
import TopicChart from './components/TopicChart';
import SourceChart from './components/SourceChart';
import PestleChart from './components/PestleChart';
import SectorChart from './components/SectorChart';
import RegionChart from './components/RegionChart';
import MetricSelector from './components/MetricSelector';
import InsightTable from './components/InsightTable';

const initialFilters = {
  endYear: "",
  topic: "",
  sector: "",
  region: "",
  pestle: "",
  source: "",
  country: ""
};

function App() {
  const [filters, setFilters] = useState(initialFilters);

  const [metric, setMetric] = useState("count");

  const [insights, setInsights] = useState([]);

  const [pagination, setPagination] = useState({
    page: 1,
    limit: 10,
    totalPages: 1,
    totalItems: 0
  });

  const [options, setOptions] = useState({
    endYears: [],
    topics: [],
    sectors: [],
    regions: [],
    countries: [],
    sources: [],
    pestles: []
  });

  const [analytics, setAnalytics] = useState(null);

  const [analyticsLoading, setAnalyticsLoading] = useState(false);

  const [insightsLoading, setInsightsLoading] = useState(false);

  const [error, setError] = useState(null);


  // 1. Load filter options
  useEffect(() => {
    const loadFilters = async () => {
      try {
        const response = await getFilterOptions();

        if (response.error) {
          throw new Error(response.error);
        }

        setOptions(response.data);

      } catch (error) {
        console.error("Failed to load filters:", error);
        setError("Failed to load filter options.");
      }
    };

    loadFilters();
  }, []);


  // 2. Load analytics whenever filters change
  useEffect(() => {
    const loadAnalytics = async () => {
      try {
        setAnalyticsLoading(true);
        setError(null);

        const response = await getAnalytics(filters);

        if (response.error) {
          throw new Error(response.error);
        }

        setAnalytics(response.data.data);

      } catch (error) {
        console.error("Failed to load analytics:", error);
        setError("Failed to load analytics data.");
      } finally {
        setAnalyticsLoading(false);
      }
    };

    loadAnalytics();
  }, [filters]);


  // 3. Load insights whenever filters change
  useEffect(() => {
    const loadInsights = async () => {
      try {
        setInsightsLoading(true);

        const response = await getInsights(
          filters,
          1,
          10
        );

        if (response.error) {
          throw new Error(response.error);
        }

        setInsights(response.data.insights);

        setPagination(response.data.pagination);

      } catch (error) {
        console.error("Failed to load insights:", error);
        setError("Failed to load insights data.");
      } finally {
        setInsightsLoading(false);
      }
    };

    loadInsights();
  }, [filters]);


  // Filter change
  const handleFilterChange = (newFilters) => {
    setFilters(newFilters);
  };


  // Reset filters
  const handleResetFilters = () => {
    setFilters(initialFilters);
  };


  // Insight pagination
  const handleInsightPageChange = async (newPage) => {
    try {
      setInsightsLoading(true);

      const response = await getInsights(
        filters,
        newPage,
        10
      );

      if (response.error) {
        throw new Error(response.error);
      }

      setInsights(response.data.insights);

      setPagination(response.data.pagination);

    } catch (error) {
      console.error("Failed to load insights:", error);
      setError("Failed to load insights data.");
    } finally {
      setInsightsLoading(false);
    }
  };


  return (
    <div className="min-h-screen bg-slate-50 p-5">

      {/* Header */}
      <header className="border-b border-slate-200 bg-slate-900 text-white">
        <div className="mx-auto max-w-[1600px] px-6 py-6">

          <h1 className="text-2xl font-bold">
            Blackcoffer Analytics
          </h1>

          <p className="mt-1 text-sm text-slate-300">
            Interactive Data Visualization Dashboard
          </p>

        </div>
      </header>


      <main className="mx-auto max-w-[1600px] space-y-6 px-6 py-6">

        {/* Filter Bar */}
        <FilterBar
          filters={filters}
          onChange={handleFilterChange}
          onReset={handleResetFilters}
          options={options}
        />


        {/* Error */}
        {error && (
          <div className="flex items-center justify-between rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">

            <span>
              {error}
            </span>

            <button
              onClick={() => setError(null)}
              className="font-medium hover:underline"
            >
              Dismiss
            </button>

          </div>
        )}


        {/* Analytics Loading */}
        {analyticsLoading ? (

          <div className="flex h-96 items-center justify-center rounded-xl border border-slate-200 bg-white shadow-sm">

            <div className="text-center">

              <div className="mx-auto h-8 w-8 animate-spin rounded-full border-4 border-slate-200 border-t-slate-900" />

              <p className="mt-3 text-sm text-slate-500">
                Loading analytics...
              </p>

            </div>

          </div>

        ) : (

          analytics && (
            <>

              {/* Summary Cards */}
              <SummaryCard
                summary={analytics.summary}
              />


              {/* Metric Selector */}
              <div className="flex flex-col justify-between gap-4 rounded-xl border border-slate-200 bg-white p-5 shadow-sm sm:flex-row sm:items-center">

                <div>

                  <h2 className="text-lg font-semibold text-slate-900">
                    Data Analysis
                  </h2>

                  <p className="mt-1 text-sm text-slate-500">
                    Explore insights using different analytical metrics
                  </p>

                </div>


                <MetricSelector
                  metric={metric}
                  onChange={setMetric}
                />

              </div>


              {/* Yearly Analysis */}
              <YearlyChart
                data={analytics.yearly}
                metric={metric}
              />


              {/* Country + Topic */}
              <div className="grid grid-cols-1 gap-6 xl:grid-cols-2">

                <CountryChart
                  data={analytics.country}
                  metric={metric}
                />

                <TopicChart
                  data={analytics.topic}
                  metric={metric}
                />

              </div>


              {/* Region + Sector */}
              <div className="grid grid-cols-1 gap-6 xl:grid-cols-2">

                <RegionChart
                  data={analytics.region}
                  metric={metric}
                />

                <SectorChart
                  data={analytics.sector}
                  metric={metric}
                />

              </div>


              {/* PESTLE + Source */}
              <div className="grid grid-cols-1 gap-6 xl:grid-cols-2">

                <PestleChart
                  data={analytics.pestle}
                  metric={metric}
                />

                <SourceChart
                  data={analytics.source}
                  metric={metric}
                />

              </div>


              {/* Insight Explorer */}
              <div className="relative">

                {insightsLoading && (
                  <div className="absolute inset-0 z-10 flex items-center justify-center rounded-xl bg-white/70 backdrop-blur-[1px]">

                    <div className="text-center">

                      <div className="mx-auto h-7 w-7 animate-spin rounded-full border-4 border-slate-200 border-t-slate-900" />

                      <p className="mt-2 text-sm text-slate-500">
                        Loading insights...
                      </p>

                    </div>

                  </div>
                )}


                <InsightTable
                  insights={insights}
                  pagination={pagination}
                  onPageChange={handleInsightPageChange}
                />

              </div>

            </>
          )

        )}

      </main>

    </div>
  );
}

export default App;