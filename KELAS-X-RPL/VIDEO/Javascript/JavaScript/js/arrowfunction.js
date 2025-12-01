// Function umumnya
let fungsi = function (nama) {
    console.log("Belajar Function " + nama);
};

fungsi("Joni");


// Arrow Function
let contoh = (nama) => {
    console.log("Belajar Function " + nama);
};

contoh("Budi");

let tambah = function (a,b) {
    return a + b;
};

console.log(tambah(2, 3));


// Arrow Function lebih singkat, jika hanya return / melakukan satu perintaj
let plus = (a, b) => a + b;

console.log(plus(2, 3));

let hasil = (a) => a * 2;

console.log(hasil(4));

let lagi = () => console.log("Coba lagi");

lagi();

let belajar = () => {
    console.log("Baris satu");
    console.log("Baris dua");
    console.log("Baris tiga");
    console.log("Baris selanjutnya");
}

belajar();



// Multiline Arrow Function
let nilai = 4;

let uji = (nilai < 7) ? () => predikat="Gagal" : () => predikat="Lulus" ; // --> 
console.log(uji());