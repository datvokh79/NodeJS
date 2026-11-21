
const http = require('http');

const PORT = 3001;

// ==========================================
// 1. GIAO DIỆN TRANG CHỦ
// ==========================================

function taoTrangChu() {
    return `
    <!DOCTYPE html>
    <html lang="vi">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Trung Tâm Xử Lý URL</title>

        <style>
            * {
                box-sizing: border-box;
                margin: 0;
                padding: 0;
            }

            body {
                font-family: "Segoe UI", Arial, sans-serif;
                background: #0b121b;
                color: #e8f0f5;
                min-height: 100vh;
                padding: 40px 20px;
            }

            .container {
                max-width: 920px;
                margin: auto;
            }

            header {
                display: flex;
                justify-content: space-between;
                align-items: center;
                margin-bottom: 55px;
            }

            .brand {
                display: flex;
                align-items: center;
                gap: 12px;
            }

            .logo {
                background: #173c43;
                color: #62e6cb;
                padding: 12px;
                border-radius: 10px;
                font-size: 20px;
            }

            .brand h2 {
                font-size: 17px;
                letter-spacing: 1px;
            }

            .brand p {
                color: #8ca3b5;
                font-size: 11px;
                margin-top: 4px;
            }

            .status {
                color: #62e6cb;
                background: #173c43;
                padding: 8px 13px;
                border-radius: 20px;
                font-size: 12px;
            }

            .hero h1 {
                font-size: clamp(32px, 6vw, 52px);
                margin-bottom: 12px;
            }

            .hero h1 span {
                color: #62e6cb;
            }

            .hero p {
                color: #91a5b5;
                line-height: 1.7;
            }

            .stats {
                display: grid;
                grid-template-columns: repeat(2, 1fr);
                gap: 15px;
                margin: 30px 0 40px;
            }

            .stat, .endpoint {
                background: #172431;
                border: 1px solid #273a49;
                border-radius: 13px;
                padding: 22px;
            }

            .stat small, .section-label {
                color: #91a5b5;
                font-size: 11px;
                letter-spacing: 1px;
            }

            .stat h2 {
                color: #62e6cb;
                font-size: 30px;
                margin-top: 8px;
            }

            .section-title {
                font-size: 13px;
                margin-bottom: 14px;
                letter-spacing: 1px;
            }

            .endpoint-list {
                display: grid;
                grid-template-columns: repeat(2, 1fr);
                gap: 15px;
            }

            /* Thẻ chức năng có thể nhấn */
            .endpoint-link {
                display: block;
                color: inherit;
                text-decoration: none;
                cursor: pointer;
                transition: all 0.25s ease;
            }

            .endpoint-link:hover {
                transform: translateY(-5px);
                border-color: #62e6cb;
                background: #1b303d;
                box-shadow: 0 10px 30px rgba(98, 230, 203, 0.10);
            }

            .endpoint-link:focus-visible {
                outline: 2px solid #62e6cb;
                outline-offset: 4px;
            }

            .endpoint h3 {
                color: #62e6cb;
                margin-bottom: 10px;
            }

            .method {
                color: #0b121b;
                background: #62e6cb;
                padding: 4px 8px;
                border-radius: 5px;
                font-size: 10px;
                float: right;
            }

            .endpoint p {
                color: #91a5b5;
                font-size: 13px;
                line-height: 1.6;
            }

            .endpoint code {
                display: block;
                margin-top: 14px;
                color: #62e6cb;
                overflow-wrap: anywhere;
            }

            .action-text {
                display: inline-block;
                margin-top: 18px;
                color: #62e6cb;
                font-size: 12px;
                font-weight: 600;
            }


            /* Khu vực nhập dữ liệu */
            .endpoint-form {
                margin-top: 18px;
            }

            .endpoint-form label {
                display: block;
                color: #91a5b5;
                font-size: 12px;
                margin-bottom: 7px;
            }

            .endpoint-form input {
                width: 100%;
                padding: 12px;
                border: 1px solid #344b5c;
                border-radius: 7px;
                background: #0b121b;
                color: #e8f0f5;
                font-size: 14px;
                outline: none;
                margin-bottom: 12px;
            }

            .endpoint-form input:focus {
                border-color: #62e6cb;
                box-shadow: 0 0 0 2px rgba(98, 230, 203, 0.12);
            }

            .endpoint-form button {
                width: 100%;
                padding: 12px;
                border: none;
                border-radius: 7px;
                background: #62e6cb;
                color: #0b121b;
                font-size: 13px;
                font-weight: 700;
                cursor: pointer;
                transition: 0.2s;
            }

            .endpoint-form button:hover {
                background: #8af5df;
                transform: translateY(-2px);
            }

            .endpoint-form button:disabled {
                opacity: 0.5;
                cursor: not-allowed;
                transform: none;
            }


            .console {
                background: #080e15;
                border: 1px solid #273a49;
                border-radius: 12px;
                padding: 20px;
                margin-top: 30px;
            }

            .console p {
                color: #62e6cb;
                font-family: Consolas, monospace;
                font-size: 13px;
                margin-top: 10px;
            }

            footer {
                color: #718797;
                font-size: 12px;
                text-align: center;
                margin-top: 35px;
            }

            @media (max-width: 600px) {
                header {
                    align-items: flex-start;
                    gap: 15px;
                    flex-direction: column;
                }

                .endpoint-list {
                    grid-template-columns: 1fr;
                }

                .stats {
                    grid-template-columns: 1fr;
                }
            }
        </style>
    </head>

    <body>
        <main class="container">

            <header>
                <div class="brand">
                    <div class="logo">⌘</div>
                    <div>
                        <h2>TRUNG TÂM XỬ LÝ URL</h2>
                        <p>HỆ THỐNG XỬ LÝ YÊU CẦU NODE.JS</p>
                    </div>
                </div>

                <div class="status">● HỆ THỐNG ĐANG HOẠT ĐỘNG</div>
            </header>

            <section class="hero">
                <h1>Quản lý và xử lý <span>URL.</span></h1>
                <p>
                    Chào mừng bạn đến với hệ thống xử lý URL được xây dựng
                    bằng Node.js. Chọn chức năng bên dưới để gửi yêu cầu
                    và xem kết quả xử lý trực tiếp.
                </p>
            </section>

            <section class="stats">
                <div class="stat">
                    <small>CỔNG MÁY CHỦ</small>
                    <h2>3001</h2>
                </div>

                <div class="stat">
                    <small>CHỨC NĂNG KHẢ DỤNG</small>
                    <h2>02</h2>
                </div>
            </section>

            <h3 class="section-title">DANH SÁCH CHỨC NĂNG</h3>

            
            <section class="endpoint-list">

                <!-- CHỨC NĂNG 1: GỬI LỜI CHÀO -->
                <div class="endpoint">
                    <span class="method">GET</span>
                    <h3>01. Gửi lời chào</h3>
                    <p>
                        Nhập tên của bạn bên dưới để hệ thống gửi
                        lời chào tương ứng.
                    </p>

                    <form class="endpoint-form" action="/hello" method="GET">
                        <label for="name">Tên người dùng</label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            placeholder="Ví dụ: Đạt"
                            maxlength="50"
                            required
                        >

                        <button type="submit">Gửi lời chào →</button>
                    </form>
                </div>

                <!-- CHỨC NĂNG 2: TÍNH TỔNG -->
                <div class="endpoint">
                    <span class="method">GET</span>
                    <h3>02. Tính tổng hai số</h3>
                    <p>
                        Nhập hai số bất kỳ để hệ thống thực hiện
                        phép tính và trả về kết quả.
                    </p>

                    <form class="endpoint-form" action="/sum" method="GET">
                        <label for="a">Số thứ nhất (a)</label>
                        <input
                            type="number"
                            id="a"
                            name="a"
                            step="any"
                            placeholder="Nhập số thứ nhất"
                            required
                        >

                        <label for="b">Số thứ hai (b)</label>
                        <input
                            type="number"
                            id="b"
                            name="b"
                            step="any"
                            placeholder="Nhập số thứ hai"
                            required
                        >

                        <button type="submit">Tính tổng →</button>
                    </form>
                </div>

            </section>


            <section class="console">
                <span class="section-label">BẢNG ĐIỀU KHIỂN HỆ THỐNG</span>
                <p>› Module HTTP đã sẵn sàng</p>
                <p>› Bộ phân tích URL đã sẵn sàng</p>
                <p>› Đang chờ yêu cầu từ người dùng...</p>
            </section>

            <footer>
                TRUNG TÂM XỬ LÝ URL · XÂY DỰNG BẰNG NODE.JS
            </footer>

        </main>
    </body>
    </html>
    `;
}


