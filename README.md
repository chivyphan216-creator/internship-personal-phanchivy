# ỨNG DỤNG QUẢN LÝ MỤC TIÊU HỌC TẬP (PERSONAL LEARNING GOALS MANAGEMENT)

Ứng dụng web quản lý mục tiêu học tập cá nhân được xây dựng trong chương trình thực tập Full-stack. Hệ thống giúp người dùng tạo, theo dõi, cập nhật tiến độ và quản lý các mục tiêu học tập hằng ngày một cách trực quan và bảo mật.

---

## 1. Công nghệ sử dụng

* **Giao diện người dùng (Frontend):** Next.js (App Router), React, TypeScript, Tailwind CSS.
* **Phần phụ trợ (Backend):** Next.js Server Actions, Prisma ORM.
* **Cơ sở dữ liệu (Database):** SQLite (Local) / PostgreSQL & Neon PostgreSQL (Production).
* **Xác thực (Authentication):** `bcryptjs`, JWT Sessions, HTTP-only Cookies.
* **Triển khai (Deployment):** Vercel.

---

## 2. Chức năng chính

### 2.1. Xác thực & Tài khoản
* Đăng ký tài khoản, Đăng nhập, Đăng xuất bảo mật với mật khẩu mã hóa qua `bcrypt` và phiên làm việc lưu bằng JWT.

### 2.2. Quản lý Mục tiêu học tập (Goals CRUD)
* **Xem danh sách:** Hiển thị toàn bộ các mục tiêu học tập kèm theo thanh phần trăm tiến độ trực quan.
* **Thêm mục tiêu:** Tạo mới mục tiêu với Tên, Danh mục, Trạng thái và Hạn hoàn thành.
* **Cập nhật tiến độ:** Theo dõi và cập nhật phần trăm hoàn thành của từng mục tiêu.
* **Xóa mục tiêu:** Loại bỏ các mục tiêu không cần thiết khỏi hệ thống.

---

## 3. Giao diện người dùng & Trải nghiệm (UI/UX)
* Thiết kế Responsive tương thích mượt mà trên Desktop, Tablet và Mobile.
* Tích hợp Dashboard thống kê tổng quan (Tổng số mục tiêu, Đang thực hiện, Đã hoàn thành).
* Đầy đủ các trạng thái giao diện: **Loading state**, **Empty state** (khi chưa có dữ liệu).

---

## 4. Cấu trúc cơ sở dữ liệu (Database Schemas)
* **User:** Lưu thông tin tài khoản người dùng.
* **Goal:** Lưu thông tin chi tiết các mục tiêu học tập (Tiêu đề, danh mục, tiến độ, trạng thái, hạn hoàn thành) liên kết trực tiếp với người dùng (`userId`).

---

## 5. Hướng dẫn cài đặt và chạy dự án

### Bước 1: Cài đặt thư viện
```bash
git clone <repository-url>
cd <project-folder>
npm install
Bước 2: Cấu hình biến môi trường
Tạo file .env tại thư mục gốc với chuỗi kết nối cơ sở dữ liệu và khóa bí mật.

Bước 3: Chạy Prisma và khởi động ứng dụng
Bash
npx prisma generate
npx prisma migrate dev
npm run dev
Truy cập ứng dụng tại: http://localhost:3000

6. Triển khai sản xuất (Production Deployment)
Dự án được triển khai trên Vercel với cơ sở dữ liệu trên Neon PostgreSQL.

Đường dẫn Production chính thức: https://internship-personal-phanchivy.vercel.app/