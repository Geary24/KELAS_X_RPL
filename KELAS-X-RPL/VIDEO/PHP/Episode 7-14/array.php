<?php

    // array dimensi

    // $nama = array("Andi", "Budi", "Caca",100,2.5,true);
    // var_dump($nama);
    // echo "<br>";

    // echo $nama[1];
    // echo "<br>";
    
    // for ($i=0; $i < 6; $i++) { 
    //     echo $nama[$i];
    //     echo "<br>";
    // }

    // foreach ($nama as $n) {
    //     echo $n;
    //     echo "<br>";
    // }

    // array assosiatif

    $nama = array(
        "Andi" => "Programmer",
        "Budi" => "Designer",
        "Caca" => "Manager"
    );
    var_dump($nama);
    
    echo "<br>";

    // echo $nama["Andi"];
    
    foreach ($nama as $n => $j) {
        echo "$n => $j";
        echo "<br>";
    }

?>