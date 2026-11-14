
const fs = require('fs');
const path = require('path');

// Duong dan file thong tin sinh vien
const duongDanFile = path.join(__dirname, 'thongtin.txt');

// Thong tin ca nhan
const sinhVien = {
    hoTen: 'Vo Tien Dat',
    maSinhVien: 'CDCNTT18B09',
    lop: 'CD-CNTT18B'
};

console.log('========================================');
console.log('     THUC HANH NODE.JS - FILE SYSTEM');
console.log('========================================');

// Buoc 1: Tao file va ghi thong tin ban dau
const noiDungBanDau =
    `Ho va ten: ${sinhVien.hoTen}\n` +
    `Ma sinh vien: ${sinhVien.maSinhVien}`;

fs.writeFileSync(duongDanFile, noiDungBanDau, 'utf8');

console.log('\n[BUOC 1] Da tao file thongtin.txt');

// Buoc 2: Doc va hien thi noi dung ban dau
console.log('\n[BUOC 2] Noi dung file truoc khi cap nhat:');

const noiDungCu = fs.readFileSync(duongDanFile, 'utf8');
console.log(noiDungCu);

// Buoc 3: Ghi noi tiep ten lop vao cuoi file
const thongTinLop = `\nLop: ${sinhVien.lop}`;

fs.appendFile(duongDanFile, thongTinLop, 'utf8', (err) => {
    if (err) {
        console.error('Loi khi ghi them thong tin:', err);
        return;
    }

    console.log('\n[BUOC 3] Da ghi them ten lop vao file.');

    // Buoc 4: Doc lai file sau khi cap nhat
    console.log('\n[BUOC 4] Noi dung file sau khi cap nhat:');

    const noiDungMoi = fs.readFileSync(duongDanFile, 'utf8');
    console.log(noiDungMoi);

    console.log('\n========================================');
    console.log('     CAP NHAT FILE THANH CONG!');
    console.log('========================================');
});
