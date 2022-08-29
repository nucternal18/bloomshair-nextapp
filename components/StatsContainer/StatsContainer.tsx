import React from "react";
import {
  FaSuitcaseRolling,
  FaCalendarCheck,
  FaBug,
  FaFileContract,
} from "react-icons/fa";
import { BsCurrencyPound } from "react-icons/bs";
import StatsItem from "./StatsItem";

export type DefaultStatsProps = {
  title: string;
  count: number;
  icon: React.ReactElement;
  textColor: string;
  borderColor: string;
  bcg: string;
  sales?: boolean;
};

interface StatsContainerProps {
  orderStats: number;
  productStats: number;
  userStats: number;
  totalSalesStats: number;
  ordersPaid: number;
  ordersPending?: number;
  ordersCancelled?: number;
  ordersDelivered: number;
}

const StatsContainer = ({ stats }: { stats: StatsContainerProps }) => {
  const defaultStats: DefaultStatsProps[] = [
    {
      title: "Total Orders",
      count: stats.orderStats ?? 0,
      icon: <FaSuitcaseRolling fontSize={18} color="#e9b949" />,
      textColor: "text-amber-500",
      borderColor: "border-amber-500",
      bcg: "bg-amber-100",
    },
    {
      title: "Total Products",
      count: stats.productStats ?? 0,
      icon: <FaCalendarCheck fontSize={18} color="#647acb" />,
      textColor: "text-indigo-500",
      borderColor: "border-indigo-500",
      bcg: "bg-indigo-100",
    },
    {
      title: "Total Users",
      count: stats.userStats ?? 0,
      icon: <FaBug fontSize={18} color="#d66a6a" />,
      textColor: "text-pink-500",
      borderColor: "border-pink-500",
      bcg: "bg-pink-100",
    },
    {
      title: "Total Sales",
      count: stats.totalSalesStats ?? 0,
      icon: <BsCurrencyPound fontSize={18} color="#14b8a8" />,
      textColor: "text-teal-500",
      borderColor: "border-teal-500",
      bcg: "bg-teal-100",
      sales: true,
    },
    {
      title: "total no. Paid Orders",
      count: stats.ordersPaid ?? 0,
      icon: <FaFileContract fontSize={18} color="#14b8a8" />,
      textColor: "text-teal-500",
      borderColor: "border-teal-500",
      bcg: "bg-teal-100",
    },
    {
      title: "Orders Delivered",
      count: stats.ordersDelivered ?? 0,
      icon: <FaFileContract fontSize={18} color="#14b8a8" />,
      textColor: "text-teal-500",
      borderColor: "border-teal-500",
      bcg: "bg-teal-100",
    },
  ];
  return (
    <section className="px-2 mx-auto max-w-screen-xl my-6 font-mono text-gray-900 dark:text-gray-200 md:px-4">
      <div className="grid grid-cols-2 md:grid-cols-4">
        {defaultStats.map((item, index) => {
          return <StatsItem key={index} {...item} />;
        })}
      </div>
    </section>
  );
};

export default StatsContainer;
