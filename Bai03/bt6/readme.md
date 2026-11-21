# BÀI 06 – XÂY DỰNG MODULE XỬ LÝ KẾT QUẢ HỌC TẬP TRONG NODE.JS

## 1. Thông tin bài thực hành

| Nội dung | Thông tin |
|---|---|
| Họ và tên | Võ Tiến Đạt |
| Mã sinh viên | CDCNTT18B09 |
| Lớp | CĐ-CNTT18B |
| Tên bài | Xây dựng module xử lý kết quả học tập |

## 2. Mục tiêu thực hành

Bài thực hành nhằm vận dụng kiến thức về module trong Node.js để xây dựng một chương trình quản lý và xử lý kết quả học tập của sinh viên.

Thông qua bài này, em thực hiện các nội dung:

- Tìm hiểu cách chia chương trình thành nhiều module để dễ quản lý và tái sử dụng.
- Sử dụng `module.exports` để xuất các hàm từ một tập tin JavaScript.
- Sử dụng `require()` để nhập và sử dụng các hàm từ module bên ngoài.
- Xây dựng hàm tính điểm trung bình của ba môn học.
- Xây dựng hàm xếp loại học tập dựa trên điểm trung bình.
- Sử dụng `map()` để xử lý danh sách sinh viên và tạo dữ liệu kết quả.
- Sử dụng các hàm định dạng chuỗi để căn chỉnh dữ liệu thành bảng.
- Hiển thị báo cáo học tập trên Terminal bằng màu sắc ANSI.

## 3. Cấu trúc thư mục chương trình

```text
Bt06/
│
├── bai06.js
└── xulyDiem.js

```

**Chức năng từng tập tin:**

| Tập tin | Chức năng |
|---|---|
| `xulyDiem.js` | Chứa các hàm tính điểm trung bình và xếp loại học tập. |
| `bai06.js` | Chứa dữ liệu sinh viên, gọi module xử lý điểm và hiển thị báo cáo. |

Chương trình được chia thành hai tập tin JavaScript để tách biệt phần xử lý nghiệp vụ và phần hiển thị kết quả. Cách tổ chức này giúp mã nguồn dễ đọc, dễ chỉnh sửa và thuận tiện khi cần sử dụng lại các hàm xử lý điểm.

## 4. Giải thích chi tiết file xulyDiem.js

### 4.1. Chức năng của module

Tập tin `xulyDiem.js` đảm nhiệm phần xử lý kết quả học tập. Module này không trực tiếp hiển thị dữ liệu trên Terminal mà chỉ thực hiện tính toán và trả về kết quả cho chương trình chính.

Module gồm hai hàm:

- `tinhDiemTrungBinh()`
- `xepLoaiHocTap()`

### 4.2. Hàm tính điểm trung bình

```javascript
function tinhDiemTrungBinh(diemJavaScript, diemMongoDB, diemNodeJS) {
    const tongDiem = diemJavaScript + diemMongoDB + diemNodeJS;
    return tongDiem / 3;
}
```

**Giải thích:**

- Hàm nhận vào ba tham số tương ứng với điểm JavaScript, MongoDB và Node.js.
- Biến `tongDiem` dùng để tính tổng điểm của ba môn.
- Phép chia cho `3` được sử dụng để lấy điểm trung bình.
- Từ khóa `return` trả kết quả về nơi gọi hàm.

Ví dụ:

```javascript
tinhDiemTrungBinh(9, 8, 9);
```

Kết quả trả về:

```text
8.666666666666666
```

Khi hiển thị trong báo cáo, chương trình sử dụng `toFixed(2)` để làm tròn và trình bày điểm trung bình với hai chữ số thập phân, tương ứng `8.67`.

### 4.3. Hàm xếp loại học tập

```javascript
function xepLoaiHocTap(diemTrungBinh) {
    if (diemTrungBinh >= 8) return 'Gioi';
    if (diemTrungBinh >= 6.5) return 'Kha';
    if (diemTrungBinh >= 5) return 'Trung binh';
    return 'Yeu';
}
```

**Giải thích:**

Hàm nhận vào điểm trung bình của sinh viên và sử dụng các câu lệnh `if` để kiểm tra điều kiện xếp loại.

Các mức xếp loại được quy định như sau:

