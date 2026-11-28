
const { MongoClient } = require('mongodb');

// Cau hinh ket noi MongoDB
const uri = 'mongodb://127.0.0.1:27017';
const client = new MongoClient(uri);

// Ten database va collection
const databaseName = 'qlsinhvien';
const collectionName = 'students';

// Danh sach sinh vien can them
const danhSachSinhVien = [
    {
        masv: 'CDCNTT18B07',
        hoten: 'Cao Bao Dai',
        tuoi: 19,
        diem: 6.5
    },

    {
        masv: 'CDCNTT18B09',
        hoten: 'Vo Tien Dat',
        tuoi: 20,
        diem: 8.5
    },
    {
        masv: 'CDCNTT18B17',
        hoten: 'Nguyen Thanh Long',
        tuoi: 20,
        diem: 7.0
    }
    
];

// Ham thuc hien chuong trinh
async function main() {
    try {
        // Buoc 1: Ket noi MongoDB
        await client.connect();

        console.log('======================================');
        console.log('       QUAN LY SINH VIEN MONGODB');
        console.log('======================================');
        console.log('Ket noi MongoDB thanh cong!');

        // Buoc 2: Truy cap database va collection
        const database = client.db(databaseName);
        const collection = database.collection(collectionName);

        console.log(`Database: ${databaseName}`);
        console.log(`Collection: ${collectionName}`);

        // Buoc 3: Them danh sach sinh vien
        const ketQuaThem = await collection.insertMany(danhSachSinhVien);

        console.log('\n[BUOC 1] Them du lieu thanh cong!');
        console.log(`So sinh vien vua them: ${ketQuaThem.insertedCount}`);

        // Buoc 4: Doc va hien thi danh sach sinh vien
        const danhSachHienTai = await collection.find({}).toArray();

        console.log('\n[BUOC 2] DANH SACH SINH VIEN TRONG MONGODB');
        console.log('--------------------------------------');

        danhSachHienTai.forEach((sinhVien, index) => {
            console.log(`Sinh vien ${index + 1}:`);
            console.log(`Ma sinh vien: ${sinhVien.masv}`);
            console.log(`Ho ten: ${sinhVien.hoten}`);
            console.log(`Tuoi: ${sinhVien.tuoi}`);
            console.log(`Diem: ${sinhVien.diem}`);
            console.log('--------------------------------------');
        });

        console.log(`Tong so ban ghi hien co: ${danhSachHienTai.length}`);

    } catch (error) {
        console.error('Co loi xay ra:', error.message);
    } finally {
        // Buoc 5: Dong ket noi MongoDB
        await client.close();
        console.log('\nDa dong ket noi MongoDB.');
    }
}

// Chay chuong trinh
main();
