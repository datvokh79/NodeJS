
const { MongoClient } = require('mongodb');

// ======================================================
// CAMPUS CONNECT - ACADEMIC DATA LINKING SYSTEM
// Bài 10: Liên kết hai Collection trong MongoDB
// Sinh viên: Võ Tiến Đạt
// Lớp: CĐ-CNTT18B
// ======================================================

// 1. CẤU HÌNH HỆ THỐNG
const CAU_HINH = {
    uri: 'mongodb://127.0.0.1:27017',
    database: 'qlsinhvien',
    collections: {
        departments: 'departments',
        students: 'students_join'
    }
};

const client = new MongoClient(CAU_HINH.uri);

// ======================================================
// 2. BẢNG MÀU TERMINAL
// ======================================================

const mau = {
    reset: '\x1b[0m',
    dam: '\x1b[1m',
    mo: '\x1b[2m',
    xanh: '\x1b[32m',
    do: '\x1b[31m',
    vang: '\x1b[33m',
    cyan: '\x1b[36m',
    trang: '\x1b[37m',
    xanhNen: '\x1b[44m',
    xanhLaNen: '\x1b[42m'
};

// ======================================================
// 3. CÁC HÀM GIAO DIỆN
// ======================================================

function inDuongKe() {
    console.log(mau.cyan + '─'.repeat(90) + mau.reset);
}

function inTieuDe(tieuDe) {
    console.log('');
    inDuongKe();
    console.log(`${mau.dam}${mau.cyan}  ${tieuDe}${mau.reset}`);
    inDuongKe();
}

function inThongBao(noiDung, trangThai = 'success') {
    const bieuTuong = {
        success: '✔',
        warning: '!',
        error: '✖'
    };

    const mauSac = {
        success: mau.xanh,
        warning: mau.vang,
        error: mau.do
    };

    console.log(
        `${mauSac[trangThai]}  ${bieuTuong[trangThai]} ${noiDung}${mau.reset}`
    );
}

function inThongTin(nhan, giaTri, mauSac = mau.trang) {
    console.log(
        `  ${mau.mo}${nhan.padEnd(25)}${mau.reset}: ${mauSac}${giaTri}${mau.reset}`
    );
}

// Căn chỉnh nội dung bảng theo độ rộng ký tự Unicode.
// Xử lý ký tự tiếng Việt và ký tự có dấu kết hợp.
function doRongChuoi(chuoi) {
    return [...String(chuoi)].reduce((tong, kyTu) => {
        const ma = kyTu.codePointAt(0);

        // Ký tự tổ hợp dấu tiếng Việt không chiếm thêm độ rộng.
        if (/\p{Mark}/u.test(kyTu)) return tong;

        // Một số ký tự CJK và ký tự full-width chiếm 2 cột.
        return tong + (
            (ma >= 0x1100 && (
                ma <= 0x115F ||
                ma === 0x2329 ||
                ma === 0x232A ||
                (ma >= 0x2E80 && ma <= 0xA4CF) ||
                (ma >= 0xAC00 && ma <= 0xD7A3) ||
                (ma >= 0xF900 && ma <= 0xFAFF) ||
                (ma >= 0xFE10 && ma <= 0xFE6F) ||
                (ma >= 0xFF00 && ma <= 0xFF60)
            )) ? 2 : 1
        );
    }, 0);
}

function canTrai(noiDung, doRong) {
    const chuoi = String(noiDung);
    const rong = doRongChuoi(chuoi);

    if (rong > doRong) {
        let ketQua = '';
        let tong = 0;

        for (const kyTu of chuoi) {
            const kyTuRong = doRongChuoi(kyTu);

            if (tong + kyTuRong > doRong - 1) break;

            ketQua += kyTu;
            tong += kyTuRong;
        }

        return ketQua + '…' + ' '.repeat(doRong - tong - 1);
    }

    return chuoi + ' '.repeat(doRong - rong);
}

function inBangDuLieu(danhSach) {
    const cot = [
        { ten: 'STT', rong: 5 },
        { ten: 'Mã sinh viên', rong: 17 },
        { ten: 'Họ và tên', rong: 25 },
        { ten: 'Mã khoa', rong: 12 },
        { ten: 'Tên khoa', rong: 27 }
    ];

    const dongKe = () =>
        '+' + cot.map(c => '-'.repeat(c.rong + 2)).join('+') + '+';

    const taoDong = (duLieu) =>
        '| ' + duLieu.map((giaTri, index) =>
            canTrai(giaTri, cot[index].rong)
        ).join(' | ') + ' |';

    console.log(mau.cyan + dongKe() + mau.reset);

    console.log(
        mau.dam + mau.cyan +
        taoDong(cot.map(c => c.ten)) +
        mau.reset
    );

    console.log(mau.cyan + dongKe() + mau.reset);

    if (danhSach.length === 0) {
        console.log(mau.vang + '|                 KHÔNG CÓ DỮ LIỆU LIÊN KẾT                 |' + mau.reset);
    } else {
        danhSach.forEach((sv, index) => {
            console.log(
                mau.trang +
                taoDong([
                    index + 1,
                    sv.masv,
                    sv.hoten,
                    sv.makhoa,
                    sv.tenkhoa || 'Chưa xác định'
                ]) +
                mau.reset
            );
        });
    }

    console.log(mau.cyan + dongKe() + mau.reset);
}

