'use client';
import { useState, useEffect } from 'react';

interface Goal {
  id: string;
  title: string;
  category: string;
  progress: number;
  deadline: string;
  isCompleted: boolean;
}

export default function DashboardPage() {
  const [goals, setGoals] = useState<Goal[]>([]);

  const fetchGoals = async () => {
    try {
      const res = await fetch('/api/goals');
      const data = await res.json();
      if (Array.isArray(data)) {
        setGoals(data);
      }
    } catch (error) {
      console.error('Lỗi khi tải dữ liệu:', error);
    }
  };

  useEffect(() => {
    fetchGoals();
  }, []);

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-gray-900">
      <header className="bg-white border-b border-gray-100 px-8 py-4 flex justify-between items-center sticky top-0 z-10">
        <div className="flex items-center gap-3">
          <div className="bg-blue-600 p-2 rounded-xl text-white shadow-sm">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <circle cx="12" cy="12" r="10" strokeWidth="2"/><circle cx="12" cy="12" r="6" strokeWidth="2"/><circle cx="12" cy="12" r="2" fill="currentColor"/>
            </svg>
          </div>
          <div>
            <h1 className="font-bold text-xl text-gray-900 tracking-tight">Quản Lý Mục Tiêu</h1>
            <p className="text-xs text-gray-500 font-medium mt-0.5">Dự án cá nhân Kyanon</p>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <div className="text-right hidden md:block">
            <p className="text-sm font-bold text-gray-900">Phan Chi Vy</p>
            <p className="text-xs text-gray-500">chivy@example.com</p>
          </div>
          <a href="/login" className="p-2.5 bg-gray-50 border border-gray-100 rounded-full hover:bg-red-50 hover:text-red-600 transition-colors group">
            <svg className="w-5 h-5 text-gray-500 group-hover:text-red-600 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" /></svg>
          </a>
        </div>
      </header>

      <main className="max-w-5xl mx-auto p-6 lg:p-8">
        <div className="flex justify-between items-end mb-8">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Bảng Điều Khiển Học Tập</h2>
            <p className="text-gray-500 text-sm mt-1">Theo dõi và cập nhật tiến độ mục tiêu của bạn hàng ngày</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex justify-between items-center">
            <div>
              <p className="text-xs font-bold text-gray-400 mb-1 uppercase tracking-wider">Tổng mục tiêu</p>
              <h3 className="text-3xl font-black text-gray-800">{goals.length}</h3>
            </div>
          </div>
          <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex justify-between items-center">
            <div>
              <p className="text-xs font-bold text-gray-400 mb-1 uppercase tracking-wider">Đã hoàn thành</p>
              <h3 className="text-3xl font-black text-green-500">
                {goals.filter(g => g.progress === 100 || g.isCompleted).length}
              </h3>
            </div>
          </div>
          <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex justify-between items-center">
            <div>
              <p className="text-xs font-bold text-gray-400 mb-1 uppercase tracking-wider">Đang thực hiện</p>
              <h3 className="text-3xl font-black text-orange-500">
                {goals.filter(g => g.progress < 100 && !g.isCompleted).length}
              </h3>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden p-6">
          <h3 className="font-bold text-lg text-gray-900 mb-4">Danh sách mục tiêu chi tiết</h3>
          {goals.length === 0 ? (
            <p className="text-gray-400 text-center py-8">Chưa có mục tiêu nào trong cơ sở dữ liệu.</p>
          ) : (
            goals.map((goal) => (
              <div key={goal.id} className="flex flex-col sm:flex-row sm:items-center justify-between p-4 border-b border-gray-50 gap-4">
                <div>
                  <span className="text-xs font-bold text-blue-600 uppercase tracking-wide">{goal.category}</span>
                  <h4 className="font-bold text-gray-900 mt-0.5">{goal.title}</h4>
                </div>
                <div className="flex items-center gap-4 sm:w-1/3 justify-end">
                  <div className="w-full bg-gray-100 rounded-full h-2">
                    <div className="bg-blue-600 h-2 rounded-full" style={{ width: `${goal.progress}%` }}></div>
                  </div>
                  <span className="text-sm font-bold text-gray-700 w-10 text-right">{goal.progress}%</span>
                </div>
              </div>
            ))
          )}
        </div>
      </main>
    </div>
  );
}