"use client";
import { useState } from "react";
import AreaChartComponent from "app/components/Charts/AreaChart";
import BarChartComponent from "app/components/Charts/BarChart";

const ChartsContainer = ({
  monthlyStats,
}: {
  monthlyStats: { date: string; totalPrice: number }[];
}) => {
  const [barChart, setBarChart] = useState(true);
  return (
    <section className="px-4 mx-auto max-w-screen-xl mt-24 font-mono text-gray-900 dark:text-gray-200 md:px-6 flex flex-col gap-4 items-center justify-center">
      <div className="flex flex-col gap-4">
        <h5 className="text-2xl font-semibold">Monthly Sales Total</h5>
        <button
          type="button"
          onClick={() => setBarChart(!barChart)}
          className="text-teal-500 text-lg"
        >
          {barChart ? "AreaChart" : "BarChart"}
        </button>
      </div>
      {barChart ? (
        <BarChartComponent data={monthlyStats} />
      ) : (
        <AreaChartComponent data={monthlyStats} />
      )}
    </section>
  );
};

export default ChartsContainer;
