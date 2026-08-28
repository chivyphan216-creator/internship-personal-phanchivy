# BẢN THIẾT KẾ KHUNG (WIREFRAME) - QUẢN LÝ MỤC TIÊU HỌC TẬP

## 1. Trang danh sách / Bảng điều khiển (Dashboard & Goals List)

| QUẢN LÝ MỤC TIÊU HỌC TẬP [ + Thêm mục tiêu mới ] |
|--------------------------------------------------|
| [Tìm kiếm tiêu đề...] [Trạng thái ▼] [Lọc]        |

| Mục tiêu 1 | Mô tả: Hoàn thành chứng chỉ | Danh mục: Lập trình | Tiến độ: 80% | Trạng thái: Đang thực hiện | Hạn: 30/09/2026 | [Sửa] [Xóa] |
| Mục tiêu 2 | Mô tả: Đọc 5 sách IT | Danh mục: Kỹ năng | Tiến độ: 100% | Trạng thái: Hoàn thành | Hạn: 25/08/2026 | [Sửa] [Xóa] |


## 2. Trang thêm / sửa mục tiêu (Form Modal / Page)

| FORM THÊM / CẬP NHẬT MỤC TIÊU HỌC TẬP |
|--------------------------------------|
| Tên mục tiêu: [ Nhập tên mục tiêu... ] |
| Mô tả chi tiết: [ Nhập mô tả... ] |
| Danh mục: [ Học tập ▼ ] |
| Mức độ ưu tiên: [ Cao / Trung bình / Thấp ▼ ] |
| Tiến độ (%): [ 0 - 100 ] |
| Trạng thái: [ Chưa làm / Đang làm / Hoàn thành ▼ ] |
| Hạn hoàn thành: [ DD/MM/YYYY ] |
| [ Hủy ] [ Lưu mục tiêu ] |


## 3. Các trạng thái giao diện đặc biệt (States)

- **Loading State:** Hiển thị khung xương (Skeleton loader) hoặc vòng quay xoay khi đang tải dữ liệu từ API.
- **Empty State:** 
  > Không tìm thấy mục tiêu học tập nào phù hợp.
- **Error State:** 
  > Không thể kết nối cơ sở dữ liệu. Vui lòng kiểm tra lại đường truyền!