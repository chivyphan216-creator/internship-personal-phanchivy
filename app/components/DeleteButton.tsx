'use client';

import React from 'react';

interface DeleteButtonProps {
  id: number;
  onDeleted: () => void;
}

export default function DeleteButton({ id, onDeleted }: DeleteButtonProps) {
  const handleDelete = async () => {
    if (!confirm('Bạn có chắc chắn muốn xóa mục tiêu này không?')) return;

    try {
      const res = await fetch('/api/goals', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id }),
      });

      if (res.ok) {
        onDeleted();
      } else {
        alert('Xóa mục tiêu thất bại!');
      }
    } catch (error) {
      console.error('Lỗi khi xóa mục tiêu:', error);
    }
  };

  return (
    <button
      onClick={handleDelete}
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
  );
}