import CategoryChart from "./CategoryChart";


const SourceChart = ({ data, metric }) => {

    return (
        <CategoryChart
            title="Source Analysis"
            description="Number of insights by source"
            data={data}
            dataKey="count"
            nameKey="source"
            metric={metric}
        />
    );
};


export default SourceChart;