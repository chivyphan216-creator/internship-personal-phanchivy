'use client';

import React, { useState, useEffect } from 'react';

interface Goal {
  id: number;
  title: string;
  progress: number;
  status: string;
  createdAt: string;
}

export default function GoalsPage() {
  const [goals, setGoals] = useState<Goal[]>([]);
  const [title, setTitle] = useState('');
  const [progress, setProgress] = useState(0);
  const [status, setStatus] = useState('Đang thực hiện');
  const [loading, setLoading] = useState(false);

  // Tải danh sách mục tiêu khi vào trang
  const fetchGoals = async () => {
    try {
      const res = await fetch('/api/goals');
      const data = await res.json();
      if (Array.isArray(data)) {
        setGoals(data);
      }
    } catch (error) {
      console.error('Lỗi khi tải dữ liệu mục tiêu:', error);
    }
  };

  useEffect(() => {
    fetchGoals();
  }, []);

  // Thêm mục tiêu mới
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;

    setLoading(true);
    try {
      const res = await fetch('/api/goals', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title, progress: Number(progress), status }),
      });

      if (res.ok) {
        setTitle('');
        setProgress(0);
        setStatus('Đang thực hiện');
        fetchGoals(); // Tải lại danh sách
      }
    } catch (error) {
      console.error('Lỗi khi thêm mục tiêu:', error);
    } finally {
      setLoading(false);
    }
  };

  // ---------------------------------------------------------
  // THÊM: Hàm xử lý xóa mục tiêu
  // ---------------------------------------------------------
  const handleDelete = async (id: number) => {
    if (!confirm('Bạn có chắc chắn muốn xóa mục tiêu này không?')) return;

    try {
      const res = await fetch('/api/goals', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id }),
      });

      if (res.ok) {
        fetchGoals(); // Tải lại danh sách sau khi xóa thành công
      } else {
        alert('Xóa mục tiêu thất bại!');
      }
    } catch (error) {
      console.error('Lỗi khi xóa mục tiêu:', error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6 md:p-10">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">Quản lý Mục tiêu Học tập</h1>
        <p className="text-gray-600 mb-8">Theo dõi tiến độ học tập và phát triển dự án của bạn.</p>

        {/* Form thêm mục tiêu mới */}
        <form onSubmit={handleSubmit} className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 mb-8">
          <h2 className="text-lg font-semibold text-gray-700 mb-4">Thêm mục tiêu mới</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1">Tên mục tiêu</label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="VD: Hoàn thành đồ án Next.js"
                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-800"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1">Tiến độ (%)</label>
              <input
                type="number"
                min="0"
                max="100"
                value={progress}
                onChange={(e) => setProgress(Number(e.target.value))}
                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-800"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1">Trạng thái</label>
              <select
                value={status}
                onChange={(e) => setStatus(e.target.value)}
                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-800"
              >
                <option value="Đang thực hiện">Đang thực hiện</option>
                <option value="Hoàn thành">Hoàn thành</option>
                <option value="Tạm hoãn">Tạm hoãn</option>
              </select>
            </div>
          </div>
          <button
            type="submit"
            disabled={loading}
            className="bg-blue-600 text-white px-5 py-2 rounded-lg font-medium hover:bg-blue-700 transition duration-200 disabled:opacity-50"
          >
            {loading ? 'Đang lưu...' : 'Thêm mục tiêu'}
          </button>
        </form>

        {/* Danh sách mục tiêu */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-100">
            <h2 className="text-lg font-semibold text-gray-700">Danh sách mục tiêu hiện tại</h2>
          </div>
          {goals.length === 0 ? (
            <div className="p-6 text-center text-gray-500">Chưa có mục tiêu nào được tạo. Hãy thêm mục tiêu đầu tiên!</div>
          ) : (
            <div className="divide-y divide-gray-100">
              {goals.map((goal) => (
                <div key={goal.id} className="p-6 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-800 text-lg mb-1">{goal.title}</h3>
                    <div className="flex items-center gap-3">
                      <span className="text-xs px-2.5 py-1 bg-blue-50 text-blue-600 font-medium rounded-full">
                        {goal.status}
                      </span>
                      <span className="text-xs text-gray-400">
                        Ngày tạo: {goal.createdAt ? new Date(goal.createdAt).toLocaleDateString('vi-VN') : 'N/A'}
                      </span>
                    </div>
                  </div>

                  <div className="w-full md:w-auto flex items-center justify-between md:justify-end gap-4">
                    <div className="w-full md:w-48 flex items-center gap-3">
                      <div className="flex-1 bg-gray-100 h-2.5 rounded-full overflow-hidden">
                        <div
                          className="bg-blue-600 h-full rounded-full transition-all duration-300"
                          style={{ width: `${goal.progress}%` }}
                        ></div>
                      </div>
                      <span className="text-sm font-semibold text-gray-600 w-10 text-right">{goal.progress}%</span>
                    </div>

                    {/* THÊM: Nút bấm Xóa (biểu tượng thùng rác) */}
                    <button
                      onClick={() => handleDelete(goal.id)}
                      title="Xóa mục tiêu"
                      className="text-gray-400 hover:text-red-600 p-1.5 transition-colors cursor-pointer"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="3 6 5 6 21 6"></polyline>
                        <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                        <line x1="10" y1="11" x2="10" y2="17"></line>
                        <line x1="14" y1="11" x2="14" y2="17"></line>
                      </svg>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}