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

export default function GoalsPage() {
  const [goals, setGoals] = useState<Goal[]>([]);
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('Học tập');
  const [progress, setProgress] = useState(0);
  const [status, setStatus] = useState('Đang thực hiện');

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

  const handleAddGoal = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;

    try {
      const res = await fetch('/api/goals', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title,
          category,
          progress: Number(progress),
          isCompleted: status === 'Hoàn thành' || progress === 100,
        }),
      });

      if (res.ok) {
        setTitle('');
        setProgress(0);
        fetchGoals(); // Tải lại danh sách sau khi thêm thành công
      }
    } catch (error) {
      console.error('Lỗi khi thêm mục tiêu:', error);
    }
  };

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
            <h1 className="font-bold text-xl text-gray-900 tracking-tight">Quản lý Mục tiêu Học tập</h1>
            <p className="text-xs text-gray-500 font-medium mt-0.5">Theo dõi tiến độ học tập và phát triển dự án của bạn.</p>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <div className="text-right hidden md:block">
            <p className="text-sm font-bold text-gray-900">Phan Chí Vỹ</p>
            <p className="text-xs text-gray-500">chivy@example.com</p>
          </div>
          <a href="/login" className="p-2.5 bg-gray-50 border border-gray-100 rounded-full hover:bg-red-50 hover:text-red-600 transition-colors group">
            <svg className="w-5 h-5 text-gray-500 group-hover:text-red-600 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" /></svg>
          </a>
        </div>
      </header>

      <main className="max-w-5xl mx-auto p-6 lg:p-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
            <p className="text-xs font-bold text-gray-400 mb-1 uppercase tracking-wider">Tổng số mục tiêu</p>
            <h3 className="text-3xl font-black text-gray-800">{goals.length}</h3>
          </div>
          <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
            <p className="text-xs font-bold text-gray-400 mb-1 uppercase tracking-wider">Đang thực hiện</p>
            <h3 className="text-3xl font-black text-orange-500">
              {goals.filter(g => g.progress < 100 && !g.isCompleted).length}
            </h3>
          </div>
          <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
            <p className="text-xs font-bold text-gray-400 mb-1 uppercase tracking-wider">Đã hoàn thành</p>
            <h3 className="text-3xl font-black text-green-500">
              {goals.filter(g => g.progress === 100 || g.isCompleted).length}
            </h3>
          </div>
        </div>

        {/* Form thêm mục tiêu mới */}
        <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm mb-8">
          <h3 className="font-bold text-lg text-gray-900 mb-4">Thêm mục tiêu mới</h3>
          <form onSubmit={handleAddGoal} className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-bold text-gray-600 mb-1">Tên mục tiêu</label>
              <input 
                type="text" 
                value={title} 
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Nhập tên mục tiêu..." 
                className="w-full px-4 py-2 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-blue-500"
                required
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-gray-600 mb-1">Tiến độ (%)</label>
              <input 
                type="number" 
                min="0" 
                max="100" 
                value={progress} 
                onChange={(e) => setProgress(Number(e.target.value))}
                className="w-full px-4 py-2 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-blue-500"
                required
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-gray-600 mb-1">Trạng thái</label>
              <select 
                value={status} 
                onChange={(e) => setStatus(e.target.value)}
                className="w-full px-4 py-2 border border-gray-200 rounded-xl text-sm bg-white focus:outline-none focus:border-blue-500"
              >
                <option value="Đang thực hiện">Đang thực hiện</option>
                <option value="Hoàn thành">Hoàn thành</option>
              </select>
            </div>
            <div className="md:col-span-3 flex justify-end mt-2">
              <button 
                type="submit" 
                className="px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl text-sm transition-colors shadow-sm"
              >
                Thêm mục tiêu
              </button>
            </div>
          </form>
        </div>

        {/* Danh sách mục tiêu */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden p-6">
          <h3 className="font-bold text-lg text-gray-900 mb-4">Danh sách mục tiêu hiện tại</h3>
          {goals.length === 0 ? (
            <p className="text-gray-400 text-center py-8">Chưa có mục tiêu nào phù hợp với bộ lọc này.</p>
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