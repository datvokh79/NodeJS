# Bài 9 -- Xóa dữ liệu có điều kiện trong MongoDB

**Sinh viên:** Võ Tiến Đạt\
**Lớp:** CĐ-CNTT18B\
**Mã sinh viên:** CDCNTT18B09\
**Tên chương trình:** CAMPUS LEDGER -- Hệ thống quản lý hồ sơ sinh viên

------------------------------------------------------------------------

## 1. Giới thiệu

Bài thực hành xây dựng chương trình Node.js kết nối MongoDB để thực hiện
các thao tác xóa dữ liệu có điều kiện. Chương trình sử dụng database
`qlsinhvien` và collection riêng `students_test`, tránh tác động đến
collection `students`.

Chương trình mô phỏng một công cụ quản lý hồ sơ sinh viên. Kết quả được
trình bày trên Terminal bằng các tiêu đề, bảng dữ liệu và phần thống kê.

## 2. Mục tiêu và yêu cầu

-   Kết nối MongoDB đang chạy trên máy.
-   Sử dụng database `qlsinhvien`, collection `students_test`.
-   Thêm tối thiểu 5 sinh viên mẫu.
-   Dùng `deleteOne()` xóa một sinh viên theo mã.
-   Dùng `deleteMany()` xóa tất cả sinh viên có điểm dưới 5.
-   Hiển thị số bản ghi đã xóa và danh sách còn lại bằng `find()`.
-   Chạy chương trình bằng `node bai09.js`.

## 3. Công nghệ sử dụng

  Công nghệ                Vai trò
  ------------------------ ---------------------------------
  Node.js                  Môi trường chạy JavaScript
  MongoDB                  Hệ quản trị cơ sở dữ liệu NoSQL
  MongoDB Node.js Driver   Kết nối và thao tác với MongoDB
  PowerShell               Chạy chương trình
  MongoDB Compass          Quan sát database và collection

## 4. Cấu trúc thư mục

``` text
NodeJS/
└── Bai03/
    └── Bt09/
        ├── bai09.js
        ├── README.md
        └── screenshots/
            ├── 01-chuan-bi-du-lieu.png
            ├── 02-danh-sach-ban-dau.png
            ├── 03-ket-qua-delete-one.png
            ├── 04-ket-qua-delete-many.png
            └── 05-danh-sach-con-lai.png
```

Thư mục `screenshots` dùng để lưu ảnh chụp minh chứng thực tế sau khi
chạy chương trình.

## 5. Cấu hình và chuẩn bị môi trường

### 5.1. Kiểm tra phiên bản

Mở PowerShell và chạy:

``` powershell
node -v
npm.cmd -v
```

Môi trường đã kiểm tra trên máy:

-   Node.js: `v26.13.0`
-   npm: `11.20.0`
-   MongoDB Node.js Driver: `mongodb@7.9.1`
-   MongoDB Server: dịch vụ MongoDB trên Windows.

### 5.2. Kiểm tra MongoDB

``` powershell
Get-Service MongoDB
```

Dịch vụ cần có trạng thái `Running`.

### 5.3. Cài đặt thư viện

Nếu dự án chưa có MongoDB Driver, chạy:

``` powershell
npm.cmd install mongodb
```

Kiểm tra:

``` powershell
npm.cmd list mongodb
```

## 6. Cấu hình kết nối MongoDB

Trong `bai09.js`, chương trình khai báo:

``` javascript
const URI = 'mongodb://127.0.0.1:27017';
const TEN_DATABASE = 'qlsinhvien';
const TEN_COLLECTION = 'students_test';

const client = new MongoClient(URI);
```

-   `URI`: địa chỉ MongoDB cục bộ, sử dụng cổng mặc định `27017`.
-   `TEN_DATABASE`: tên database cần thao tác.
-   `TEN_COLLECTION`: collection riêng dành cho bài thực hành.
-   `MongoClient`: đối tượng của MongoDB Driver dùng để kết nối máy chủ.

Sau khi kết nối, chương trình lấy database và collection:

``` javascript
const db = client.db(TEN_DATABASE);
const collection = db.collection(TEN_COLLECTION);
```

## 7. Thiết kế dữ liệu sinh viên

