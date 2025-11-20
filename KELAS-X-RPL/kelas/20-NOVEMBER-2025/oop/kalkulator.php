<?php 

class kalkulator {
	function penjumlahan()
	{
		echo 'penjumlahan';
	}
	function pengurangan()
	{
		echo 'pengurangan';
	}
	function perkalian()
	{
		echo 'perkalian';
	}
	function pembagian()
	{
		echo 'pembagian';
	}
}

$kalkulator = new kalkulator();
$kalkulator->penjumlahan();
echo '<br>';
$kalkulator->perkalian();


?>