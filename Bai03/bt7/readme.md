# BÀI 7 – XÂY DỰNG HTTP SERVER VÀ XỬ LÝ URL VỚI NODE.JS

**Sinh viên:** Võ Tiến Đạt  
**Lớp:** CĐ-CNTT18B  
**Mã sinh viên:** CDCNTT18B09  

---

## 1. GIỚI THIỆU ĐỀ TÀI

Trong bài thực hành này, em xây dựng một chương trình Web Server đơn giản bằng Node.js, sử dụng module có sẵn `http` để tiếp nhận và xử lý các yêu cầu từ trình duyệt.

Chương trình có tên **Trung Tâm Xử Lý URL**, được thiết kế với giao diện Dark Developer. Thay vì phải nhập trực tiếp các tham số trên thanh địa chỉ trình duyệt, người dùng có thể thao tác ngay trên trang chủ thông qua các biểu mẫu nhập liệu.

Hệ thống gồm hai chức năng chính:

- **Gửi lời chào:** Nhận tên người dùng từ URL và trả về nội dung chào tương ứng.
- **Tính tổng hai số:** Nhận hai giá trị số từ URL, kiểm tra dữ liệu và thực hiện phép cộng.

Thông qua bài thực hành, em tìm hiểu cách tạo HTTP Server, phân tích đường dẫn URL, lấy tham số truy vấn (Query String), kiểm tra dữ liệu đầu vào và gửi phản hồi HTML về trình duyệt.

## 2. MỤC TIÊU VÀ YÊU CẦU

### 2.1. Mục tiêu

- Biết cách sử dụng module `http` để tạo Web Server bằng Node.js.
- Hiểu cách máy chủ tiếp nhận yêu cầu HTTP từ trình duyệt.
- Biết sử dụng đối tượng `URL` để phân tích đường dẫn và tham số.
- Sử dụng `searchParams.get()` để lấy dữ liệu từ Query String.
- Biết kiểm tra dữ liệu đầu vào trước khi xử lý.
- Biết trả về nội dung HTML cùng mã trạng thái HTTP phù hợp.
- Kết hợp HTML và CSS để xây dựng giao diện người dùng.

### 2.2. Yêu cầu chức năng

| STT | Chức năng | Mô tả |
|---|---|---|
| 1 | Trang chủ | Hiển thị giao diện và các biểu mẫu nhập liệu |
| 2 | Gửi lời chào | Nhận tham số `name` và trả về lời chào |
| 3 | Tính tổng | Nhận hai tham số `a`, `b` và tính tổng |
| 4 | Kiểm tra dữ liệu | Phát hiện tham số bị thiếu hoặc không hợp lệ |
| 5 | Xử lý đường dẫn | Trả về thông báo khi URL không tồn tại |

## 3. CÔNG NGHỆ VÀ CÔNG CỤ SỬ DỤNG

| Công nghệ | Vai trò |
|---|---|
| Node.js | Môi trường chạy JavaScript phía máy chủ |
| HTTP module | Tạo máy chủ và xử lý yêu cầu HTTP |
| URL | Phân tích địa chỉ URL và tham số truy vấn |
| HTML5 | Xây dựng cấu trúc các trang |
| CSS3 | Thiết kế giao diện, màu sắc và bố cục |
| JavaScript | Xử lý dữ liệu và điều khiển hoạt động của máy chủ |
| Visual Studio Code | Soạn thảo và quản lý mã nguồn |
| Google Chrome / Microsoft Edge | Truy cập và kiểm tra chương trình |

**Lưu ý:** Chương trình sử dụng module `http` có sẵn trong Node.js, không cần cài đặt thêm thư viện bên ngoài.
```

## 4. PHÂN TÍCH VÀ GIẢI THÍCH MÃ NGUỒN

### 4.1. Khai báo module và cổng máy chủ

```javascript
const http = require('http');

const PORT = 3001;
```

**Giải thích:**

- `require('http')`: Nạp module HTTP có sẵn trong Node.js để tạo máy chủ.
- `PORT = 3001`: Khai báo cổng mà máy chủ sử dụng để tiếp nhận yêu cầu.

Khi chương trình được khởi chạy, người dùng có thể truy cập máy chủ thông qua địa chỉ:

`http://localhost:3001/`

### 4.2. Hàm taoTrangChu()

