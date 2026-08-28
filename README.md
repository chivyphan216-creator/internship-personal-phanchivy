# 🚀 Personal Goal Tracker (Ứng dụng Quản lý Mục tiêu Cá nhân)

Ứng dụng Web Full-stack hiện đại được phát triển bằng **Next.js (App Router)**, **Prisma ORM**, và **Tailwind CSS**. Dự án giúp người dùng dễ dàng thiết lập, theo dõi tiến độ học tập và quản lý các mục tiêu cá nhân một cách trực quan, khoa học.

---

## 🛠️ Công nghệ sử dụng

* **Frontend:** Next.js (App Router, Server & Client Components), React, Tailwind CSS.
* **Backend:** Next.js Route Handlers (API Endpoints tại `/api/goals`).
* **Database & ORM:** SQLite kết hợp với **Prisma ORM** để thao tác dữ liệu an toàn.
* **Xác thực & Phiên làm việc:** Quản lý trạng thái người dùng thông qua `localStorage` và chuyển hướng linh hoạt bằng `useRouter`.
* **Quản lý mã nguồn & Triển khai:** Git, GitHub, Vercel.

---

## ✨ Các tính năng nổi bật

1. **Hệ thống Xác thực Người dùng (Authentication):**
   * Trang Đăng ký (`/register`) và Đăng nhập (`/login`) giao diện trực quan.
   * Lưu trữ thông tin định danh phiên làm việc qua `localStorage`.
   * Giao diện quản lý tích hợp sẵn khung thông tin cá nhân (`UserProfile`) và nút Đăng xuất an toàn.

2. **Quản lý Mục tiêu Toàn diện (CRUD):**
   * **Create (Thêm mới):** Thêm tiêu đề mục tiêu, phần trăm tiến độ hoàn thành (`0% - 100%`) và phân loại trạng thái.
   * **Read (Hiển thị):** Tải và hiển thị danh sách mục tiêu trực tiếp từ Database với thanh tiến độ (Progress Bar) sinh động cùng ngày tạo tự động.
   * **Update (Chỉnh sửa):** Cho phép sửa nhanh tên, cập nhật % tiến độ hoặc thay đổi trạng thái ngay trên từng dòng mục tiêu mà không cần chuyển trang.
   * **Delete (Xóa):** Xóa mục tiêu không cần thiết kèm hộp thoại xác nhận (`confirm`) tránh thao tác nhầm.

3. **Bộ lọc Trạng thái Thông minh (Filtering):**
   * Hệ thống tab lọc nhanh theo thời gian thực: *Tất cả*, *Đang thực hiện*, *Hoàn thành*, và *Tạm hoãn*.

---

## 📂 Cấu trúc Thư mục Dự án

```text
internship-personal-phanchivys/
├── app/
│   ├── api/
│   │   └── goals/
│   │       └── route.ts        # API Backend xử lý GET, POST, PUT, DELETE
│   ├── goals/
│   │   └── page.tsx            # Giao diện chính quản lý mục tiêu & bộ lọc
│   ├── login/
│   │   └── page.tsx            # Giao diện đăng nhập
│   ├── register/
│   │   └── page.tsx            # Giao diện đăng ký
│   ├── globals.css             # Cấu hình Tailwind CSS
│   ├── layout.tsx              # Khung layout chung của ứng dụng
│   └── page.tsx                # Trang chủ điều hướng
├── prisma/
│   ├── migrations/             # Lịch sử migration cơ sở dữ liệu
│   ├── dev.db                  # File database SQLite tại local
│   └── schema.prisma           # Định nghĩa mô hình dữ liệu (Schema)
├── public/                     # Thư mục chứa tài nguyên tĩnh (icons, images)
├── .env                        # Cấu hình biến môi trường (DATABASE_URL)
├── package.json                # Danh sách thư viện và dependencies
└── README.md                   # Tài liệu mô tả dự án