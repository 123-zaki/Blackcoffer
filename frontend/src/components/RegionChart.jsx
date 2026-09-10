import CategoryChart from "./CategoryChart";


const RegionChart = ({ data, metric }) => {

    return (
        <CategoryChart
            title="Regional Analysis"
            description="Number of insights by region"
            data={data}
            dataKey="count"
            nameKey="region"
            metric={metric}
        />
    );
};


export default RegionChart;