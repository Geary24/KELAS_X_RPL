import { useState } from 'react'
import '../App.css'

const styles = {
  container: {
    padding: "20px",
    border: "1px solid #ddd",
    borderRadius: "10px",
    maxWidth: "400px",
    margin: "20px auto",
    textAlign: "center",
    fontFamily: "Arial"
  },
  title: {
    color: "#2c3e50"
  },
  desc: {
    fontSize: "14px",
    marginBottom: "15px"
  },
  infoBox: {
    background: "#f5f5f5",
    padding: "10px",
    borderRadius: "8px",
    marginBottom: "15px",
    fontSize: "14px"
  },
  button: {
    padding: "10px 20px",
    backgroundColor: "#3498db",
    color: "white",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer"
  }
};

function Ppdb() {
  return (
    <div id='ppdb' style={styles.container}>
      <h1 style={styles.title}>PPDB 2026/2027</h1>
      
      <p style={styles.desc}>
        Selamat datang di Penerimaan Peserta Didik Baru. 
        Daftarkan dirimu sekarang dan raih masa depan yang lebih cerah!
      </p>

      <div style={styles.infoBox}>
        <p>📅 Periode Pendaftaran: 1 Mei - 30 Juni</p>
        <p>📍 Lokasi: SMK Contoh Indonesia</p>
        <p>🎓 Jurusan: RPL, TKJ, AKL</p>
      </div>

      <button style={styles.button}>
        Daftar Sekarang
      </button>
    </div>
  );
}


export { Ppdb }