// ==========================================
// 2. GIAO DIỆN TRANG KẾT QUẢ
// ==========================================

function taoTrangPhanHoi(tieuDe, noiDung, trangThai, thanhCong = true) {
    const mauTrangThai = thanhCong ? '#62e6cb' : '#ff7373';

    return `
    <!DOCTYPE html>
    <html lang="vi">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>${tieuDe} | Trung Tâm Xử Lý URL</title>

        <style>
            * {
                box-sizing: border-box;
                margin: 0;
                padding: 0;
            }

            body {
                background: #0b121b;
                color: #e8f0f5;
                font-family: "Segoe UI", Arial, sans-serif;
                min-height: 100vh;
                display: grid;
                place-items: center;
                padding: 20px;
            }

            .panel {
                width: 100%;
                max-width: 620px;
                background: #172431;
                border: 1px solid #273a49;
                border-radius: 16px;
                padding: 30px;
            }

            .brand {
                color: #62e6cb;
                font-size: 13px;
                letter-spacing: 1.5px;
                margin-bottom: 30px;
            }

            .status {
                display: inline-block;
                color: ${mauTrangThai};
                background: #24313b;
                padding: 7px 12px;
                border-radius: 20px;
                font-size: 12px;
                margin-bottom: 18px;
            }

            h1 {
                font-size: 27px;
                margin-bottom: 15px;
            }

            .content {
                color: #c3d1dc;
                line-height: 1.7;
                overflow-wrap: anywhere;
            }

            .result {
                color: ${mauTrangThai};
                font-size: 30px;
                font-weight: 700;
                margin: 15px 0;
            }

            a {
                display: inline-block;
                margin-top: 28px;
                color: #62e6cb;
                text-decoration: none;
                border: 1px solid #345b59;
                padding: 10px 16px;
                border-radius: 8px;
                transition: all 0.2s ease;
            }

            a:hover {
                background: #173c43;
            }
        </style>
    </head>

    <body>
        <main class="panel">

            <div class="brand">⌘ TRUNG TÂM XỬ LÝ URL</div>

            <div class="status">${trangThai}</div>

            <h1>${tieuDe}</h1>

            <div class="content">${noiDung}</div>

            <a href="/">← Quay lại trang chủ</a>

        </main>
    </body>
    </html>
    `;
}


