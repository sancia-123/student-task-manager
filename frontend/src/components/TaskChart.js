import React from "react";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

const TaskChart = ({ tasks }) => {
  const completedCount = tasks.filter((t) => t.status === "Completed").length;
  const pendingCount = tasks.filter((t) => t.status === "Pending").length;

  const data = {
    labels: ["Completed", "Pending"],
    datasets: [
      {
        label: "Tasks",
        data: [completedCount, pendingCount],
        backgroundColor: ["#4caf50", "#ff9800"],
        borderWidth: 1,
      },
    ],
  };

  return (
    <div style={{ width: "300px", marginBottom: "20px" }}>
      <Pie data={data} />
    </div>
  );
};

export default TaskChart;