Hàm `taoTrangChu()` chịu trách nhiệm tạo và trả về toàn bộ mã HTML của trang chủ.

Giao diện được xây dựng trực tiếp bằng chuỗi template string trong JavaScript, kết hợp HTML và CSS.

Các thành phần chính gồm:

- **Header:** Hiển thị tên hệ thống và trạng thái hoạt động.
- **Hero:** Giới thiệu mục đích của chương trình.
- **Stats:** Hiển thị cổng máy chủ và số lượng chức năng.
- **Endpoint List:** Chứa hai biểu mẫu nhập dữ liệu.
- **Console:** Hiển thị các thông tin trạng thái của hệ thống.
- **Footer:** Hiển thị thông tin tên chương trình.

Trang chủ có hai biểu mẫu:

**Biểu mẫu gửi lời chào:**

```html
<form action="/hello" method="GET">
    <input type="text" name="name" required>
    <button type="submit">Gửi lời chào</button>
</form>
```

Khi người dùng nhập tên và nhấn nút, trình duyệt gửi yêu cầu GET đến đường dẫn `/hello`, đồng thời truyền tên thông qua tham số `name`.

Ví dụ:

`/hello?name=Dat`

**Biểu mẫu tính tổng:**

```html
<form action="/sum" method="GET">
    <input type="number" name="a" step="any" required>
    <input type="number" name="b" step="any" required>
    <button type="submit">Tính tổng</button>
</form>
```

Hai trường nhập liệu có thuộc tính `name` lần lượt là `a` và `b`. Khi gửi biểu mẫu, trình duyệt tự động tạo Query String để máy chủ tiếp nhận.

Ví dụ:

`/sum?a=10&b=20`

Thuộc tính `required` yêu cầu người dùng nhập dữ liệu trước khi gửi biểu mẫu. Thuộc tính `step="any"` cho phép nhập số thập phân.

### 4.3. Hàm taoTrangPhanHoi()

Hàm này tạo giao diện HTML dùng chung cho các trang kết quả và trang thông báo lỗi.

```javascript
function taoTrangPhanHoi(
    tieuDe,
    noiDung,
    trangThai,
    thanhCong = true
) {
    // Tạo giao diện phản hồi
}
```

**Các tham số:**

| Tham số | Ý nghĩa |
|---|---|
| `tieuDe` | Tiêu đề của trang phản hồi |
| `noiDung` | Nội dung kết quả hoặc thông báo lỗi |
| `trangThai` | Trạng thái HTTP hiển thị trên giao diện |
| `thanhCong` | Xác định phản hồi thành công hay thất bại |

Hàm sử dụng biến `mauTrangThai` để thay đổi màu sắc theo kết quả:

- Thành công: màu xanh ngọc.
- Thất bại: màu đỏ.

Sau khi xử lý, trang phản hồi hiển thị tiêu đề, nội dung kết quả, mã trạng thái và liên kết quay lại trang chủ.

### 4.4. Hàm guiPhanHoi()

Hàm `guiPhanHoi()` chịu trách nhiệm gửi kết quả từ máy chủ về trình duyệt.

```javascript
function guiPhanHoi(
    res,
    maTrangThai,
    tieuDe,
    noiDung,
    thanhCong
) {
    res.writeHead(maTrangThai, {
        'Content-Type': 'text/html; charset=utf-8'
    });

    res.end(
        taoTrangPhanHoi(
            tieuDe,
            noiDung,
            `${maTrangThai} ${thanhCong ? 'THÀNH CÔNG' : 'LỖI'}`,
            thanhCong
        )
    );
}
```

**Giải thích:**

- `res`: Đối tượng phản hồi HTTP từ máy chủ.
- `res.writeHead()`: Gửi mã trạng thái và thông tin Header.
- `Content-Type`: Khai báo nội dung phản hồi là HTML và sử dụng bảng mã UTF-8 để hiển thị tiếng Việt.
- `res.end()`: Kết thúc phản hồi và gửi nội dung HTML về trình duyệt.

Việc tách riêng hàm gửi phản hồi giúp chương trình dễ quản lý và tránh lặp lại nhiều đoạn mã khi xử lý các chức năng.

### 4.5. Hàm maHoaHTML()

Hàm `maHoaHTML()` dùng để mã hóa các ký tự đặc biệt trong dữ liệu trước khi đưa vào nội dung HTML.