// ======================================================
// 4. CHUẨN BỊ DỮ LIỆU KHOA VÀ SINH VIÊN
// ======================================================

async function khoiTaoDuLieu(departments, students) {

    inTieuDe('01. KHỞI TẠO DỮ LIỆU HỌC VỤ');

    const danhSachKhoa = [
        {
            makhoa: 'CNTT',
            tenkhoa: 'Công nghệ thông tin'
        },
        {
            makhoa: 'QTKD',
            tenkhoa: 'Quản trị kinh doanh'
        },
        {
            makhoa: 'KT',
            tenkhoa: 'Kế toán'
        }
    ];

    const danhSachSinhVien = [
        {
            masv: 'CDCNTT18B01',
            hoten: 'Võ Đức Anh',
            makhoa: 'CNTT'
        },
        {
            masv: 'CDCNTT18B05',
            hoten: 'Nguyễn Thành Danh',
            makhoa: 'CNTT'
        },
        {
            masv: 'CDCNTT18B08',
            hoten: 'Cao Bảo Đại',
            makhoa: 'CNTT'
        },
        {
            masv: 'CDCNTT18B09',
            hoten: 'Võ Tiến Đạt',
            makhoa: 'QTKD'
        },
        {
            masv: 'CDCNTT18B17',
            hoten: 'Nguyễn Thành Long',
            makhoa: 'QTKD'
        },
        {
            masv: 'CDCNTT18B06',
            hoten: 'Nguyễn Đức Dưỡng',
            makhoa: 'KT'
        }
    ];

    // Làm mới hai Collection phục vụ bài thực hành.
    // Không ảnh hưởng đến students_test của Bài 9.
    const khoaCu = await departments.deleteMany({});
    const sinhVienCu = await students.deleteMany({});

    inThongTin('Khoa cũ đã xóa', khoaCu.deletedCount);
    inThongTin('Sinh viên cũ đã xóa', sinhVienCu.deletedCount);

    // Thêm dữ liệu khoa.
    const ketQuaKhoa = await departments.insertMany(danhSachKhoa);

    // Thêm dữ liệu sinh viên.
    const ketQuaSinhVien = await students.insertMany(danhSachSinhVien);

    inThongTin('Số khoa đã thêm', ketQuaKhoa.insertedCount, mau.xanh);
    inThongTin('Số sinh viên đã thêm', ketQuaSinhVien.insertedCount, mau.xanh);

    inThongBao('Khởi tạo dữ liệu thành công!');

    return {
        soKhoa: ketQuaKhoa.insertedCount,
        soSinhVien: ketQuaSinhVien.insertedCount
    };
}

// ======================================================
// 5. KIỂM TRA DỮ LIỆU NGUỒN
// ======================================================

async function kiemTraDuLieu(departments, students) {

    inTieuDe('02. KIỂM TRA DỮ LIỆU NGUỒN');

    const soKhoa = await departments.countDocuments();
    const soSinhVien = await students.countDocuments();

    inThongTin('Collection departments', soKhoa);
    inThongTin('Collection students_join', soSinhVien);

    if (soKhoa >= 2 && soSinhVien >= 4) {
        inThongBao('Dữ liệu đáp ứng yêu cầu bài thực hành!');
    } else {
        inThongBao('Dữ liệu chưa đủ số lượng yêu cầu!', 'error');
        throw new Error('Không đủ dữ liệu để thực hiện liên kết.');
    }

    return { soKhoa, soSinhVien };
}

// ======================================================
// 6. LIÊN KẾT HAI COLLECTION BẰNG $LOOKUP
// ======================================================

async function lienKetSinhVienVaKhoa(students) {

    inTieuDe('03. THỰC HIỆN TRUY VẤN AGGREGATE + $LOOKUP');

    console.log('');
    inThongTin('Collection chính', 'students_join');
    inThongTin('Collection liên kết', 'departments');
    inThongTin('Trường liên kết', 'makhoa');
    inThongTin('Phương thức', 'aggregate() + $lookup');

    // Pipeline liên kết hai Collection.
    const pipeline = [
        {
            $lookup: {
                from: 'departments',
                localField: 'makhoa',
                foreignField: 'makhoa',
                as: 'thongTinKhoa'
            }
        },
        {
            $unwind: {
                path: '$thongTinKhoa',
                preserveNullAndEmptyArrays: true
            }
        },
        {
            $project: {
                _id: 0,
                masv: 1,
                hoten: 1,
                makhoa: 1,
                tenkhoa: {
                    $ifNull: [
                        '$thongTinKhoa.tenkhoa',
                        'Chưa xác định'
                    ]
                }
            }
        },
        {
            $sort: {
                masv: 1
            }
        }
    ];

    const ketQua = await students.aggregate(pipeline).toArray();

    inThongBao('Truy vấn liên kết đã thực hiện thành công!');

    return ketQua;
}

