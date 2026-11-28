# BÀI 2 GĐ2 – ỨNG DỤNG NODE.JS ĐẦU TIÊN

## 1. Giới thiệu
Xây dựng ứng dụng HTTP Server bằng Node.js thuần, sử dụng module `http` có sẵn. Server hoạt động tại cổng 3000 và hiển thị thông tin sinh viên khi người dùng truy cập trang chủ.

## 2. Thông tin sinh viên

- **Họ và tên:** Võ Tiến Đạt
- **Mã sinh viên:** CDCNTT18B09
- **Lớp:** CĐ-CNTT18B

## 3. Công nghệ sử dụng

- Node.js
- Module `http` có sẵn trong Node.js.
- HTML và CSS để xây dựng giao diện trang web.

## 4. Hướng dẫn chạy chương trình

**Bước 1: Kiểm tra Node.js**

Mở Terminal hoặc PowerShell và nhập lệnh:

```bash
node -v
```

Nếu hiển thị phiên bản Node.js nghĩa là môi trường đã được cài đặt.

**Bước 2: Mở thư mục bài tập**

Mở Terminal tại thư mục chứa file `server.js`.

**Bước 3: Khởi động HTTP Server**

Nhập lệnh:

```bash
node server.js
```

Nếu chương trình hoạt động thành công, Terminal sẽ hiển thị:

```text
Server dang chay tai http://localhost:3000
```

**Bước 4: Truy cập trang web**

Mở trình duyệt và nhập địa chỉ:

```text
http://localhost:3000
```

Trang web sẽ hiển thị họ tên, mã sinh viên và lớp của sinh viên.

**Bước 5: Dừng Server**

Quay lại cửa sổ Terminal đang chạy chương trình và nhấn `Ctrl + C` để dừng Server.

## 5. Kết quả

Ứng dụng khởi động thành công tại cổng 3000. Khi truy cập trang chủ, Server trả về nội dung HTML hiển thị thông tin sinh viên theo yêu cầu bài tập.

## 6. Mã nguồn

File chương trình chính: `server.js`
