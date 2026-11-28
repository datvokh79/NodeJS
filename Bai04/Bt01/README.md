# DAT. – Creative Journal
### Website giới thiệu cá nhân được xây dựng bằng Node.js và Express

**Sinh viên thực hiện:** Võ Tiến Đạt  
**Mã sinh viên:** CDCNTT18B09  
**Lớp:** CĐ-CNTT18B  
**Trường:** Cao đẳng Kỹ thuật Công nghệ Nha Trang  
**Đề bài:** Xây dựng web với nền tảng Express (Express Framework)
**Bài thực hành:** Bài 01 – Xây dựng website giới thiệu cá nhân

---

## 1. Giới thiệu dự án

**DAT. – Creative Journal** là website giới thiệu cá nhân được xây dựng bằng Node.js và Express.js. Website được thiết kế theo phong cách Creative Journal – kết hợp giữa một trang giới thiệu cá nhân và một cuốn nhật ký sáng tạo.

Nội dung website tập trung giới thiệu hai lĩnh vực mà mình quan tâm:

- **Công nghệ thông tin:** Quá trình học tập, tìm hiểu lập trình và phát triển website.
- **Nhiếp ảnh:** Sở thích khám phá bố cục, ánh sáng, màu sắc và lưu giữ những khoảnh khắc trong cuộc sống.

Thay vì sử dụng một giao diện giới thiệu cá nhân thông thường, dự án được thiết kế theo phong cách tối giản, sử dụng tông màu ấm, bố cục thoáng và hình ảnh làm điểm nhấn.

### Mục tiêu thực hiện

- Làm quen với Node.js và Express Framework.
- Hiểu cách xây dựng máy chủ web bằng Express.
- Biết cách định nghĩa và quản lý các tuyến đường (Routes).
- Biết cách tổ chức mã nguồn thành các thư mục riêng biệt.
- Sử dụng HTML và CSS để xây dựng giao diện website.
- Biết cách xử lý đường dẫn không tồn tại bằng HTTP 404.
- Làm quen với quy trình đưa website lên GitHub và triển khai trên hosting hỗ trợ Node.js.

---

## 2. Công nghệ sử dụng

| Công nghệ | Vai trò |
|---|---|
| Node.js | Môi trường chạy JavaScript phía máy chủ |
| Express.js | Framework hỗ trợ xây dựng máy chủ và quản lý Routes |
| HTML5 | Xây dựng cấu trúc nội dung các trang |
| CSS3 | Thiết kế giao diện và bố cục website |
| JavaScript | Xử lý menu, điều hướng và chức năng tương tác |
| Git | Quản lý phiên bản mã nguồn |
| GitHub | Lưu trữ và quản lý repository |
| Render | Hosting triển khai ứng dụng Node.js |

### Mô tả cách hoạt động

Website sử dụng Express để tiếp nhận yêu cầu từ trình duyệt và trả về nội dung tương ứng.

Quy trình hoạt động:

1. Người dùng truy cập một địa chỉ website.
2. Trình duyệt gửi yêu cầu HTTP đến máy chủ Express.
3. Express kiểm tra đường dẫn được yêu cầu.
4. Nếu đường dẫn hợp lệ, máy chủ gửi về file HTML tương ứng.
5. Trình duyệt tải thêm CSS, JavaScript và hình ảnh từ thư mục `public`.
6. Nếu đường dẫn không tồn tại, Express trả về trang lỗi 404.

---

## 3. Cấu trúc thư mục dự án

```text
Bt01/
│
├── public/
│   ├── css/
│   │   └── style.css
│   │
│   ├── js/
│   │   └── main.js
│   │
│   └── images/
│       ├── avatar.jpg
│       ├── photography-01.jpg
│       ├── photography-02.jpg
│       └── photography-03.jpg
│
├── views/
│   ├── index.html
│   ├── about.html
│   ├── skills.html
│   ├── hobbies.html
│   ├── contact.html
│   └── 404.html
│
├── routes/
│   └── pageRoutes.js
│
├── screenshots/
│   └── (Các ảnh chụp minh chứng)
│
├── app.js
├── package.json
├── package-lock.json
├── .gitignore
└── README.md
```

### Chức năng từng thư mục và tập tin

**Thư mục `public/`**

Chứa các tài nguyên tĩnh mà trình duyệt có thể truy cập trực tiếp.

- `css/style.css`: Chứa toàn bộ quy tắc định dạng giao diện, màu sắc, bố cục và khả năng hiển thị trên các kích thước màn hình.
- `js/main.js`: Xử lý menu điều hướng, đánh dấu trang hiện tại, tạo phần đầu trang và chân trang, hỗ trợ chức năng sao chép email.
- `images/`: Lưu trữ ảnh đại diện và hình ảnh sử dụng trong website.