// ==========================================
// 3. HÀM GỬI PHẢN HỒI
// ==========================================

function guiPhanHoi(res, maTrangThai, tieuDe, noiDung, thanhCong) {
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


// ==========================================
// 4. HÀM MÃ HÓA HTML
// ==========================================

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


// ==========================================
// 5. TẠO WEB SERVER VÀ XỬ LÝ URL
// ==========================================

const server = http.createServer((req, res) => {

    // Phân tích URL từ yêu cầu gửi đến
    const url = new URL(
        req.url,
        `http://${req.headers.host || 'localhost'}`
    );

    const duongDan = url.pathname;

    // Chỉ hỗ trợ phương thức GET
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


    // --------------------------------------
    // TRANG CHỦ
    // --------------------------------------

    if (duongDan === '/') {
        res.writeHead(200, {
            'Content-Type': 'text/html; charset=utf-8'
        });

        res.end(taoTrangChu());
        return;
    }


    // --------------------------------------
    // CHỨC NĂNG 1: GỬI LỜI CHÀO
    // --------------------------------------

    if (duongDan === '/hello') {

        // Lấy tham số name từ URL
        const ten = url.searchParams.get('name');

        // Kiểm tra dữ liệu đầu vào
        if (ten === null || ten.trim() === '') {
            guiPhanHoi(
                res,
                400,
                'Thiếu thông tin người dùng',
                '<p>Vui lòng cung cấp tham số <strong>name</strong>.</p><p>Ví dụ: /hello?name=Dat</p>',
                false
            );
            return;
        }

        // Trả về lời chào
        guiPhanHoi(
            res,
            200,
            'Lời chào từ hệ thống',
            `<div class="result">Xin chào ${maHoaHTML(ten.trim())}!</div>
             <p>Yêu cầu đã được xử lý thành công.</p>`,
            true
        );
        return;
    }


    // --------------------------------------
    // CHỨC NĂNG 2: TÍNH TỔNG HAI SỐ
    // --------------------------------------

    if (duongDan === '/sum') {

        // Lấy hai tham số a và b từ URL
        const giaTriA = url.searchParams.get('a');
        const giaTriB = url.searchParams.get('b');

        // Kiểm tra tham số có bị thiếu hay không
        if (
            giaTriA === null || giaTriA.trim() === '' ||
            giaTriB === null || giaTriB.trim() === ''
        ) {
            guiPhanHoi(
                res,
                400,
                'Thiếu tham số tính toán',
                '<p>Vui lòng cung cấp đầy đủ hai tham số <strong>a</strong> và <strong>b</strong>.</p><p>Ví dụ: /sum?a=10&amp;b=20</p>',
                false
            );
            return;
        }

        // Chuyển dữ liệu từ chuỗi sang số
        const a = Number(giaTriA);
        const b = Number(giaTriB);

        // Kiểm tra dữ liệu có phải số hợp lệ không
        if (!Number.isFinite(a) || !Number.isFinite(b)) {
            guiPhanHoi(
                res,
                400,
                'Dữ liệu không hợp lệ',
                '<p>Hai tham số a và b phải là những giá trị số hợp lệ.</p>',
                false
            );
            return;
        }

        // Thực hiện phép tính
        const tong = a + b;

        // Trả về kết quả
        guiPhanHoi(
            res,
            200,
            'Kết quả phép tính',
            `<div class="result">Tổng = ${tong}</div>
             <p>Giá trị A: ${a}</p>
             <p>Giá trị B: ${b}</p>
             <p>Phép tính: ${a} + ${b}</p>`,
            true
        );
        return;
    }


    // --------------------------------------
    // ĐƯỜNG DẪN KHÔNG TỒN TẠI
    // --------------------------------------

    guiPhanHoi(
        res,
        404,
        'Không tìm thấy đường dẫn',
        '<p>Địa chỉ bạn truy cập không tồn tại trong hệ thống.</p><p>Vui lòng quay lại trang chủ để chọn chức năng.</p>',
        false
    );

});


// ==========================================
// 6. KHỞI ĐỘNG SERVER
// ==========================================

server.listen(PORT, () => {
    console.log('==========================================');
    console.log('          TRUNG TAM XU LY URL');
    console.log('==========================================');
    console.log(`Server dang chay tai: http://localhost:${PORT}`);
    console.log('Trang thai: ONLINE');
    console.log('Nhan Ctrl + C de dung Server.');
    console.log('==========================================');
});