| Điều kiện điểm trung bình | Kết quả |
|---|---|
| Lớn hơn hoặc bằng 8 | Giỏi |
| Từ 6.5 đến dưới 8 | Khá |
| Từ 5 đến dưới 6.5 | Trung bình |
| Dưới 5 | Yếu |

Các điều kiện được kiểm tra lần lượt từ mức điểm cao xuống thấp. Khi gặp điều kiện đúng, hàm trả về kết quả tương ứng.

Ví dụ:

```javascript
xepLoaiHocTap(8.67);
```

Kết quả:

```text
Gioi
```

### 4.4. Xuất các hàm bằng module.exports

```javascript
module.exports = {
    tinhDiemTrungBinh,
    xepLoaiHocTap
};
```

**Giải thích:**

- `module.exports` là đối tượng dùng để xuất dữ liệu hoặc các hàm ra bên ngoài module.
- `tinhDiemTrungBinh` và `xepLoaiHocTap` được đưa vào đối tượng xuất.
- Nhờ đó, các tập tin JavaScript khác có thể sử dụng hai hàm này thông qua `require()`.

Việc tách riêng các hàm xử lý giúp chương trình chính không phải viết lại công thức tính điểm và điều kiện xếp loại.

## 5. Giải thích chi tiết file bai06.js

### 5.1. Nhập module xử lý điểm

```javascript
const {
    tinhDiemTrungBinh,
    xepLoaiHocTap
} = require('./xulyDiem');
```

**Giải thích:**

- `require('./xulyDiem')` dùng để nạp module `xulyDiem.js` nằm cùng thư mục với `bai06.js`.
- Cú pháp destructuring cho phép lấy trực tiếp hai hàm đã được xuất từ module.
- Sau khi nhập, chương trình chính có thể gọi các hàm để tính toán và xếp loại sinh viên.

### 5.2. Khai báo màu ANSI

```javascript
const mau = {
    reset: '\x1b[0m',
    dam: '\x1b[1m',
    xanh: '\x1b[36m',
    trang: '\x1b[37m',
    vang: '\x1b[33m',
    xanhLa: '\x1b[32m',
    do: '\x1b[31m'
};
```

**Giải thích:**

Đối tượng `mau` lưu các mã ANSI để thay đổi màu chữ và kiểu hiển thị trong Terminal.

| Thuộc tính | Tác dụng |
|---|---|
| `reset` | Đưa định dạng về mặc định |
| `dam` | Hiển thị chữ đậm |
| `xanh` | Màu xanh cyan |
| `trang` | Màu trắng |
| `vang` | Màu vàng |
| `xanhLa` | Màu xanh lá |
| `do` | Màu đỏ |

Các mã màu được sử dụng để làm nổi bật tiêu đề báo cáo và phân biệt các mức xếp loại học tập.

### 5.3. Khai báo danh sách sinh viên

```javascript
const danhSachSinhVien = [
    {
        maSV: 'CDCNTT18B09',
        hoTen: 'Vo Tien Dat',
        diem: {
            javascript: 9,
            mongodb: 8,
            nodejs: 9
        }
    }
];
```

**Giải thích:**

- `danhSachSinhVien` là một mảng chứa thông tin của các sinh viên.
- Mỗi sinh viên được lưu dưới dạng một đối tượng.
- `maSV` lưu mã sinh viên.
- `hoTen` lưu họ tên.
- `diem` là một đối tượng con chứa điểm của ba môn học.

Trong chương trình thực tế, mảng này có ba sinh viên. Mỗi sinh viên có dữ liệu điểm riêng để chương trình thực hiện tính toán và xếp loại.

### 5.4. Xử lý kết quả bằng map()

```javascript
const ketQuaHocTap = danhSachSinhVien.map((sv) => {
    const { javascript, mongodb, nodejs } = sv.diem;

    const diemTB = tinhDiemTrungBinh(
        javascript,
        mongodb,
        nodejs
    );

    return {
        ...sv,
        diemTB,
        xepLoai: xepLoaiHocTap(diemTB)
    };
});
```

**Giải thích:**

Đây là phần xử lý chính của chương trình.

- `map()` duyệt qua từng phần tử trong mảng `danhSachSinhVien`.
- Biến `sv` đại diện cho một sinh viên trong mỗi lần duyệt.
- Câu lệnh destructuring lấy ba điểm từ đối tượng `sv.diem`.
- Hàm `tinhDiemTrungBinh()` được gọi để tính điểm trung bình.
- Hàm `xepLoaiHocTap()` nhận điểm trung bình và trả về mức xếp loại.
- `...sv` sử dụng toán tử spread để giữ lại các thông tin ban đầu của sinh viên.
- Hai thuộc tính mới `diemTB` và `xepLoai` được bổ sung vào đối tượng kết quả.

