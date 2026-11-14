
const { MongoClient } = require('mongodb');

// Thông tin kết nối MongoDB
const uri = 'mongodb://127.0.0.1:27017';
const client = new MongoClient(uri);

// Thông tin database và collection
const databaseName = 'qlsinhvien';
const collectionName = 'students';

// Mã sinh viên cần cập nhật điểm
const maSinhVienCapNhat = 'CDCNTT18B09';
const diemMoi = 9.2;

async function main() {
    try {
        // Kết nối MongoDB
        await client.connect();
        console.log('Ket noi MongoDB thanh cong!');

        const db = client.db(databaseName);
        const students = db.collection(collectionName);

        // 1. Tim sinh vien co diem >= 7
        console.log('\n===== SINH VIEN CO DIEM TU 7 TRO LEN =====');

        // 2. Sap xep diem giam dan
        const danhSach = await students
            .find({ diem: { $gte: 7 } })
            .sort({ diem: -1 })
            .toArray();

        if (danhSach.length === 0) {
            console.log('Khong tim thay sinh vien phu hop.');
        } else {
            danhSach.forEach((sv, index) => {
                console.log(
                    `${index + 1}. ${sv.hoten} | Ma SV: ${sv.masv} | Diem: ${sv.diem}`
                );
            });
        }

        // 3. Cap nhat diem theo ma sinh vien
        console.log('\n===== CAP NHAT DIEM SINH VIEN =====');

        const ketQua = await students.updateOne(
            { masv: maSinhVienCapNhat },
            { $set: { diem: diemMoi } }
        );

        if (ketQua.matchedCount === 0) {
            console.log(`Khong tim thay sinh vien co ma ${maSinhVienCapNhat}.`);
        } else {
            console.log(`Da cap nhat diem cho sinh vien ${maSinhVienCapNhat}.`);
            console.log(`So ban ghi duoc cap nhat: ${ketQua.modifiedCount}`);
        }

        // 4. Hien thi lai thong tin sau cap nhat
        console.log('\n===== KIEM TRA SAU KHI CAP NHAT =====');

        const sinhVien = await students.findOne({
            masv: maSinhVienCapNhat
        });

        if (sinhVien) {
            console.log('Ma sinh vien:', sinhVien.masv);
            console.log('Ho ten:', sinhVien.hoten);
            console.log('Tuoi:', sinhVien.tuoi);
            console.log('Diem moi:', sinhVien.diem);
        }

        console.log('\nHoan thanh bai thuc hanh 05!');

    } catch (error) {
        console.error('Loi:', error);
    } finally {
        await client.close();
        console.log('\nDa dong ket noi MongoDB.');
    }
}

main();
