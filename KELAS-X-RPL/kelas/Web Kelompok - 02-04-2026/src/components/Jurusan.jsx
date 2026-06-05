import { useState } from 'react'
import '../App.css'
import { images } from '../App.jsx'

const jurusanImages = {
    'rpl': "https://images.unsplash.com/photo-1607799279861-4dd421887fb3?fm=jpg&q=60&w=3000&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8cHJvZ3JhbW1pbmd8ZW58MHx8MHx8fDA%3D",
    'ak': "https://wallpaperaccess.com/full/1393269.jpg",
    'dkv': "https://thumbs.dreamstime.com/b/graphic-design-software-user-interface-real-tools-creativity-communication-concept-collage-paper-cut-composition-98421957.jpg",
    'bd': "https://img.freepik.com/free-photo/map-lying-wooden-table_53876-105723.jpg?semt=ais_hybrid&w=740&q=80",
    'lpb': "https://png.pngtree.com/thumb_back/fh260/background/20251009/pngtree-bank-employee-assisting-customer-with-financial-documents-and-laptop-professional-service-image_19813131.webp",
    'mp': "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQDiVj289ZSbzhsNHiv6HmNRv5QNzJAHnnj8Q&s"
};

const daftarJurusan = [
    {
        'id': 1,
        'gambar': jurusanImages['rpl'],
        'caption_gambar': "rekayasa perangkat lunak",
        'jurusan': "Rekayasa Perangkat Lunak (RPL)",
        'keterangan': "Jurusan ini berfokus pada pemahaman logika serta pengetahuan yang dalam tentang internet dan teknologi, sehingga peserta didik diharapkan mampu membuat aplikasi, website, game, IoT, dan sebagainya yang berhubungan dengan teknologi secara efisien, mudah dipelihara, dan memiliki harga jual yang cukup tinggi dalam memecahkan masalah-masalah yang ada. Jurusan ini paling banyak diminati oleh peserta didik laki-laki."
    },
    {
        'id': 2,
        'gambar': jurusanImages['ak'],
        'caption_gambar': "akuntansi",
        'jurusan': "Akuntansi (AK)",
        'keterangan': "Jurusan ini berfokus pada ketelitian dan ketepatan, sehingga peserta didik diharapkan mampu mencatat, menghitung, dan mengelola berbagai macam hal-hal yang terkait dengan keuangan. Setiap kelasnya, jurusan ini dibagi menjadi 3 bagian dan merupakan jurusan yang paling banyak diminati oleh peserta didik perempuan."
    },
    {
        'id': 3,
        'gambar': jurusanImages['dkv'],
        'caption_gambar': "desain komunikasi visual",
        'jurusan': "Desain Komunikasi Visual (DKV)",
        'keterangan': "Jurusan ini mengandalkan pada kreatifitas, sehingga peserta didik diharapkan mampu menciptakan sebuah karya seni dan desain-desain digital yang berkualitas tinggi. Jurusan ini dibagi menjadi 3 bagian untuk setiap kelasnya dan biasanya memiliki jumlah peserta didik laki-laki dan perempuan yang sama banyak."
    },
    {
        'id': 4,
        'gambar': jurusanImages['bd'],
        'caption_gambar': "bisnis digital",
        'jurusan': "Bisnis Digital (BD)",
        'keterangan': "Jurusan ini mengandalkan pada Hard Skills yang berupa kemampuan dalam marketing dan juga promosi, sehingga peserta didik diharapkan untuk mampu dalam mengelola bisnis-bisnis yang telah mereka dirikan dengan cermat dalam mengikuti perkembangan zaman yang semakin maju."
    },
    {
        'id': 5,
        'gambar': jurusanImages['lpb'],
        'caption_gambar': "layanan perbankan",
        'jurusan': "Layanan Perbankan (LPB)",
        'keterangan': "Jurusan ini lebih mengandalkan pada Soft Skills yang berupa kecepatan dalam bertindak, kedisiplinan, dan juga kesabaran, sehingga peserta didik diharapkan untuk mampu dalam melayani permintaan nasabah yang berhubungan dengan keuangan secara baik."
    },
    {
        'id': 6,
        'gambar': jurusanImages['mp'],
        'caption_gambar': "manajemen perkantoran",
        'jurusan': "Manajemen Perkantoran (MP)",
        'keterangan': "Jurusan ini mengandalkan kedisiplinan, kemampuan dalam berkomunikasi, dan penggunaan teknologi atau alat-alat yang canggih, sehingga peserta didik diharapkan untuk mampu mencetak tenaga kerja profesional yang rapi dan mengurus berbagai macam arsip-arsip dokumen dengan benar dan juga cepat."
    },
];

function Jurusan() {
    return (
        <section id='jurusan' className='container page'>
            <h2>Jurusan</h2>
            <div id='jurusan-container'>
                { daftarJurusan.map(info => 
                    <div className={ info.id % 2 == 0 ? 'jurusan-left' : 'jurusan-right' } key={info.id}>
                        <img src={info.gambar} alt={`ilustrasi jurusan ${info.caption_gambar}`} loading='lazy' />
                        <div>
                            <h3>{ info.jurusan }</h3>
                            <p className='jurusan-explanation'>
                                { info.keterangan }
                            </p>
                        </div>
                    </div>
                ) }
            </div>
        </section>
    )
}

export { Jurusan, jurusanImages }