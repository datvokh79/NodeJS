# BÀI 8 – QUẢN LÝ TẬP TIN VỚI FILE SYSTEM

## 1. Thông tin bài thực hành

| Nội dung | Thông tin |
|---|---|
| Tên bài tập | Bài 8 – Quản lý tập tin với File System |
| Tên chương trình | ARCHIVE DESK – File Management System |
| Sinh viên | Võ Tiến Đạt |
| Lớp | CĐ-CNTT18B |
| Ngôn ngữ lập trình | JavaScript |
| Môi trường thực thi | Node.js |
| Module sử dụng | `fs`, `path` |
| Phiên bản chương trình | 1.0.0 |
| Tập tin chính | `bai08.js` |

---

## 2. Giới thiệu chương trình

**Archive Desk** là chương trình thực hành quản lý tập tin được xây dựng bằng Node.js, sử dụng module File System (`fs`) để thực hiện các thao tác cơ bản với thư mục và tập tin trên máy tính.

Chương trình được thiết kế theo hướng mô phỏng một hệ thống lưu trữ hồ sơ đơn giản. Thay vì chỉ thực hiện các lệnh tạo, ghi, đổi tên và xóa tập tin riêng lẻ, chương trình tổ chức các thao tác thành một quy trình liên tục, có thông báo trạng thái và kiểm tra kết quả sau khi thực hiện.

Giao diện Terminal được trình bày theo dạng bảng cột, bao gồm thời gian thực hiện, mã bước, trạng thái và nội dung xử lý. Cách trình bày này giúp người dùng dễ dàng theo dõi tiến trình hoạt động của chương trình.

### Mục tiêu thực hiện

- Làm quen với module `fs` trong Node.js.
- Biết cách tạo thư mục bằng `mkdir()`.
- Biết cách tạo và ghi nội dung vào tập tin bằng `writeFile()`.
- Biết cách đổi tên tập tin bằng `rename()`.
- Biết cách đọc nội dung tập tin bằng `readFile()`.
- Biết cách xóa tập tin bằng `unlink()`.
- Biết cách sử dụng module `path` để xây dựng đường dẫn.
- Thực hành xử lý lỗi với `try...catch`.
- Sử dụng `async/await` để tổ chức các thao tác bất đồng bộ.

---

## 3. Công nghệ và module sử dụng

### 3.1. Node.js

Node.js là môi trường cho phép thực thi JavaScript bên ngoài trình duyệt. Trong bài thực hành này, Node.js được sử dụng để chạy chương trình và thao tác trực tiếp với hệ thống tập tin trên máy tính.

### 3.2. Module `fs`

Module `fs` (File System) là module có sẵn của Node.js, cung cấp các phương thức để làm việc với tập tin và thư mục.

Chương trình sử dụng các phương thức sau:

| Phương thức | Chức năng | Vị trí sử dụng |
|---|---|---|
| `fs.promises.mkdir()` | Tạo thư mục | `taoThuMuc()` |
| `fs.promises.writeFile()` | Tạo tập tin và ghi nội dung | `taoVaGhiGhiChu()`, `taoVaXoaTapTinTam()` |
| `fs.promises.rename()` | Đổi tên tập tin | `doiTenGhiChu()` |
| `fs.promises.readFile()` | Đọc nội dung tập tin | `docGhiChu()` |
| `fs.promises.unlink()` | Xóa tập tin | `chuanBiDuLieu()`, `taoVaXoaTapTinTam()` |
| `fs.promises.stat()` | Lấy thông tin tập tin | `kiemTraKetQua()` |
| `fs.promises.access()` | Kiểm tra khả năng truy cập tập tin | `kiemTraKetQua()` |

**Lưu ý:** Chương trình sử dụng các phiên bản Promise của module `fs`. Đây là cách viết phù hợp với `async/await`, giúp các thao tác được thực hiện tuần tự và dễ xử lý lỗi.

### 3.3. Module `path`

Module `path` được sử dụng để xây dựng đường dẫn tập tin và thư mục.

Ví dụ:

```javascript
const path = require('path');

const THU_MUC_DATA = path.join(__dirname, 'data');
```

Trong đó:

- `__dirname`: Đường dẫn đến thư mục chứa tập tin JavaScript hiện tại.
- `path.join()`: Kết hợp các thành phần đường dẫn.
- `THU_MUC_DATA`: Đường dẫn đến thư mục `data`.

Việc sử dụng `path.join()` giúp chương trình xây dựng đường dẫn phù hợp với hệ điều hành, hạn chế lỗi do tự ghép chuỗi đường dẫn.

### 3.4. Async/Await và xử lý lỗi