Sau khi hoàn thành, mảng `ketQuaHocTap` chứa đầy đủ thông tin sinh viên, điểm trung bình và xếp loại học tập.

### 5.5. Các hàm định dạng và căn chỉnh bảng

Chương trình sử dụng ba hàm để căn chỉnh nội dung:

**Hàm `doRong()`**

```javascript
function doRong(chuoi) {
    return [...String(chuoi).normalize('NFC')].length;
}
```

Chức năng: Chuẩn hóa chuỗi Unicode và tính số ký tự để hỗ trợ căn chỉnh nội dung, đặc biệt với tên tiếng Việt có dấu.

**Hàm `canTrai()`**

```javascript
function canTrai(noiDung, rong) {
    const chuoi = String(noiDung).normalize('NFC');
    return chuoi + ' '.repeat(Math.max(0, rong - doRong(chuoi)));
}
```

Chức năng: Căn nội dung về phía bên trái và bổ sung khoảng trắng ở bên phải cho đủ độ rộng cột.

**Hàm `canGiua()`**

```javascript
function canGiua(noiDung, rong) {
    const chuoi = String(noiDung).normalize('NFC');
    const khoangTrong = Math.max(0, rong - doRong(chuoi));
    const trai = Math.floor(khoangTrong / 2);

    return ' '.repeat(trai) +
        chuoi +
        ' '.repeat(khoangTrong - trai);
}
```

Chức năng: Căn giữa nội dung trong cột bằng cách chia khoảng trắng về hai phía.

Các hàm này giúp tiêu đề và dữ liệu được trình bày thẳng hàng, tạo bố cục bảng dễ quan sát trên Terminal.

### 5.6. Cấu hình độ rộng các cột

Chương trình sử dụng mảng `cot` để quy định tên và độ rộng cho từng cột:

```javascript
const cot = [
    { ten: 'MA SINH VIEN', rong: 14 },
    { ten: 'HO TEN', rong: 22 },
    { ten: 'JAVASCRIPT', rong: 12 },
    { ten: 'MONGODB', rong: 10 },
    { ten: 'NODE.JS', rong: 10 },
    { ten: 'DIEM TB', rong: 10 },
    { ten: 'XEP LOAI', rong: 12 }
];
```

**Giải thích:**

Mỗi phần tử trong mảng đại diện cho một cột của bảng kết quả.

- `ten`: Tên hiển thị trên tiêu đề.
- `rong`: Độ rộng dành cho nội dung của cột.

Việc khai báo độ rộng riêng giúp chương trình căn chỉnh thống nhất giữa tiêu đề và dữ liệu sinh viên.

### 5.7. Tạo đường viền và hiển thị bảng

Chương trình sử dụng các ký tự Unicode như `┌`, `┬`, `┐`, `├`, `┼`, `┤`, `└`, `┴`, `┘` và `│` để tạo đường viền bảng.

- `taoDuongKe()`: Tạo đường viền trên, đường phân cách và đường viền dưới.
- `taoHang()`: Hỗ trợ định dạng một hàng nội dung theo độ rộng các cột.
- `taoDongSinhVien()`: Tạo hàng dữ liệu cho từng sinh viên và tô màu phần xếp loại.
- `hienThiBaoCao()`: Tổng hợp các phần trên để hiển thị báo cáo hoàn chỉnh.

Trong hàm `hienThiBaoCao()`, chương trình lần lượt hiển thị tiêu đề, thông tin sinh viên, bảng điểm và phần thống kê kết quả học tập.

### 5.8. Thống kê kết quả học tập

```javascript
const thongKe = {
    'Gioi': 0,
    'Kha': 0,
    'Trung binh': 0,
    'Yeu': 0
};

ketQuaHocTap.forEach(sv => {
    thongKe[sv.xepLoai]++;
});
```

**Giải thích:**

- Đối tượng `thongKe` dùng để lưu số lượng sinh viên ở từng mức xếp loại.
- `forEach()` duyệt qua danh sách kết quả học tập.
- Mỗi lần duyệt, chương trình tăng số lượng ở mức xếp loại tương ứng lên một đơn vị.

