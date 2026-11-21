# BÀI 10 -- CAMPUS CONNECT

## Liên kết dữ liệu giữa hai Collection trong MongoDB bằng Node.js

> **Môn học:** Lập trình Node.js / Cơ sở dữ liệu NoSQL\
> **Tên chương trình:** CAMPUS CONNECT -- Academic Data Linking System\
> **Công nghệ:** Node.js, MongoDB, MongoDB Node.js Driver\
> **Database:** `qlsinhvien`\
> **Collections:** `departments`, `students_join`

------------------------------------------------------------------------

## 1. Giới thiệu bài thực hành

Bài thực hành xây dựng chương trình Node.js kết nối MongoDB, tạo và quản
lý dữ liệu khoa -- sinh viên, sau đó liên kết dữ liệu giữa hai
Collection để hiển thị tên khoa tương ứng của từng sinh viên.

Trong MongoDB, dữ liệu được lưu theo Collection và Document. Hai
Collection có thể liên kết logic thông qua một trường chung. Trong bài
này, trường được sử dụng để liên kết là `makhoa`.

Chương trình sử dụng Aggregation Pipeline với toán tử `$lookup` để tra
cứu thông tin khoa từ Collection `departments` dựa trên mã khoa của sinh
viên trong Collection `students_join`.

### 1.1. Mục tiêu

-   Kết nối MongoDB từ ứng dụng Node.js.
-   Tạo và thao tác với hai Collection độc lập.
-   Thêm dữ liệu khoa và sinh viên.
-   Sử dụng `aggregate()` để xử lý dữ liệu.
-   Sử dụng `$lookup` để liên kết hai Collection.
-   Sử dụng `$unwind`, `$project`, `$sort` để định dạng kết quả.
-   Hiển thị danh sách sinh viên kèm tên khoa trên Terminal.
-   Thống kê số lượng sinh viên liên kết thành công và chưa tìm thấy
    khoa.

### 1.2. Kết quả cần đạt

Sau khi chạy thành công, mỗi sinh viên được hiển thị cùng mã khoa và tên
khoa tương ứng. Với bộ dữ liệu mẫu trong chương trình, kết quả dự kiến
gồm 3 khoa, 6 sinh viên và 6 lượt liên kết thành công.

------------------------------------------------------------------------

## 2. Công nghệ và môi trường thực hiện

  Thành phần                Công nghệ / phiên bản
  ------------------------- -----------------------
  Ngôn ngữ                  JavaScript
  Môi trường chạy           Node.js
  Cơ sở dữ liệu             MongoDB
  Thư viện kết nối          `mongodb`
  Công cụ quản lý dữ liệu   MongoDB Compass
  Hệ điều hành tham chiếu   Windows

> Ghi lại phiên bản thực tế trên máy trước khi nộp báo cáo. Có thể kiểm
> tra bằng `node --version`, `npm --version` và `mongosh --version` (nếu
> đã cài MongoDB Shell).

------------------------------------------------------------------------

## 3. Cấu trúc thư mục dự án

Tạo thư mục dự án, ví dụ:

``` text
D:\MyNodeJS\Bai03\Bt10
```

Cấu trúc đề xuất:

``` text
Bt10/
├── bai10.js
├── package.json
├── package-lock.json
├── README.md
└── screenshots/
    ├── 01-du-lieu-departments.png
    ├── 02-du-lieu-students-join.png
    ├── 03-truy-van-lookup.png
    ├── 04-ket-qua-lien-ket.png
```

-   `bai10.js`: mã nguồn chính của chương trình.
-   `package.json`, `package-lock.json`: thông tin và phiên bản các gói
    phụ thuộc được npm quản lý.
-   `README.md`: tài liệu mô tả, hướng dẫn cài đặt, chạy và kiểm thử.
-   `screenshots/`: lưu ảnh chụp màn hình minh chứng thực tế.

**Lưu ý:** Nếu dự án chưa có `package.json`, chạy `npm init -y` trong
thư mục `Bt10` trước khi cài thư viện.

------------------------------------------------------------------------

## 4. Cài đặt và khởi chạy chương trình

### 4.1. Điều kiện cần

-   Đã cài Node.js và npm.
-   MongoDB Server đang chạy trên máy.
-   Có thể kết nối MongoDB tại `mongodb://127.0.0.1:27017`.
-   Đã mở Terminal/PowerShell tại thư mục dự án.

### 4.2. Cài đặt thư viện MongoDB

``` powershell
cd D:\MyNodeJS\Bai03\Bt10
npm install mongodb
```

