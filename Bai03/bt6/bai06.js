
const {
    tinhDiemTrungBinh,
    xepLoaiHocTap
} = require('./xulyDiem');

// ==========================================
// 1. MAU SAC ANSI
// ==========================================
const mau = {
    reset: '\x1b[0m',
    dam: '\x1b[1m',
    xanh: '\x1b[36m',
    trang: '\x1b[37m',
    vang: '\x1b[33m',
    xanhLa: '\x1b[32m',
    do: '\x1b[31m'
};

// ==========================================
// 2. DU LIEU SINH VIEN
// ==========================================
const danhSachSinhVien = [
    {
        maSV: 'CDCNTT18B09',
        hoTen: 'Vo Tien Dat',
        diem: {
            javascript: 9,
            mongodb: 8,
            nodejs: 9
        }
    },
    {
        maSV: 'CDCNTT18B05',
        hoTen: 'Nguyễn Thành Danh',
        diem: {
            javascript: 7,
            mongodb: 7,
            nodejs: 7
        }
    },
    {
        maSV: 'CDCNTT18B17',
        hoTen: 'Nguyễn Thành Long',
        diem: {
            javascript: 4,
            mongodb: 5,
            nodejs: 5
        }
    }
];

// ==========================================
// 3. TINH DIEM VA XEP LOAI
// ==========================================
const ketQuaHocTap = danhSachSinhVien.map((sv) => {
    const { javascript, mongodb, nodejs } = sv.diem;

    const diemTB = tinhDiemTrungBinh(
        javascript,
        mongodb,
        nodejs
    );

    return {
        ...sv,
        diemTB,
        xepLoai: xepLoaiHocTap(diemTB)
    };
});

// ==========================================
// 4. HAM DINH DANG COT
// ==========================================

// Chuan hoa chuoi Unicode va tinh do dai
function doRong(chuoi) {
    return [...String(chuoi).normalize('NFC')].length;
}

// Can trai
function canTrai(noiDung, rong) {
    const chuoi = String(noiDung).normalize('NFC');
    return chuoi + ' '.repeat(Math.max(0, rong - doRong(chuoi)));
}

// Can phai
function canPhai(noiDung, rong) {
    const chuoi = String(noiDung).normalize('NFC');
    return ' '.repeat(Math.max(0, rong - doRong(chuoi))) + chuoi;
}

// Can giua
function canGiua(noiDung, rong) {
    const chuoi = String(noiDung).normalize('NFC');
    const khoangTrong = Math.max(0, rong - doRong(chuoi));
    const trai = Math.floor(khoangTrong / 2);

    return ' '.repeat(trai) +
        chuoi +
        ' '.repeat(khoangTrong - trai);
}


// ==========================================
// 5. CAU HINH BANG
// ==========================================
const cot = [
    { ten: 'MA SINH VIEN', rong: 14 },
    { ten: 'HO TEN', rong: 22 },
    { ten: 'JAVASCRIPT', rong: 12 },
    { ten: 'MONGODB', rong: 10 },
    { ten: 'NODE.JS', rong: 10 },
    { ten: 'DIEM TB', rong: 10 },
    { ten: 'XEP LOAI', rong: 12 }
];

// ==========================================
// 6. HAM DINH DANG
// ==========================================
function taoDuongKe(trai, giua, phai, ngang = '─') {
    return mau.xanh + trai +
        cot.map(item => ngang.repeat(item.rong + 2)).join(giua) +
        phai + mau.reset;
}

function taoHang(noiDung) {
    return mau.xanh + '│' + mau.reset +
        ' ' + noiDung.map((text, i) => {
            return canGiua(text, cot[i].rong);
        }).join(mau.xanh + ' │ ' + mau.reset) +
        ' ' + mau.xanh + '│' + mau.reset;
}

