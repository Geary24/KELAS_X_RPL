let a = true;
let b = false;
let c = true;
let d = false;

// Operator logika OR
// Bernilai benar jika salah satu bernilai benar
console.log(a || b); // --> True, karena a bernilai benar
console.log(d || b); // --> False, karena tidak ada yang bernilai benar
console.log(d || b || a); // --> True, karena a bernilai benar


// Operator logika AND
// Bernilai benar jika semuanya bernilai benar
console.log(a && b && c); // --> False, karena a dan c bernilai benar, tetapi b bernilai salah


// Operator perbandingan
let x = 7;
let y = 7;

// Operator lebih besar
console.log(x > y);

// Operator lebih kecil
console.log(x < y);

// Operator persamaan
console.log(x == y);

// Operator lebih besar atau sama dengan
console.log(x >= y);

// Operator lebih kecil atau sama dengan
console.log(x <= y);



let lima = "5";
let limo = 5;

// Operator identik: sama jenis data dan isinya
console.log(lima === limo);