Các thao tác đọc, ghi, đổi tên và xóa tập tin được thực hiện theo cơ chế bất đồng bộ.

Chương trình sử dụng:

- `async`: Khai báo hàm bất đồng bộ.
- `await`: Chờ thao tác bất đồng bộ hoàn thành trước khi thực hiện bước tiếp theo.
- `try...catch`: Phát hiện và xử lý lỗi trong quá trình thực thi.

Ví dụ:

```javascript
async function taoThuMuc() {
    try {
        await fs.promises.mkdir(THU_MUC_DATA, {
            recursive: true
        });

        console.log('Tao thu muc thanh cong.');

    } catch (loi) {
        console.error('Loi:', loi.message);
        throw loi;
    }
}
```

---

## 4. Cấu trúc thư mục chương trình

Sau khi thực hiện bài tập, thư mục có cấu trúc như sau:

```text
Bt08/
│
├── bai08.js
│
├── README.md
│
├── data/
│   └── ghichu_moi.txt
│
└── images/
    ├── 01-giao-dien-chuong-trinh.png
    ├── 02-tao-va-ghi-tap-tin.png
    ├── 03-doi-ten-va-doc-tap-tin.png
    └── 04-xoa-va-kiem-tra.png
```

**Giải thích:**

| Thành phần | Mô tả |
|---|---|
| `bai08.js` | Tập tin mã nguồn chính của chương trình |
| `README.md` | Tài liệu mô tả bài thực hành |
| `data/` | Thư mục lưu trữ dữ liệu |
| `ghichu_moi.txt` | Tập tin ghi chú sau khi đổi tên |
| `images/` | Thư mục lưu ảnh minh chứng |

Thư mục `data` và tập tin `ghichu_moi.txt` được chương trình tạo ra trong quá trình chạy. Thư mục `images` dùng để lưu ảnh chụp màn hình thực tế.

---

## 5. Phân tích các thành phần trong chương trình

### 5.1. Khai báo module

```javascript
const fs = require('fs');
const path = require('path');
```

Chương trình khai báo hai module có sẵn của Node.js:

- `fs`: Thực hiện các thao tác với tập tin và thư mục.
- `path`: Xử lý và kết hợp đường dẫn.

Không cần cài đặt thêm thư viện bên ngoài.

### 5.2. Khai báo thông tin và đường dẫn

```javascript
const TEN_CHUONG_TRINH = 'ARCHIVE DESK';
const PHIEN_BAN = '1.0.0';

const THU_MUC_DATA = path.join(__dirname, 'data');
const TAP_TIN_GHI_CHU = path.join(
    THU_MUC_DATA,
    'ghichu.txt'
);
```

Các hằng số được sử dụng để quản lý thông tin chương trình và đường dẫn lưu trữ.

Việc khai báo đường dẫn tập trung giúp mã nguồn dễ đọc, dễ chỉnh sửa và hạn chế việc sử dụng sai tên tập tin trong các hàm xử lý.

### 5.3. Hiển thị giao diện Terminal

Chương trình sử dụng các hàm:

- `hienThiDuongKe()`: Tạo các đường phân cách trong Terminal.
- `hienThiTieuDe()`: Hiển thị tên chương trình và thông tin sinh viên.
- `hienThiTieuDeBang()`: Hiển thị tiêu đề các cột nhật ký.
- `ghiNhatKy()`: In thời gian, mã bước, trạng thái và nội dung xử lý.

Các trạng thái được sử dụng:

| Trạng thái | Ý nghĩa |
|---|---|
| `INFO` | Thông tin chung |
| `SUCCESS` | Thao tác thực hiện thành công |
| `ERROR` | Có lỗi xảy ra |

### 5.4. Chuẩn bị dữ liệu trước khi chạy

Hàm `chuanBiDuLieu()` thực hiện dọn dẹp các tập tin còn sót lại từ lần chạy trước:

```javascript
await fs.promises.unlink(TAP_TIN_GHI_CHU_MOI);
await fs.promises.unlink(TAP_TIN_TAM);
```

Nếu tập tin không tồn tại, chương trình nhận diện mã lỗi `ENOENT` và tiếp tục thực hiện.

Việc dọn dẹp giúp chương trình có thể chạy lại nhiều lần mà không bị vướng tập tin kết quả từ lần chạy trước.

### 5.5. Tạo thư mục data

Hàm `taoThuMuc()` sử dụng:

```javascript
await fs.promises.mkdir(THU_MUC_DATA, {
    recursive: true
});
```

Chức năng:

- Tạo thư mục `data` nếu chưa tồn tại.
- Nếu thư mục đã tồn tại thì không phát sinh lỗi do tùy chọn `recursive: true`.
- Thư mục này là nơi lưu trữ các tập tin trong bài thực hành.

### 5.6. Tạo và ghi nội dung vào ghichu.txt

Hàm `taoVaGhiGhiChu()` sử dụng `fs.promises.writeFile()` để tạo tập tin và ghi dữ liệu.

Nội dung được ghi gồm bốn dòng:

```text
ARCHIVE DESK - HO SO GHI CHU
Nguoi quan ly: Vo Tien Dat
Muc dich: Thuc hanh quan ly tap tin bang Node.js File System
Trang thai: Dang luu tru
```

Phương thức `writeFile()` có nhiệm vụ tạo tập tin nếu chưa tồn tại và ghi nội dung vào tập tin.

Tham số `'utf8'` được sử dụng để xác định kiểu mã hóa văn bản.

### 5.7. Đổi tên tập tin

Hàm `doiTenGhiChu()` sử dụng:

```javascript
await fs.promises.rename(
    TAP_TIN_GHI_CHU,
    TAP_TIN_GHI_CHU_MOI
);
```

Thao tác này đổi tên:

```text
ghichu.txt
```

thành:

```text
ghichu_moi.txt
```

Tập tin sau khi đổi tên vẫn giữ nguyên nội dung đã ghi trước đó.

### 5.8. Đọc nội dung tập tin sau khi đổi tên

Hàm `docGhiChu()` sử dụng:

```javascript
const noiDung = await fs.promises.readFile(
    TAP_TIN_GHI_CHU_MOI,
    'utf8'
);
```

Chương trình đọc nội dung từ `ghichu_moi.txt`, sau đó hiển thị từng dòng trên Terminal.

Việc đọc tập tin sau khi đổi tên giúp kiểm tra rằng tập tin mới vẫn tồn tại và dữ liệu được lưu trữ đúng.

### 5.9. Tạo và xóa tập tin tạm

Hàm `taoVaXoaTapTinTam()` thực hiện hai thao tác liên tiếp.

**Bước 1: Tạo tập tin tạm**

```javascript
await fs.promises.writeFile(
    TAP_TIN_TAM,
    'Day la tap tin tam cua Archive Desk.',
    'utf8'
);
```

Tập tin `tam.txt` được tạo trong thư mục `data` và ghi một nội dung mẫu.

**Bước 2: Xóa tập tin tạm**

```javascript
await fs.promises.unlink(TAP_TIN_TAM);
```

Sau khi tạo thành công, chương trình sử dụng `unlink()` để xóa tập tin `tam.txt`.

Kết quả mong đợi là tập tin tạm không còn tồn tại trong thư mục `data`.

### 5.10. Kiểm tra kết quả cuối cùng

Hàm `kiemTraKetQua()` thực hiện kiểm tra:

- Sử dụng `fs.promises.stat()` để lấy thông tin tập tin `ghichu_moi.txt`.
- Sử dụng `fs.promises.access()` để kiểm tra tập tin `tam.txt` còn tồn tại hay không.
- Hiển thị dung lượng tập tin và trạng thái xóa tập tin tạm.

Nếu tập tin tạm đã được xóa, chương trình ghi nhận kết quả thành công. Nếu tập tin vẫn còn tồn tại, chương trình phát sinh lỗi để thông báo.

### 5.11. Điều phối chương trình

Hàm `khoiChay()` là hàm điều phối toàn bộ hoạt động.

Các thao tác được thực hiện theo thứ tự:

1. Hiển thị giao diện chương trình.
2. Ghi nhận trạng thái khởi động.
3. Dọn dẹp dữ liệu cũ.
4. Tạo thư mục `data`.
5. Tạo và ghi nội dung vào `ghichu.txt`.
6. Đổi tên thành `ghichu_moi.txt`.
7. Đọc nội dung tập tin mới.
8. Tạo tập tin `tam.txt`.
9. Xóa tập tin `tam.txt`.
10. Kiểm tra kết quả cuối cùng.
11. Hiển thị thông báo hoàn tất.

Nếu có lỗi xảy ra, chương trình sử dụng `catch` để ghi nhận thông báo và đặt `process.exitCode = 1`.

---

## 6. Quy trình hoạt động tổng quát

