// Deklarasi variabel
let x = -2;

// Mengubah x menjadi nilai kebalikan
x = -x;

console.log(x);


// Deklarasi banyak variabel
let p = 5,
    l = 6,
    t = 7,
    volume;

// p = 5;
// l = 6;
// t = 7;

volume = p * l * t;

console.log(volume);



// === Operasi Matematika ===
console.log(2 + 3); // --> Penjumlahan
console.log(2 - 3); // --> Pengurangan
console.log(2 * 3); // --> Perkalian
console.log(3 / 2); // --> Pembagian
console.log(3 % 2); // --> Modulus (Sisa bagi)



// Concatenation
let kota = "Sido" + "arjo";
console.log(kota);

// Menjumlahkan angka dengan string
console.log("1" + 5 + 6); // ---> Menampilkan 156
console.log(1 + 5 + "6"); // ---> Menampilkan 66


console.log(5 - "3"); // ---> Menampilkan 2
console.log("5" - 3); // ---> Menampilkan 2


console.log("5" / "3"); // String dibagi string
console.log(5 / "3"); // Integer dibagi string
console.log("5" / 3); // String dibagi integer


// Perpangkatan
console.log(5 ** 2); // --> Menghasilkan 25, karena 5 pangkat 2 = 25


// Pemberian nilai berantai
let a, b, c;
a = b = c = 3 + 3; // --> Variabel a, b, c akan punya nilai yang sama, yaitu 6

console.log(a);
console.log(b);
console.log(c);


// Increment
let inc = 5;
inc++; // --> Menambahkan 1 ke variabel inc
console.log(inc); // --> 5 + 1 = 6

// Decrement
let dec = 5;
dec--; // --> Mengurangi 1 ke variabel inc
console.log(dec); // --> 5 - 1 = 4





// === Episode 5: Operator Logika ===

let coba = (1-2, 2+1, 5+2); // --> Menghasilkan 7
console.log(coba);