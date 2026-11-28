const fs = require('fs');
const path = require('path');

// =============================================================================
// 2. THONG TIN CHUONG TRINH
// =============================================================================

const TEN_CHUONG_TRINH = 'ARCHIVE DESK';
const PHIEN_BAN = '1.0.0';

// =============================================================================
// 3. CAU HINH DUONG DAN
// =============================================================================

const THU_MUC_DATA = path.join(__dirname, 'data');
const TAP_TIN_GHI_CHU = path.join(THU_MUC_DATA, 'ghichu.txt');
const TAP_TIN_GHI_CHU_MOI = path.join(THU_MUC_DATA, 'ghichu_moi.txt');
const TAP_TIN_TAM = path.join(THU_MUC_DATA, 'tam.txt');

// =============================================================================
// 4. CAC HAM HIEN THI GIAO DIEN TERMINAL
// =============================================================================

function hienThiDuongKe(kyTu = '-', doDai = 90) {
    console.log(kyTu.repeat(doDai));
}

function hienThiTieuDe() {
    console.log('');
    hienThiDuongKe('=', 90);
    console.log('                         ARCHIVE DESK');
    console.log('                    FILE MANAGEMENT SYSTEM');
    hienThiDuongKe('=', 90);

    console.log(
        `  ${'THONG TIN'.padEnd(20)} | ${'NOI DUNG'.padEnd(60)}`
    );

    hienThiDuongKe('-', 90);

    console.log(
        `  ${'Phien ban'.padEnd(20)} | ${PHIEN_BAN.padEnd(60)}`
    );
    console.log(
        `  ${'Bai thuc hanh'.padEnd(20)} | ${'Bai 8 - File System'.padEnd(60)}`
    );
    console.log(
        `  ${'Sinh vien'.padEnd(20)} | ${'Vo Tien Dat'.padEnd(60)}`
    );
    console.log(
        `  ${'Lop'.padEnd(20)} | ${'CD-CNTT18B'.padEnd(60)}`
    );
    console.log(
        `  ${'Thu muc luu tru'.padEnd(20)} | ${'./data/'.padEnd(60)}`
    );

    hienThiDuongKe('=', 90);
    console.log('');
}

function hienThiTieuDeBang() {
    hienThiDuongKe('=', 90);
    console.log(
        `  ${'THOI GIAN'.padEnd(14)} | ${'MA BUOC'.padEnd(12)} | ${'TRANG THAI'.padEnd(12)} | NOI DUNG`
    );
    hienThiDuongKe('-', 90);
}

function ghiNhatKy(maBuoc, noiDung, trangThai = 'INFO') {
    const thoiGian = new Date().toLocaleTimeString('vi-VN');

    console.log(
        `  ${thoiGian.padEnd(14)} | ${maBuoc.padEnd(12)} | ${trangThai.padEnd(12)} | ${noiDung}`
    );
}

// =============================================================================
// 5. CHUAN BI DU LIEU TRUOC KHI CHAY
// =============================================================================

async function chuanBiDuLieu() {
    try {
        await fs.promises.unlink(TAP_TIN_GHI_CHU_MOI);

        ghiNhatKy(
            'SYS-00',
            'Da don dep tap tin ghi chu cu.',
            'INFO'
        );

    } catch (loi) {
        if (loi.code !== 'ENOENT') {
            ghiNhatKy(
                'SYS-00',
                `Khong the don dep du lieu: ${loi.message}`,
                'ERROR'
            );
            throw loi;
        }
    }

    try {
        await fs.promises.unlink(TAP_TIN_TAM);

    } catch (loi) {
        if (loi.code !== 'ENOENT') {
            ghiNhatKy(
                'SYS-00',
                `Khong the don dep tap tin tam: ${loi.message}`,
                'ERROR'
            );
            throw loi;
        }
    }
}

// =============================================================================
// 6. TAO THU MUC DATA
// =============================================================================

async function taoThuMuc() {
    try {
        await fs.promises.mkdir(THU_MUC_DATA, {
            recursive: true
        });

        ghiNhatKy(
            'FS-01',
            'Tao thu muc data thanh cong.',
            'SUCCESS'
        );

    } catch (loi) {
        ghiNhatKy(
            'FS-01',
            `Khong the tao thu muc data: ${loi.message}`,
            'ERROR'
        );
        throw loi;
    }
}

// =============================================================================
// 7. TAO VA GHI TAP TIN GHI CHU
// =============================================================================

async function taoVaGhiGhiChu() {
    const noiDungGhiChu = [
        'ARCHIVE DESK - HO SO GHI CHU',
        'Nguoi quan ly: Vo Tien Dat',
        'Muc dich: Thuc hanh quan ly tap tin bang Node.js File System',
        'Trang thai: Dang luu tru'
    ].join('\n');

    try {
        await fs.promises.writeFile(
            TAP_TIN_GHI_CHU,
            noiDungGhiChu,
            'utf8'
        );

        ghiNhatKy(
            'FS-02',
            'Da tao va ghi noi dung vao ghichu.txt.',
            'SUCCESS'
        );

    } catch (loi) {
        ghiNhatKy(
            'FS-02',
            `Khong the ghi tap tin: ${loi.message}`,
            'ERROR'
        );
        throw loi;
    }
}

// =============================================================================
// 8. DOI TEN TAP TIN
// =============================================================================

