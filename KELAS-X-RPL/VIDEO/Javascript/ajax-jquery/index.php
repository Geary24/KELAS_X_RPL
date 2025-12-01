<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>AJAX-JQuery Bootstrap PHP</title>

    <script src="js/jquery.js"></script>
    <script src="js/app.js"></script>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.8/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-sRIl4kxILFvY47J16cr9ZwB07vP4J8+LH7qKQnuqkuIAvNWLzeN8tE5YBujZqJLB" crossorigin="anonymous">
  </head>
  <body>
    
    <div class="container">
      <div class="row mt-4 text-center">
        <h1>Belajar Ajax JQuery Bootstrap PHP</h1>
      </div>
      <div class="row mt-4">
        <div class="col">
          <div class="row">
            <h2>Input Data Pelanggan</h2>
          </div>
          <div class="row">
            <div id="msg">

            </div>
            <form>
              <div class="mb-3">
                <input type="text" class="form-control" id="id" aria-describedby="emailHelp" required>
                <label for="exampleInputEmail1" class="form-label">Pelanggan</label>
                <input type="text" class="form-control" id="pelanggan" aria-describedby="emailHelp" required>
                <div id="emailHelp" class="form-text">Harus di isi</div>
              </div>
              <div class="mb-3">
                <label for="exampleInputPassword1" class="form-label">Alamat</label>
                <input type="text" class="form-control" id="alamat" required>
                <div id="emailHelp" class="form-text">Harus di isi</div>
              </div>
              <div class="mb-3">
                <label for="exampleInputPassword1" class="form-label">Telp</label>
                <input type="text" class="form-control" id="telp" required>
                <div id="emailHelp" class="form-text">Harus di isi</div>
              </div>
              
              <button type="submit" id="submit" class="btn btn-success">Simpan</button>
          </form>
          </div>
        </div>

        <div class="col">
          <div class="row">
            <h2>Data Pelanggan</h2>
          </div>
          <div class="row">
            <table class="table">
              <thead>
                <tr>
                  <th scope="col">No</th>
                  <th scope="col">Pelanggan</th>
                  <th scope="col">Alamat</th>
                  <th scope="col">Telp</th>
                  <th scope="col">Hapus</th>
                </tr>
              </thead>
              <tbody id="isidata">
                
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>



    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.8/dist/js/bootstrap.bundle.min.js" integrity="sha384-FKyoEForCGlyvwx9Hj09JcYn3nv7wiPVlz7YYwJrWVcXK/BmnVDxM+D2scQbITxI" crossorigin="anonymous"></script>
    <script src="https://cdn.jsdelivr.net/npm/@popperjs/core@2.11.8/dist/umd/popper.min.js" integrity="sha384-I7E8VVD/ismYTF4hNIPjVp/Zjvgyol6VFvRkX/vR+Vc4jQkC+hVqc2pM8ODewa9r" crossorigin="anonymous"></script>
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.8/dist/js/bootstrap.min.js" integrity="sha384-G/EV+4j2dNv+tEPo3++6LCgdCROaejBqfUeNjuKAiuXbjrxilcCdDz6ZAVfHWe1Y" crossorigin="anonymous"></script>
  </body>
</html>