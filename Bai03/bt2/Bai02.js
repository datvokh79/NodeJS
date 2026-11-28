
const http = require('http');

const PORT = 3000;

// Thong tin ca nhan
const sinhVien = {
    hoTen: 'Võ Tiến Đạt',
    maSinhVien: 'CDCNTT18B09',
    lop: 'CĐ-CNTT18B'
};

// Ham tao khung HTML dung chung
const taoTrang = (tieuDe, noiDung) => {
    return `
    <!DOCTYPE html>
    <html lang="vi">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>${tieuDe}</title>

        <style>
            * {
                box-sizing: border-box;
            }

            body {
                margin: 0;
                min-height: 100vh;
                display: flex;
                justify-content: center;
                align-items: center;
                font-family: Arial, sans-serif;
                background: linear-gradient(135deg, #dbeafe, #f1f5f9);
                color: #1e293b;
            }

            .container {
                width: 90%;
                max-width: 600px;
                padding: 38px;
                background: white;
                border-radius: 18px;
                box-shadow: 0 12px 35px rgba(15, 23, 42, 0.10);
            }

            .tag {
                display: inline-block;
                padding: 7px 13px;
                border-radius: 20px;
                background: #dbeafe;
                color: #1d4ed8;
                font-size: 13px;
                font-weight: bold;
            }

            h1 {
                margin-top: 22px;
                color: #1d4ed8;
            }

            p {
                line-height: 1.8;
                color: #475569;
            }

            .student-info {
                margin-top: 22px;
                padding: 16px;
                background: #f8fafc;
                border-left: 4px solid #2563eb;
                border-radius: 8px;
                line-height: 2;
            }

            nav {
                display: flex;
                gap: 18px;
                margin-top: 25px;
            }

            a {
                color: #2563eb;
                text-decoration: none;
                font-weight: bold;
            }

            a:hover {
                text-decoration: underline;
            }

            .footer {
                margin-top: 28px;
                padding-top: 15px;
                border-top: 1px solid #e2e8f0;
                color: #94a3b8;
                font-size: 13px;
            }
        </style>
    </head>

    <body>
        <main class="container">
            ${noiDung}

            <div class="footer">
                Bài thực hành Node.js - HTTP Server | CĐ-CNTT18B
            </div>
        </main>
    </body>
    </html>
    `;
};

// Noi dung trang chu
const trangChu = () => {
    return taoTrang('Trang chu - Node.js', `
        <span class="tag">NODE.JS HTTP SERVER</span>

        <h1>Xin chào, chào mừng bạn!</h1>

        <p>
            Đây là trang web được xây dựng bằng module HTTP có sẵn
            trong Node.js. Cảm ơn bạn đã ghé thăm trang cá nhân của tôi.
        </p>

        <div class="student-info">
            <strong>Họ và tên:</strong> ${sinhVien.hoTen}<br>
            <strong>Mã sinh viên:</strong> ${sinhVien.maSinhVien}<br>
            <strong>Lớp:</strong> ${sinhVien.lop}
        </div>

        <nav>
            <a href="/">Trang chủ</a>
            <a href="/about">Giới thiệu</a>
        </nav>
    `);
};

// Noi dung trang gioi thieu
const trangGioiThieu = () => {
    return taoTrang('Gioi thieu ban than', `
        <span class="tag">ABOUT ME</span>

        <h1>Đôi nét về bản thân</h1>

        <p>
            Xin chào! Tôi là: ${sinhVien.hoTen}, hiện đang học lớp:
            ${sinhVien.lop}, chuyên ngành: Công nghệ thông tin.
        </p>

        <p>
            Tôi yêu thích công nghệ, máy tính và việc tìm hiểu cách
            xây dựng các ứng dụng. Hiện tại, tôi đang học lập trình
            Node.js để hiểu rõ hơn về cách một máy chủ web hoạt động.
        </p>

        <div class="student-info">
            <strong>Họ và tên:</strong> ${sinhVien.hoTen}<br>
            <strong>Mã sinh viên:</strong> ${sinhVien.maSinhVien}<br>
            <strong>Lớp:</strong> ${sinhVien.lop}<br>
            <strong>Mục tiêu:</strong> Từng bước nâng cao kỹ năng lập trình.
        </div>

        <nav>
            <a href="/">← Quay về trang chủ</a>
        </nav>
    `);
};

// Khoi tao HTTP Server
const server = http.createServer((req, res) => {
    const duongDan = req.url.split('?')[0];

    if (req.method === 'GET' && duongDan === '/') {
        res.writeHead(200, {
            'Content-Type': 'text/html; charset=utf-8'
        });
        res.end(trangChu());

    } else if (req.method === 'GET' && duongDan === '/about') {
        res.writeHead(200, {
            'Content-Type': 'text/html; charset=utf-8'
        });
        res.end(trangGioiThieu());

    } else {
        res.writeHead(404, {
            'Content-Type': 'text/html; charset=utf-8'
        });

        res.end(`
            <h1>404 - Không tìm thấy trang</h1>
            <p>Đường dẫn bạn truy cập không tồn tại.</p>
            <a href="/">Quay về trang chủ</a>
        `);
    }
});

// Khoi dong Server
server.listen(PORT, () => {
    console.log('====================================');
    console.log('       NODE.JS HTTP SERVER');
    console.log('====================================');
    console.log(`Server dang chay tai: http://localhost:${PORT}`);
    console.log('Trang chu: http://localhost:3000');
    console.log('Gioi thieu: http://localhost:3000/about');
    console.log('Nhan Ctrl + C de dung Server');
});