Kiểm tra thư viện:

``` powershell
npm list mongodb
```

### 4.3. Chạy chương trình

``` powershell
node bai10.js
```

Nếu MongoDB đang hoạt động và cấu hình kết nối chính xác, chương trình
sẽ kết nối cơ sở dữ liệu, khởi tạo dữ liệu, thực hiện truy vấn liên kết,
in bảng kết quả và đóng kết nối.

### 4.4. Cấu hình kết nối

Trong `bai10.js`, chương trình khai báo:

``` javascript
const CAU_HINH = {
    uri: 'mongodb://127.0.0.1:27017',
    database: 'qlsinhvien',
    collections: {
        departments: 'departments',
        students: 'students_join'
    }
};
```

-   `uri`: địa chỉ MongoDB Server trên máy cục bộ.
-   `database`: tên cơ sở dữ liệu sử dụng.
-   `departments`: Collection lưu thông tin khoa.
-   `students_join`: Collection lưu thông tin sinh viên dùng trong bài
    liên kết.

Nếu MongoDB của máy sử dụng cổng hoặc thông tin xác thực khác, cần điều
chỉnh URI cho phù hợp.

------------------------------------------------------------------------

## 5. Thiết kế cơ sở dữ liệu

### 5.1. Collection `departments`

Collection này lưu thông tin các khoa trong trường.

Mỗi Document có cấu trúc:

``` javascript
{
    makhoa: "CNTT",
    tenkhoa: "Công nghệ thông tin"
}
```

Dữ liệu mẫu:

  Mã khoa   Tên khoa
  --------- ---------------------
  CNTT      Công nghệ thông tin
  QTKD      Quản trị kinh doanh
  KT        Kế toán

### 5.2. Collection `students_join`

Collection này lưu thông tin sinh viên. Trường `makhoa` đóng vai trò
khóa liên kết logic đến Collection `departments`.

Cấu trúc Document:

``` javascript
{
    masv: "CDCNTT18B01",
    hoten: "Võ Đức Anh",
    makhoa: "CNTT"
}
```

Dữ liệu mẫu được tạo trong chương trình:

  Mã sinh viên   Họ và tên           Mã khoa
  -------------- ------------------- ---------
  CDCNTT18B01    Võ Đức Anh          CNTT
  CDCNTT18B05    Nguyễn Thành Danh   CNTT
  CDCNTT18B08    Cao Bảo Đại         CNTT
  CDCNTT18B09    Võ Tiến Đạt         QTKD
  CDCNTT18B17    Nguyễn Thành Long   QTKD
  CDCNTT18B06    Nguyễn Đức Dưỡng    KT

### 5.3. Mối quan hệ giữa hai Collection

Hai Collection liên kết thông qua trường `makhoa`:

``` text
students_join.makhoa  ─────────►  departments.makhoa
       CNTT                         CNTT
       QTKD                         QTKD
       KT                           KT
```

Một khoa có thể có nhiều sinh viên. Mỗi sinh viên trong bộ dữ liệu mẫu
được gán một mã khoa.

Đây là liên kết logic được thực hiện khi truy vấn bằng `$lookup`; không
phải ràng buộc khóa ngoại tự động như trong một số hệ quản trị cơ sở dữ
liệu quan hệ.

------------------------------------------------------------------------

## 6. Quy trình hoạt động của chương trình

Chương trình được tổ chức thành các bước:

1.  Khởi động và hiển thị tiêu đề CAMPUS CONNECT.
2.  Kết nối đến MongoDB Server.
3.  Chọn database `qlsinhvien` và hai Collection.
4.  Xóa dữ liệu cũ trong đúng hai Collection phục vụ bài thực hành, sau
    đó thêm dữ liệu mẫu.
5.  Kiểm tra số lượng Document.
6.  Tạo Aggregation Pipeline và thực hiện `$lookup`.
7.  Định dạng, sắp xếp và hiển thị kết quả.
8.  Thống kê kết quả liên kết.
9.  Đóng kết nối MongoDB.

### 6.1. Kết nối MongoDB

``` javascript
await client.connect();
const db = client.db(CAU_HINH.database);

const departments = db.collection('departments');
const students = db.collection('students_join');
```

`MongoClient` tạo kết nối đến MongoDB Server. Sau khi kết nối, chương
trình chọn database và lấy đối tượng đại diện cho hai Collection.

### 6.2. Khởi tạo dữ liệu

Chương trình dùng `deleteMany({})` để xóa dữ liệu hiện có trong hai
Collection của bài thực hành, sau đó dùng `insertMany()` để thêm dữ liệu
mẫu.

