# BÀI 4 – THÊM VÀ HIỂN THỊ DỮ LIỆU MONGODB

## Bài thực hành: Quản lý danh sách sinh viên

### 1. Thông tin sinh viên

- **Họ và tên:** Võ Tiến Đạt
- **Mã sinh viên:** CDCNTT18B09
- **Lớp:** CĐ-CNTT18B

### 2. Mục tiêu bài thực hành

Tìm hiểu cách sử dụng MongoDB trong ứng dụng Node.js để lưu trữ và truy xuất thông tin sinh viên.

Chương trình kết nối đến MongoDB đang chạy trên máy tính, sử dụng database `qlsinhvien` và collection `students`. Sau đó thêm danh sách sinh viên, đọc dữ liệu đã lưu và hiển thị kết quả trên Terminal.

### 3. Công nghệ sử dụng

- Node.js
- MongoDB Server
- MongoDB Node.js Driver
- MongoDB Compass để kiểm tra dữ liệu

### 4. Các bước thực hiện

**Bước 1: Cài đặt thư viện**

Mở Terminal tại thư mục `Bai03` và thực hiện:

```powershell
npm.cmd install mongodb
```

**Bước 2: Kết nối MongoDB**

Sử dụng `MongoClient` với địa chỉ kết nối:

```text
mongodb://127.0.0.1:27017
```

**Bước 3: Chọn database và collection**

Truy cập database `qlsinhvien` và collection `students`.

**Bước 4: Thêm dữ liệu**

Khai báo danh sách gồm 3 sinh viên. Mỗi sinh viên có các thông tin:

- `masv`: Mã sinh viên.
- `hoten`: Họ tên.
- `tuoi`: Tuổi.
- `diem`: Điểm số.

Sử dụng phương thức `insertMany()` để thêm toàn bộ danh sách vào MongoDB.

**Bước 5: Hiển thị dữ liệu**

Sử dụng `find({}).toArray()` để truy vấn danh sách sinh viên đã lưu. Sau đó dùng `forEach()` và `console.log()` để hiển thị từng bản ghi trong Terminal.

**Bước 6: Đóng kết nối**

Sử dụng `client.close()` trong khối `finally` để đóng kết nối sau khi chương trình hoàn thành.

### 5. Lệnh chạy chương trình

Mở PowerShell tại thư mục `Bai03` và nhập:

```powershell
node bai04.js
```

Nếu kết nối thành công, Terminal sẽ hiển thị số lượng sinh viên vừa thêm và danh sách sinh viên được truy vấn từ MongoDB.

### 6. Kết quả thực hiện

Chương trình đã thực hiện các thao tác:

- Kết nối đến MongoDB trên máy tính.
- Sử dụng database `qlsinhvien`.
- Sử dụng collection `students`.
- Thêm 3 sinh viên bằng `insertMany()`.
- Truy vấn dữ liệu bằng `find()`.
- Hiển thị danh sách sinh viên trên Terminal.
- Đóng kết nối sau khi hoàn thành.

### 7. Hình ảnh minh chứng

Ảnh minh chứng được lưu trong thư mục `MinhChung`:

1. `01-ma-nguon.png`: Mã nguồn file `bai04.js`.
2. `02-install-mongodb.png`: Terminal hiển thị kết nối thành công và thêm dữ liệu.
3. `03-terminal.png`: Terminal hiển thị danh sách sinh viên sau khi truy vấn.
4. `04-mongodb-compass.png`: Database `qlsinhvien`, collection `students` và các bản ghi trong MongoDB Compass.

### 8. Kết luận

Qua bài thực hành, em đã biết cách kết nối ứng dụng Node.js với MongoDB, tạo và truy cập database, thêm nhiều bản ghi bằng `insertMany()` và truy vấn dữ liệu bằng `find()`.