**Thư mục `views/`**

Chứa các trang HTML của website.

| Tập tin | Nội dung |
|---|---|
| `index.html` | Trang chủ |
| `about.html` | Giới thiệu bản thân |
| `skills.html` | Kỹ năng và kiến thức |
| `hobbies.html` | Sở thích cá nhân |
| `contact.html` | Thông tin liên hệ |
| `404.html` | Trang thông báo lỗi không tìm thấy nội dung |

**Thư mục `routes/`**

- `pageRoutes.js`: Khai báo và quản lý các đường dẫn của website. Mỗi đường dẫn được liên kết với một trang HTML tương ứng.

**Các tập tin ở thư mục gốc**

- `app.js`: Tập tin chính khởi tạo Express, cấu hình thư mục tài nguyên tĩnh, kết nối Routes và khởi động máy chủ.
- `package.json`: Quản lý thông tin dự án, các thư viện phụ thuộc và câu lệnh chạy ứng dụng.
- `package-lock.json`: Lưu thông tin phiên bản các gói phụ thuộc đã cài đặt.
- `.gitignore`: Quy định các tập tin và thư mục không đưa lên GitHub.
- `README.md`: Tài liệu mô tả dự án và hướng dẫn sử dụng.

---

## 4. Các chức năng chính

### 4.1. Trang chủ – Home

Đường dẫn: `/`

Giới thiệu tổng quan về bản thân, định hướng học tập và sở thích cá nhân.

Nội dung được thiết kế theo phong cách Creative Journal với phần giới thiệu nổi bật, hình ảnh và các thông tin khái quát.

### 4.2. Trang giới thiệu – About

Đường dẫn: `/about`

Cung cấp thông tin về bản thân, quá trình học tập và định hướng phát triển trong lĩnh vực công nghệ thông tin và nhiếp ảnh.

### 4.3. Trang kỹ năng – Skills

Đường dẫn: `/skills`

Trình bày những kiến thức và công cụ đang tìm hiểu, thực hành theo từng nhóm:

- Phát triển Web: HTML, CSS, JavaScript, Node.js, Express.
- Lập trình: C#, Python, Java, SQL.
- Nhiếp ảnh: Bố cục, ánh sáng, chân dung và du lịch.
- Chỉnh sửa ảnh: Lightroom, Photoshop và Canva.

### 4.4. Trang sở thích – Hobbies

Đường dẫn: `/hobbies`

Giới thiệu ba sở thích chính:

- Nhiếp ảnh: Ghi lại những khoảnh khắc và khám phá góc nhìn hình ảnh.
- Khám phá và du lịch: Trải nghiệm không gian và những vùng đất mới.
- Công nghệ: Tìm hiểu thiết bị, phần mềm và các xu hướng công nghệ.

### 4.5. Trang liên hệ – Contact

Đường dẫn: `/contact`

Hiển thị thông tin cá nhân, mã sinh viên, email, GitHub và lĩnh vực yêu thích.

Trang có thêm nút sao chép email giúp người xem thuận tiện hơn khi lưu lại thông tin liên hệ.

### 4.6. Trang lỗi 404 – Not Found

Được sử dụng khi người dùng truy cập một đường dẫn không được khai báo trong hệ thống.

Express trả về mã trạng thái HTTP `404 Not Found` và hiển thị trang lỗi được thiết kế riêng.

### 4.7. Menu điều hướng

Menu được sử dụng chung trên các trang, hỗ trợ di chuyển giữa các mục:

- Trang chủ
- Giới thiệu
- Kỹ năng
- Sở thích
- Liên hệ

JavaScript tự động xác định đường dẫn hiện tại để đánh dấu mục menu tương ứng. Trên màn hình nhỏ, menu có thể được mở và đóng bằng nút điều hướng.

---

## 5. Hướng dẫn cài đặt và chạy trên máy tính

### 5.1. Yêu cầu môi trường

Trước khi chạy dự án, máy tính cần cài đặt:

- Node.js: https://nodejs.org/
- npm: Được cài đặt cùng Node.js.
- Visual Studio Code hoặc trình soạn thảo mã nguồn tương đương.
- Trình duyệt web như Google Chrome hoặc Microsoft Edge.

Kiểm tra Node.js và npm bằng lệnh:

```powershell
node -v
npm -v
```

Nếu cả hai lệnh trả về phiên bản tương ứng thì môi trường đã sẵn sàng.

### 5.2. Tải mã nguồn

Clone repository:

```powershell
git clone [ĐƯỜNG_DẪN_GITHUB]
```

Di chuyển vào thư mục dự án:

```powershell
cd NodeJS/Bai04/Bt01
```

Nếu chỉ tải riêng repository của bài tập, hãy di chuyển trực tiếp vào thư mục chứa `app.js`.

### 5.3. Cài đặt thư viện

Chạy lệnh:

```powershell
npm install
```

Lệnh này đọc thông tin trong `package.json` và cài đặt các thư viện cần thiết, bao gồm Express.

**Lưu ý đối với Windows PowerShell:** Nếu gặp lỗi không thể chạy tập lệnh `npm.ps1` do chính sách thực thi, có thể sử dụng:

```powershell
npm.cmd install
```

### 5.4. Khởi động website

Chạy:

```powershell
npm start
```

Nếu thành công, cửa sổ Terminal sẽ hiển thị thông báo máy chủ đang chạy tại cổng được cấu hình.

Mở trình duyệt và truy cập:

```text
http://localhost:3000
```

Để dừng máy chủ, quay lại cửa sổ Terminal và nhấn:

```text
Ctrl + C
```

---

## 6. Kiểm thử website

Sau khi khởi động thành công, tiến hành kiểm tra các chức năng.

### 6.1. Kiểm tra các Routes

| STT | Đường dẫn | Kết quả mong đợi |
|---|---|---|
| 1 | `/` | Hiển thị trang chủ |
| 2 | `/about` | Hiển thị trang giới thiệu |
| 3 | `/skills` | Hiển thị trang kỹ năng |
| 4 | `/hobbies` | Hiển thị trang sở thích |
| 5 | `/contact` | Hiển thị trang liên hệ |

### 6.2. Kiểm tra lỗi 404

Truy cập một đường dẫn không tồn tại, ví dụ:

```text
http://localhost:3000/duong-dan-khong-ton-tai
```

Kết quả mong đợi:

- Website hiển thị trang lỗi 404.
- Máy chủ trả về trạng thái HTTP `404 Not Found`.

Có thể kiểm tra bằng PowerShell:

```powershell
curl.exe -i http://localhost:3000/duong-dan-khong-ton-tai
```

### 6.3. Kiểm tra tài nguyên tĩnh

Kiểm tra khả năng tải CSS, JavaScript và hình ảnh:

```powershell
curl.exe -I http://localhost:3000/css/style.css
curl.exe -I http://localhost:3000/js/main.js
```

Nếu tài nguyên tồn tại, máy chủ sẽ trả về trạng thái HTTP `200 OK`.

### 6.4. Kiểm tra giao diện và chức năng

- Các trang hiển thị đúng nội dung.
- Menu điều hướng hoạt động.
- Mục menu hiện tại được đánh dấu.
- Hình ảnh hiển thị bình thường.
- Giao diện phù hợp với màn hình máy tính và điện thoại.
- Nút sao chép email hoạt động.
- Không xuất hiện lỗi JavaScript nghiêm trọng trên Console.

---

## 7. Khảo sát nền tảng hosting miễn phí

Trong quá trình thực hiện, dự án khảo sát ba nền tảng có khả năng triển khai ứng dụng Node.js.

| Nền tảng | Đặc điểm |
|---|---|
| Render | Hỗ trợ triển khai Express Web Service trực tiếp từ GitHub |
| Vercel | Hỗ trợ ứng dụng Express thông qua mô hình Function |
| Google Cloud Run | Hỗ trợ triển khai ứng dụng Node.js dưới dạng container |

### Lý do lựa chọn Render

Render được lựa chọn vì phù hợp với cấu trúc ứng dụng hiện tại:

- Có thể triển khai trực tiếp mã nguồn từ GitHub.
- Hỗ trợ chạy máy chủ Node.js và Express.
- Không cần thay đổi cấu trúc ứng dụng sang mô hình serverless.
- Có thể sử dụng tên miền phụ miễn phí dạng `onrender.com`.

**Lưu ý:** Gói miễn phí có giới hạn tài nguyên. Web Service có thể chuyển sang trạng thái ngủ khi không có truy cập trong một khoảng thời gian. Khi có người truy cập lại, ứng dụng cần thời gian khởi động.

Các trang tham khảo chính thức:

- Render: https://render.com/docs
- Vercel: https://vercel.com/docs
- Google Cloud Run: https://cloud.google.com/run/docs

---

## 8. Hướng dẫn triển khai trên Render

### 8.1. Chuẩn bị GitHub

Đưa mã nguồn dự án lên GitHub và bảo đảm repository có đầy đủ:

- `app.js`
- `package.json`
- `package-lock.json`
- `routes/`
- `views/`
- `public/`