async function doiTenGhiChu() {
    try {
        await fs.promises.rename(
            TAP_TIN_GHI_CHU,
            TAP_TIN_GHI_CHU_MOI
        );

        ghiNhatKy(
            'FS-03',
            'Doi ten ghichu.txt thanh ghichu_moi.txt.',
            'SUCCESS'
        );

    } catch (loi) {
        ghiNhatKy(
            'FS-03',
            `Khong the doi ten tap tin: ${loi.message}`,
            'ERROR'
        );
        throw loi;
    }
}

// =============================================================================
// 9. DOC NOI DUNG TAP TIN SAU KHI DOI TEN
// =============================================================================

async function docGhiChu() {
    try {
        const noiDung = await fs.promises.readFile(
            TAP_TIN_GHI_CHU_MOI,
            'utf8'
        );

        ghiNhatKy(
            'FS-04',
            'Doc noi dung ghichu_moi.txt thanh cong.',
            'SUCCESS'
        );

        console.log('');
        hienThiDuongKe('=', 90);
        console.log('                         NOI DUNG TAP TIN');
        hienThiDuongKe('-', 90);

        noiDung.split('\n').forEach((dong, index) => {
            console.log(`  ${(index + 1).toString().padEnd(3)} | ${dong}`);
        });

        hienThiDuongKe('=', 90);
        console.log('');

    } catch (loi) {
        ghiNhatKy(
            'FS-04',
            `Khong the doc tap tin: ${loi.message}`,
            'ERROR'
        );
        throw loi;
    }
}

// =============================================================================
// 10. TAO VA XOA TAP TIN TAM
// =============================================================================

async function taoVaXoaTapTinTam() {
    try {
        await fs.promises.writeFile(
            TAP_TIN_TAM,
            'Day la tap tin tam cua Archive Desk.',
            'utf8'
        );

        ghiNhatKy(
            'FS-05',
            'Tao tap tin tam.txt thanh cong.',
            'SUCCESS'
        );

        await fs.promises.unlink(TAP_TIN_TAM);

        ghiNhatKy(
            'FS-06',
            'Xoa tap tin tam.txt bang fs.unlink() thanh cong.',
            'SUCCESS'
        );

    } catch (loi) {
        ghiNhatKy(
            'FS-05/06',
            `Khong the tao hoac xoa tap tin tam: ${loi.message}`,
            'ERROR'
        );
        throw loi;
    }
}

// =============================================================================
// 11. KIEM TRA KET QUA CUOI CUNG
// =============================================================================

async function kiemTraKetQua() {
    try {
        const thongTinGhiChu = await fs.promises.stat(
            TAP_TIN_GHI_CHU_MOI
        );

        let tapTinTamConTonTai = true;

        try {
            await fs.promises.access(TAP_TIN_TAM);

        } catch (loi) {
            if (loi.code === 'ENOENT') {
                tapTinTamConTonTai = false;
            } else {
                throw loi;
            }
        }

        console.log('');
        hienThiDuongKe('=', 90);
        console.log('                         KET QUA KIEM TRA');
        hienThiDuongKe('-', 90);

        console.log(
            `  ${'NOI DUNG'.padEnd(30)} | ${'KET QUA'.padEnd(55)}`
        );

        hienThiDuongKe('-', 90);

        console.log(
            `  ${'Tap tin ghi chu'.padEnd(30)} | ${'ghichu_moi.txt'.padEnd(55)}`
        );

        console.log(
            `  ${'Dung luong'.padEnd(30)} | ${(thongTinGhiChu.size + ' bytes').padEnd(55)}`
        );

        console.log(
            `  ${'Tap tin tam'.padEnd(30)} | ${(tapTinTamConTonTai ? 'Van con ton tai' : 'Da duoc xoa').padEnd(55)}`
        );

        hienThiDuongKe('=', 90);
        console.log('');

        if (!tapTinTamConTonTai) {
            ghiNhatKy(
                'SYS-03',
                'Kiem tra hoan tat. Du lieu duoc xu ly dung yeu cau.',
                'SUCCESS'
            );
        } else {
            throw new Error('Tap tin tam van con ton tai.');
        }

    } catch (loi) {
        ghiNhatKy(
            'SYS-03',
            `Loi kiem tra ket qua: ${loi.message}`,
            'ERROR'
        );
        throw loi;
    }
}

// =============================================================================
// 12. DIEU PHOI CHUONG TRINH
// =============================================================================

async function khoiChay() {
    hienThiTieuDe();
    hienThiTieuDeBang();

    ghiNhatKy(
        'SYS-01',
        `${TEN_CHUONG_TRINH} da khoi dong.`,
        'INFO'
    );

    ghiNhatKy(
        'SYS-02',
        'Cau hinh duong dan luu tru da san sang.',
        'INFO'
    );

    try {
        await chuanBiDuLieu();

        await taoThuMuc();

        await taoVaGhiGhiChu();

        await doiTenGhiChu();

        await docGhiChu();

        await taoVaXoaTapTinTam();

        await kiemTraKetQua();

        console.log('');
        hienThiDuongKe('=', 90);
        console.log('                  ARCHIVE DESK - HOAN TAT QUY TRINH');
        hienThiDuongKe('=', 90);
        console.log('');

    } catch (loi) {
        ghiNhatKy(
            'SYS-ERROR',
            'Quy trinh dung do xay ra loi.',
            'ERROR'
        );

        console.error('  Chi tiet loi:', loi.message);

        process.exitCode = 1;
    }
}

// =============================================================================
// 13. KHOI CHAY UNG DUNG
// =============================================================================

khoiChay();
