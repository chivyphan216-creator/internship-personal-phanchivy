'use client';

import React from 'react';

interface Goal {
  id: number;
  title: string;
  progress: number;
  status: string;
}

interface DashboardViewProps {
  goals: Goal[];
}

export default function DashboardView({ goals }: DashboardViewProps) {
  const totalGoals = goals.length;
  const completedGoals = goals.filter((g) => g.status === 'Hoàn thành').length;
  const inProgressGoals = goals.filter((g) => g.status === 'Đang thực hiện').length;

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
        <p className="text-sm font-medium text-gray-500 mb-1">Tổng số mục tiêu</p>
        <h3 className="text-2xl font-bold text-blue-600">{totalGoals}</h3>
      </div>
      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
        <p className="text-sm font-medium text-gray-500 mb-1">Đang thực hiện</p>
        <h3 className="text-2xl font-bold text-amber-500">{inProgressGoals}</h3>
      </div>
      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
        <p className="text-sm font-medium text-gray-500 mb-1">Đã hoàn thành</p>
        <h3 className="text-2xl font-bold text-green-600">{completedGoals}</h3>
      </div>
    </div>
  );
}