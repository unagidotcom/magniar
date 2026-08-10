import React from 'react';

export const AdminSkeletonCard: React.FC = () => (
  <div className="bg-[#0A0A0C] border border-white/10 rounded-[2px] p-5 space-y-3 animate-pulse">
    <div className="h-3 bg-white/10 rounded w-1/3" />
    <div className="h-8 bg-white/15 rounded w-1/2" />
    <div className="h-3 bg-white/5 rounded w-2/3" />
  </div>
);

export const AdminSkeletonTable: React.FC = () => (
  <div className="bg-[#0A0A0C] border border-white/10 rounded-[2px] overflow-hidden animate-pulse">
    <div className="p-4 bg-white/5 border-b border-white/10 flex justify-between">
      <div className="h-4 bg-white/10 rounded w-1/4" />
      <div className="h-4 bg-white/10 rounded w-1/6" />
    </div>
    {[1, 2, 3, 4, 5].map((idx) => (
      <div key={idx} className="p-4 border-b border-white/[0.05] flex justify-between items-center">
        <div className="space-y-2 w-1/3">
          <div className="h-3.5 bg-white/10 rounded w-full" />
          <div className="h-2.5 bg-white/5 rounded w-2/3" />
        </div>
        <div className="h-3 bg-white/10 rounded w-1/6" />
        <div className="h-5 bg-white/10 rounded w-20" />
      </div>
    ))}
  </div>
);
