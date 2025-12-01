if (true) {
    console.log("Dijalankan jika benar");
} else {
    console.log("Dijalankan jika salah");
}

let nilai = 60;
let standar = 60;
let baik = "Lulus";
let gagal = "Tidak Lulus";
let batas_atas = 100;
let batas_bawah = 0;
let peringatan = "Nilai Salah";

if (nilai <= batas_atas && nilai >= batas_bawah) {
    if (nilai >= standar) {
        console.log(baik);
    } else {
        console.log(gagal);
    }
} else {
    console.log(peringatan);
}

