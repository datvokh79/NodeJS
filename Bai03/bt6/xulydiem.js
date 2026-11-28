// Tinh diem trung binh cua 3 mon hoc
function tinhDiemTrungBinh(diemJavaScript, diemMongoDB, diemNodeJS) {
    const tongDiem = diemJavaScript + diemMongoDB + diemNodeJS;

    return tongDiem / 3;
}

// Xep loai dua tren diem trung binh
function xepLoaiHocTap(diemTrungBinh) {
    if (diemTrungBinh >= 8) {
        return 'Gioi';
    }

    if (diemTrungBinh >= 6.5) {
        return 'Kha';
    }

    if (diemTrungBinh >= 5) {
        return 'Trung binh';
    }

    return 'Yeu';
}

// Xuat cac ham de bai khac co the su dung
module.exports = {
    tinhDiemTrungBinh,
    xepLoaiHocTap
};