```javascript
function maHoaHTML(chuoi) {
    return String(chuoi).replace(/[&<>"']/g, kyTu => {
        const bangMa = {
            '&': '&amp;',
            '<': '&lt;',
            '>': '&gt;',
            '"': '&quot;',
            "'": '&#39;'
        };

        return bangMa[kyTu];
    });
}
```

**Giải thích:**

Hàm chuyển đổi các ký tự đặc biệt thành dạng HTML Entity:

| Ký tự | Dạng mã hóa |
|---|---|
| `&` | `&amp;` |
| `<` | `&lt;` |
| `>` | `&gt;` |
| `"` | `&quot;` |
| `'` | `&#39;` |

Ví dụ, nếu người dùng nhập tên có chứa ký tự `<` hoặc `>`, các ký tự này sẽ được mã hóa trước khi hiển thị.

Điều này giúp dữ liệu được hiển thị dưới dạng văn bản thay vì bị trình duyệt hiểu nhầm là mã HTML.

### 4.6. Tạo Web Server và phân tích URL

```javascript
const server = http.createServer((req, res) => {
    const url = new URL(
        req.url,
        `http://${req.headers.host || 'localhost'}`
    );

    const duongDan = url.pathname;
});
```

Đây là phần trung tâm của chương trình, nơi máy chủ tiếp nhận và xử lý các yêu cầu từ trình duyệt.

**Các thành phần quan trọng:**

- `http.createServer()`: Tạo HTTP Server.
- `req`: Chứa thông tin yêu cầu được gửi đến máy chủ.
- `res`: Dùng để gửi phản hồi về trình duyệt.
- `new URL()`: Phân tích URL nhận được.
- `url.pathname`: Lấy phần đường dẫn của URL.
- `url.searchParams`: Truy cập các tham số truy vấn.

Ví dụ với URL:

`http://localhost:3001/sum?a=10&b=20`

Ta có:

| Thành phần | Giá trị |
|---|---|
| `url.pathname` | `/sum` |
| `url.searchParams.get('a')` | `10` |
| `url.searchParams.get('b')` | `20` |

Nhờ đó, máy chủ có thể xác định chức năng cần thực hiện và lấy đúng dữ liệu người dùng gửi lên.

### 4.7. Kiểm tra phương thức HTTP

Chương trình chỉ hỗ trợ phương thức GET.

```javascript
if (req.method !== 'GET') {
    guiPhanHoi(
        res,
        405,
        'Phương thức không được hỗ trợ',
        '<p>Hệ thống hiện chỉ hỗ trợ phương thức GET.</p>',
        false
    );

    return;
}
```

Nếu yêu cầu được gửi bằng phương thức khác GET, máy chủ trả về mã trạng thái HTTP `405 Method Not Allowed`.

### 4.8. Xử lý đường dẫn trang chủ `/`

```javascript
if (duongDan === '/') {
    res.writeHead(200, {
        'Content-Type': 'text/html; charset=utf-8'
    });

    res.end(taoTrangChu());
    return;
}
```

Khi người dùng truy cập:

`http://localhost:3001/`

Máy chủ xác định đường dẫn là `/`, sau đó gọi hàm `taoTrangChu()` để tạo giao diện và gửi về trình duyệt.

Mã trạng thái `200` cho biết yêu cầu được xử lý thành công.

### 4.9. Xử lý chức năng gửi lời chào `/hello`

Đường dẫn sử dụng:

`/hello?name=Dat`

Máy chủ lấy tên người dùng bằng câu lệnh:

```javascript
const ten = url.searchParams.get('name');
```

Sau đó kiểm tra dữ liệu:

```javascript
if (ten === null || ten.trim() === '') {
    // Trả về thông báo lỗi
}
```

Trong đó:

- `searchParams.get('name')`: Lấy giá trị của tham số `name`.
- `null`: Tham số không được cung cấp.
- `trim()`: Loại bỏ khoảng trắng ở đầu và cuối chuỗi.

Nếu không có tên hoặc tên chỉ chứa khoảng trắng, máy chủ trả về mã lỗi `400 Bad Request`.

Nếu dữ liệu hợp lệ, máy chủ tạo nội dung:

```javascript
`<div class="result">Xin chào ${maHoaHTML(ten.trim())}!</div>`
```

Ví dụ:

