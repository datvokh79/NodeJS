
const { MongoClient } = require('mongodb');

// ==========================================
// 1. CẤU HÌNH HỆ THỐNG
// ==========================================

const URI = 'mongodb://127.0.0.1:27017';
const TEN_DATABASE = 'qlsinhvien';
const TEN_COLLECTION = 'students_test';

const client = new MongoClient(URI);

// Mã màu giao diện Terminal
const mau = {
    reset: '\x1b[0m',
    dam: '\x1b[1m',
    mo: '\x1b[2m',
    do: '\x1b[31m',
    xanhLa: '\x1b[32m',
    vang: '\x1b[33m',
    xanhDuong: '\x1b[36m',
    trang: '\x1b[37m',
    nenXanh: '\x1b[44m'
};

// ==========================================
// 2. CÁC HÀM GIAO DIỆN
// ==========================================

function inDuongKe() {
    console.log(mau.xanhDuong + '─'.repeat(76) + mau.reset);
}

function inTieuDe(tieuDe) {
    console.log('');
    inDuongKe();
    console.log(
        mau.dam + mau.xanhDuong +
        '  ' + tieuDe +
        mau.reset
    );
    inDuongKe();
}

function inThongBao(noiDung, trangThai = 'thanhCong') {
    const mauSac = trangThai === 'loi'
        ? mau.do
        : trangThai === 'canhBao'
            ? mau.vang
            : mau.xanhLa;

    const bieuTuong = trangThai === 'loi'
        ? '✖'
        : trangThai === 'canhBao'
            ? '!'
            : '✔';

    console.log(`${mauSac}  ${bieuTuong} ${noiDung}${mau.reset}`);
}

function inSoLieu(nhan, giaTri, mauSac = mau.trang) {
    console.log(`  ${mau.mo}${nhan}:${mau.reset} ${mauSac}${giaTri}${mau.reset}`);
}

// Hàm căn chỉnh nội dung trong bảng
function canTrai(noiDung, doRong) {
    const chuoi = String(noiDung);
    return chuoi.length >= doRong
        ? chuoi.slice(0, doRong - 1) + '…'
        : chuoi.padEnd(doRong);
}

function inDanhSachSinhVien(danhSach) {
    const rong = [5, 17, 27, 8, 8];

    const dongKe = () =>
        '+' + rong.map(w => '-'.repeat(w + 2)).join('+') + '+';

    const taoDong = (duLieu) =>
        '| ' + duLieu.map((giaTri, i) =>
            canTrai(giaTri, rong[i])
        ).join(' | ') + ' |';

    console.log(mau.xanhDuong + dongKe() + mau.reset);

    console.log(
        mau.dam + mau.xanhDuong +
        taoDong(['STT', 'Mã sinh viên', 'Họ và tên', 'Tuổi', 'Điểm']) +
        mau.reset
    );

    console.log(mau.xanhDuong + dongKe() + mau.reset);

    if (danhSach.length === 0) {
        console.log('|                 KHÔNG CÓ DỮ LIỆU                                |');
    } else {
        danhSach.forEach((sv, index) => {
            console.log(
                mau.trang +
                taoDong([
                    index + 1,
                    sv.masv,
                    sv.hoten,
                    sv.tuoi,
                    sv.diem
                ]) +
                mau.reset
            );
        });
    }

    console.log(mau.xanhDuong + dongKe() + mau.reset);
}

// ==========================================
// 3. CHUẨN BỊ DỮ LIỆU SINH VIÊN
// ==========================================

async function chuanBiDuLieu(collection) {
    const danhSachSinhVien = [
        { masv: 'CDCNTT18B05', hoten: 'Nguyễn Thành Danh', tuoi: 20, diem: 8.5 },
        { masv: 'CDCNTT18B17', hoten: 'Nguyễn Thành Long', tuoi: 21, diem: 4.2 },
        { masv: 'CDCNTT18B08', hoten: 'Cao Bảo Đại', tuoi: 20, diem: 7.8 },
        { masv: 'CDCNTT18B06', hoten: 'Nguyễn Đức Dưỡng', tuoi: 19, diem: 3.5 },
        { masv: 'CDCNTT18B09', hoten: 'Võ Tiến Đạt', tuoi: 21, diem: 9.0 },
        { masv: 'CDCNTT18B01', hoten: 'Võ Đức Anh', tuoi: 20, diem: 6.5 }
    ];

    inTieuDe('01. CHUẨN BỊ DỮ LIỆU');

    // Chỉ làm sạch collection thử nghiệm
    const ketQuaDatLai = await collection.deleteMany({});

    inSoLieu('Dữ liệu cũ đã xóa', ketQuaDatLai.deletedCount);

    const ketQuaThem = await collection.insertMany(danhSachSinhVien);

    inSoLieu('Sinh viên được thêm', ketQuaThem.insertedCount, mau.xanhLa);
    inThongBao('Chuẩn bị dữ liệu thành công!');

    return ketQuaThem.insertedCount;
}

// ==========================================
// 4. HIỂN THỊ DANH SÁCH SINH VIÊN
// ==========================================

async function hienThiDanhSach(collection, tieuDe) {
    const danhSach = await collection.find({})
        .sort({ masv: 1 })
        .toArray();

    inTieuDe(tieuDe);
    inDanhSachSinhVien(danhSach);

    inSoLieu('Tổng số sinh viên', danhSach.length, mau.xanhDuong);

    return danhSach;
}

// ==========================================
// 5. XÓA MỘT SINH VIÊN BẰNG deleteOne()
// ==========================================