function taoDongSinhVien(sv) {
    const duLieu = [
        canTrai(sv.maSV, cot[0].rong),
        canTrai(sv.hoTen, cot[1].rong),
        canGiua(sv.diem.javascript.toFixed(1), cot[2].rong),
        canGiua(sv.diem.mongodb.toFixed(1), cot[3].rong),
        canGiua(sv.diem.nodejs.toFixed(1), cot[4].rong),
        canGiua(sv.diemTB.toFixed(2), cot[5].rong),
        canGiua(sv.xepLoai.toUpperCase(), cot[6].rong)
    ];

    const mauXepLoai = layMauXepLoai(sv.xepLoai);

    return mau.xanh + '│' + mau.reset +
        ' ' +
        duLieu.slice(0, 6).map((text, i) =>
            canTrai(text, cot[i].rong)
        ).join(mau.xanh + ' │ ' + mau.reset) +
        mau.xanh + ' │ ' + mau.reset +
        ' ' + mauXepLoai + mau.dam +
        canGiua(sv.xepLoai.toUpperCase(), cot[6].rong) +
        mau.reset + ' ' +
        mau.xanh + '│' + mau.reset;
}

// ==========================================
// 7. MAU THEO XEP LOAI
// ==========================================
function layMauXepLoai(xepLoai) {
    switch (xepLoai) {
        case 'Gioi': return mau.xanhLa;
        case 'Kha': return mau.xanh;
        case 'Trung binh': return mau.vang;
        default: return mau.do;
    }
}

// ==========================================
// 8. HIEN THI BAO CAO
// ==========================================
function hienThiBaoCao() {
    console.clear();

    console.log(
        mau.xanh + '┌' +
        '─'.repeat(cot.reduce((sum, item) => sum + item.rong + 2, 0) + (cot.length - 1) * 3) +
        '┐' + mau.reset
    );

    const tongRong =
        cot.reduce((sum, item) => sum + item.rong + 2, 0) +
        (cot.length - 1) * 3;

    console.log(
        mau.dam + mau.trang + '│' +
        canGiua('ACADEMIC REPORT | STUDENT RESULTS', tongRong) +
        mau.trang + '│' + mau.reset
    );

    console.log(
        mau.xanh + '└' + '─'.repeat(tongRong) + '┘' + mau.reset
    );

    console.log('  SINH VIEN : Vo Tien Dat');
    console.log('  LOP       : CD-CNTT18B');
    console.log('  HOC PHAN  : JavaScript | MongoDB | Node.js');

    // Bang ket qua
    console.log(taoDuongKe('┌', '┬', '┐'));

    console.log(
        mau.xanh + '│' + mau.reset + ' ' +
        cot.map(item => canGiua(item.ten, item.rong))
            .join(mau.xanh + ' │ ' + mau.reset) +
        ' ' + mau.xanh + '│' + mau.reset
    );

    console.log(taoDuongKe('├', '┼', '┤'));

    ketQuaHocTap.forEach((sv, index) => {
        console.log(taoDongSinhVien(sv));

        if (index < ketQuaHocTap.length - 1) {
            console.log(taoDuongKe('├', '┼', '┤'));
        }
    });

    console.log(taoDuongKe('└', '┴', '┘'));

    // ======================================
    // 9. THONG KE KET QUA
    // ======================================
    const thongKe = {
        'Gioi': 0,
        'Kha': 0,
        'Trung binh': 0,
        'Yeu': 0
    };

    ketQuaHocTap.forEach(sv => {
        thongKe[sv.xepLoai]++;
    });

    console.log(mau.dam + mau.vang + '\n  TONG KET HOC TAP' + mau.reset);
    console.log(`  Tong sinh vien : ${ketQuaHocTap.length}`);
    console.log(`  Gioi           : ${thongKe['Gioi']}`);
    console.log(`  Kha            : ${thongKe['Kha']}`);
    console.log(`  Trung binh     : ${thongKe['Trung binh']}`);
    console.log(`  Yeu            : ${thongKe['Yeu']}`);

    console.log(mau.xanhLa + mau.dam +
        '\n  HOAN THANH BAO CAO!' + mau.reset);
}

// ==========================================
// 10. CHAY CHUONG TRINH
// ==========================================
hienThiBaoCao();