| Dữ liệu gửi lên | Kết quả |
|---|---|
| `name=Dat` | Xin chào Dat! |
| `name=Minh` | Xin chào Minh! |
| Không có `name` | Báo lỗi 400 |
| `name=` | Báo lỗi 400 |
| `name=%20%20` | Báo lỗi 400 |

### 4.10. Xử lý chức năng tính tổng `/sum`

Đường dẫn sử dụng:

`/sum?a=10&b=20`

Đầu tiên, máy chủ lấy hai tham số:

```javascript
const giaTriA = url.searchParams.get('a');
const giaTriB = url.searchParams.get('b');
```

**Bước 1 – Kiểm tra tham số:**

Máy chủ kiểm tra xem hai tham số có tồn tại và có bị để trống hay không.

Nếu thiếu một trong hai giá trị, chương trình trả về mã trạng thái `400 Bad Request`.

**Bước 2 – Chuyển đổi dữ liệu:**

```javascript
const a = Number(giaTriA);
const b = Number(giaTriB);
```

Dữ liệu lấy từ URL ban đầu là chuỗi ký tự. Hàm `Number()` được sử dụng để chuyển đổi thành kiểu dữ liệu số nhằm thực hiện phép tính.

**Bước 3 – Kiểm tra dữ liệu số:**

```javascript
if (!Number.isFinite(a) || !Number.isFinite(b)) {
    // Trả về thông báo dữ liệu không hợp lệ
}
```

`Number.isFinite()` kiểm tra giá trị có phải là một số hữu hạn hợp lệ hay không.

Nếu một trong hai giá trị không hợp lệ, chương trình trả về thông báo lỗi.

**Bước 4 – Thực hiện phép tính:**

```javascript
const tong = a + b;
```

Sau khi dữ liệu hợp lệ, chương trình thực hiện phép cộng hai số.

**Bước 5 – Trả kết quả:**

Máy chủ gửi kết quả tổng cùng hai giá trị đầu vào về trình duyệt.

Ví dụ:

| a | b | Kết quả |
|---:|---:|---:|
| 10 | 20 | 30 |
| 5 | 7 | 12 |
| -5 | 10 | 5 |
| 2.5 | 3.5 | 6 |

### 4.11. Xử lý đường dẫn không tồn tại

Nếu người dùng truy cập một đường dẫn không được khai báo trong chương trình, ví dụ:

`http://localhost:3001/test`

Máy chủ trả về mã trạng thái `404 Not Found` cùng thông báo không tìm thấy đường dẫn.

Chức năng này giúp hệ thống phản hồi rõ ràng khi người dùng truy cập sai địa chỉ.

### 5.12. Khởi động Server

```javascript
server.listen(PORT, () => {
    console.log(`Server dang chay tai: http://localhost:${PORT}`);
    console.log('Trang thai: ONLINE');
});
```

Phương thức `listen()` khởi động máy chủ và đưa máy chủ vào trạng thái chờ yêu cầu tại cổng `3001`.

Khi khởi động thành công, thông tin địa chỉ và trạng thái hoạt động được hiển thị trong Terminal.

## 5. QUY TRÌNH HOẠT ĐỘNG CỦA CHƯƠNG TRÌNH

Quy trình xử lý tổng quát:

1. Người dùng mở trình duyệt và truy cập trang chủ.
2. Node.js tiếp nhận yêu cầu HTTP.
3. Máy chủ phân tích URL để xác định đường dẫn.
4. Nếu là `/`, máy chủ hiển thị trang chủ.
5. Người dùng chọn chức năng và nhập dữ liệu vào biểu mẫu.
6. Trình duyệt gửi yêu cầu GET kèm các tham số trên URL.
7. Máy chủ đọc và kiểm tra dữ liệu.
8. Nếu dữ liệu hợp lệ, chương trình thực hiện chức năng tương ứng.
9. Máy chủ gửi trang kết quả hoặc thông báo lỗi về trình duyệt.

## 6. CÁC ĐƯỜNG DẪN VÀ MÃ TRẠNG THÁI HTTP

### 6.1. Danh sách đường dẫn

| Đường dẫn | Tham số | Chức năng |
|---|---|---|
| `/` | Không có | Hiển thị trang chủ |
| `/hello` | `name` | Gửi lời chào |
| `/sum` | `a`, `b` | Tính tổng hai số |
| Đường dẫn khác | Tùy URL | Hiển thị lỗi không tìm thấy |

### 6.2. Các mã trạng thái HTTP

| Mã trạng thái | Tên | Ý nghĩa trong chương trình |
|---|---|---|
| 200 | OK | Yêu cầu được xử lý thành công |
| 400 | Bad Request | Thiếu tham số hoặc dữ liệu không hợp lệ |
| 404 | Not Found | Đường dẫn không tồn tại |
| 405 | Method Not Allowed | Phương thức HTTP không được hỗ trợ |

## 7. HƯỚNG DẪN CÀI ĐẶT VÀ CHẠY CHƯƠNG TRÌNH

### 7.1. Yêu cầu môi trường

- Đã cài đặt Node.js.
- Có trình soạn thảo mã nguồn như Visual Studio Code.
- Có trình duyệt Google Chrome hoặc Microsoft Edge.

Kiểm tra Node.js và npm bằng lệnh:

```bash
node -v
npm -v
```

### 7.2. Khởi chạy chương trình

Mở Terminal tại thư mục chứa file `bai07.js`.

Chạy lệnh:

```bash
node bai07.js
```

Nếu máy chủ khởi động thành công, Terminal hiển thị thông tin:

```text
==========================================
          TRUNG TAM XU LY URL
