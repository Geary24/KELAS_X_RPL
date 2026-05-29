import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Mail, Lock, User, Eye, EyeOff, AlertCircle, ShieldAlert, Cpu, Terminal } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

// Audio Feedback Synthesizer using Web Audio API
const playAuthSound = (type, isMuted = false) => {
  if (isMuted) return;
  try {
    const AudioContext = window.AudioContext || window.webkitAudioContext;
    if (!AudioContext) return;
    const ctx = new AudioContext();

    if (type === 'click') {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(650, ctx.currentTime);
      gain.gain.setValueAtTime(0.06, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.04);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + 0.04);
    } else if (type === 'tab') {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(440, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(880, ctx.currentTime + 0.1);
      gain.gain.setValueAtTime(0.08, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.1);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + 0.1);
    } else if (type === 'success') {
      // Arpeggio access granted synth chime
      const notes = [523.25, 659.25, 783.99, 1046.5]; // C5, E5, G5, C6
      notes.forEach((freq, idx) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, ctx.currentTime + idx * 0.06);
        
        gain.gain.setValueAtTime(0.12, ctx.currentTime + idx * 0.06);
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + idx * 0.06 + 0.2);
        
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(ctx.currentTime + idx * 0.06);
        osc.stop(ctx.currentTime + idx * 0.06 + 0.25);
      });
    } else if (type === 'error') {
      // Descending buzz error sweep
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(180, ctx.currentTime);
      osc.frequency.linearRampToValueAtTime(80, ctx.currentTime + 0.25);
      
      gain.gain.setValueAtTime(0.15, ctx.currentTime);
      gain.gain.linearRampToValueAtTime(0.001, ctx.currentTime + 0.25);
      
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + 0.25);
    }
  } catch (error) {
    console.warn("Audio Context not running", error);
  }
};

