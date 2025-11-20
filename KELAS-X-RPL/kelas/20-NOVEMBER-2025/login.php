<?php 
session_start();

if (isset($_SESSION['email'])) {
	echo $_SESSION['email'];
	echo '<br>';
	echo '<a href="logout.php">Logout</a>';
} else {
	echo 'register';
	echo '<br>';
	echo '<a href="index.php">Login</a>';
}

?>

