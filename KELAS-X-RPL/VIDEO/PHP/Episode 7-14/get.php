<form action="" method="get">
    nama : <input type="text" name="nama">
    umur : <input type="number" name="umur">
    <input type="submit" value="submit">
</form>

<?php   

    if (isset($_GET["nama"])) {
        echo "form telah disubmit";
    } else {
        echo "form belum disubmit";
    }
    echo "<br>";
    $nama = $_GET["nama"];
    $umur = $_GET["umur"];

    echo "nama : $nama <br>";
    echo "umur : $umur <br>";
    
    ?>