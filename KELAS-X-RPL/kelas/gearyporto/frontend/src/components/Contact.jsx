import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle2, AlertOctagon, Mail, User, MessageSquare, Loader2, Send } from 'lucide-react';
import axios from 'axios';

const GithubIcon = ({ size = 18 }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
    <path d="M9 18c-4.51 2-5-2-7-2" />
  </svg>
);

const Contact = () => {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState('idle'); // idle, submitting, success, error
  const [feedbackMsg, setFeedbackMsg] = useState('');
  const [validationError, setValidationError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setValidationError(''); // Clear validation error when typing
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setValidationError('');

    // Basic Validation
    if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) {
      setValidationError('Semua kolom formulir harus diisi.');
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      setValidationError('Silakan masukkan format alamat email yang valid.');
      return;
    }

    setStatus('submitting');
    try {
      // POST to Express API Backend
      const response = await axios.post('http://localhost:5000/api/contact', formData);
      if (response.data && response.data.status === 'success') {
        setStatus('success');
        setFeedbackMsg(response.data.message || 'Pesan Anda telah berhasil terkirim!');
        setFormData({ name: '', email: '', message: '' }); // Reset form
      } else {
        throw new Error("Gagal mengirim");
      }
    } catch (err) {
      console.error("Error submitting contact form:", err);
      setStatus('error');
      setFeedbackMsg(
        err.response?.data?.message ||
        'Koneksi server terputus. Silakan periksa apakah server backend aktif.'
      );
    }
  };

  return (
    <section id="contact" className="relative py-24 px-4 overflow-hidden border-t border-white/5 bg-black/10">
      {/* Background neon orbs */}
      <div className="absolute top-1/2 left-1/4 w-96 h-96 bg-neon-purple/5 rounded-full blur-[128px] pointer-events-none mix-blend-screen" />
      <div className="absolute bottom-10 right-1/4 w-96 h-96 bg-neon-blue/5 rounded-full blur-[128px] pointer-events-none mix-blend-screen" />

      <div className="max-w-7xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-black tracking-tight mb-4">
            HUBUNGI <span className="text-gradient">KAMI</span>
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-neon-blue to-neon-purple mx-auto rounded-full mb-6" />
          <p className="text-gray-400 font-light max-w-2xl mx-auto text-sm md:text-base">
            Tertarik untuk berkolaborasi atau memiliki pertanyaan?
            Kirimkan pesan Anda secara langsung melalui formulir terenkripsi di bawah ini.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-12 gap-12 items-start max-w-6xl mx-auto">
          {/* Information sidebar */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="lg:col-span-5 space-y-8"
          >
            <div className="glass-panel p-8 rounded-3xl border border-white/5 space-y-6">
              <h3 className="text-2xl font-bold text-white tracking-tight">Koneksi Antargalaksi</h3>
              <p className="text-gray-400 text-sm font-light leading-relaxed">
                Kami siap merespons pesan Anda dalam kurun waktu kurang dari 24 jam bumi.
                Mari ciptakan karya digital luar biasa bersama.
              </p>

              <div className="space-y-4 pt-4 border-t border-white/5">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-neon-blue">
                    <Mail size={18} />
                  </div>
                  <div>
                    <div className="text-xs text-gray-500 font-mono">EMAIL DIRECT</div>
                    <a href="mailto:gearyeramusephraim.com" className="text-sm font-bold text-white hover:text-neon-blue transition-colors">
                      gearyeramusephraim.com
                    </a>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-neon-cyan">
                    <GithubIcon size={18} />
                  </div>
                  <div>
                    <div className="text-xs text-gray-500 font-mono">GITHUB PROFILE</div>
                    <a href="https://github.com/Geary24" target="_blank" rel="noopener noreferrer" className="text-sm font-bold text-white hover:text-neon-cyan transition-colors">
                      github.com/Geary24
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Form container */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="lg:col-span-7"
          >
            <div className="glass-panel p-8 md:p-10 rounded-3xl border border-white/5 relative">

              <form onSubmit={handleSubmit} className="space-y-6">

                {/* Validation message */}
                {validationError && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="p-3 bg-red-950/40 border border-red-500/30 rounded-xl text-xs font-mono text-red-400 flex items-center gap-2"
                  >
                    <AlertOctagon size={16} />
                    <span>{validationError}</span>
                  </motion.div>
                )}

                {/* Input Name */}
                <div className="space-y-2">
                  <label htmlFor="name" className="text-xs font-bold tracking-wider text-gray-400 uppercase font-mono flex items-center gap-2">
                    <User size={12} className="text-neon-blue" />
                    Nama Lengkap
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    disabled={status === 'submitting'}
                    placeholder="Contoh: Geary Porto"
                    className="w-full bg-white/5 border border-white/10 focus:border-neon-blue rounded-xl px-4 py-3.5 text-sm text-white placeholder-gray-600 focus:outline-none transition-all duration-300 focus:shadow-[0_0_15px_rgba(0,243,255,0.1)]"
                  />
                </div>

                {/* Input Email */}
                <div className="space-y-2">
                  <label htmlFor="email" className="text-xs font-bold tracking-wider text-gray-400 uppercase font-mono flex items-center gap-2">
                    <Mail size={12} className="text-neon-purple" />
                    Alamat Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    disabled={status === 'submitting'}
                    placeholder="Contoh: geary@gearyporto.com"
                    className="w-full bg-white/5 border border-white/10 focus:border-neon-purple rounded-xl px-4 py-3.5 text-sm text-white placeholder-gray-600 focus:outline-none transition-all duration-300 focus:shadow-[0_0_15px_rgba(188,19,254,0.1)]"
                  />
                </div>

                {/* Input Message */}
                <div className="space-y-2">
                  <label htmlFor="message" className="text-xs font-bold tracking-wider text-gray-400 uppercase font-mono flex items-center gap-2">
                    <MessageSquare size={12} className="text-neon-cyan" />
                    Pesan Anda
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows="5"
                    value={formData.message}
                    onChange={handleChange}
                    disabled={status === 'submitting'}
                    placeholder="Tuliskan detail proyek atau pertanyaan Anda di sini..."
                    className="w-full bg-white/5 border border-white/10 focus:border-neon-cyan rounded-xl px-4 py-3.5 text-sm text-white placeholder-gray-600 focus:outline-none transition-all duration-300 focus:shadow-[0_0_15px_rgba(0,255,255,0.1)] resize-none"
                  />
                </div>

                {/* Submit button */}
                <button
                  type="submit"
                  disabled={status === 'submitting'}
                  className="w-full bg-gradient-to-r from-neon-blue to-neon-purple text-dark-bg font-extrabold py-4 rounded-xl flex items-center justify-center gap-2 transition-all duration-300 hover:scale-[1.02] shadow-[0_0_25px_rgba(0,243,255,0.2)] hover:shadow-[0_0_35px_rgba(0,243,255,0.3)] disabled:opacity-50 disabled:scale-100 cursor-pointer"
                >
                  {status === 'submitting' ? (
                    <>
                      <Loader2 className="animate-spin" size={18} />
                      Mengirim Pesan...
                    </>
                  ) : (
                    <>
                      <Send size={18} />
                      Kirim Pesan Sekarang
                    </>
                  )}
                </button>
              </form>

              {/* Status Overlay Modals (Success/Error) using AnimatePresence */}
              <AnimatePresence>
                {status === 'success' && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="absolute inset-0 bg-dark-bg/95 rounded-3xl p-8 flex flex-col items-center justify-center text-center z-20 border border-neon-blue/30"
                  >
                    <motion.div
                      initial={{ scale: 0.5, rotate: -10 }}
                      animate={{ scale: 1, rotate: 0 }}
                      transition={{ type: 'spring', damping: 15 }}
                    >
                      <CheckCircle2 className="text-neon-blue mb-6 animate-pulse-slow" size={64} />
                    </motion.div>
                    <h3 className="text-2xl font-bold text-white mb-2">Transmisi Berhasil!</h3>
                    <p className="text-gray-400 font-light text-sm max-w-sm mb-6 leading-relaxed">
                      {feedbackMsg}
                    </p>
                    <button
                      onClick={() => setStatus('idle')}
                      className="px-6 py-2.5 bg-white/5 border border-white/10 hover:border-white/20 text-white font-mono text-xs rounded-full font-bold transition-all"
                    >
                      Kirim Pesan Baru
                    </button>
                  </motion.div>
                )}

                {status === 'error' && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="absolute inset-0 bg-dark-bg/95 rounded-3xl p-8 flex flex-col items-center justify-center text-center z-20 border border-red-500/30"
                  >
                    <motion.div
                      initial={{ scale: 0.5 }}
                      animate={{ scale: 1 }}
                      transition={{ type: 'spring', damping: 15 }}
                    >
                      <AlertOctagon className="text-red-500 mb-6" size={64} />
                    </motion.div>
                    <h3 className="text-2xl font-bold text-white mb-2">Transmisi Gagal</h3>
                    <p className="text-red-400/80 font-mono text-xs max-w-sm mb-6 leading-relaxed p-3 bg-red-950/30 border border-red-500/10 rounded-xl">
                      {feedbackMsg}
                    </p>
                    <div className="flex gap-4">
                      <button
                        onClick={() => setStatus('idle')}
                        className="px-6 py-2.5 bg-white/5 border border-white/10 hover:border-white/20 text-white font-mono text-xs rounded-full font-bold transition-all"
                      >
                        Coba Lagi
                      </button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
