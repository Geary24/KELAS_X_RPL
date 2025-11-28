<?php

$hari = 1;
switch ($hari) {
    case 1:
    echo "Senin";
    break;

    case 2:
    echo "Selasa";
    break;

    case 3:
    echo "Rabu";
    break;

    case 4:
    echo "Kamis";
    break;

    case 5:
    echo "Jumat";
    break;
    
    case 6:
    echo "Sabtu";
    break;

    case 7:
    echo "Minggu";
    break;

    default:
        echo "Tidak ada hari";
    }

    $pilihan = "tambah";

    switch ($pilihan) {
        case "tambah":
            echo "<br>Anda memilih tambah";
            break;
        case "kurang":
            echo "<br>Anda memilih kurang";
            break;
        case "kali":
            echo "<br>Anda memilih kali";
            break;
        case "bagi":
            echo "<br>Anda memilih bagi";
            break;
        default:
            echo "<br>Pilihan tidak ada";
    }

?>