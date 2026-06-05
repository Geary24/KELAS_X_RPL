import { useState } from 'react'
import '../App.css'

function Kontak() {

    function emptyForm() {
        document.getElementById("form-name").value = "";
        document.getElementById("form-telephone").value = "";
        document.getElementById("form-address").value = "";
        document.getElementById("form-email").value = "";
        document.getElementById("form-message").value = "";
    }

    function submitForm() {
        emptyForm();
    }

    return (
        <section id='kontak' className='container page'>
            <h2>Kontak</h2>
            <div id='contact-container'>
                <form action="post" name='contact-form' className='contact grid-items' id='contact-form'>
                    <div>
                        Nama <br />
                        <input type="text" id='form-name'/>
                    </div>
                    <div>
                        No. Telp <br />
                        <input type="number" id='form-telephone'/>
                    </div>
                    <div>
                        Alamat <br />
                        <input type="text" id='form-address'/>
                    </div>
                    <div>
                        Email <br />
                        <input type="email" id='form-email'/>
                    </div>
                    <div>
                        Pesan <br />
                        <textarea name="form-message" id="form-message" rows={5}></textarea>
                    </div>
                    <div id='form-button'>
                        <div id='reset-button' className='form-button' onClick={emptyForm}>Reset</div>
                        <div id='submit-button' className='form-button' onClick={submitForm}>Kirim</div>
                    </div>
                </form>
                <div className='contact'>
                    <fieldset>
                        <legend>No. Kontak</legend>
                        <p>
                            031 8964034
                        </p>
                    </fieldset>
                    <fieldset>
                        <legend>Alamat</legend>
                        <address>
                            Jalan Jenggolo 2A, Siwalanpanji,
                            Buduran, Sidoarjo, Jawa Timur
                        </address>
                    </fieldset>
                    <fieldset>
                        <legend>Lokasi Sekolah</legend>
                        <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d9409.071093816983!2d112.65335801018705!3d-7.4622561212185055!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2dd7e77ba09185a9%3A0x80a96e7778bba87d!2sState%20Professional%20School%202%20Buduran%20Sidoarjo!5e0!3m2!1sen!2sid!4v1774168162886!5m2!1sen!2sid" width="450" style={ {border: "0"} } loading='lazy' referrerPolicy="no-referrer-when-downgrade"></iframe>
                    </fieldset>
                </div>
            </div>
        </section>
    )
}

export { Kontak }