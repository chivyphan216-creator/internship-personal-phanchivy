'use client';

import React, { useState } from 'react';

interface TransactionFormProps {
  onAddSuccess: () => void;
}

export default function TransactionForm({ onAddSuccess }: TransactionFormProps) {
  const [title, setTitle] = useState('');
  const [progress, setProgress] = useState(0);
  const [status, setStatus] = useState('Đang thực hiện');
  const [loading, setLoading] = useState(false);

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
        onAddSuccess();
      }
    } catch (error) {
      console.error('Lỗi khi thêm mục tiêu:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
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
        className="bg-blue-600 text-white px-5 py-2 rounded-lg font-medium hover:bg-blue-700 transition duration-200 disabled:opacity-50 cursor-pointer"
      >
        {loading ? 'Đang lưu...' : 'Thêm mục tiêu'}
      </button>
    </form>
  );
}