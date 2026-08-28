# Thiết kế Cơ sở Dữ liệu (ERD) - Quản Lý Mục Tiêu Học Tập

## 1. Các thực thể và thuộc tính

### Sự ưu tiên (Priority)
* nhận dạng (id)
* tên (name)

### Danh mục (Category)
* nhận dạng (id)
* tên danh mục (name)

### Mục tiêu học tập (Goal / Task)
* nhận dạng (id)
* tiêu đề (title)
* sự miêu tả (description)
* trạng thái (status / isCompleted)
* tiến độ (progress)
* hạn hoàn thành (deadline)
* categoryId (Khóa ngoại liên kết danh mục)
* priorityId (Khóa ngoại liên kết mức độ ưu tiên)
* userId (Khóa ngoại liên kết người dùng)

### Lịch sử mục tiêu (GoalHistory)
* nhận dạng (id)
* goalId (Khóa ngoại liên kết mục tiêu)
* hoạt động (action / description)
* được tạo tại (createdAt)

## 2. Mối quan hệ giữa các bảng (Quan hệ)

* Danh mục 1 --- n Mục tiêu học tập
* Sự ưu tiên 1 --- n Mục tiêu học tập
* Mục tiêu học tập 1 --- n Lịch sử mục tiêu