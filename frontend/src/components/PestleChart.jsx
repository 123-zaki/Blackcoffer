import CategoryChart from "./CategoryChart";


const PestleChart = ({ data, metric }) => {

    return (
        <CategoryChart
            title="PESTLE Analysis"
            description="Number of insights by PESTLE category"
            data={data}
            dataKey="count"
            nameKey="pestle"
            metric={metric}
        />
    );
};


export default PestleChart;