import { useState } from 'react'
import '../App.css'
import headmaster from '../assets/headmaster-img3.jpg'

function Profil() {
    return (
        <section id='profil' className='container page'>
            <h2>Profil</h2>
            <div className='profil-container'>
                <div id='slogan' className='italic grid-items'>
                    <blockquote>
                        " Unggul, Mumpuni, Berkarakter ! "
                    </blockquote>
                </div>
                <div id='overview' className='grid-items'>
                    <h3>Penjelasan Singkat</h3>
                    <p>
                        <a href='#'>SMKN 2 Buduran</a> merupakan sebuah sekolah yang terletak di Jalan
                        Siwalanpanji, Buduran, Sidoarjo, Jawa Timur. Sekolah ini memiliki
                        akreditasi 'A', memiliki lingkungan yang kondusif, guru-guru yang seru,
                        para peserta didik yang ramah dan juga solid, serta dilengkapi
                        dengan fasilitas-fasilitas yang tentunya sangat diperlukan sebagai
                        media pembelajaran, sehingga sangat baik untuk menunjang siswa-siswi
                        anda dalam menggapai cita-cita dan mimpi mereka.
                    </p>
                </div>
                <div id='headmaster' className='grid-items'>
                    <p className='italic' style={ { color: "rgb(87, 87, 87)" } }>
                        Mari sambut kepala sekolah kita...
                    </p>
                    <img src={headmaster} alt="kepala sekolah smkn 2 buduran" loading='lazy'/>
                    <h3><span id='headmaster-name'>👩‍🏫</span> Dra. Hj. Mariya Ernawati, M.M</h3>
                </div>
                <div className='grid-items'>
                    <h3>Visi</h3>
                    <p id='vision' className='italic'>
                        " Mewujudkan Sumber Daya Manusia yang Berakhlak Mulia
                        yang Mampu Bersaing Dalam Dunia Kerja Secara Global "
                    </p>
                </div>
                <div className='grid-items'>
                    <h3>Misi</h3>
                    <ol id='mission'>
                        <li>
                            Menciptakan suasana yang kondusif untuk mengembangkan potensi siswa.
                        </li>
                        <li>
                            Menekankan pada penguasaan kompetensi bidang ilmu pengetahuan
                            dan teknologi.
                        </li>
                        <li>
                            Menguasai Bahasa Inggris sebagai alat komunikasi dan studi.
                        </li>
                        <li>
                            Meningkatkan frekuensi dan kualitas kegiatan siswa yang
                            berbasis pengembangan iptek.
                        </li>
                    </ol>
                </div>
            </div>
        </section>
    )
}


export { Profil }