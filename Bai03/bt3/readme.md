
# BÀI 3 – MODULE, FILE SYSTEM VÀ CƠ SỞ DỮ LIỆU

## Bài thực hành 03: Thao tác với tập tin bằng module fs

### 1. Thông tin sinh viên

- **Họ và tên:** Võ Tiến Đạt
- **Mã sinh viên:** CDCNTT18B09
- **Lớp:** CĐ-CNTT18B

### 2. Mục tiêu thực hành

Tìm hiểu và sử dụng module `fs` trong Node.js để thực hiện các thao tác cơ bản với tập tin văn bản.

Chương trình sử dụng thông tin cá nhân của sinh viên để tạo file `thongtin.txt`, đọc dữ liệu, ghi nối thêm tên lớp và kiểm tra lại nội dung sau khi cập nhật.

### 3. Các bước thực hiện

**Bước 1: Khởi tạo chương trình**

Tạo file `bt03.js`, khai báo module `fs` để thao tác với tập tin và module `path` để xác định đường dẫn lưu trữ.

**Bước 2: Tạo tập tin thông tin**

Sử dụng `fs.writeFileSync()` để tạo file `thongtin.txt`, đồng thời ghi họ tên và mã sinh viên vào file.

**Bước 3: Đọc nội dung ban đầu**

Sử dụng `fs.readFileSync()` để đọc nội dung tập tin và hiển thị lên Terminal bằng `console.log()`.

**Bước 4: Ghi nối thêm thông tin lớp**

Sử dụng `fs.appendFile()` để bổ sung tên lớp `CĐ-CNTT18B` vào cuối tập tin mà không ghi đè nội dung cũ.

**Bước 5: Kiểm tra sau cập nhật**

Sau khi ghi nối thành công, chương trình đọc lại tập tin và hiển thị toàn bộ nội dung mới lên Terminal.

### 4. Lệnh chạy chương trình

Mở PowerShell tại thư mục `Bai03` và thực hiện:

```powershell
node bt03.js
```

Chương trình sẽ tự động tạo file `thongtin.txt` và thực hiện các thao tác đọc, ghi theo thứ tự.

### 5. Kết quả thực hiện

Sau khi chạy thành công, tập tin `thongtin.txt` có nội dung:

```text
Ho va ten: Vo Tien Dat
Ma sinh vien: CDCNTT18B09
Lop: CD-CNTT18B
```

Terminal hiển thị nội dung trước và sau khi cập nhật, qua đó kiểm tra được thao tác ghi nối thêm dữ liệu đã thực hiện đúng.

### 6. Hình ảnh minh chứng

Các ảnh chụp màn hình được lưu trong thư mục `MinhChung`:

1. `01-ma-nguon.png`: Mã nguồn chương trình `bai03.js`.
2. `02-terminal.png`: Nội dung file trước khi ghi nối thêm tên lớp.
3. `03-thong-tin.png`: Kết quả Terminal và nội dung file sau khi cập nhật.

### 7. Kết luận

Qua bài thực hành, em đã làm quen với module `fs` trong Node.js và biết cách tạo, đọc cũng như ghi nối thêm dữ liệu vào tập tin văn bản.
