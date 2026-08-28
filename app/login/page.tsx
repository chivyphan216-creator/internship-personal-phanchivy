export default function LoginPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 p-4 font-sans">
      <div className="bg-white rounded-[2rem] shadow-sm border border-gray-100 p-8 w-full max-w-md">
        
        {/* Logo Mục tiêu (Target) */}
        <div className="flex justify-center mb-6">
          <div className="bg-blue-600 rounded-2xl p-4 shadow-lg shadow-blue-200">
            <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <circle cx="12" cy="12" r="10" strokeWidth="2"/>
              <circle cx="12" cy="12" r="6" strokeWidth="2"/>
              <circle cx="12" cy="12" r="2" fill="currentColor"/>
            </svg>
          </div>
        </div>

        {/* Tiêu đề */}
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Đăng Nhập Tài Khoản</h1>
          <p className="text-sm text-gray-500">Hệ thống Quản Lý Mục Tiêu Học Tập - Kyanon Internship</p>
        </div>

        {/* Form điền thông tin */}
        <form className="space-y-5">
          {/* Ô nhập Email */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <input 
                type="email" 
                className="block w-full pl-11 pr-4 py-3 border border-gray-200 rounded-xl text-sm focus:ring-blue-500 focus:border-blue-500 outline-none transition-all" 
                placeholder="chivy@example.com"
              />
            </div>
          </div>

          {/* Ô nhập Mật khẩu */}
          <div>
            <div className="flex justify-between items-center mb-1">
              <label className="block text-sm font-medium text-gray-700">Mật khẩu</label>
              <a href="#" className="text-xs text-blue-600 hover:underline font-medium">Quên mật khẩu?</a>
            </div>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
              </div>
              <input 
                type="password" 
                className="block w-full pl-11 pr-4 py-3 border border-gray-200 rounded-xl text-sm focus:ring-blue-500 focus:border-blue-500 outline-none transition-all" 
                placeholder="••••••••"
              />
            </div>
          </div>

          {/* Nút Đăng Nhập */}
          <button 
            type="button" 
            className="w-full flex justify-center items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-4 rounded-xl transition-colors mt-2 shadow-md shadow-blue-200"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
            </svg>
            Đăng Nhập
          </button>
        </form>

        {/* Chân trang */}
        <div className="mt-8 text-center text-sm text-gray-500">
          Chưa có tài khoản? <a href="/register" className="text-blue-600 font-semibold hover:underline">Đăng ký ngay</a>
        </div>

      </div>
    </div>
  );
}