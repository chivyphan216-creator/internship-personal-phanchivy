Markdown
# ỨNG DỤNG QUẢN LÝ CÔNG VIỆC CÁ NHÂN (PERSONAL TASK MANAGEMENT)

Ứng dụng web quản lý công việc cá nhân được xây dựng trong chương trình thực tập Web Full-stack. Hệ thống cho phép người dùng đăng ký, đăng nhập và quản lý các công việc cá nhân một cách bảo mật, phân quyền rõ ràng giữa Người dùng (User) và Quản trị viên (Admin).

---

## 1. Công nghệ sử dụng

* **Giao diện người dùng (Frontend):** Next.js (App Router), React, TypeScript, Tailwind CSS.
* **Phần phụ trợ (Backend):** Next.js Server Actions, Prisma ORM.
* **Cơ sở dữ liệu (Database):** PostgreSQL, Neon PostgreSQL.
* **Xác thực (Authentication):** `bcryptjs`, `Jose`, JWT Sessions, HTTP-only Cookies.
* **Triển khai (Deployment):** Vercel.

---

## 2. Chức năng chính

### 2.1. Xác thực & Phân quyền
* **Xác thực:** Đăng ký tài khoản, Đăng nhập, Đăng xuất, mã hóa mật khẩu bằng `bcrypt`, quản lý phiên làm việc bằng JWT qua HTTP-only Cookie.
* **Phân quyền (2 Vai trò):**
  * **USER:** Chỉ có thể xem, thêm, sửa, xóa công việc của chính mình. Không được phép chỉnh sửa/xóa công việc của người khác hay truy cập trang quản trị.
  * **ADMIN:** Có toàn quyền quản lý hệ thống, bao gồm xem toàn bộ công việc, quản lý công việc và xem danh sách người dùng, thống kê tài khoản.

### 2.2. Quản lý công việc (Task CRUD)
* Xem danh sách công việc cá nhân.
* Thêm, sửa, xóa công việc (có hộp thoại xác nhận trước khi xóa).
* Tìm kiếm công việc theo tiêu đề.
* Lọc công việc theo trạng thái (`TODO`, `IN_PROGRESS`, `COMPLETED`), theo danh mục (`Category`) và theo mức độ ưu tiên (`Priority`).
* Đặt và kiểm soát hạn hoàn thành (`deadline`) cho từng công việc.

---

## 3. Validation dữ liệu (Kiểm tra phía Server & Client)
* Tiêu đề không được để trống và phải có tối thiểu 3 ký tự.
* Email đăng ký không được trùng lặp.
* Mật khẩu tối thiểu 6 ký tự.
* Không thể chọn hạn hoàn thành là ngày đã qua.
* Kiểm tra chặt chẽ quyền sở hữu khi thực hiện sửa/xóa công việc ở phía máy chủ.

---

## 4. Giao diện người dùng & Trải nghiệm (UI/UX)
* Thiết kế Responsive tương thích mượt mà trên Desktop, Tablet và Mobile.
* Tích hợp Dashboard thống kê tổng quan công việc.
* Đầy đủ các trạng thái giao diện: **Loading state** (Khung xương Skeleton), **Empty state** (Trạng thái trống), **Error state** (Trạng thái lỗi).
* Hệ thống thông báo toast/alert trực quan khi thêm, sửa, xóa thành công.

---

## 5. Cấu trúc cơ sở dữ liệu (Database Schemas)
Hệ thống sử dụng PostgreSQL với các bảng chính:
* **User:** Lưu thông tin tài khoản và vai trò phân quyền (`USER` / `ADMIN`).
* **Category:** Lưu danh mục công việc.
* **Priority:** Lưu mức độ ưu tiên.
* **Task:** Lưu thông tin công việc chi tiết.
* **TaskHistory:** Lưu lịch sử thao tác liên quan đến công việc.

**Mối quan hệ:**
* `User` (1) ──< `Task` (N)
* `Category` (1) ──< `Task` (N)
* `Priority` (1) ──< `Task` (N)
* `Task` (1) ──< `TaskHistory` (N)

---

## 6. Cấu trúc thư mục dự án

```text
project/
│
├── app/
│   ├── admin/
│   │   └── users/
│   │
│   ├── auth/
│   │   ├── login/
│   │   ├── register/
│   │   └── actions.ts
│   │
│   ├── tasks/
│   │   ├── create/
│   │   ├── [id]/
│   │   │   └── edit/
│   │   └── actions.ts
│   │
│   ├── error.tsx
│   ├── loading.tsx
│   ├── layout.tsx
│   └── page.tsx
│
├── components/
│   └── DeleteTaskButton.tsx
│
├── lib/
│   ├── prisma.ts
│   └── session.ts
│
├── prisma/
│   ├── migrations/
│   ├── schema.prisma
│   └── seed.ts
│
├── public/
│
├── test-cases.md
├── README.md
├── package.json
└── .env
7. Hướng dẫn cài đặt và chạy dự án
Bước 1: Sao chép mã nguồn và cài đặt thư viện
Bash
git clone <repository-url>
cd <project-folder>
npm install
Bước 2: Cấu hình biến môi trường
Tạo file .env tại thư mục gốc với nội dung:

Code snippet
DATABASE_URL="your-postgresql-connection-string"
SESSION_SECRET="your-secret-key"
Bước 3: Cấu hình Prisma và chạy cơ sở dữ liệu
Bash
npx prisma generate
npx prisma migrate dev
# (Tùy chọn nếu có seed data)
npx prisma db seed
Bước 4: Chạy môi trường phát triển (Development)
Bash
npm run dev
Truy cập ứng dụng tại: http://localhost:3000

8. Triển khai sản xuất (Production Deployment)
Dự án được cấu hình triển khai trên Vercel với cơ sở dữ liệu PostgreSQL trên Neon.

Cần khai báo đầy đủ biến môi trường DATABASE_URL và SESSION_SECRET trên hệ thống cấu hình của Vercel.

Bash
npm run build
npm start