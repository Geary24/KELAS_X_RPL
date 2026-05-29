import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Volume2, VolumeX, Terminal } from 'lucide-react';

const playSynthTone = (frequency, type = 'sine', duration = 0.08, isMuted = false) => {
  if (isMuted) return;
  try {
    const AudioContext = window.AudioContext || window.webkitAudioContext;
    if (!AudioContext) return;
    const ctx = new AudioContext();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = type;
    osc.frequency.setValueAtTime(frequency, ctx.currentTime);

    gain.gain.setValueAtTime(0.12, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + duration);

    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start();
    osc.stop(ctx.currentTime + duration);
  } catch (error) {
    console.warn("Web Audio API blocked or not supported", error);
  }
};

const Calculator = ({ isOpen, onClose }) => {
  const [display, setDisplay] = useState('0');
  const [equation, setEquation] = useState('');
  const [prevVal, setPrevVal] = useState(null);
  const [op, setOp] = useState(null);
  const [isResult, setIsResult] = useState(false);
  const [isMuted, setIsMuted] = useState(false);

  if (!isOpen) return null;

  const handleNum = (num) => {
    playSynthTone(550, 'sine', 0.05, isMuted);
    if (display === '0' || isResult) {
      setDisplay(num);
      setIsResult(false);
    } else {
      if (display.length < 12) {
        setDisplay(display + num);
      }
    }
  };

  const handleDot = () => {
    playSynthTone(600, 'sine', 0.06, isMuted);
    if (isResult) {
      setDisplay('0.');
      setIsResult(false);
      return;
    }
    if (!display.includes('.')) {
      setDisplay(display + '.');
    }
  };

  const handleOperator = (operator) => {
    playSynthTone(750, 'triangle', 0.07, isMuted);
    const currentVal = parseFloat(display);

    if (op && !isResult) {
      const calculated = calculate(prevVal, currentVal, op);
      setDisplay(String(calculated));
      setPrevVal(calculated);
      setEquation(`${calculated} ${operator} `);
    } else {
      setPrevVal(currentVal);
      setEquation(`${display} ${operator} `);
    }
    setOp(operator);
    setIsResult(true);
  };

  const calculate = (first, second, operator) => {
    switch (operator) {
      case '+': return first + second;
      case '-': return first - second;
      case '*': return first * second;
      case '/': return second !== 0 ? first / second : 'ERR';
      default: return second;
    }
  };

  const handleEquals = () => {
    if (!op || isResult) {
      playSynthTone(300, 'sawtooth', 0.1, isMuted);
      return;
    }

    playSynthTone(987.77, 'triangle', 0.12, isMuted);
    const currentVal = parseFloat(display);
    const resultVal = calculate(prevVal, currentVal, op);

    setEquation(`${equation}${display} =`);
    setDisplay(String(resultVal));
    setPrevVal(null);
    setOp(null);
    setIsResult(true);
  };

  const handleClear = () => {
    playSynthTone(220, 'sawtooth', 0.15, isMuted);
    setDisplay('0');
    setEquation('');
    setPrevVal(null);
    setOp(null);
    setIsResult(false);
  };

  const handleBackspace = () => {
    playSynthTone(400, 'sine', 0.05, isMuted);
    if (isResult) return;
    if (display.length > 1) {
      setDisplay(display.slice(0, -1));
    } else {
      setDisplay('0');
    }
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 backdrop-blur-md px-4 overflow-y-auto">
        <motion.div
          initial={{ scale: 0.9, opacity: 0, y: 30 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.9, opacity: 0, y: 30 }}
          className="relative max-w-sm w-full bg-dark-card border border-neon-blue/30 rounded-3xl overflow-hidden p-6 hover:shadow-[0_0_40px_rgba(0,243,255,0.15)] transition-all duration-300"
        >
          {/* Header */}
          <div className="flex items-center justify-between mb-4 pb-3 border-b border-white/5">
            <div>
              <h3 className="text-lg font-bold tracking-tighter text-white flex items-center gap-2">
                QUANTUM <span className="text-gradient">CALCULATOR</span>
              </h3>
              <p className="text-[9px] text-gray-500 font-mono">SIMPLIFIED HUD INTERFACE</p>
            </div>

            <div className="flex items-center gap-2">
              {/* Mute Button */}
              <button
                onClick={() => setIsMuted(!isMuted)}
                className="p-1.5 rounded-lg bg-white/5 border border-white/10 hover:border-white/20 text-gray-400 hover:text-white transition-colors cursor-pointer"
              >
                {isMuted ? <VolumeX size={14} /> : <Volume2 size={14} />}
              </button>

              {/* Close Button */}
              <button
                onClick={onClose}
                className="p-1.5 rounded-lg bg-white/5 border border-white/10 hover:border-red-500 hover:text-red-500 text-gray-400 transition-colors cursor-pointer"
              >
                <X size={14} />
              </button>
            </div>
          </div>

          {/* LED Display Screen */}
          <div className="relative bg-black/60 rounded-2xl border border-white/10 p-4 font-mono overflow-hidden mb-4">
            <div className="absolute inset-0 opacity-5 bg-[linear-gradient(to_bottom,transparent_50%,rgba(0,0,0,0.7)_50%)] bg-[size:100%_4px] pointer-events-none" />
            <div className="absolute right-4 top-2 text-[9px] text-gray-500 text-right h-4 select-none overflow-hidden text-ellipsis whitespace-nowrap max-w-[90%]">
              {equation || '\u00A0'}
            </div>
            <div className="text-right text-2xl font-black tracking-tight pt-3 break-words overflow-x-auto text-neon-cyan shadow-[0_0_12px_#00f3ff] select-all font-mono leading-none">
              {display}
            </div>
          </div>

          {/* Keypad Grid */}
          <div className="grid grid-cols-4 gap-2 text-sm font-semibold tracking-wider font-mono">
            {/* row 1 */}
            <button
              onClick={handleClear}
              className="py-3.5 rounded-xl bg-red-950/20 border border-red-500/20 text-red-400 hover:bg-red-950/40 hover:border-red-500/50 transition-all cursor-pointer active:scale-95"
            >
              C
            </button>
            <button
              onClick={handleBackspace}
              className="py-3.5 rounded-xl bg-white/5 border border-white/5 text-gray-400 hover:text-white hover:bg-white/10 hover:border-white/20 transition-all cursor-pointer active:scale-95"
            >
              ⌫
            </button>
            <button
              onClick={() => handleOperator('/')}
              className="py-3.5 rounded-xl bg-white/5 border border-white/10 text-neon-blue hover:bg-white/10 transition-all cursor-pointer active:scale-95"
            >
              /
            </button>
            <button
              onClick={() => handleOperator('*')}
              className="py-3.5 rounded-xl bg-white/5 border border-white/10 text-neon-blue hover:bg-white/10 transition-all cursor-pointer active:scale-95"
            >
              *
            </button>

            {/* row 2 */}
            <button
              onClick={() => handleNum('7')}
              className="py-3.5 rounded-xl bg-white/[0.03] border border-white/5 text-white hover:bg-white/10 hover:border-white/20 transition-all cursor-pointer active:scale-95"
            >
              7
            </button>
            <button
              onClick={() => handleNum('8')}
              className="py-3.5 rounded-xl bg-white/[0.03] border border-white/5 text-white hover:bg-white/10 hover:border-white/20 transition-all cursor-pointer active:scale-95"
            >
              8
            </button>
            <button
              onClick={() => handleNum('9')}
              className="py-3.5 rounded-xl bg-white/[0.03] border border-white/5 text-white hover:bg-white/10 hover:border-white/20 transition-all cursor-pointer active:scale-95"
            >
              9
            </button>
            <button
              onClick={() => handleOperator('-')}
              className="py-3.5 rounded-xl bg-white/5 border border-white/10 text-neon-blue hover:bg-white/10 transition-all cursor-pointer active:scale-95"
            >
              -
            </button>

            {/* row 3 */}
            <button
              onClick={() => handleNum('4')}
              className="py-3.5 rounded-xl bg-white/[0.03] border border-white/5 text-white hover:bg-white/10 hover:border-white/20 transition-all cursor-pointer active:scale-95"
            >
              4
            </button>
            <button
              onClick={() => handleNum('5')}
              className="py-3.5 rounded-xl bg-white/[0.03] border border-white/5 text-white hover:bg-white/10 hover:border-white/20 transition-all cursor-pointer active:scale-95"
            >
              5
            </button>
            <button
              onClick={() => handleNum('6')}
              className="py-3.5 rounded-xl bg-white/[0.03] border border-white/5 text-white hover:bg-white/10 hover:border-white/20 transition-all cursor-pointer active:scale-95"
            >
              6
            </button>
            <button
              onClick={() => handleOperator('+')}
              className="py-3.5 rounded-xl bg-white/5 border border-white/10 text-neon-blue hover:bg-white/10 transition-all cursor-pointer active:scale-95"
            >
              +
            </button>

            {/* row 4 */}
            <button
              onClick={() => handleNum('1')}
              className="py-3.5 rounded-xl bg-white/[0.03] border border-white/5 text-white hover:bg-white/10 hover:border-white/20 transition-all cursor-pointer active:scale-95"
            >
              1
            </button>
            <button
              onClick={() => handleNum('2')}
              className="py-3.5 rounded-xl bg-white/[0.03] border border-white/5 text-white hover:bg-white/10 hover:border-white/20 transition-all cursor-pointer active:scale-95"
            >
              2
            </button>
            <button
              onClick={() => handleNum('3')}
              className="py-3.5 rounded-xl bg-white/[0.03] border border-white/5 text-white hover:bg-white/10 hover:border-white/20 transition-all cursor-pointer active:scale-95"
            >
              3
            </button>
            <button
              onClick={handleEquals}
              className="row-span-2 py-3.5 rounded-xl border border-neon-blue bg-neon-blue/15 text-neon-blue hover:brightness-125 transition-all cursor-pointer flex items-center justify-center text-lg font-bold"
            >
              =
            </button>

            {/* row 5 */}
            <button
              onClick={() => handleNum('0')}
              className="col-span-2 py-3.5 rounded-xl bg-white/[0.03] border border-white/5 text-white hover:bg-white/10 hover:border-white/20 transition-all cursor-pointer active:scale-95"
            >
              0
            </button>
            <button
              onClick={handleDot}
              className="py-3.5 rounded-xl bg-white/[0.03] border border-white/5 text-white hover:bg-white/10 hover:border-white/20 transition-all cursor-pointer active:scale-95"
            >
              .
            </button>
          </div>

          {/* Minimal Status Text */}
          <div className="mt-4 pt-3 border-t border-white/5 flex justify-between text-[8px] text-gray-600 font-mono">
            <span>SYS_CORE: SIMPLIFIED HUD</span>
            <span>STATUS: ONLINE</span>
          </div>

        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default Calculator;