Mỗi sinh viên gồm 4 trường:

  Trường    Kiểu dữ liệu   Ý nghĩa
  --------- -------------- --------------
  `masv`    String         Mã sinh viên
  `hoten`   String         Họ và tên
  `tuoi`    Number         Tuổi
  `diem`    Number         Điểm số

Dữ liệu mẫu gồm 6 sinh viên:

  Mã sinh viên   Họ tên                Tuổi   Điểm
  -------------- ------------------- ------ ------
  CDCNTT18B05    Nguyễn Thành Danh       20    8.5
  CDCNTT18B17    Nguyễn Thành Long       21    4.2
  CDCNTT18B08    Cao Bảo Đại             20    7.8
  CDCNTT18B06    Nguyễn Đức Dưỡng        19    3.5
  CDCNTT18B09    Võ Tiến Đạt             21    9.0
  CDCNTT18B01    Võ Đức Anh              20    6.5

## 8. Giải thích các chức năng

### 8.1. Chuẩn bị và làm mới dữ liệu

Hàm `chuanBiDuLieu(collection)` tạo danh sách 6 sinh viên. Trước khi
thêm dữ liệu mới, chương trình thực hiện:

``` javascript
const ketQuaDatLai = await collection.deleteMany({});
```

Lệnh này xóa các bản ghi cũ trong riêng collection `students_test`, giúp
mỗi lần chạy đều bắt đầu với cùng một bộ dữ liệu. Sau đó, chương trình
thêm danh sách bằng:

``` javascript
const ketQuaThem = await collection.insertMany(danhSachSinhVien);
```

Số bản ghi cũ bị xóa và số sinh viên được thêm được hiển thị trên
Terminal.

**Lưu ý:** Lệnh reset chỉ tác động đến `students_test`, không xóa toàn
bộ database và không xóa collection `students`.

### 8.2. Hiển thị danh sách sinh viên

Hàm `hienThiDanhSach(collection, tieuDe)` sử dụng:

``` javascript
const danhSach = await collection.find({}).toArray();
```

-   `find({})` truy vấn tất cả bản ghi trong collection.
-   `toArray()` chuyển kết quả truy vấn thành mảng.
-   Chương trình trình bày dữ liệu thành bảng và đếm tổng số sinh viên.

### 8.3. Xóa một sinh viên bằng `deleteOne()`

Hàm `xoaMotSinhVien(collection)` tìm sinh viên có mã `CDCNTT18B09`:

``` javascript
const ketQua = await collection.deleteOne({
    masv: 'CDCNTT18B09'
});
```

`deleteOne()` chỉ xóa tối đa một bản ghi phù hợp với điều kiện. Thuộc
tính `deletedCount` cho biết số bản ghi thực tế đã bị xóa. Với dữ liệu
mẫu, kết quả dự kiến là **1 bản ghi**.

### 8.4. Xóa nhiều sinh viên bằng `deleteMany()`

Hàm `xoaSinhVienDiemThap(collection)` sử dụng điều kiện:

``` javascript
const dieuKienXoa = {
    diem: { $lt: 5 }
};

const ketQua = await collection.deleteMany(dieuKienXoa);
```

-   `diem`: trường điểm của sinh viên.
-   `$lt`: toán tử MongoDB có nghĩa là nhỏ hơn.
-   `5`: ngưỡng điểm dùng để lọc dữ liệu.

`deleteMany()` xóa tất cả bản ghi thỏa mãn điều kiện. Với dữ liệu mẫu,
hai sinh viên có điểm `4.2` và `3.5` bị xóa, tương ứng **2 bản ghi**.

### 8.5. Thống kê và hiển thị kết quả

Sau khi thực hiện hai thao tác xóa, chương trình truy vấn lại collection
bằng `find({})` để hiển thị danh sách còn lại.

Báo cáo tổng kết gồm:

-   Số sinh viên ban đầu.
-   Số bản ghi xóa bằng `deleteOne()`.
-   Số bản ghi xóa bằng `deleteMany()`.
-   Tổng số bản ghi đã xóa.
-   Số sinh viên còn lại.

Chương trình kiểm tra tính nhất quán theo công thức:

``` text
Số ban đầu = Tổng số đã xóa + Số còn lại
```

