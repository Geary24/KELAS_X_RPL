let btn = document.querySelectorAll(".btn-angka > button");
let tampil = document.querySelector("#tampil");
let mat = document.querySelectorAll(".btn-mat > button");
let pilihan = null;
let x, y;

// console.log(mat);

// tampil.value = btn[8].innerHTML;

// console.log(btn[6].innerHTML);

for (let index = 0; index < btn.length; index++) {
    btn[index].onclick = function () {
        // console.log(btn[index].innerHTML);
        
        if (tampil.value == "0") {
            tampil.value = btn[index].innerHTML;
        } else {
            tampil.value += btn[index].innerHTML;
        }
    };
}

// Fungsi 'Clear'
mat[0].onclick = function () {
    tampil.value = "0";
    pilihan = null;
};

// Fungsi 'tambah'
mat[1].onclick = function () {
    pilihan = "tambah";
    x = tampil.value;
    tampil.value = "0";
};

// Fungsi 'kurang'
mat[2].onclick = function () {
    pilihan = "kurang";
    x = tampil.value;
    tampil.value = "0";
};

// Fungsi 'kali'
mat[3].onclick = function () {
    pilihan = "kali";
    x = tampil.value;
    tampil.value = "0";
};

// Fungsi 'bagi'
mat[4].onclick = function () {
    pilihan = "bagi";
    x = tampil.value;
    tampil.value = "0";
};

// Fungsi 'sama dengan'
mat[5].onclick = function () {
    y = tampil.value;
    tampil.value = kalkulator(pilihan);
};

function kalkulator(pilihan) {
    if (pilihan != null) {
        switch (pilihan) {
            case "tambah":
                hasil = parseFloat(x) + parseFloat(y);
                break;

            case "kurang":
                hasil = parseFloat(x) - parseFloat(y);
                break;

            case "kali":
                hasil = parseFloat(x) * parseFloat(y);
                break;

            case "bagi":
                hasil = parseFloat(x) / parseFloat(y);
                break;

            default:
                break;
        }

        return hasil;
    }
}