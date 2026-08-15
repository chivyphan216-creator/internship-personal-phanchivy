export default function DashboardPage() {
  return (
    <div className="min-h-screen bg-slate-50 font-sans">
      {/* Thanh điều hướng trên cùng (Header) */}
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
          <button className="p-2.5 bg-gray-50 border border-gray-100 rounded-full hover:bg-red-50 hover:text-red-600 transition-colors group">
            <svg className="w-5 h-5 text-gray-500 group-hover:text-red-600 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" /></svg>
          </button>
        </div>
      </header>

      {/* Khu vực nội dung chính */}
      <main className="max-w-5xl mx-auto p-6 lg:p-8">
        <div className="flex justify-between items-end mb-8">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Bảng Điều Khiển Học Tập</h2>
            <p className="text-gray-500 text-sm mt-1">Theo dõi và cập nhật tiến độ mục tiêu của bạn hàng ngày</p>
          </div>
          <button className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-xl text-sm font-semibold flex items-center gap-2 shadow-md shadow-blue-200 transition-all active:scale-95">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" /></svg>
            Thêm Mục Tiêu
          </button>
        </div>

        {/* 3 Thẻ Thống Kê */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {/* Thẻ Tổng Mục Tiêu */}
          <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex justify-between items-center hover:border-blue-100 transition-colors">
            <div>
              <p className="text-xs font-bold text-gray-400 mb-1 uppercase tracking-wider">Tổng mục tiêu</p>
              <h3 className="text-3xl font-black text-gray-800">12</h3>
            </div>
            <div className="bg-blue-50 p-3 rounded-xl text-blue-600">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" /></svg>
            </div>
          </div>
          
          {/* Thẻ Đã Hoàn Thành */}
          <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex justify-between items-center hover:border-green-100 transition-colors">
            <div>
              <p className="text-xs font-bold text-gray-400 mb-1 uppercase tracking-wider">Đã hoàn thành</p>
              <h3 className="text-3xl font-black text-green-500">5</h3>
            </div>
            <div className="bg-green-50 p-3 rounded-xl text-green-600">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
            </div>
          </div>
          
          {/* Thẻ Đang Thực Hiện */}
          <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex justify-between items-center hover:border-orange-100 transition-colors">
            <div>
              <p className="text-xs font-bold text-gray-400 mb-1 uppercase tracking-wider">Đang thực hiện</p>
              <h3 className="text-3xl font-black text-orange-500">7</h3>
            </div>
            <div className="bg-orange-50 p-3 rounded-xl text-orange-600">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
            </div>
          </div>
        </div>

        {/* Danh sách Mục Tiêu */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
          {/* Thanh tìm kiếm & Lọc */}
          <div className="p-4 border-b border-gray-100 flex flex-col sm:flex-row justify-between items-center bg-gray-50/30 gap-4">
            <div className="relative w-full sm:w-72">
              <svg className="w-4 h-4 absolute left-3 top-3 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
              <input type="text" placeholder="Tìm mục tiêu..." className="w-full pl-9 pr-4 py-2 text-sm border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-500 transition-all"/>
            </div>
            <div className="flex gap-2 w-full sm:w-auto bg-gray-100 p-1 rounded-xl">
              <button className="flex-1 sm:flex-none px-4 py-1.5 text-sm font-semibold bg-white text-gray-900 rounded-lg shadow-sm">Tất cả</button>
              <button className="flex-1 sm:flex-none px-4 py-1.5 text-sm font-semibold text-gray-500 hover:text-gray-900 transition-colors">Đang học</button>
              <button className="flex-1 sm:flex-none px-4 py-1.5 text-sm font-semibold text-gray-500 hover:text-gray-900 transition-colors">Đã xong</button>
            </div>
          </div>
          
          {/* Khung chứa các mục tiêu */}
          <div className="p-0">
            {/* Mục tiêu 1 */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between p-5 border-b border-gray-50 hover:bg-gray-50/50 transition-colors gap-4">
              <div className="flex items-center gap-4">
                <div className="bg-orange-50 p-3 rounded-xl border border-orange-100 text-orange-500"><svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" /></svg></div>
                <div>
                  <h4 className="font-bold text-gray-900">Hoàn thành khóa học Next.js</h4>
                  <p className="text-xs font-medium text-gray-500 mt-1">Hạn chót: 20/08/2026 • Lập trình web</p>
                </div>
              </div>
              <div className="flex items-center gap-4 sm:w-1/3 justify-end pl-14 sm:pl-0">
                <div className="w-full bg-gray-100 rounded-full h-2">
                  <div className="bg-blue-600 h-2 rounded-full" style={{ width: '60%' }}></div>
                </div>
                <span className="text-sm font-bold text-gray-700 w-10 text-right">60%</span>
                <button className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"><svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg></button>
              </div>
            </div>

            {/* Mục tiêu 2 */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between p-5 border-b border-gray-50 hover:bg-gray-50/50 transition-colors gap-4">
              <div className="flex items-center gap-4">
                <div className="bg-green-50 p-3 rounded-xl border border-green-100 text-green-500"><svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg></div>
                <div>
                  <h4 className="font-bold text-gray-900">Nộp báo cáo thực tập Kyanon</h4>
                  <p className="text-xs font-medium text-gray-500 mt-1">Hạn chót: 15/08/2026 • Đồ án</p>
                </div>
              </div>
              <div className="flex items-center gap-4 sm:w-1/3 justify-end pl-14 sm:pl-0">
                <div className="w-full bg-green-100 rounded-full h-2">
                  <div className="bg-green-500 h-2 rounded-full" style={{ width: '100%' }}></div>
                </div>
                <span className="text-sm font-bold text-green-600 w-10 text-right">100%</span>
                <button className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"><svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg></button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}