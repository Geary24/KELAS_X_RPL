<form action="" method="post">
	<h1>Input zodiak</h1>
	<input type="number" name="tanggal" id="" placeholder="Masukkan tanggal">
	<br>
	<br>
	<input type="number" name="bulan" id="" placeholder="Masukkan bulan">
	<br>
	<br>
	<input type="submit" name="kirim" id="" value="Zodiak anda">
</form>

<?php

if (isset($_POST['kirim'])) {
	$tanggal = $_POST['tanggal'];
	$bulan = $_POST['bulan'];

	zodiak($bulan, $tanggal);
	echo '<br>';
}

function belajar()
{
	echo 'Hari ini saya belajar function';
}



function cekTanggal($tanggal)
{
	if ($tanggal > 0 && $tanggal < 32) {
		// echo 'tanggal benar';
		return true;
	} else {
		// echo 'tanggal salah';
		return false;
	}
}

// cekTanggal(5);
// echo '<br>';
// cekTanggal(0);
// echo '<br>';
// cekTanggal(100);

$tanggal = 14;
$bulan = 5;

function zodiak($tanggal, $bulan)
{
	echo '<br>';
	if ($tanggal > 0  && $tanggal < 32 && $bulan > 0 && $bulan < 13) {
		if ($bulan == 1) {
			if ($tanggal > 0 && $tanggal < 20) {
				echo 'zodiak anda capricorn';
			} else {
				echo 'zodiak anda aquarius';
			}
		}
		if ($bulan == 2) {
			if ($tanggal > 0 && $tanggal < 20) {
				echo 'zodiak anda aquarius';
			} else {
				echo 'zodiak anda pisces';
			}
		}
		if ($bulan == 3) {
			if ($tanggal > 0 && $tanggal < 20) {
				echo 'zodiak anda pisces';
			} else {
				echo 'zodiak anda aries';
			}
		}
		if ($bulan == 4) {
			if ($tanggal > 0  && $tanggal < 20) {
				echo 'zodiak anda aries';
			} else {
				echo 'zodiak anda taurus';
			}
		}
		if ($bulan == 5) {
			if ($tanggal > 0 && $tanggal < 20) {
				echo 'zodiak anda taurus';
			} else {
				echo 'zodiak anda gemini';
			}
		}
		if ($bulan == 6) {
			if ($tanggal > 0 && $tanggal < 20) {
				echo 'zodiak anda gemini';
			} else {
				echo 'zodiak anda cancer';
			}
		}
		if ($bulan == 7) {
			if ($tanggal > 0 && $tanggal < 20) {
				echo 'zodiak anda cancer';
			} else {
				echo 'zodiak anda leo';
			}
		}
		if ($bulan == 8) {
			if ($tanggal > 0 && $tanggal < 20) {
				echo 'zodiak anda leo';
			} else {
				echo 'zodiak anda virgo';
			}
		}
		if ($bulan == 9) {
			if ($tanggal > 0 && $tanggal < 20) {
				echo 'zodiak anda virgo';
			} else {
				echo 'zodiak anda libra';
			}
		}
		if ($bulan == 10) {
			if ($tanggal > 0 && $tanggal < 20) {
				echo 'zodiak anda libra';
			} else {
				echo 'zodiak anda scorpio';
			}
		}
		if ($bulan == 11) {
			if ($tanggal > 0 && $tanggal < 20) {
				echo 'zodiak anda scorpio';
			} else {
				echo 'zodiak anda sagitarius';
			}
		}
		if ($bulan == 12) {
			if ($tanggal > 0 && $tanggal < 20) {
				echo 'zodiak anda sagitarius';
			} else {
				echo 'zodiak anda capricorn';
			}
		}
	} else {
		echo 'tanggal / bulan salah'; //jika kondisi tidak sesuai
	}
}

function cekBulan($bulan)
{
	if ($bulan > 0 && $bulan < 13) {
		return true;
	} else {
		return false;
	}
}

cekBulan(1);

if (cekBulan(1) && cekTanggal(0)) {
	echo 'Bulan / tanggal benar';
} else {
	echo 'Bulan / tanggal salah';
}

echo '<br>';
function luasPersegiPanjang($p, $l)
{
	$luas = $p * $l;
	return $luas;
}

$p = 55;
$l = 33;
$t = 155;

echo 'Volume balok dengan panjang' . ' ' . $p . ', lebar ' . $l . ' dan tinggi ' . $t . ' adalah:' . ' ';

echo luasPersegiPanjang($p, $l) * $t;

?>
<h1>Fungsi matematika</h1>

<h4>Kalkulator</h4>
<form action="" method="post">
	<input type="number" name="angka1" id="" placeholder="masukkan angka 1">
	<br>
	<input type="number" name="angka2" id="" placeholder="masukkan angka 2">
	<br>
	<br>
	<input type="submit" name="tambah" id="" value="Tambah">
	<input type="submit" name="kurang" id="" value="Kurang">
	<input type="submit" name="kali" id="" value="Kali">
	<input type="submit" name="bagi" id="" value="Bagi">
</form>

<?php

if(isset($_POST['tambah'])) {
	$a = $_POST['angka1'];
	$b = $_POST['angka2'];
	$c = $a + $b;
	echo 'Hasil input ' . $a . ' + ' . $b . ' = ';

	echo tambah($a, $b);
	echo '<br>';
}
if(isset($_POST['kurang'])) {
	$a = $_POST['angka1'];
	$b = $_POST['angka2'];
	$c = $a + $b;
	echo 'Hasil input ' . $a . ' - ' . $b . ' = ';

	echo kurang($a, $b);
	echo '<br>';
}
if(isset($_POST['kali'])) {
	$a = $_POST['angka1'];
	$b = $_POST['angka2'];
	$c = $a + $b;
	echo 'Hasil input ' . $a . ' * ' . $b . ' = ';

	echo kali($a, $b);
	echo '<br>';
}
if(isset($_POST['bagi'])) {
	$a = $_POST['angka1'];
	$b = $_POST['angka2'];
	$c = $a + $b;
	echo 'Hasil input ' . $a . ' / ' . $b . ' = ';

	echo bagi($a, $b);
	echo '<br>';
}



function tambah($a, $b)
{

	$tambah = $a + $b;
	return $tambah;
}

$a = 10;
$b = 12;

// echo '<br>';

// echo 'Hasil ' . $a . ' + ' . $b . ' = ';

// echo tambah($a, $b);

function kurang($a, $b)
{

	$kurang = $a - $b;
	return $kurang;
}

$a = 10;
$b = 5;

// echo '<br>';

// echo 'Hasil ' . $a . ' - ' . $b . ' = ';

// echo kurang($a, $b);
function kali($a, $b)
{

	$kali = $a * $b;
	return $kali;
}

$a = 10;
$b = 5;

// echo '<br>';

// echo 'Hasil ' . $a . ' * ' . $b . ' = ';

// echo kali($a, $b);
function bagi($a, $b)
{

	$bagi = $a / $b;
	return $bagi;
}

$a = 10;
$b = 5;

// echo '<br>';

// echo 'Hasil ' . $a . ' * ' . $b . ' = ';

// echo bagi($a, $b);

?>