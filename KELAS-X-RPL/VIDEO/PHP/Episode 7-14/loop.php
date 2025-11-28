<?php

    for ($i = 1; $i <= 10; $i++) {
        echo $i. ',';
    }

    echo "<br>";

    for ($i = 10; $i >= 1; $i--) {
        echo $i. ',';
    }

    echo "<br>";

    $a = 1;
    while ($a <= 10) {
        echo $a. ',';
        $a++;
    }

    echo "<br>";

    $b = 10;
    do {
        echo $b. ',';
        $b--;
    } while ($b >= 1);

?>