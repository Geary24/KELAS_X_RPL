<form action="nav.php" method="post">
    email : <input type="email" name="email">
    password : <input type="password" name="password">
    <input type="submit" value="submit">
</form>

<?php   

    if (isset($_POST["email"])) {
        echo "form telah disubmit";
    } else {
        echo "form belum disubmit";
    }
    echo "<br>";
    $email = $_POST["email"];
    $password = $_POST["password"];

    echo "email : $email <br>";
    echo "password : $password <br>";
    
?>