``` javascript
await departments.deleteMany({});
await students.deleteMany({});

await departments.insertMany(danhSachKhoa);
await students.insertMany(danhSachSinhVien);
```

Mục đích là giúp mỗi lần chạy có bộ dữ liệu kiểm thử nhất quán, tránh
việc dữ liệu bị nhân đôi.

**Cảnh báo:** thao tác xóa chỉ giới hạn trong `departments` và
`students_join` của database `qlsinhvien`. Không chạy đoạn lệnh này nếu
hai Collection đang chứa dữ liệu thật cần giữ lại.

### 6.3. Kiểm tra dữ liệu

`countDocuments()` đếm số Document hiện có trong Collection:

``` javascript
const soKhoa = await departments.countDocuments();
const soSinhVien = await students.countDocuments();
```

Với dữ liệu mẫu, kết quả dự kiến là 3 khoa và 6 sinh viên.

------------------------------------------------------------------------

## 7. Giải thích chi tiết truy vấn liên kết

Đây là nội dung trọng tâm của bài thực hành.

### 7.1. Hàm `aggregate()`

`aggregate()` nhận vào một mảng các giai đoạn xử lý gọi là Aggregation
Pipeline. Dữ liệu lần lượt đi qua từng giai đoạn theo thứ tự được khai
báo.

``` javascript
const ketQua = await students.aggregate(pipeline).toArray();
```

-   `students.aggregate(pipeline)`: thực hiện Pipeline trên Collection
    sinh viên.
-   `toArray()`: chuyển Cursor kết quả thành mảng để chương trình có thể
    duyệt và hiển thị.

### 7.2. Giai đoạn `$lookup`

``` javascript
{
    $lookup: {
        from: 'departments',
        localField: 'makhoa',
        foreignField: 'makhoa',
        as: 'thongTinKhoa'
    }
}
```

Ý nghĩa từng thuộc tính:

  -----------------------------------------------------------------------
  Thuộc tính                          Ý nghĩa
  ----------------------------------- -----------------------------------
  `from`                              Collection được tra cứu:
                                      `departments`

  `localField`                        Trường liên kết trong Collection
                                      hiện tại: `makhoa`

  `foreignField`                      Trường đối chiếu trong Collection
                                      được tra cứu: `makhoa`

  `as`                                Tên trường mảng chứa kết quả:
                                      `thongTinKhoa`
  -----------------------------------------------------------------------

Ví dụ, sinh viên có `makhoa: "CNTT"` sẽ được tra cứu Document trong
`departments` có `makhoa: "CNTT"`. Thông tin phù hợp được đưa vào mảng
`thongTinKhoa`.

### 7.3. Giai đoạn `$unwind`

``` javascript
{
    $unwind: {
        path: '$thongTinKhoa',
        preserveNullAndEmptyArrays: true
    }
}
```

`$lookup` tạo trường kết quả dạng mảng. `$unwind` tách phần tử trong
mảng thành đối tượng để truy cập thuận tiện hơn.

`preserveNullAndEmptyArrays: true` giúp giữ lại Document sinh viên ngay
cả khi không tìm thấy khoa tương ứng. Nhờ vậy, chương trình có thể phát
hiện sinh viên chưa được liên kết thay vì loại bỏ hoàn toàn Document đó.

### 7.4. Giai đoạn `$project`

``` javascript
{
    $project: {
        _id: 0,
        masv: 1,
        hoten: 1,
        makhoa: 1,
        tenkhoa: {
            $ifNull: [
                '$thongTinKhoa.tenkhoa',
                'Chưa xác định'
            ]
        }
    }
}
```

`$project` chọn và định dạng các trường đầu ra:

-   `_id: 0`: không hiển thị trường `_id`.
-   `masv: 1`: giữ mã sinh viên.
-   `hoten: 1`: giữ họ tên.
-   `makhoa: 1`: giữ mã khoa.
-   `tenkhoa`: lấy tên khoa từ thông tin đã liên kết.
-   `$ifNull`: nếu không có tên khoa thì hiển thị `Chưa xác định`.

### 7.5. Giai đoạn `$sort`

``` javascript
{
    $sort: {
        masv: 1
    }
}
```

Sắp xếp kết quả theo mã sinh viên tăng dần. Giá trị `1` biểu thị tăng
dần; `-1` biểu thị giảm dần.

### 7.6. Tổng hợp Pipeline