```text
              BAT DAU CHUONG TRINH
                       |
                       v
                Hien thi giao dien
                       |
                       v
                Don dep du lieu cu
                       |
                       v
                Tao thu muc data
                       |
                       v
                Tao ghichu.txt
                       |
                       v
                Ghi noi dung vao file
                       |
                       v
             Doi ten thanh ghichu_moi.txt
                       |
                       v
              Doc noi dung file moi
                       |
                       v
                 Tao tap tin tam
                       |
                       v
                 Xoa tap tin tam
                       |
                       v
                Kiem tra ket qua
                       |
                       v
                Hien thi hoan tat
                       |
                       v
                     KET THUC
```

---

## 7. Hướng dẫn cài đặt và chạy chương trình

### 7.1. Yêu cầu môi trường

- Đã cài đặt Node.js.
- Có Terminal hoặc PowerShell.
- Có mã nguồn `bai08.js`.

Kiểm tra Node.js:

```bash
node -v
```

### 7.2. Mở thư mục bài tập

Mở Terminal tại thư mục chứa `bai08.js`.

Ví dụ:

```powershell
cd D:\MyNodeJS\Bai03\Bt08
```

Đường dẫn trên chỉ là ví dụ; cần thay đổi theo vị trí thực tế của thư mục bài tập.

### 7.3. Chạy chương trình

Nhập lệnh:

```bash
node bai08.js
```

Nếu chương trình chạy đúng, Terminal sẽ hiển thị bảng nhật ký, nội dung tập tin ghi chú và kết quả kiểm tra cuối cùng.

**Lưu ý:** Bài tập sử dụng các module có sẵn của Node.js nên không cần chạy `npm install`.

---

## 8. Kết quả thực hiện

Sau khi chương trình chạy hoàn tất, thư mục `data` có kết quả:

```text
data/
└── ghichu_moi.txt
```

Nội dung tập tin `ghichu_moi.txt`:

```text
ARCHIVE DESK - HO SO GHI CHU
Nguoi quan ly: Vo Tien Dat
Muc dich: Thuc hanh quan ly tap tin bang Node.js File System
Trang thai: Dang luu tru
```

Kết quả kiểm tra:

| Nội dung kiểm tra | Kết quả mong đợi |
|---|---|
| Thư mục `data` | Đã được tạo |
| `ghichu.txt` | Đã đổi tên |
| `ghichu_moi.txt` | Tồn tại và có nội dung |
| `tam.txt` | Đã được xóa |
| Quy trình chương trình | Hoàn tất |

### Ảnh minh chứng

Bổ sung ảnh chụp màn hình thực tế sau khi chạy chương trình vào thư mục `images/`.

| STT | Tên ảnh | Nội dung minh chứng |
|---|---|---|
| 1 | `01-giao-dien-chuong-trinh.png` | Giao diện và bảng nhật ký Terminal |
| 2 | `02-tao-va-ghi-tap-tin.png` | Thao tác tạo thư mục và ghi tập tin |
| 3 | `03-doi-ten-va-doc-tap-tin.png` | Thông báo đổi tên và nội dung tập tin |
| 4 | `04-xoa-va-kiem-tra.png` | Thông báo xóa tập tin tạm và kết quả cuối cùng |

---

## 9. Kiểm tra dữ liệu bằng PowerShell

Có thể sử dụng các lệnh sau để kiểm tra trực tiếp kết quả trên máy tính.

**Liệt kê các tập tin trong thư mục data:**

```powershell
Get-ChildItem .\data
```

**Đọc nội dung tập tin ghi chú:**

```powershell
Get-Content .\data\ghichu_moi.txt
```

**Kiểm tra tập tin tạm:**

```powershell
Test-Path .\data\tam.txt
```

Kết quả mong đợi của lệnh cuối cùng:

```text
False
```

Giá trị `False` cho biết tập tin `tam.txt` không còn tồn tại.

---

## 10. Kết luận

Thông qua bài thực hành Archive Desk, em đã tìm hiểu và vận dụng được các thao tác quản lý tập tin cơ bản trong Node.js bằng module File System.

Chương trình đã thực hiện được việc tạo thư mục, tạo và ghi nội dung vào tập tin, đổi tên, đọc dữ liệu và xóa tập tin tạm. Bên cạnh đó, em cũng thực hành sử dụng module `path` để xây dựng đường dẫn, kết hợp `async/await` để xử lý các thao tác bất đồng bộ và `try...catch` để kiểm soát lỗi trong quá trình thực hiện.

Qua bài tập này, em hiểu rõ hơn cách Node.js tương tác với hệ thống tập tin và có thể vận dụng những kiến thức đã học để xây dựng các chương trình quản lý dữ liệu ở những bài thực hành tiếp theo.

---

**Sinh viên thực hiện:** Võ Tiến Đạt  
**Lớp:** CĐ-CNTT18B  
**Bài thực hành:** Bài 8 – Quản lý tập tin với File System
