<h1>Login</h1>



<form action="" method="post">
    <input type="email" name="email" id="" placeholder="Email">
    <br>
    <input type="password" name="password" id="" placeholder="Password">
    <br>
    <input type="submit" name="login" value="Login">
    <br>
</form>


<?php 
if (isset($_POST['login'])) {
    $email = $_POST['email'];
    $password = $_POST['password'];

    if ($email == "Udin@gmail.com" && $password == "12345") {
    $_SESSION['email'] = $email;
    header("location: index.php");

} else {
    echo "Login Gagal";
    }
}

?>