<?php

    $nama = array("Andi, Budi, Caca,100,2.5,true");
    var_dump($nama);

    echo "<br>";

    foreach ($nama as $n) {
        echo $n;
        echo "<br>";
    }

    $nama = array(
        "Andi" => "Programmer",
        "Budi" => "Designer",
        "Caca" => "Manager"
    );

    var_dump($nama);
    echo "<br>";
    foreach ($nama as $n => $j) {
        echo "$n => $j";
        echo "<br>";
    }

?>