async function xoaMotSinhVien(collection) {
    const maSinhVien = 'CDCNTT18B09';

    inTieuDe('02. XÓA MỘT SINH VIÊN');

    const ketQua = await collection.deleteOne({
        masv: maSinhVien
    });

    inSoLieu('Mã sinh viên', maSinhVien);

    if (ketQua.deletedCount > 0) {
        inThongBao('Đã xóa thành công sinh viên!', 'thanhCong');
    } else {
        inThongBao('Không tìm thấy sinh viên cần xóa!', 'canhBao');
    }

    inSoLieu('Số bản ghi đã xóa', ketQua.deletedCount, mau.vang);

    return ketQua.deletedCount;
}

// ==========================================
// 6. XÓA SINH VIÊN ĐIỂM DƯỚI 5 BẰNG deleteMany()
// ==========================================

async function xoaSinhVienDiemThap(collection) {
    inTieuDe('03. XÓA SINH VIÊN CÓ ĐIỂM DƯỚI 5');

    const dieuKienXoa = {
        diem: { $lt: 5 }
    };

    const ketQua = await collection.deleteMany(dieuKienXoa);

    inSoLieu('Điều kiện', 'Điểm < 5');

    if (ketQua.deletedCount > 0) {
        inThongBao('Đã xóa các sinh viên không đạt yêu cầu!');
    } else {
        inThongBao('Không có sinh viên nào thỏa mãn điều kiện.', 'canhBao');
    }

    inSoLieu('Số bản ghi đã xóa', ketQua.deletedCount, mau.vang);

    return ketQua.deletedCount;
}

// ==========================================
// 7. THỐNG KÊ VÀ BÁO CÁO KẾT QUẢ
// ==========================================

async function thongKeKetQua(collection, soLuongBanDau, soXoaMot, soXoaNhieu) {
    const danhSachConLai = await hienThiDanhSach(
        collection,
        '04. DANH SÁCH SINH VIÊN CÒN LẠI'
    );

    const tongSoDaXoa = soXoaMot + soXoaNhieu;

    inTieuDe('05. BÁO CÁO TỔNG KẾT');

    console.log('');
    inSoLieu('Cơ sở dữ liệu', TEN_DATABASE);
    inSoLieu('Collection', TEN_COLLECTION);

    console.log('');

    inSoLieu('Tổng số ban đầu', soLuongBanDau, mau.xanhDuong);
    inSoLieu('Xóa bằng deleteOne()', soXoaMot, mau.vang);
    inSoLieu('Xóa bằng deleteMany()', soXoaNhieu, mau.vang);

    inDuongKe();

    inSoLieu('TỔNG SỐ ĐÃ XÓA', tongSoDaXoa, mau.do);
    inSoLieu('TỔNG SỐ CÒN LẠI', danhSachConLai.length, mau.xanhLa);

    inDuongKe();

    if (soLuongBanDau === tongSoDaXoa + danhSachConLai.length) {
        inThongBao('Kết quả thống kê hợp lệ!');
    } else {
        inThongBao('Số liệu thống kê chưa khớp!', 'loi');
    }

    console.log('');
    console.log(
        mau.dam + mau.xanhLa +
        '          CAMPUS LEDGER - HOÀN TẤT XỬ LÝ DỮ LIỆU' +
        mau.reset
    );
}

// ==========================================
// 8. CHƯƠNG TRÌNH CHÍNH
// ==========================================

async function khoiChay() {
    let daKetNoi = false;

    try {
        console.clear();

        console.log('');
        console.log(mau.nenXanh + mau.trang + mau.dam);
        console.log('                                                                            ');
        console.log('                  CAMPUS LEDGER - STUDENT MANAGEMENT                       ');
        console.log('                  HỆ THỐNG QUẢN LÝ HỒ SƠ SINH VIÊN                          ');
        console.log('                                                                            ');
        console.log(mau.reset);

        console.log('');
        inThongBao('Đang khởi tạo hệ thống...');

        await client.connect();
        daKetNoi = true;

        const db = client.db(TEN_DATABASE);
        const collection = db.collection(TEN_COLLECTION);

        inThongBao('Kết nối MongoDB thành công!');
        inSoLieu('Database', TEN_DATABASE);
        inSoLieu('Collection', TEN_COLLECTION);

        // Bước 1: Chuẩn bị dữ liệu
        const soLuongBanDau = await chuanBiDuLieu(collection);

        // Bước 2: Hiển thị danh sách ban đầu
        await hienThiDanhSach(
            collection,
            'DANH SÁCH SINH VIÊN BAN ĐẦU'
        );

        // Bước 3: Xóa một sinh viên theo mã
        const soXoaMot = await xoaMotSinhVien(collection);

        // Bước 4: Xóa tất cả sinh viên có điểm dưới 5
        const soXoaNhieu = await xoaSinhVienDiemThap(collection);

        // Bước 5: Thống kê kết quả cuối cùng
        await thongKeKetQua(
            collection,
            soLuongBanDau,
            soXoaMot,
            soXoaNhieu
        );

    } catch (error) {
        console.log('');
        inThongBao(`Lỗi hệ thống: ${error.message}`, 'loi');

    } finally {
        if (daKetNoi) {
            await client.close();
            inThongBao('Đã đóng kết nối MongoDB.');
        }

        console.log('');
        console.log(mau.mo + '  Chương trình CAMPUS LEDGER đã kết thúc.' + mau.reset);
    }
}

// ==========================================
// 9. KHỞI ĐỘNG CHƯƠNG TRÌNH
// ==========================================

khoiChay();
