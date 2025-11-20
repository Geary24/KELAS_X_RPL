<form action="" method="post">
	<label for="">Email: </label>
	<br>
	<input type="email" name="email" id="" placeholder="Masukkan email" required>
	<br>
	<label for="">Password: </label>
	<br>
	<input type="password" name="password" id="" placeholder="Masukkan password" required>
	<br>
	<br>
	<input type="submit" value="Login" name="login">
</form>

<?php 

session_start();

if (isset($_POST['login'])) {
	$email = $_POST['email'];
	$password = $_POST['password'];
	$_SESSION['email'] = $email;
	header("location: login.php");

	echo 'Email kamu: ' . $email . '<br>';
	echo 'Password kamu: ' . $password;
}

$isi = 'hello world';
$hasil = isset($isi);


echo $hasil;
echo '<br>';

if (isset($isi)) {
	echo 'variable ada isi';
} else {
	echo 'variable tidak ada isi';
}
echo '<br>';
var_dump($isi);

?>