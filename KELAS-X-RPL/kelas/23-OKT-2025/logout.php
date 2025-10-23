<h1>Logout</h1>


<?php 
session_destroy();
header("location: index.php");
?>