### 8.6. Đóng kết nối

Chương trình sử dụng `try...catch...finally` để xử lý lỗi và đóng kết
nối sau khi hoàn tất. Việc đóng kết nối giúp giải phóng tài nguyên làm
việc với MongoDB.

## 9. Cách chạy chương trình

Mở PowerShell tại thư mục dự án:

``` powershell
cd D:\MyNodeJS\Bai03\Bt09
```

Chạy chương trình:

``` powershell
node bai09.js
```

Các bước xử lý:

1.  Kết nối MongoDB.
2.  Làm mới collection `students_test`.
3.  Thêm 6 sinh viên mẫu.
4.  Hiển thị danh sách ban đầu.
5.  Xóa sinh viên `CDCNTT18B09` bằng `deleteOne()`.
6.  Xóa sinh viên có điểm dưới 5 bằng `deleteMany()`.
7.  Hiển thị danh sách còn lại và báo cáo tổng kết.
8.  Đóng kết nối MongoDB.

## 10. Kết quả dự kiến

  Nội dung                    Số lượng
  ------------------------- ----------
  Sinh viên ban đầu                  6
  Xóa bằng `deleteOne()`             1
  Xóa bằng `deleteMany()`            2
  Tổng số đã xóa                     3
  Sinh viên còn lại                  3

Danh sách còn lại dự kiến:

  Mã sinh viên   Họ tên                Tuổi   Điểm
  -------------- ------------------- ------ ------
  CDCNTT18B05    Nguyễn Thành Danh       20    8.5
  CDCNTT18B08    Cao Bảo Đại             20    7.8
  CDCNTT18B01    Võ Đức Anh              20    6.5

Đây là kết quả dự kiến theo bộ dữ liệu mẫu. Khi nộp bài, cần đối chiếu
với kết quả thực tế trên máy.

## 11. Ảnh chụp minh chứng

Lưu ảnh thực tế vào thư mục `screenshots` theo thứ tự:

  -----------------------------------------------------------------------
  Tên ảnh                             Nội dung cần chứng minh
  ----------------------------------- -----------------------------------
  `01-chuan-bi-du-lieu.png`           Terminal thể hiện kết nối MongoDB
                                      và thêm đủ 6 sinh viên

  `02-danh-sach-ban-dau.png`          Bảng danh sách 6 sinh viên trước
                                      khi xóa

  `03-ket-qua-delete-one.png`         Mã `CDCNTT18B09` và số bản ghi xóa
                                      bằng `deleteOne()`

  `04-ket-qua-delete-many.png`        Điều kiện điểm dưới 5 và số bản ghi
                                      xóa bằng `deleteMany()`

  `05-danh-sach-con-lai.png`          Danh sách cuối cùng còn 3 sinh viên
                                      và báo cáo tổng kết
  -----------------------------------------------------------------------

### Cách chụp ảnh trên Windows

1.  Chạy `node bai09.js` trong PowerShell.
2.  Cuộn đến phần kết quả cần chụp.
3.  Nhấn `Windows + Shift + S`.
4.  Chọn vùng Terminal cần minh chứng.
5.  Lưu ảnh vào `D:\MyNodeJS\Bai03\Bt09\screenshots`.
6.  Đặt tên ảnh theo bảng trên.

Nên chụp rõ tiêu đề phần, nội dung thao tác và số lượng bản ghi. Không
sử dụng ảnh minh họa thay cho kết quả chạy thực tế.

## 12. Kết luận

Qua bài thực hành, em đã thực hiện được việc kết nối Node.js với
MongoDB, chuẩn bị dữ liệu sinh viên và thao tác xóa dữ liệu theo điều
kiện. Cụ thể, em sử dụng `deleteOne()` để xóa một sinh viên theo mã và
`deleteMany()` để xóa các sinh viên có điểm dưới 5. Sau khi xóa, chương
trình truy vấn lại bằng `find()` để kiểm tra danh sách còn lại và thống
kê số bản ghi đã xóa.

Bài thực hành giúp em hiểu rõ hơn cách sử dụng MongoDB Node.js Driver để
quản lý dữ liệu, thực hiện truy vấn và kiểm soát kết quả sau khi thao
tác với cơ sở dữ liệu.
