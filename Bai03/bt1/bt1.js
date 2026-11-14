// ==========================================
// BAI 3 - MODULE, FILE SYSTEM VA CO SO DU LIEU
// Bai 01: Quan ly va loc danh sach sinh vien
// Nguoi thuc hien: Vo Tien Dat
// ==========================================

// 1. Tao class SinhVien
class SinhVien {
    constructor(ma, hoTen, tuoi, diem) {
        this.ma = ma;
        this.hoTen = hoTen;
        this.tuoi = tuoi;
        this.diem = diem;
    }
}

// 2. Khai bao danh sach 5 sinh vien
const danhSachSinhVien = [
    new SinhVien('CDCNTT18B09', 'Vo Tien Dat', 20, 8.5),
    new SinhVien('SV002', 'Nguyen Thanh Long', 20, 6.5),
    new SinhVien('SV003', 'Nguyen Thanh Danh', 19, 4.5),
    new SinhVien('SV004', 'Le Hoang Thien', 21, 7.0),
    new SinhVien('SV005', 'Pham Ngoc Hieu', 20, 3.5)
];

// 3. Su dung arrow function de loc sinh vien dat yeu cau
const sinhVienDat = danhSachSinhVien.filter(
    (sinhVien) => sinhVien.diem >= 5
);

// 4. Hien thi ket qua
console.log('==========================================');
console.log('       DANH SACH SINH VIEN DAT YEU CAU');
console.log('==========================================');
console.log(`Tong so sinh vien: ${danhSachSinhVien.length}`);
console.log(`So sinh vien dat: ${sinhVienDat.length}`);
console.log('------------------------------------------');

sinhVienDat.forEach((sinhVien, index) => {
    console.log(`Sinh vien thu ${index + 1}:`);
    console.log(`Ma sinh vien : ${sinhVien.ma}`);
    console.log(`Ho va ten    : ${sinhVien.hoTen}`);
    console.log(`Tuoi         : ${sinhVien.tuoi}`);
    console.log(`Diem         : ${sinhVien.diem}`);
    console.log('------------------------------------------');
});

console.log('Ket thuc chuong trinh!');