==========================================
Server dang chay tai: http://localhost:3001
Trang thai: ONLINE
Nhan Ctrl + C de dung Server.
==========================================
```

### 7.3. Truy cập trang chủ

Mở trình duyệt và truy cập:

`http://localhost:3001/`

Người dùng có thể lựa chọn chức năng trực tiếp trên giao diện.

## 8. KIỂM TRA CÁC CHỨC NĂNG

### 8.1. Kiểm tra gửi lời chào

- Nhập tên `Dat` vào biểu mẫu.
- Nhấn nút **Gửi lời chào**.
- Kiểm tra trang kết quả.

Kết quả mong đợi:

**Xin chào Dat!**

### 8.2. Kiểm tra tính tổng

- Nhập số thứ nhất: `10`.
- Nhập số thứ hai: `20`.
- Nhấn nút **Tính tổng**.
- Kiểm tra kết quả trả về.

Kết quả mong đợi:

**Tổng = 30**

### 8.3. Kiểm tra dữ liệu không hợp lệ

Thử truy cập trực tiếp các đường dẫn:

- `http://localhost:3001/hello`
- `http://localhost:3001/hello?name=`
- `http://localhost:3001/sum?a=10`
- `http://localhost:3001/sum?a=abc&b=20`
- `http://localhost:3001/test`

Kết quả mong đợi là chương trình hiển thị thông báo lỗi tương ứng với từng trường hợp.

## 9. HÌNH ẢNH MINH CHỨNG

Các hình ảnh minh chứng được lưu trong thư mục `images/`.

| STT | Hình ảnh | Nội dung |
|---|---|---|
| 1 | `01-trang-chu.png` | Giao diện trang chủ và hai biểu mẫu nhập liệu |
| 2 | `02-gui-loi-chao.png` | Kết quả chức năng gửi lời chào |
| 3 | `03-tinh-tong.png` | Kết quả chức năng tính tổng hai số |
| 4 | `04-ket-qua-loi.png` | Giao diện thông báo lỗi khi dữ liệu không hợp lệ |

## 10. KẾT LUẬN

Qua bài thực hành, em đã xây dựng được một HTTP Server cơ bản bằng Node.js và sử dụng module `http` để tiếp nhận, xử lý các yêu cầu từ trình duyệt.

Bên cạnh đó, em đã thực hành sử dụng đối tượng `URL` để phân tích đường dẫn, lấy các tham số truy vấn thông qua `searchParams`, chuyển đổi dữ liệu và thực hiện các phép xử lý theo yêu cầu.

Việc kết hợp HTML và CSS giúp chương trình có giao diện trực quan hơn, hỗ trợ người dùng nhập dữ liệu và nhận kết quả dễ dàng thay vì phải thao tác hoàn toàn trên thanh địa chỉ.

Thông qua bài tập này, em hiểu rõ hơn quy trình hoạt động cơ bản của Web Server, cách trao đổi dữ liệu giữa trình duyệt và máy chủ cũng như cách xử lý các trường hợp đầu vào không hợp lệ.
