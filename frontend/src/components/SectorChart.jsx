import CategoryChart from "./CategoryChart";


const SectorChart = ({ data, metric }) => {

    return (
        <CategoryChart
            title="Sector Analysis"
            description="Number of insights by sector"
            data={data}
            dataKey="count"
            nameKey="sector"
            metric={metric}
        />
    );
};


export default SectorChart;