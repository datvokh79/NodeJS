# BÀI 3 – MODULE, FILE SYSTEM VÀ CƠ SỞ DỮ LIỆU

## Bài thực hành 01: Quản lý và lọc danh sách sinh viên

### 1. Thông tin thực hiện

- **Họ và tên:** Võ Tiến Đạt
- **Lớp:** CĐ-CNTT18B
- **Mã sinh viên:** CDCNTT18B09
- **Ngôn ngữ:** JavaScript
- **Môi trường chạy:** Node.js

### 2. Mục đích bài thực hành

Bài thực hành giúp làm quen với cách khai báo class, sử dụng constructor để khởi tạo đối tượng và vận dụng arrow function để xử lý dữ liệu trong JavaScript.

Chương trình xây dựng một danh sách gồm 5 sinh viên. Mỗi sinh viên có mã sinh viên, họ tên, tuổi và điểm số. Sau đó, chương trình kiểm tra điểm của từng người và chỉ hiển thị những sinh viên đạt từ 5 điểm trở lên.

### 3. Các bước thực hiện

**Bước 1: Tạo thư mục bài tập**

Tạo thư mục `Bai03` trong repository NodeJS. Bên trong tạo hai file:

- `bt1.js`: Chứa mã nguồn chương trình.
- `README.md`: Mô tả bài thực hành và hướng dẫn chạy.

**Bước 2: Xây dựng class SinhVien**

Sử dụng từ khóa `class` để tạo lớp SinhVien. Trong `constructor`, khai báo bốn thuộc tính gồm mã sinh viên, họ tên, tuổi và điểm.

**Bước 3: Khởi tạo danh sách sinh viên**

Tạo mảng `danhSachSinhVien` gồm 5 đối tượng được khởi tạo từ class SinhVien bằng từ khóa `new`.

**Bước 4: Lọc sinh viên đạt yêu cầu**

Sử dụng phương thức `filter()` kết hợp với arrow function để kiểm tra điều kiện `sinhVien.diem >= 5`. Những sinh viên có điểm nhỏ hơn 5 sẽ không xuất hiện trong danh sách kết quả.

**Bước 5: Hiển thị kết quả**

Sử dụng `console.log()` kết hợp với `forEach()` để lần lượt in thông tin từng sinh viên đạt yêu cầu ra Terminal.

### 4. Các lệnh thực hiện

Mở Terminal tại thư mục `Bai03`, sau đó chạy:

```bash
node bt1.js
```

Nếu chương trình chạy đúng, Terminal sẽ hiển thị danh sách sinh viên đạt yêu cầu cùng với tổng số sinh viên ban đầu và số sinh viên đạt.

### 5. Kết quả thực hiện

Danh sách ban đầu có 5 sinh viên. Sau khi lọc theo điều kiện điểm từ 5 trở lên, chương trình hiển thị 3 sinh viên đạt yêu cầu.

Hai sinh viên có điểm dưới 5 không được đưa vào danh sách kết quả.

### 6. Hình ảnh minh chứng

Các ảnh chụp màn hình được lưu trong thư mục `MinhChung`:

1. Mã nguồn file bt1.js.
2. `lenh-chay.png`: Terminal thực hiện lệnh `node bt1.js`.
3. `ket-qua.png`: Kết quả danh sách sinh viên đạt yêu cầu.

### 7. Kết luận

Qua bài thực hành, em đã biết cách tạo class và constructor để quản lý thông tin sinh viên dưới dạng đối tượng. Đồng thời, em đã sử dụng arrow function kết hợp với phương thức filter() để lọc dữ liệu theo điều kiện điểm số.
