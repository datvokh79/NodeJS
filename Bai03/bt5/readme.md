# BÀI 05 – TÌM KIẾM, CẬP NHẬT VÀ SẮP XẾP MONGODB

**Sinh viên:** Võ Tiến Đạt  
**Lớp:** CĐ-CNTT18B  
**Mã sinh viên:** CDCNTT18B09

## 1. Mục tiêu bài thực hành

Thực hành thao tác tìm kiếm, sắp xếp và cập nhật dữ liệu trong MongoDB bằng Node.js.

Các yêu cầu:
- Tìm sinh viên có điểm lớn hơn hoặc bằng 7 bằng `find()` và `$gte`.
- Sắp xếp danh sách theo điểm giảm dần bằng `sort()`.
- Cập nhật điểm sinh viên theo mã sinh viên bằng `updateOne()` và `$set`.
- Truy vấn lại thông tin để kiểm tra dữ liệu sau cập nhật.

## 2. Công nghệ sử dụng

- Node.js
- MongoDB Server
- MongoDB Node.js Driver
- MongoDB Compass
- Visual Studio Code

## 3. Cách thực hiện

**Bước 1: Di chuyển đến thư mục bài tập**

```powershell
cd D:\MyNodeJS\Bai03\Bt05
```

**Bước 2: Kiểm tra MongoDB**

Đảm bảo dịch vụ MongoDB đang hoạt động và database `qlsinhvien` đã có collection `students` từ Bài 4.

**Bước 3: Chạy chương trình**

```powershell
node bai05.js
```

## 4. Kết quả đạt được

- Kết nối thành công đến MongoDB.
- Lọc được danh sách sinh viên có điểm từ 7 trở lên.
- Danh sách được sắp xếp theo điểm từ cao xuống thấp.
- Cập nhật điểm sinh viên có mã `CDCNTT18B09` thành `9.2`.
- Hiển thị lại thông tin để xác nhận điểm đã được cập nhật.

## 5. Hình ảnh minh chứng

Các ảnh chụp màn hình được lưu trong thư mục `MinhChung`:

1. Mã nguồn chương trình `bai05.js`.
2. Quá trình chạy chương trình trên PowerShell.
3. Kết quả cập nhật điểm và hiển thị lại thông tin sinh viên.

## 7. Kết luận

Qua bài thực hành, em đã làm quen với các thao tác truy vấn, sắp xếp và cập nhật dữ liệu trong MongoDB bằng Node.js. Chương trình thực hiện đúng các yêu cầu và kiểm tra lại dữ liệu sau khi cập nhật.
