"use client"; 

import { useState } from "react";

export default function Home() {
  const [goals, setGoals] = useState([
    { id: 1, title: "Làm đồ án thực tập KFL", deadline: "2026-08-30", progress: 45 }
  ]);
  const [title, setTitle] = useState("");
  const [deadline, setDeadline] = useState("");
  const [error, setError] = useState(""); // State mới để chứa thông báo lỗi validation

  // Hàm thêm mục tiêu
  const handleAddGoal = () => {
    // 1. Validation theo chuẩn yêu cầu
    if (!title || !deadline) {
      setError("Bro ơi, vui lòng nhập đầy đủ Tên mục tiêu và Hạn chót nhé!");
      return;
    }
    
    setError(""); // Xóa lỗi nếu đã nhập đủ
    
    const newGoal = {
      id: Date.now(), 
      title: title,
      deadline: deadline,
      progress: 0 
    };
    setGoals([...goals, newGoal]);
    setTitle("");
    setDeadline("");
  };

  // Hàm xóa mục tiêu
  const handleDeleteGoal = (idToDelete: number) => {
    setGoals(goals.filter((goal) => goal.id !== idToDelete));
  };

  // HÀM MỚI: Sửa/Cập nhật tiến độ
  const handleUpdateProgress = (idToUpdate: number) => {
    setGoals(goals.map(goal => {
      if (goal.id === idToUpdate) {
        // Tăng tiến độ lên 10% mỗi lần bấm, tối đa là 100%
        const newProgress = goal.progress + 10 > 100 ? 100 : goal.progress + 10;
        return { ...goal, progress: newProgress };
      }
      return goal;
    }));
  };

  return (
    <main className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-4xl mx-auto">
        
        <header className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800">🎯 Quản Lý Mục Tiêu Học Tập</h1>
          <p className="text-gray-600 mt-2">Theo dõi tiến độ và hoàn thành mục tiêu mỗi ngày</p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 col-span-1 h-fit">
            <h2 className="text-xl font-semibold mb-4">Tạo Mục Tiêu Mới</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Tên mục tiêu</label>
                <input 
                  type="text" 
                  value={title}
                  onChange={(e) => setTitle(e.target.value)} 
                  placeholder="VD: Học xong Next.js..." 
                  className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Hạn chót</label>
                <input 
                  type="date" 
                  value={deadline}
                  onChange={(e) => setDeadline(e.target.value)} 
                  className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              
              {/* Hiển thị lỗi Validation ở đây */}
              {error && <p className="text-red-500 text-sm font-medium">{error}</p>}

              <button 
                onClick={handleAddGoal} 
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-md transition duration-200"
              >
                + Thêm mục tiêu
              </button>
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 md:col-span-2">
            <h2 className="text-xl font-semibold mb-4">Danh Sách Đang Thực Hiện</h2>
            
            {/* KIỂM TRA EMPTY STATE */}
            {goals.length === 0 ? (
              <div className="text-center py-10 border-2 border-dashed border-gray-200 rounded-lg">
                <p className="text-gray-500 font-medium">Chưa có mục tiêu nào.</p>
                <p className="text-gray-400 text-sm mt-1">Hãy tạo mục tiêu đầu tiên ở cột bên trái nhé!</p>
              </div>
            ) : (
              goals.map((goal) => (
                <div key={goal.id} className="border border-gray-200 rounded-lg p-4 mb-4 hover:shadow-md transition">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <h3 className="font-bold text-lg text-blue-600">{goal.title}</h3>
                      <span className="inline-block mt-1 text-xs font-medium px-2 py-1 bg-orange-100 text-orange-700 rounded-full border border-orange-200">
                        Hạn: {goal.deadline}
                      </span>
                    </div>
                    
                    <div className="flex gap-2">
                      {/* NÚT SỬA/CẬP NHẬT */}
                      <button 
                        onClick={() => handleUpdateProgress(goal.id)}
                        className="text-blue-500 hover:text-blue-700 hover:bg-blue-50 p-2 rounded-md transition text-sm font-medium"
                      >
                        + Cập nhật
                      </button>
                      <button 
                        onClick={() => handleDeleteGoal(goal.id)}
                        className="text-red-500 hover:text-red-700 hover:bg-red-50 p-2 rounded-md transition text-sm font-medium"
                      >
                        Xóa
                      </button>
                    </div>
                  </div>
                  
                  <div className="w-full bg-gray-100 rounded-full h-2.5 mb-1 mt-4 border border-gray-200">
                    <div className="bg-blue-600 h-2.5 rounded-full transition-all duration-500" style={{ width: `${goal.progress}%` }}></div>
                  </div>
                  <p className="text-right text-xs text-gray-500 font-medium">Tiến độ: {goal.progress}%</p>
                </div>
              ))
            )}

          </div>
        </div>

      </div>
    </main>
  );
}