<h1>ANDA SUDAH LOGOUT</h1>

<?php 
session_start();
session_destroy();
header("location: index.php");
?>