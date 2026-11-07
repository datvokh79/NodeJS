
const http = require('http');

const PORT = 3000;

const server = http.createServer((req, res) => {

    res.writeHead(200, {
        'Content-Type': 'text/html; charset=utf-8'
    });

    res.end(`
        <!DOCTYPE html>
        <html lang="vi">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>HTTP Server - Vo Tien Dat</title>

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
                    background: #eef2f7;
                    color: #263445;
                }

                .container {
                    width: 90%;
                    max-width: 600px;
                    padding: 45px 30px;
                    text-align: center;
                    background: white;
                    border-radius: 16px;
                    box-shadow: 0 10px 35px rgba(0,0,0,0.08);
                }

                h1 {
                    color: #2563eb;
                    margin-bottom: 12px;
                }

                .name {
                    font-size: 26px;
                    font-weight: bold;
                    margin: 25px 0 10px;
                }

                .info {
                    color: #64748b;
                    line-height: 1.8;
                }

                .status {
                    display: inline-block;
                    margin-top: 25px;
                    padding: 10px 18px;
                    color: #15803d;
                    background: #dcfce7;
                    border-radius: 30px;
                    font-size: 14px;
                }
            </style>
        </head>

        <body>
            <div class="container">
                <h1>HTTP Server đầu tiên</h1>

                <p>Chào mừng bạn đến với ứng dụng Node.js!</p>

                <div class="name">Võ Tiến Đạt</div>

                <div class="info">
                    Lớp: CĐ-CNTT18B<br>
                    MSSV: CDCNTT18B09<br>
                    Môn học: Node.js và MongoDB<br>
                    Máy chủ: Node.js HTTP Module
                </div>

                <div class="status">
                    ● Server đang hoạt động
                </div>
            </div>
        </body>
        </html>
    `);
});

server.listen(PORT, () => {
    console.log(`HTTP Server dang chay tai http://localhost:${PORT}`);
});
