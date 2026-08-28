# Yêu Cầu Dự Án: Quản Lý Mục Tiêu Học Tập

## 1. Giới thiệu tổng quan
Ứng dụng web giúp người dùng cá nhân quản lý, theo dõi và cập nhật tiến độ các mục tiêu học tập hàng ngày. Dự án hướng tới sự tối giản, tập trung vào trải nghiệm người dùng nhanh chóng và trực quan.

## 2. Đối tượng sử dụng
- Cá nhân người dùng (Sinh viên, người đi làm muốn quản lý tiến độ học tập).

## 3. Phạm vi chức năng (MVP)
### 3.1. Chức năng cốt lõi (CRUD)
- **Thêm mục tiêu mới:** Người dùng có thể tạo mục tiêu với Tên mục tiêu và Hạn chót.
- **Xem danh sách:** Hiển thị toàn bộ các mục tiêu đang thực hiện, bao gồm thanh phần trăm tiến độ trực quan.
- **Cập nhật tiến độ:** Nút bấm cho phép tăng tiến độ hoàn thành (mỗi lần tăng 10%, tối đa 100%).
- **Xóa mục tiêu:** Loại bỏ các mục tiêu bị hủy hoặc nhập sai khỏi danh sách.

### 3.2. Yêu cầu giao diện & Trải nghiệm (UI/UX)
- Giao diện phản hồi nhanh (Responsive) hoạt động tốt trên cả máy tính và điện thoại.
- Có thông báo lỗi (Validation) khi người dùng bỏ trống trường dữ liệu nhập.
- Hiển thị trạng thái trống (Empty state) khi chưa có mục tiêu nào trong danh sách.

## 4. Yêu cầu kỹ thuật
- **Frontend:** Next.js App Router, React, Tailwind CSS.
- **Backend:** Xử lý logic qua Server Actions/Route Handlers của Next.js (sẽ cập nhật).
- **Database:** PostgreSQL kết nối qua Prisma ORM (sẽ cập nhật).
- **Triển khai:** Vercel.