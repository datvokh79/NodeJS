# BÀI 3 – MODULE, FILE SYSTEM VÀ CƠ SỞ DỮ LIỆU

## Bài thực hành 02: Xây dựng Web Server bằng Node.js

### 1. Thông tin sinh viên

- **Họ và tên:** Võ Tiến Đạt
- **Mã sinh viên:** CDCNTT18B09
- **Lớp:** CĐ-CNTT18B

### 2. Mục tiêu bài thực hành

Xây dựng một Web Server đơn giản bằng module `http` có sẵn trong Node.js. Chương trình xử lý các yêu cầu truy cập theo từng đường dẫn và trả về nội dung HTML tương ứng.

Các chức năng chính:

- Trang chủ hiển thị lời chào và thông tin mã sinh viên.
- Trang `/about` hiển thị nội dung giới thiệu bản thân.
- Các đường dẫn không được hỗ trợ sẽ trả về mã trạng thái HTTP 404.

### 3. Các bước thực hiện

**Bước 1: Tạo tập tin**

Tạo tập tin `Bai02.js` bên trong `Bai03` để viết chương trình.

**Bước 2: Khai báo thông tin sinh viên**

Sử dụng một đối tượng JavaScript để lưu họ tên, mã sinh viên và lớp. Các thông tin này được sử dụng ở cả trang chủ và trang giới thiệu.

**Bước 3: Xây dựng nội dung HTML**

Tạo các hàm riêng để trả về giao diện trang chủ và trang giới thiệu. Việc tách nội dung thành từng hàm giúp chương trình dễ theo dõi và chỉnh sửa.

**Bước 4: Xử lý đường dẫn**

Sử dụng `http.createServer()` để tạo máy chủ và kiểm tra đường dẫn người dùng truy cập:

- `/`: Hiển thị trang chủ.
- `/about`: Hiển thị trang giới thiệu.
- Đường dẫn khác: Trả về lỗi 404.

**Bước 5: Khởi động Server**

Sử dụng `server.listen()` để chạy máy chủ tại cổng 3000.

### 4. Các lệnh thực hiện

Mở PowerShell tại thư mục chứa file `Bai02.js` và chạy:

```powershell
node Bai02.js
```

Sau khi Server khởi động, truy cập các địa chỉ sau bằng trình duyệt:

| Địa chỉ | Chức năng |
|---|---|
| http://localhost:3000 | Trang chủ |
| http://localhost:3000/about | Trang giới thiệu |
| http://localhost:3000/contact | Kiểm tra lỗi 404 |

### 5. Kết quả thực hiện

Sau khi chạy chương trình, Web Server hoạt động tại cổng 3000.

Khi truy cập trang chủ, trình duyệt hiển thị lời chào và mã sinh viên. Khi truy cập trang `/about`, nội dung giới thiệu cá nhân được hiển thị. Nếu nhập một đường dẫn không tồn tại, chương trình trả về mã trạng thái HTTP 404.

### 6. Hình ảnh minh chứng

Các hình ảnh được lưu trong thư mục `MinhChung`:

1. `01-ma-nguon.png`: Mã nguồn chương trình `bai02.js`.
2. `02-server-terminal.png`: Terminal hiển thị thông báo Server đang chạy.
3. `03-trang-chu.png`: Giao diện trang chủ tại `localhost:3000`.
4. `04-trang-about.png`: Giao diện giới thiệu tại `localhost:3000/about`.

### 7. Kết luận

Qua bài thực hành, em đã biết cách sử dụng module HTTP trong Node.js để tạo Web Server, xử lý yêu cầu GET theo từng đường dẫn và trả về các mã trạng thái HTTP phù hợp.