// ======================================================
// 7. HIỂN THỊ KẾT QUẢ LIÊN KẾT
// ======================================================

function hienThiKetQua(danhSach) {

    inTieuDe('04. DANH SÁCH SINH VIÊN KÈM TÊN KHOA');

    inBangDuLieu(danhSach);

    const lienKetThanhCong = danhSach.filter(
        sv => sv.tenkhoa !== 'Chưa xác định'
    ).length;

    const chuaLienKet = danhSach.length - lienKetThanhCong;

    console.log('');
    inThongTin('Tổng sinh viên', danhSach.length, mau.cyan);
    inThongTin('Liên kết thành công', lienKetThanhCong, mau.xanh);
    inThongTin('Chưa tìm thấy khoa', chuaLienKet, mau.vang);

    return {
        tong: danhSach.length,
        thanhCong: lienKetThanhCong,
        thatBai: chuaLienKet
    };
}

// ======================================================
// 8. BÁO CÁO TỔNG KẾT
// ======================================================

function baoCaoKetQua(thongKe) {

    inTieuDe('05. BÁO CÁO TỔNG KẾT');

    console.log('');
    inThongTin('Hệ thống', 'CAMPUS CONNECT');
    inThongTin('Database', CAU_HINH.database);
    inThongTin('Tổng sinh viên', thongKe.tong);
    inThongTin('Liên kết thành công', thongKe.thanhCong, mau.xanh);
    inThongTin('Liên kết chưa thành công', thongKe.thatBai, mau.vang);

    console.log('');

    if (thongKe.thatBai === 0 && thongKe.tong > 0) {
        inThongBao('Tất cả sinh viên đã được liên kết với khoa!');
    } else if (thongKe.thanhCong > 0) {
        inThongBao('Một số sinh viên chưa tìm thấy thông tin khoa.', 'warning');
    } else {
        inThongBao('Không có sinh viên nào được liên kết.', 'error');
    }

    console.log('');
    inDuongKe();

    console.log(
        mau.dam + mau.xanh +
        '             CAMPUS CONNECT - DATA LINKING COMPLETED' +
        mau.reset
    );

    inDuongKe();
}

// ======================================================
// 9. CHƯƠNG TRÌNH CHÍNH
// ======================================================

async function khoiChay() {

    let daKetNoi = false;

    try {

        console.clear();

        console.log('');
        console.log(mau.xanhNen + mau.trang + mau.dam);
        console.log('                                                                                          ');
        console.log('                   CAMPUS CONNECT - ACADEMIC DATA LINKING SYSTEM                         ');
        console.log('                       HỆ THỐNG LIÊN KẾT DỮ LIỆU SINH VIÊN                                ');
        console.log('                                                                                          ');
        console.log(mau.reset);

        console.log('');
        inThongBao('Đang khởi động hệ thống...');

        // Kết nối MongoDB.
        await client.connect();
        daKetNoi = true;

        const db = client.db(CAU_HINH.database);

        const departments = db.collection(
            CAU_HINH.collections.departments
        );

        const students = db.collection(
            CAU_HINH.collections.students
        );

        inThongBao('Kết nối MongoDB thành công!');

        inThongTin('Database', CAU_HINH.database);
        inThongTin('Collection 1', CAU_HINH.collections.departments);
        inThongTin('Collection 2', CAU_HINH.collections.students);

        // Bước 1: Khởi tạo dữ liệu.
        await khoiTaoDuLieu(departments, students);

        // Bước 2: Kiểm tra dữ liệu.
        await kiemTraDuLieu(departments, students);

        // Bước 3: Liên kết hai Collection.
        const ketQuaLienKet = await lienKetSinhVienVaKhoa(students);

        // Bước 4: Hiển thị kết quả.
        const thongKe = hienThiKetQua(ketQuaLienKet);

        // Bước 5: Báo cáo tổng kết.
        baoCaoKetQua(thongKe);

    } catch (error) {

        console.log('');
        inThongBao(`Lỗi hệ thống: ${error.message}`, 'error');

        if (error.stack) {
            console.log(mau.mo + error.stack + mau.reset);
        }

    } finally {

        if (daKetNoi) {
            await client.close();
            inThongBao('Đã đóng kết nối MongoDB.');
        }

        console.log('');
        console.log(
            mau.mo + '  Chương trình CAMPUS CONNECT đã kết thúc.' + mau.reset
        );
    }
}

// ======================================================
// 10. KHỞI ĐỘNG CHƯƠNG TRÌNH
// ======================================================

khoiChay();
