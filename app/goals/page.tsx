'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

interface Goal {
  id: number;
  title: string;
  progress: number;
  status: string;
  createdAt: string;
}

function UserProfile() {
  const [userName, setUserName] = useState('Phan Chí Vỹ');
  const [userEmail, setUserEmail] = useState('chivy@example.com');
  const router = useRouter();

  useEffect(() => {
    const storedName = localStorage.getItem('userName');
    const storedEmail = localStorage.getItem('userEmail');
    if (storedName) setUserName(storedName);
    if (storedEmail) setUserEmail(storedEmail);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('userName');
    localStorage.removeItem('userEmail');
    router.push('/login');
  };

  return (
    <div className="flex items-center gap-3 bg-white px-4 py-2 rounded-xl shadow-sm border border-gray-100 w-fit">
      <div>
        <div className="font-bold text-sm text-gray-800">{userName}</div>
        <div className="text-xs text-gray-500">{userEmail}</div>
      </div>
      <button 
        onClick={handleLogout}
        title="Đăng xuất"
        className="text-gray-400 hover:text-red-500 transition-colors p-1 cursor-pointer"
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4"></path>
          <polyline points="10 17 15 12 10 7"></polyline>
          <line x1="15" y1="12" x2="3" y2="12"></line>
        </svg>
      </button>
    </div>
  );
}

export default function GoalsPage() {
  const [goals, setGoals] = useState<Goal[]>([]);
  const [title, setTitle] = useState('');
  const [progress, setProgress] = useState(0);
  const [status, setStatus] = useState('Đang thực hiện');
  const [loading, setLoading] = useState(false);

  // State phục vụ cho việc chỉnh sửa
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editTitle, setEditTitle] = useState('');
  const [editProgress, setEditProgress] = useState(0);
  const [editStatus, setEditStatus] = useState('');

  // THÊM: State quản lý trạng thái bộ lọc ('Tất cả' hoặc các trạng thái cụ thể)
  const [filterStatus, setFilterStatus] = useState('Tất cả');

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
        fetchGoals();
      }
    } catch (error) {
      console.error('Lỗi khi thêm mục tiêu:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm('Bạn có chắc chắn muốn xóa mục tiêu này không?')) return;

    try {
      const res = await fetch('/api/goals', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id }),
      });

      if (res.ok) {
        fetchGoals();
      } else {
        alert('Xóa mục tiêu thất bại!');
      }
    } catch (error) {
      console.error('Lỗi khi xóa mục tiêu:', error);
    }
  };

  const handleStartEdit = (goal: Goal) => {
    setEditingId(goal.id);
    setEditTitle(goal.title);
    setEditProgress(goal.progress);
    setEditStatus(goal.status);
  };

  const handleSaveEdit = async (id: number) => {
    try {
      const res = await fetch('/api/goals', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          id,
          title: editTitle,
          progress: Number(editProgress),
          status: editStatus,
        }),
      });

      if (res.ok) {
        setEditingId(null);
        fetchGoals();
      } else {
        alert('Cập nhật thất bại!');
      }
    } catch (error) {
      console.error('Lỗi khi cập nhật mục tiêu:', error);
    }
  };

  // THÊM: Lọc danh sách mục tiêu dựa theo giá trị `filterStatus`
  const filteredGoals = goals.filter((goal) => {
    if (filterStatus === 'Tất cả') return true;
    return goal.status === filterStatus;
  });

  return (
    <div className="min-h-screen bg-gray-50 p-6 md:p-10">
      <div className="max-w-4xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-800 mb-1">Quản lý Mục tiêu Học tập</h1>
            <p className="text-gray-600">Theo dõi tiến độ học tập và phát triển dự án của bạn.</p>
          </div>
          <UserProfile />
        </div>

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

        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
          {/* Header danh sách & Các nút bộ lọc trạng thái */}
          <div className="px-6 py-4 border-b border-gray-100 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <h2 className="text-lg font-semibold text-gray-700">Danh sách mục tiêu hiện tại</h2>
            
            <div className="flex flex-wrap gap-2">
              {['Tất cả', 'Đang thực hiện', 'Hoàn thành', 'Tạm hoãn'].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setFilterStatus(tab)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors cursor-pointer ${
                    filterStatus === tab
                      ? 'bg-blue-600 text-white shadow-sm'
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>
          </div>

          {filteredGoals.length === 0 ? (
            <div className="p-6 text-center text-gray-500">Không có mục tiêu nào phù hợp với bộ lọc này.</div>
          ) : (
            <div className="divide-y divide-gray-100">
              {filteredGoals.map((goal) => (
                <div key={goal.id} className="p-6 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                  {editingId === goal.id ? (
                    <div className="flex-1 flex flex-col md:flex-row gap-3 w-full">
                      <input
                        type="text"
                        value={editTitle}
                        onChange={(e) => setEditTitle(e.target.value)}
                        className="flex-1 px-3 py-1.5 border rounded-lg text-sm text-gray-800"
                      />
                      <input
                        type="number"
                        min="0"
                        max="100"
                        value={editProgress}
                        onChange={(e) => setEditProgress(Number(e.target.value))}
                        className="w-24 px-3 py-1.5 border rounded-lg text-sm text-gray-800"
                      />
                      <select
                        value={editStatus}
                        onChange={(e) => setEditStatus(e.target.value)}
                        className="px-3 py-1.5 border rounded-lg text-sm text-gray-800"
                      >
                        <option value="Đang thực hiện">Đang thực hiện</option>
                        <option value="Hoàn thành">Hoàn thành</option>
                        <option value="Tạm hoãn">Tạm hoãn</option>
                      </select>
                      <div className="flex gap-2">
                        <button
                          onClick={() => handleSaveEdit(goal.id)}
                          className="bg-green-600 text-white px-3 py-1.5 rounded-lg text-sm font-medium hover:bg-green-700"
                        >
                          Lưu
                        </button>
                        <button
                          onClick={() => setEditingId(null)}
                          className="bg-gray-300 text-gray-700 px-3 py-1.5 rounded-lg text-sm font-medium hover:bg-gray-400"
                        >
                          Hủy
                        </button>
                      </div>
                    </div>
                  ) : (
                    <>
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

                        <div className="flex items-center gap-1">
                          <button
                            onClick={() => handleStartEdit(goal)}
                            title="Sửa mục tiêu"
                            className="text-gray-400 hover:text-blue-600 p-1.5 transition-colors cursor-pointer"
                          >
                            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                              <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
                              <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
                            </svg>
                          </button>

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
                    </>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}