Không cần đưa thư mục `node_modules/` lên GitHub.

### 8.2. Tạo Web Service

1. Truy cập https://render.com/.
2. Đăng nhập hoặc đăng ký tài khoản.
3. Kết nối tài khoản GitHub.
4. Chọn **New**.
5. Chọn **Web Service**.
6. Chọn repository chứa dự án.
7. Cấu hình các thông số:

| Thuộc tính | Giá trị |
|---|---|
| Name | dat-creative-journal |
| Runtime | Node |
| Build Command | `npm install` |
| Start Command | `npm start` |
| Instance Type | Free |

Nếu repository chứa nhiều bài tập trong cùng một dự án lớn, cần đặt **Root Directory** đúng vào thư mục `Bt01`.

### 8.3. Triển khai

Sau khi kiểm tra cấu hình:

1. Nhấn **Deploy Web Service**.
2. Render tiến hành lấy mã nguồn từ GitHub.
3. Cài đặt các thư viện phụ thuộc.
4. Chạy lệnh khởi động `npm start`.
5. Theo dõi quá trình triển khai trong mục Logs.

Nếu triển khai thành công, Render sẽ cung cấp một địa chỉ website công khai.

### 8.4. Kiểm tra website sau triển khai

Truy cập đường dẫn Render được cấp và kiểm tra:

- Trang chủ hoạt động.
- Các trang About, Skills, Hobbies và Contact truy cập được.
- CSS và JavaScript tải thành công.
- Hình ảnh hiển thị đúng.
- Trang 404 trả về đúng nội dung.
- Các chức năng tương tác vẫn hoạt động.

**Đường dẫn website sau triển khai:**

[ĐIỀN LINK RENDER SAU KHI TRIỂN KHAI THÀNH CÔNG]

---

## 9. Ảnh chụp minh chứng

Các ảnh minh chứng được lưu trong thư mục `screenshots/`.

| STT | Tên ảnh | Nội dung |
|---|---|---|
| 01 | 01-homepage.png | Giao diện trang chủ |
| 02 | 02-about.png | Trang giới thiệu |
| 03 | 03-skills.png | Trang kỹ năng |
| 04 | 04-hobbies.png | Trang sở thích |
| 05 | 05-contact.png | Trang liên hệ |
| 06 | 06-404.png | Trang lỗi 404 |
| 07 | 07-responsive.png | Giao diện trên điện thoại |
| 08 | 08-terminal.png | Máy chủ Express đang chạy |
| 09 | 09-render-deploy.png | Quá trình triển khai trên Render |
| 10 | 10-live-website.png | Website hoạt động trên Internet |

*Lưu ý: Tên ảnh có thể được điều chỉnh theo tên file thực tế trong thư mục screenshots.*

---

## 10. Kết quả đạt được

Sau quá trình thực hiện, dự án đã xây dựng được website giới thiệu cá nhân sử dụng Node.js và Express Framework.

Các kết quả chính:

- Khởi tạo và cấu hình thành công dự án Node.js.
- Cài đặt và sử dụng Express để xây dựng máy chủ web.
- Tổ chức các Routes cho từng trang riêng biệt.
- Xây dựng giao diện bằng HTML, CSS và JavaScript.
- Sử dụng Express Static để phục vụ các tài nguyên tĩnh.
- Xử lý đường dẫn không tồn tại bằng HTTP 404.
- Kiểm tra website trên máy tính và thiết bị di động.
- Khảo sát và lựa chọn nền tảng hosting phù hợp.
- Triển khai website lên môi trường Internet.

Thông qua bài thực hành, mình hiểu rõ hơn cách một ứng dụng web Node.js hoạt động, từ việc tiếp nhận yêu cầu HTTP, xử lý Routes cho đến trả về nội dung cho trình duyệt.

---

## 11. Hướng phát triển

Trong tương lai, dự án có thể được mở rộng với một số chức năng:

- Bổ sung thư viện ảnh cá nhân.
- Xây dựng trang dự án đã thực hiện.
- Bổ sung hiệu ứng chuyển động và tương tác.
- Tối ưu SEO và tốc độ tải trang.
- Tích hợp biểu mẫu liên hệ.
- Nghiên cứu sử dụng cơ sở dữ liệu để quản lý nội dung.

---

## 12. Thông tin dự án

**Tên đề tài:** DAT. – Creative Journal  
**Người thực hiện:** Võ Tiến Đạt  
**Lớp:** CĐ-CNTT18B  
**Mã sinh viên:** CDCNTT18B09

---

*DAT. – Học hỏi công nghệ, ghi lại những khoảnh khắc.*
