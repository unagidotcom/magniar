import React, { useState } from 'react';
import { RevenueDataPoint } from '../../../services/dashboardService';

interface RevenueTrendChartProps {
  data: RevenueDataPoint[];
}

export const RevenueTrendChart: React.FC<RevenueTrendChartProps> = ({ data }) => {
  const [activePoint, setActivePoint] = useState<RevenueDataPoint | null>(null);

  if (!data || data.length === 0) return null;

  const maxVal = Math.max(...data.map((d) => d.revenue)) * 1.1;
  const minVal = Math.min(...data.map((d) => d.revenue)) * 0.8;

  const width = 500;
  const height = 140;
  const paddingX = 30;
  const paddingY = 20;

  const points = data.map((d, i) => {
    const x = paddingX + (i / (data.length - 1)) * (width - paddingX * 2);
    const y =
      height -
      paddingY -
      ((d.revenue - minVal) / (maxVal - minVal)) * (height - paddingY * 2);
    return { x, y, ...d };
  });

  const pathD = points.reduce(
    (acc, p, i) => (i === 0 ? `M ${p.x} ${p.y}` : `${acc} L ${p.x} ${p.y}`),
    ''
  );

  const areaD = `${pathD} L ${points[points.length - 1].x} ${
    height - paddingY
  } L ${points[0].x} ${height - paddingY} Z`;

  return (
    <div className="bg-[#050505] border border-white/10 rounded-[2px] p-4 space-y-3 relative">
      <div className="flex items-center justify-between">
        <span className="font-mono text-[10px] text-white/50 uppercase tracking-wider font-semibold">
          2026 REVENUE TREND (MONTHLY RETAINERS & FEES)
        </span>
        {activePoint ? (
          <span className="font-mono text-xs text-[#0099FF] font-bold">
            {activePoint.month}: {activePoint.label}
          </span>
        ) : (
          <span className="font-mono text-[10px] text-emerald-400">
            Aug 2026: $215,000
          </span>
        )}
      </div>

      <div className="w-full relative">
        <svg
          viewBox={`0 0 ${width} ${height}`}
          className="w-full h-36 overflow-visible"
        >
          <defs>
            <linearGradient id="revGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#0099FF" stopOpacity="0.3" />
              <stop offset="100%" stopColor="#0099FF" stopOpacity="0.0" />
            </linearGradient>
          </defs>

          {/* Grid lines */}
          <line
            x1={paddingX}
            y1={paddingY}
            x2={width - paddingX}
            y2={paddingY}
            stroke="white"
            strokeOpacity="0.05"
            strokeDasharray="3 3"
          />
          <line
            x1={paddingX}
            y1={height / 2}
            x2={width - paddingX}
            y2={height / 2}
            stroke="white"
            strokeOpacity="0.05"
            strokeDasharray="3 3"
          />
          <line
            x1={paddingX}
            y1={height - paddingY}
            x2={width - paddingX}
            y2={height - paddingY}
            stroke="white"
            strokeOpacity="0.1"
          />

          {/* Area under curve */}
          <path d={areaD} fill="url(#revGrad)" />

          {/* Trend Line */}
          <path
            d={pathD}
            fill="none"
            stroke="#0099FF"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />

          {/* Data Points */}
          {points.map((p, i) => (
            <g key={i} className="cursor-pointer">
              <circle
                cx={p.x}
                cy={p.y}
                r={activePoint?.month === p.month ? "5" : "3"}
                fill={activePoint?.month === p.month ? "#FFFFFF" : "#0099FF"}
                stroke="#050505"
                strokeWidth="2"
                onMouseEnter={() => setActivePoint(p)}
                onMouseLeave={() => setActivePoint(null)}
              />
              <text
                x={p.x}
                y={height - 4}
                textAnchor="middle"
                fill="white"
                fillOpacity="0.4"
                fontSize="8"
                fontFamily="monospace"
              >
                {p.month}
              </text>
            </g>
          ))}
        </svg>
      </div>
    </div>
  );
};
