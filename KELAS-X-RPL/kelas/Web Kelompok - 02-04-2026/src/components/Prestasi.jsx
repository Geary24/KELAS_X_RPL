import { useState } from 'react'
import '../App.css'
import { images } from '../App.jsx'

function Prestasi() {
    return (
        <section id='prestasi' className='container page'>
            <h2>Prestasi</h2>
            <div id='prestasi-container'>
                { images['prestasiDiraih'].map(prestasi =>
                    <div key={prestasi.id} className='prestasi grid-items'>
                        <h3>{prestasi.kejuaraan}</h3>
                        <img src={prestasi.gambar} alt='' loading='lazy'></img>
                        <p>
                            { prestasi.id % 2 == 0 ? '🥳' : '🎉' } Selamat kepada {prestasi.peserta}
                            { prestasi.kelas != "-" && ` dari kelas ${prestasi.kelas}` }, karena telah meraih {`${prestasi.kejuaraan} `}
                            { prestasi.tingkat != "-" && `tingkat ${prestasi.tingkat}` } yang diselenggarakan di {prestasi.tempat} pada
                            tanggal {prestasi.tanggal}.
                        </p>
                    </div>
                ) }
                <div className='prestasi grid-items more-prestasi'>
                    <h3>Itu saja ?, masih ada...</h3>
                    <strong>250+</strong>
                    <p>
                        Prestasi-prestasi lainnya yang diperoleh oleh para peserta
                        didik dan alumni hebat kita yang pernah bersekolah disini,
                        serta berbagai prestasi yang telah banyak diraih oleh sekolah,
                        ibu bapak guru, bahkan kepala sekolah juga...
                    </p>
                </div>
            </div>
        </section>
    )
}

export { Prestasi }