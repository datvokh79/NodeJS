# BÀI 2 – HTTP SERVER ĐẦU TIÊN

**Sinh viên:** Võ Tiến Đạt  
**Lớp:** CĐ-CNTT18B

### 1. Nội dung thực hiện

Trong bài thực hành này, em sử dụng Node.js để xây dựng một HTTP Server đơn giản bằng module `http` có sẵn, không sử dụng framework bên ngoài.

### 2. Quá trình thực hiện

Em tạo tập tin `server.js`, sử dụng hàm `http.createServer()` để khởi tạo máy chủ và thiết lập cổng kết nối là 3000.

Khi trình duyệt gửi yêu cầu đến địa chỉ `http://localhost:3000`, máy chủ tiếp nhận yêu cầu và trả về một trang HTML có hiển thị họ tên Võ Tiến Đạt, lớp CĐ-CNTT18B và thông tin bài thực hành.

### 3. Kết quả

Chương trình khởi chạy thành công. Khi truy cập địa chỉ localhost:3000 trên trình duyệt, trang HTML được hiển thị đầy đủ thông tin theo yêu cầu.

### 4. Nhận xét

Qua bài thực hành, em hiểu được cách tạo HTTP Server bằng Node.js, cách sử dụng cổng kết nối và cơ chế trao đổi yêu cầu – phản hồi giữa trình duyệt và máy chủ.

**Mã nguồn:** https://github.com/datvokh79/NodeJS
