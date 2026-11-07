
const http = require('http');

const PORT = 3000;

// Thong tin sinh vien
const student = {
    name: 'Võ Tiến Đạt',
    class: 'CĐ-CNTT18B',
    studentId: 'CDCNTT18B09'
};

// Khoi tao HTTP Server
const server = http.createServer((req, res) => {

    if (req.url === '/' && req.method === 'GET') {

        res.writeHead(200, {
            'Content-Type': 'text/html; charset=utf-8'
        });

        res.end(`
            <!DOCTYPE html>
            <html lang="vi">
            <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <title>Node.js - Thông tin sinh viên</title>

                <style>
                    body {
                        margin: 0;
                        min-height: 100vh;
                        display: flex;
                        justify-content: center;
                        align-items: center;
                        font-family: Arial, sans-serif;
                        background: #eef2f7;
                    }

                    .card {
                        width: 90%;
                        max-width: 500px;
                        padding: 40px;
                        text-align: center;
                        background: white;
                        border-radius: 16px;
                        box-shadow: 0 8px 30px rgba(0,0,0,0.08);
                    }

                    h1 {
                        color: #2563eb;
                    }

                    .name {
                        font-size: 26px;
                        font-weight: bold;
                        margin: 25px 0;
                        color: #1e293b;
                    }

                    .info {
                        line-height: 2;
                        color: #64748b;
                    }

                    .status {
                        margin-top: 25px;
                        color: #15803d;
                        font-weight: bold;
                    }
                </style>
            </head>

            <body>
                <div class="card">
                    <h1>Node.js HTTP Server</h1>

                    <p>Thông tin sinh viên</p>

                    <div class="name">${student.name}</div>

                    <div class="info">
                        Mã sinh viên: ${student.studentId}<br>
                        Lớp: ${student.class}
                    </div>

                    <div class="status">
                        Server đang hoạt động
                    </div>
                </div>
            </body>
            </html>
        `);

    } else {
        res.writeHead(404, {
            'Content-Type': 'text/html; charset=utf-8'
        });

        res.end('<h1>404 - Không tìm thấy trang</h1>');
    }
});

// Khoi dong Server
server.listen(PORT, () => {
    console.log(`Server dang chay tai http://localhost:${PORT}`);
});