``` javascript
const pipeline = [
    {
        $lookup: {
            from: 'departments',
            localField: 'makhoa',
            foreignField: 'makhoa',
            as: 'thongTinKhoa'
        }
    },
    {
        $unwind: {
            path: '$thongTinKhoa',
            preserveNullAndEmptyArrays: true
        }
    },
    {
        $project: {
            _id: 0,
            masv: 1,
            hoten: 1,
            makhoa: 1,
            tenkhoa: {
                $ifNull: [
                    '$thongTinKhoa.tenkhoa',
                    'Chưa xác định'
                ]
            }
        }
    },
    {
        $sort: {
            masv: 1
        }
    }
];

const ketQua = await students.aggregate(pipeline).toArray();
```

Pipeline trên thực hiện lần lượt: tra cứu khoa, tách thông tin khoa,
chọn trường hiển thị và sắp xếp kết quả.

------------------------------------------------------------------------

## 8. Hiển thị và thống kê kết quả

Sau khi truy vấn, chương trình hiển thị bảng gồm các cột:

  Cột            Nội dung
  -------------- ------------------------------------------
  STT            Số thứ tự
  Mã sinh viên   Mã định danh sinh viên
  Họ và tên      Tên sinh viên
  Mã khoa        Mã khoa sinh viên đang tham gia
  Tên khoa       Tên khoa lấy từ Collection `departments`

Chương trình tiếp tục thống kê:

-   Tổng số sinh viên trong kết quả.
-   Số sinh viên tìm thấy thông tin khoa.
-   Số sinh viên chưa tìm thấy thông tin khoa.

Với bộ dữ liệu mẫu, kết quả dự kiến:

  Chỉ tiêu                Số lượng
  --------------------- ----------
  Số khoa                        3
  Số sinh viên                   6
  Liên kết thành công            6
  Chưa tìm thấy khoa             0

Các con số trên là kết quả dự kiến theo dữ liệu mẫu trong mã nguồn. Khi
báo cáo, cần đối chiếu với kết quả thực tế sau khi chạy chương trình.

------------------------------------------------------------------------

## 9. Kiểm thử chương trình

Có thể kiểm thử các tình huống sau:

  -----------------------------------------------------------------------
  Trường hợp              Cách kiểm tra           Kết quả mong đợi
  ----------------------- ----------------------- -----------------------
  Dữ liệu mẫu hợp lệ      Chạy chương trình bình  6 sinh viên tìm thấy
                          thường                  khoa

  Sinh viên có mã khoa    Thêm một Document có    Sinh viên vẫn xuất
  không tồn tại           `makhoa` không có trong hiện, tên khoa là
                          `departments` và chạy   `Chưa xác định`
                          lại Pipeline            

  MongoDB không hoạt động Dừng MongoDB Server rồi Chương trình thông báo
                          chạy chương trình       lỗi kết nối

  Collection khoa không   Xóa Documents trong     Sinh viên được giữ lại
  có dữ liệu              `departments`, sau đó   và tên khoa là
                          chạy riêng truy vấn     `Chưa xác định`
                          Pipeline                
  -----------------------------------------------------------------------

**Lưu ý khi kiểm thử:** chương trình hiện tại tự xóa và tạo lại dữ liệu
mẫu mỗi lần khởi động. Vì vậy, nếu muốn thử tình huống mã khoa không tồn
tại bằng cách sửa dữ liệu trong Compass, không chạy lại toàn bộ
`bai10.js` ngay sau đó, vì bước khởi tạo sẽ ghi đè dữ liệu kiểm thử. Có
thể chạy riêng Pipeline hoặc tạm thời điều chỉnh bước khởi tạo dữ liệu.

------------------------------------------------------------------------

## 10. Kết luận

Qua bài thực hành CAMPUS CONNECT, chương trình đã sử dụng Node.js kết
nối MongoDB và thao tác với hai Collection độc lập là `departments` và
`students_join`.

Thông qua Aggregation Pipeline, đặc biệt là toán tử `$lookup`, chương
trình có thể liên kết thông tin sinh viên với thông tin khoa dựa trên
trường `makhoa`. Các giai đoạn `$unwind`, `$project` và `$sort` hỗ trợ
xử lý, lựa chọn và sắp xếp dữ liệu trước khi hiển thị.

Với bộ dữ liệu mẫu gồm ba khoa và sáu sinh viên, kết quả dự kiến là cả
sáu sinh viên đều tìm thấy thông tin khoa tương ứng. Bài thực hành giúp
hiểu cách liên kết dữ liệu giữa các Collection trong MongoDB và cách sử
dụng MongoDB Node.js Driver để xây dựng ứng dụng thực tế.