const AuthModal = ({ isOpen, onClose }) => {
  const { login, register, loginOffline } = useAuth();
  const [activeTab, setActiveTab] = useState('login'); // 'login', 'register', 'simulation'
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', password: '' });
  
  const [errorMsg, setErrorMsg] = useState('');
  const [fieldErrors, setFieldErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [isBackendOffline, setIsBackendOffline] = useState(false);
  const [isMuted, setIsMuted] = useState(false);

  if (!isOpen) return null;

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (fieldErrors[name]) {
      setFieldErrors((prev) => ({ ...prev, [name]: null }));
    }
    setErrorMsg('');
  };

  const handleTabChange = (tab) => {
    playAuthSound('tab', isMuted);
    setActiveTab(tab);
    setErrorMsg('');
    setFieldErrors({});
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg('');
    setFieldErrors({});
    setLoading(true);
    playAuthSound('click', isMuted);

    if (activeTab === 'login') {
      const result = await login(formData.email, formData.password);
      if (result.success) {
        playAuthSound('success', isMuted);
        setFormData({ name: '', email: '', password: '' });
        onClose();
      } else {
        playAuthSound('error', isMuted);
        setErrorMsg(result.message);
        if (result.errors) setFieldErrors(result.errors);
        if (result.offline) {
          setIsBackendOffline(true);
          // Show simulated tab options
          setActiveTab('simulation');
        }
      }
    } else {
      const result = await register(formData.name, formData.email, formData.password);
      if (result.success) {
        playAuthSound('success', isMuted);
        setFormData({ name: '', email: '', password: '' });
        onClose();
      } else {
        playAuthSound('error', isMuted);
        setErrorMsg(result.message);
        if (result.errors) setFieldErrors(result.errors);
        if (result.offline) {
          setIsBackendOffline(true);
          setActiveTab('simulation');
        }
      }
    }
    setLoading(false);
  };

  const handleSimulatedBypass = () => {
    playAuthSound('success', isMuted);
    loginOffline(formData.name || 'Geary Admin', formData.email || 'admin@geary.com');
    setFormData({ name: '', email: '', password: '' });
    setIsBackendOffline(false);
    onClose();
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        {/* Backdrop overlay */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0 bg-black/85 backdrop-blur-md"
        />

        {/* Modal content panel */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 20 }}
          transition={{ type: 'spring', damping: 25, stiffness: 350 }}
          className="relative w-full max-w-md overflow-hidden rounded-3xl border border-white/10 glass-panel bg-dark-bg p-6 md:p-8 shadow-[0_0_50px_rgba(0,243,255,0.15)] z-10"
        >
          {/* Neon radial decorations */}
          <div className="absolute -top-24 -left-24 w-48 h-48 bg-neon-blue/5 rounded-full blur-[80px] pointer-events-none" />
          <div className="absolute -bottom-24 -right-24 w-48 h-48 bg-neon-purple/5 rounded-full blur-[80px] pointer-events-none" />
          
          {/* Header */}
          <div className="flex items-center justify-between mb-6 relative z-10">
            <div>
              <h3 className="text-xl font-black tracking-widest text-white">
                {activeTab === 'login' ? 'SECURE_ACCESS' : activeTab === 'register' ? 'ESTABLISH_NODE' : 'ACCESS_BYPASS'}
              </h3>
              <p className="text-[9px] text-gray-500 font-mono">AUTH PROTOCOL TERMINAL v2.1</p>
            </div>
            
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-red-500 hover:bg-white/5 p-2 rounded-xl transition-all cursor-pointer border border-transparent hover:border-red-500/20"
            >
              <X size={16} />
            </button>
          </div>

          {/* Tab Navigation */}
          <div className="flex gap-1.5 p-1 bg-black/45 border border-white/5 rounded-2xl mb-6 relative z-10 text-[10px] font-mono font-bold tracking-widest">
            <button
              onClick={() => handleTabChange('login')}
              className={`flex-1 py-2.5 text-center rounded-xl transition-all relative ${
                activeTab === 'login' ? 'text-dark-bg font-bold' : 'text-gray-500 hover:text-white'
              }`}
            >
              {activeTab === 'login' && (
                <motion.div
                  layoutId="activeTabGlow"
                  className="absolute inset-0 bg-gradient-to-r from-neon-blue to-neon-purple rounded-xl -z-10 shadow-[0_0_12px_rgba(0,243,255,0.2)]"
                />
              )}
              LOGIN
            </button>
            <button
              onClick={() => handleTabChange('register')}
              className={`flex-1 py-2.5 text-center rounded-xl transition-all relative ${
                activeTab === 'register' ? 'text-dark-bg font-bold' : 'text-gray-500 hover:text-white'
              }`}
            >
              {activeTab === 'register' && (
                <motion.div
                  layoutId="activeTabGlow"
                  className="absolute inset-0 bg-gradient-to-r from-neon-blue to-neon-purple rounded-xl -z-10 shadow-[0_0_12px_rgba(0,243,255,0.2)]"
                />
              )}
              REGISTER
            </button>
            <button
              onClick={() => handleTabChange('simulation')}
              className={`flex-1 py-2.5 text-center rounded-xl transition-all relative ${
                activeTab === 'simulation' ? 'text-dark-bg font-bold' : 'text-gray-500 hover:text-white'
              }`}
            >
              {activeTab === 'simulation' && (
                <motion.div
                  layoutId="activeTabGlow"
                  className="absolute inset-0 bg-gradient-to-r from-neon-blue to-neon-purple rounded-xl -z-10 shadow-[0_0_12px_rgba(0,243,255,0.2)]"
                />
              )}
              BYPASS
            </button>
          </div>

          {/* Render Active Area */}
          <AnimatePresence mode="wait">
            
            {/* 1. Offline Simulation Bypass HUD Tab */}
            {activeTab === 'simulation' ? (
              <motion.div
                key="simulation_tab"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-5 text-center font-mono py-2 relative z-10"
              >
                <div className="bg-neon-purple/5 border border-neon-purple/30 rounded-2xl p-4 flex flex-col items-center gap-3">
                  <ShieldAlert size={44} className="text-neon-purple animate-pulse" />
                  <div>
                    <h4 className="text-xs font-bold text-white tracking-widest uppercase">SIMULATION MODE BYPASS</h4>
                    <p className="text-[9px] text-gray-400 mt-2 leading-relaxed">
                      You can instantly establish an offline Admin session. This authorizes bypass security controls, enabling **real-time website editing capabilities** directly from the frontend dashboard.
                    </p>
                  </div>
                </div>

                <div className="space-y-3 pt-2 text-left">
                  <div>
                    <label className="text-[10px] text-gray-500 uppercase tracking-widest">Simulated Operator Name</label>
                    <input
                      type="text"
                      placeholder="Geary Admin"
                      value={formData.name}
                      name="name"
                      onChange={handleInputChange}
                      className="w-full pl-4 pr-4 py-3 bg-white/5 border border-white/10 focus:border-neon-purple focus:outline-none rounded-2xl text-xs text-white transition-all font-mono"
                    />
                  </div>
                  <div>
                    <label className="text-[10px] text-gray-500 uppercase tracking-widest">Simulated Operator Email</label>
                    <input
                      type="email"
                      placeholder="admin@geary.com"
                      value={formData.email}
                      name="email"
                      onChange={handleInputChange}
                      className="w-full pl-4 pr-4 py-3 bg-white/5 border border-white/10 focus:border-neon-purple focus:outline-none rounded-2xl text-xs text-white transition-all font-mono"
                    />
                  </div>
                </div>

                <button
                  type="button"
                  onClick={handleSimulatedBypass}
                  className="w-full mt-4 py-3.5 bg-gradient-to-r from-neon-blue to-neon-purple text-dark-bg font-extrabold text-xs tracking-widest rounded-2xl transition-all duration-300 hover:shadow-[0_0_25px_rgba(188,19,254,0.3)] hover:scale-[1.01] active:scale-[0.99] cursor-pointer flex items-center justify-center gap-2 uppercase"
                >
                  <Cpu size={14} />
                  Simulate Admin Bypass
                </button>
              </motion.div>
            ) : (
              
              /* 2. Login & Register Forms */
              <motion.form
                key="form_tab"
                onSubmit={handleSubmit}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                className="space-y-4 relative z-10"
              >
                {/* Connection Error Message */}
                {errorMsg && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="p-3.5 bg-red-950/20 border border-red-500/20 text-red-400 rounded-2xl flex items-start gap-2.5 text-[10px] font-mono leading-relaxed"
                  >
                    <AlertCircle size={14} className="shrink-0 mt-0.5" />
                    <div className="flex-grow">
                      <span>{errorMsg}</span>
                      {isBackendOffline && (
                        <span className="block text-gray-500 text-[8px] mt-1.5 uppercase font-bold tracking-tighter">
                          PROTIP: Select the 'BYPASS' tab above to test offline simulation mode!
                        </span>
                      )}
                    </div>
                  </motion.div>
                )}

                {/* Username Input (Register Only) */}
                {activeTab === 'register' && (
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-mono tracking-wider text-gray-400 uppercase">Operator Name</label>
                    <div className="relative">
                      <User className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" size={16} />
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        placeholder="Geary Porto"
                        required={activeTab === 'register'}
                        className={`w-full pl-11 pr-4 py-3 bg-white/5 border rounded-2xl text-xs text-white focus:outline-none transition-all duration-300 ${
                          fieldErrors.name
                            ? 'border-red-500/40 focus:border-red-500'
                            : 'border-white/10 focus:border-neon-blue focus:shadow-[0_0_12px_rgba(0,243,255,0.1)]'
                        }`}
                      />
                    </div>
                    {fieldErrors.name && (
                      <span className="text-[9px] text-red-400 font-mono pl-1">{fieldErrors.name[0]}</span>
                    )}
                  </div>
                )}

                {/* E-Mail Input */}
                <div className="space-y-1.5">
                  <label className="text-[10px] font-mono tracking-wider text-gray-400 uppercase">Secure Email</label>
                  <div className="relative">
                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" size={16} />
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder="name@example.com"
                      required
                      className={`w-full pl-11 pr-4 py-3 bg-white/5 border rounded-2xl text-xs text-white focus:outline-none transition-all duration-300 ${
                        fieldErrors.email
                          ? 'border-red-500/40 focus:border-red-500'
                          : 'border-white/10 focus:border-neon-blue focus:shadow-[0_0_12px_rgba(0,243,255,0.1)]'
                      }`}
                    />
                  </div>
                  {fieldErrors.email && (
                    <span className="text-[9px] text-red-400 font-mono pl-1">{fieldErrors.email[0]}</span>
                  )}
                </div>

                {/* Password Input */}
                <div className="space-y-1.5">
                  <div className="flex justify-between items-center">
                    <label className="text-[10px] font-mono tracking-wider text-gray-400 uppercase">Secret Phrase</label>
                  </div>
                  <div className="relative">
                    <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" size={16} />
                    <input
                      type={showPassword ? 'text' : 'password'}
                      name="password"
                      value={formData.password}
                      onChange={handleInputChange}
                      placeholder="••••••••"
                      required
                      minLength={8}
                      className={`w-full pl-11 pr-11 py-3 bg-white/5 border rounded-2xl text-xs text-white focus:outline-none transition-all duration-300 ${
                        fieldErrors.password
                          ? 'border-red-500/40 focus:border-red-500'
                          : 'border-white/10 focus:border-neon-blue focus:shadow-[0_0_12px_rgba(0,243,255,0.1)]'
                      }`}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-white cursor-pointer"
                    >
                      {showPassword ? <EyeOff size={14} /> : <Eye size={14} />}
                    </button>
                  </div>
                  {fieldErrors.password && (
                    <span className="text-[9px] text-red-400 font-mono pl-1">{fieldErrors.password[0]}</span>
                  )}
                </div>

                {/* Submit Input */}
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full relative mt-5 py-3.5 bg-gradient-to-r from-neon-blue to-neon-purple text-dark-bg font-extrabold text-xs tracking-widest rounded-2xl transition-all duration-300 hover:shadow-[0_0_20px_rgba(0,243,255,0.3)] hover:scale-[1.01] active:scale-[0.99] disabled:opacity-50 disabled:pointer-events-none cursor-pointer uppercase flex items-center justify-center gap-2"
                >
                  {loading ? (
                    <>
                      <div className="w-4 h-4 border-2 border-dark-bg border-t-transparent rounded-full animate-spin" />
                      <span>SECURE_LINKING...</span>
                    </>
                  ) : (
                    <span>{activeTab === 'login' ? 'INITIALIZE_LOGIN' : 'REGISTER_CREDENTIALS'}</span>
                  )}
                </button>

                {/* Status Indicator */}
                <div className="flex justify-between text-[7px] text-gray-600 font-mono uppercase tracking-widest pt-2">
                  <span>SECURE LINK: active</span>
                  <span>ENCRYPTION: sha-256</span>
                </div>
              </motion.form>
            )}
          </AnimatePresence>

        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default AuthModal;
