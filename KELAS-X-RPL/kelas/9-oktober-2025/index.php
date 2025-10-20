<!-- belajar php -->
<h1>saya belajar php</h1>
<?php
    $nama = "Geary Eramus E";
    $kelas = "X-RPL";
    $umur = "16";
    $alamat = "candi";
    $hobi = "Bermain Basket dan Main Game";
    $enter = "<br>";

echo $nama;
echo $enter;
echo $kelas;

// echo'<h1>saya belajar php</h1>';
echo'saya kelas';
echo'12';
echo'<br>';
echo'nama:Geary Eramus E <br>';
echo'kelas:X-RPL <br>';
echo'alamat:Candi <br>';
echo'hobi:Bermain Basket dan Main Game <br>';
echo'umur:16 <br>';
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>web Geary</title>
</head>
<body>
    <div>
        <h1>identitas</h1>
        <table>
            <tbody>
                <tr>
                    <td>nama: <?=$nama?></td>
                </tr>
                <tr>
                    <td>kelas: <?=$kelas?></td>
                </tr>
                <tr>
                    <td>umur: <?=$umur?></td>
                </tr>
                <tr>
                    <td>alamat: <?=$alamat?></td>
                </tr>
                <tr>
                    <td>hobi: <?=$hobi?></td>
                </tr>
            </tbody>
        </table>
    </div>
</body>
</html>