import { Bar } from "react-chartjs-2";

const AnalyticsChart = ({ data }) => {
  // ✅ Ensure data is always valid to prevent crashes
  const defaultData = {
    labels: ["No Data"],
    datasets: [
      {
        label: "No Data Available",
        data: [0],
        backgroundColor: "rgba(200, 200, 200, 0.5)",
      },
    ],
  };

  return (
    <div className="p-6 bg-white rounded-lg shadow-md">
      <h3 className="text-lg font-semibold mb-4">User Growth</h3>
      <Bar data={data?.labels ? data : defaultData} />
    </div>
  );
};

export default AnalyticsChart;
