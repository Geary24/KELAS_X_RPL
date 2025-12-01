// $( document ).ready(function() {
//     console.log( "siap" );
// });

$(function () {
    $("#isi").html("<h1>Belajar JQuery</h1>");

    $("#klik").click(function (e) { 
        e.preventDefault();
        alert("Belajar Javascript");
    });
    // Gunakan # jika tombol banyak, gunakan 'button' jika tombol hanya 1

    $("#isi").mouseleave(function () { 
        alert("Mouse Leave");
        console.log("mouse");
    });
})