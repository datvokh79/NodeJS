
const express = require('express');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Phục vụ CSS, JavaScript và hình ảnh
app.use(express.static(path.join(__dirname, 'public')));

// Kết nối hệ thống Route
const pageRoutes = require('./routes/pageRoutes');
app.use('/', pageRoutes);

// Xử lý trang không tồn tại
app.use((req, res) => {
    res.status(404).sendFile(
        path.join(__dirname, 'views', '404.html')
    );
});

// Khởi động server
app.listen(PORT, () => {
    console.log(`Server đang chạy tại http://localhost:${PORT}`);
});
