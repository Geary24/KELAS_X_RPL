<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.8/dist/css/bootstrap.min.css
">
    <link rel="stylesheet" href="./style.css">
</head>

<body>
    <div>
        <nav class="navbar navbar-expand-lg bg-primary navbar
        -primary">
            <div class="container-fluid">
                <a class="navbar-brand" href="#">Geary</a>
                <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span class="navbar-toggler-icon"></span>
                </button>
                <div class="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                        <li class="nav-item">
                            <a class="nav-link active" aria-current="page" href="?menu=profil">Profil</a>
                        </li>
                        <li class="nav-item"><a href="?menu=sejarah" class="nav-link active">Sejarah<a><li>
                        <li class="nav-item"><a href="?menu=jurusan" class="nav-link active">Jurusan<a><li>
                        <li class="nav-item"><a href="?menu=prestasi"class="nav-link active">Prestasi<a><li>
                        <li class="nav-item"><a href="?menu=kegiatan"class="nav-link active">Kegiatan<a><li>
                        <li class="nav-item"><a href="?menu=kontak" class="nav-link active">Kontak<a><li>
                </div>
            </div>
        </nav>
        <section class="rapih">
            <?php
            if (isset($_GET['menu'])) {
                $isi = $_GET['menu'];

                if ($isi == "jurusan") {
                    require_once("pages/jurusan.php");
                }

                if ($isi == "profil") {
                    require_once("pages/profil.php");
                }

                if ($isi == "prestasi") {
                    require_once("pages/prestasi.php");
                }

                if ($isi == "sejarah") {
                    require_once("pages/sejarah.php");
                }

                if ($isi == "kegiatan") {
                    require_once("pages/kegiatan.php");
                }

                if ($isi == "kontak") {
                    require_once("pages/kontak.php");
                }
            } else {
                require_once("pages/profil.php");
            }

            if (isset($_POST['tombol'])) {
                $nama = $_POST['nama'];
                $pesan = $_POST['pesan'];
                $email = $_POST['email'];



                echo $nama;
                echo "<br>";
                echo $email;
                echo "<br>";
                echo $pesan;
            }

            ?>
        </section>
        <footer class="rapih">
            <p>
                Web ini dibuat oleh Geary
            </p>
        </footer>
    </div>

    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.8/dist/js/bootstrap.bundle.min.js
"></script>
</body>

</html>