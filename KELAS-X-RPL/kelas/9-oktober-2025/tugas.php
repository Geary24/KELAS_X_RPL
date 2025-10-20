<?php
$menu =["profil","home","manajemen sekolah","informasi"];
$berita = "Lorem ipsum dolor sit amet consectetur adipisicing elit. Minima, rerum consequatur hic error suscipit aliquam, quaerat amet eveniet laudantium asperiores alias officiis repellendus! Autem qui quaerat pariatur explicabo veritatis dicta.";
$img ="images/logospensa.jpg";
$nama_sekolah ="SMP 1 Sidoarjo";
$program = ["Lorem", "Ipsum", "Dolor"];
$lorem = "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quaerat, aspernatur.";
?>


<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>SMPN 1 SIDOARJO</title>
    <link rel="stylesheet" href="bootstrap-5.3.8-dist/css/bootstrap.min.css">
    <script src="bootstrap-5.3.8-dist/js/bootstrap.min.js"></script>
</head>
<style>
  img {
    width: 35%;
    height: 35%;
  }
</style>
<body>
<nav class="navbar navbar-expand-lg bg-body-tertiary">
    <div class="collapse navbar-collapse" id="navbarNav">
      <div>
        <img src="<?=$img?>" alt="SPENSADA">
        </div>
      <ul class="navbar-nav">
        <li class="nav-item">
          <a class="nav-link" aria-current="page" href="#"><?=$menu[0]?></a>
        </li>
        <li class="nav-item">
          <a class="nav-link" href="#"><?=$menu[1]?></a>
        </li>
        <li class="nav-item">
          <a class="nav-link" href="#"><?=$menu[2]?></a>
        </li>
        <li class="nav-item">
          <a class="nav-link" href="#"><?=$menu[3]?></a>
        </li>
      </ul>
    </div>
  </div>
</nav>
</nav>
    <div>
        <h2>berita</h2>
        <p><?=$berita?></p>
    </div>

         <div class="col-md-8">
                <div class="card">
                    <div class="card-header bg-primary text-white">
                        Selamat Datang
                    </div>

                    <div class="card-body">
                        <h3><?=$nama_sekolah?></h3>
                        <p><?=$lorem?></p>
                    <h4><?=$program[0]?></h4>
                    <p><?=$lorem?></p>
                        <br>
                        <h4><?=$program[1]?></h4>
                        <p><?=$lorem?></p>
                        <br>
                        <h4><?=$program[2]?></h4>
                        <p><?=$lorem?></p>
                        <a href="#" class="btn btn-primary">Info Selengkapnya</a>
                    </div>
                </div>
            </div>
        </div>
    </div>
</body>
</html>