"use client";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
  Legend,
} from "recharts";
import type { OddsHistoryPoint } from "@/types/match";

type Props = {
  data: OddsHistoryPoint[];
};

export function OddsChart({ data }: Props) {
  return (
    <div className="h-64 w-full">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data} margin={{ top: 8, right: 8, left: 0, bottom: 0 }}>
          <CartesianGrid stroke="#E5E7EB" strokeDasharray="3 3" vertical={false} />
          <XAxis
            dataKey="time"
            tick={{ fill: "#6B7280", fontSize: 11 }}
            axisLine={{ stroke: "#E5E7EB" }}
            tickLine={false}
          />
          <YAxis
            domain={["auto", "auto"]}
            tick={{ fill: "#6B7280", fontSize: 11 }}
            axisLine={false}
            tickLine={false}
            width={36}
          />
          <Legend
            wrapperStyle={{ fontSize: 12, paddingTop: 12 }}
            formatter={(value) =>
              value === "home" ? "1" : value === "draw" ? "X" : "2"
            }
          />
          <Line
            type="monotone"
            dataKey="home"
            stroke="#0A0A0A"
            strokeWidth={2}
            dot={false}
            name="home"
          />
          <Line
            type="monotone"
            dataKey="draw"
            stroke="#6B7280"
            strokeWidth={1.5}
            dot={false}
            name="draw"
          />
          <Line
            type="monotone"
            dataKey="away"
            stroke="#E52222"
            strokeWidth={2}
            dot={false}
            name="away"
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
