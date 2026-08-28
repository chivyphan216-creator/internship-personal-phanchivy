# Yêu Cầu Dự Án: Quản Lý Mục Tiêu Học Tập

## 1. Giới thiệu tổng quan
Ứng dụng web giúp người dùng cá nhân quản lý, theo dõi và cập nhật tiến độ các mục tiêu học tập hàng ngày. Dự án hướng tới sự tối giản, tập trung vào trải nghiệm người dùng nhanh chóng và trực quan.

## 2. Đối tượng sử dụng
* Cá nhân người dùng (Sinh viên, người đi làm muốn quản lý tiến độ học tập và phát triển bản thân).

## 3. Phạm vi chức năng (MVP)

### 3.1. Chức năng cốt lõi (CRUD)
* **Thêm mục tiêu mới:** Người dùng có thể tạo mục tiêu với Tên mục tiêu, Danh mục, Trạng thái và Hạn chót.
* **Xem danh sách:** Hiển thị toàn bộ các mục tiêu đang thực hiện, bao gồm thanh phần trăm tiến độ trực quan.
* **Cập nhật tiến độ:** Cho phép theo dõi và cập nhật trạng thái, phần trăm hoàn thành của từng mục tiêu.
* **Xóa mục tiêu:** Loại bỏ các mục tiêu bị hủy hoặc nhập sai khỏi danh sách.

### 3.2. Xác thực người dùng (Authentication)
* Hỗ trợ giao diện Đăng nhập (`/login`) và Đăng ký (`/register`) giúp bảo mật thông tin cá nhân của người dùng.

## 4. Công nghệ sử dụng
* **Frontend / Backend:** Next.js (App Router), TypeScript, Tailwind CSS.
* **Database & ORM:** SQLite (phát triển local) / PostgreSQL (Neon trên môi trường Production), Prisma ORM.
* **Version Control:** Git / GitHub.
* **Deployment:** Vercel (Cloud Hosting).

## 5. Trạng thái giao diện & Responsive
* **Giao diện:** Thiết kế hiện đại, hỗ trợ trực quan, hiển thị rõ ràng khi danh sách trống (Empty state).
* **Responsive:** Tương thích mượt mà trên các thiết bị Desktop, Tablet và Mobile, bố cục không bị tràn màn hình.