Sau khi duyệt hết danh sách, chương trình hiển thị tổng số sinh viên và số lượng sinh viên Giỏi, Khá, Trung bình, Yếu.

### 5.9. Chạy chương trình

```javascript
hienThiBaoCao();
```

Đây là câu lệnh gọi hàm hiển thị báo cáo. Khi chạy, chương trình bắt đầu xử lý và xuất toàn bộ kết quả học tập ra Terminal.

## 6. Luồng hoạt động của chương trình

Quy trình hoạt động được thực hiện theo thứ tự:

1. Chương trình chính `bai06.js` nhập hai hàm từ `xulyDiem.js`.
2. Khai báo danh sách sinh viên và điểm của từng môn.
3. Sử dụng `map()` để duyệt danh sách sinh viên.
4. Gọi hàm tính điểm trung bình cho từng sinh viên.
5. Gọi hàm xếp loại dựa trên điểm trung bình.
6. Lưu kết quả vào mảng `ketQuaHocTap`.
7. Định dạng dữ liệu và hiển thị thành bảng trên Terminal.
8. Thống kê số lượng sinh viên theo từng mức học lực.
9. Hoàn thành báo cáo kết quả học tập.

## 7. Quy tắc tính điểm và xếp loại

Điểm trung bình được tính theo công thức:

**Điểm trung bình = (Điểm JavaScript + Điểm MongoDB + Điểm Node.js) / 3**

Quy tắc xếp loại:

| Điểm trung bình | Xếp loại |
|---|---|
| >= 8.0 | Giỏi |
| >= 6.5 và < 8.0 | Khá |
| >= 5.0 và < 6.5 | Trung bình |
| < 5.0 | Yếu |

## 8. Hướng dẫn cài đặt và chạy chương trình

### Bước 1: Chuẩn bị môi trường

Cần cài đặt Node.js trên máy tính.

Kiểm tra phiên bản Node.js:

```bash
node -v
```

### Bước 2: Mở thư mục bài tập

Mở Terminal tại thư mục chứa hai tập tin `bai06.js` và `xulyDiem.js`.

### Bước 3: Kiểm tra cú pháp

```bash
node --check bai06.js
node --check xulyDiem.js
```

Nếu không có thông báo lỗi, các tập tin đã vượt qua bước kiểm tra cú pháp.

### Bước 4: Chạy chương trình

```bash
node bai06.js
```

### Bước 5: Quan sát kết quả

Chương trình hiển thị bảng báo cáo kết quả học tập, điểm trung bình, xếp loại và thống kê tổng số sinh viên trên Terminal.

## 9. Kết quả thực hiện

Với dữ liệu ba sinh viên đã khai báo, kết quả điểm trung bình dự kiến như sau:

| Mã sinh viên | Họ tên | Điểm TB | Xếp loại |
|---|---|---:|---|
| CDCNTT18B09 | Vo Tien Dat | 8.67 | Giỏi |
| CDCNTT18B05 | Nguyễn Thành Danh | 7.00 | Khá |
| CDCNTT18B17 | Nguyễn Thành Long | 4.67 | Yếu |

Chương trình trình bày kết quả bằng bảng có đường viền dọc và ngang, sử dụng màu sắc để phân biệt mức xếp loại, đồng thời hiển thị thống kê tổng kết.

## 10. Kết luận

Qua bài thực hành, em đã nắm được cách tổ chức chương trình Node.js thành nhiều module và cách trao đổi dữ liệu giữa các tập tin JavaScript thông qua `module.exports` và `require()`.

Bên cạnh đó, em đã vận dụng các kiến thức về hàm, mảng, đối tượng, `map()`, `forEach()`, destructuring và toán tử spread để xử lý danh sách sinh viên. Chương trình giúp thực hiện việc tính điểm trung bình, xếp loại và thống kê kết quả học tập một cách rõ ràng.

Việc tách riêng module xử lý điểm khỏi chương trình chính cũng giúp mã nguồn dễ bảo trì, thuận tiện mở rộng và có thể tái sử dụng trong những bài tập khác.

## 11. Ảnh minh chứng

Các ảnh minh chứng được lưu trong thư mục `MinhChung`:

| Tên ảnh | Nội dung |
|---|---|
| `01-cau-truc-thu-muc` | Cấu trúc thư mục bài thực hành |
| `02-bao-cao-ket-qua.png` | Kết quả chạy chương trình trên Terminal |
