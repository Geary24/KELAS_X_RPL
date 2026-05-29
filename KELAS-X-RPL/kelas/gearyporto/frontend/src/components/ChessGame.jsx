import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Play, RotateCcw, Volume2, VolumeX, Cpu, Terminal, Users } from 'lucide-react';

// Piece representation:
// color: 'w' (White/Cyan - Player), 'b' (Black/Purple - AI/Player 2)
// type: 'p' (Pawn), 'r' (Rook), 'n' (Knight), 'b' (Bishop), 'q' (Queen), 'k' (King)

const INITIAL_BOARD = () => [
  [
    { type: 'r', color: 'b' }, { type: 'n', color: 'b' }, { type: 'b', color: 'b' }, { type: 'q', color: 'b' },
    { type: 'k', color: 'b' }, { type: 'b', color: 'b' }, { type: 'n', color: 'b' }, { type: 'r', color: 'b' }
  ],
  Array(8).fill(null).map(() => ({ type: 'p', color: 'b' })),
  Array(8).fill(null),
  Array(8).fill(null),
  Array(8).fill(null),
  Array(8).fill(null),
  Array(8).fill(null).map(() => ({ type: 'p', color: 'w' })),
  [
    { type: 'r', color: 'w' }, { type: 'n', color: 'w' }, { type: 'b', color: 'w' }, { type: 'q', color: 'w' },
    { type: 'k', color: 'w' }, { type: 'b', color: 'w' }, { type: 'n', color: 'w' }, { type: 'r', color: 'w' }
  ]
];

// Synth Sounds helper using Web Audio API
const playChessSound = (type, isMuted) => {
  if (isMuted) return;
  try {
    const AudioContext = window.AudioContext || window.webkitAudioContext;
    if (!AudioContext) return;
    const ctx = new AudioContext();

    if (type === 'select') {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(600, ctx.currentTime);
      gain.gain.setValueAtTime(0.06, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.05);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + 0.05);
    } else if (type === 'move') {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(329.63, ctx.currentTime); // E4 note
      gain.gain.setValueAtTime(0.12, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.08);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + 0.08);
    } else if (type === 'capture') {
      const osc = ctx.createOscillator();
      const noise = ctx.createOscillator();
      const gain = ctx.createGain();
      
      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(220, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(80, ctx.currentTime + 0.15);

      noise.type = 'triangle';
      noise.frequency.setValueAtTime(440, ctx.currentTime);

      gain.gain.setValueAtTime(0.15, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.2);

      osc.connect(gain);
      noise.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      noise.start();
      osc.stop(ctx.currentTime + 0.2);
      noise.stop(ctx.currentTime + 0.2);
    } else if (type === 'check') {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(587.33, ctx.currentTime); // D5 note
      osc.frequency.setValueAtTime(440, ctx.currentTime + 0.08);
      
      gain.gain.setValueAtTime(0.1, ctx.currentTime);
      gain.gain.linearRampToValueAtTime(0.001, ctx.currentTime + 0.25);
      
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + 0.25);
    } else if (type === 'victory') {
      const notes = [261.63, 329.63, 392.00, 523.25]; // C arpeggio
      notes.forEach((freq, i) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, ctx.currentTime + i * 0.08);
        gain.gain.setValueAtTime(0.1, ctx.currentTime + i * 0.08);
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + i * 0.08 + 0.2);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(ctx.currentTime + i * 0.08);
        osc.stop(ctx.currentTime + i * 0.08 + 0.25);
      });
    }
  } catch (error) {
    console.warn("Audio Context not supported", error);
  }
};

const ChessGame = ({ isOpen, onClose }) => {
  const [board, setBoard] = useState(INITIAL_BOARD());
  const [turn, setTurn] = useState('w'); // 'w' or 'b'
  const [selectedPiece, setSelectedPiece] = useState(null); // { r, c }
  const [validMoves, setValidMoves] = useState([]); // Array of [r, c]
  const [isVsAI, setIsVsAI] = useState(true);
  const [aiThinking, setAiThinking] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [logs, setLogs] = useState(['[SYSTEM]: NEURAL MATRIX INITIALIZED', '[SYSTEM]: TURN: WHITE (CYAN)']);
  const [captured, setCaptured] = useState({ w: [], b: [] }); // captured pieces lists
  const [winner, setWinner] = useState(null); // 'w', 'b', 'draw', or null

  const logsEndRef = useRef(null);

  useEffect(() => {
    if (logsEndRef.current) {
      logsEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [logs]);

  // Reset Board on Modal Open/Close
  useEffect(() => {
    if (isOpen) {
      resetGame();
    }
  }, [isOpen]);

  // AI turn automation trigger
  useEffect(() => {
    if (isOpen && isVsAI && turn === 'b' && !winner && !aiThinking) {
      setAiThinking(true);
      const timer = setTimeout(() => {
        makeAIMove();
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [turn, isVsAI, isOpen, winner]);

  const resetGame = () => {
    setBoard(INITIAL_BOARD());
    setTurn('w');
    setSelectedPiece(null);
    setValidMoves([]);
    setWinner(null);
    setCaptured({ w: [], b: [] });
    setLogs(['[SYSTEM]: BOARD REBOOT COMPLETED', '[SYSTEM]: TURN: WHITE (CYAN)']);
    playChessSound('select', isMuted);
  };

  const addLog = (message) => {
    setLogs((prev) => [...prev, message]);
  };

  // Convert board indices to Chess algebraic notations (e.g. 7, 0 -> a1)
  const getAlgebraicNotation = (r, c) => {
    const files = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'];
    const ranks = ['8', '7', '6', '5', '4', '3', '2', '1'];
    return `${files[c]}${ranks[r]}`;
  };

  // Unicode representations of chess pieces
  const getPieceSymbol = (piece) => {
    if (!piece) return '';
    const symbols = {
      w: { p: '♙', r: '♖', n: '♘', b: '♗', q: '♕', k: '♔' },
      b: { p: '♟', r: '♜', n: '♞', b: '♝', q: '♛', k: '♚' }
    };
    return symbols[piece.color][piece.type];
  };

  const getPieceName = (type) => {
    const names = { p: 'PAWN', r: 'ROOK', n: 'KNIGHT', b: 'BISHOP', q: 'QUEEN', k: 'KING' };
    return names[type];
  };

  // Get valid moves for a piece at row, col
  const getPieceValidMoves = (r, c, currentBoard) => {
    const piece = currentBoard[r][c];
    if (!piece) return [];

    const moves = [];
    const color = piece.color;
    const opponentColor = color === 'w' ? 'b' : 'w';

    const inBounds = (row, col) => row >= 0 && row < 8 && col >= 0 && col < 8;

    switch (piece.type) {
      case 'p': {
        const dir = color === 'w' ? -1 : 1;
        const startRow = color === 'w' ? 6 : 1;

        // One step forward
        if (inBounds(r + dir, c) && currentBoard[r + dir][c] === null) {
          moves.push([r + dir, c]);
          // Two steps forward from start
          if (r === startRow && currentBoard[r + 2 * dir][c] === null) {
            moves.push([r + 2 * dir, c]);
          }
        }

        // Diagonals captures
        const diagonals = [[r + dir, c - 1], [r + dir, c + 1]];
        diagonals.forEach(([nr, nc]) => {
          if (inBounds(nr, nc) && currentBoard[nr][nc] && currentBoard[nr][nc].color === opponentColor) {
            moves.push([nr, nc]);
          }
        });
        break;
      }

      case 'r': {
        const directions = [[-1, 0], [1, 0], [0, -1], [0, 1]];
        directions.forEach(([dr, dc]) => {
          let currR = r + dr;
          let currC = c + dc;
          while (inBounds(currR, currC)) {
            const target = currentBoard[currR][currC];
            if (!target) {
              moves.push([currR, currC]);
            } else {
              if (target.color === opponentColor) {
                moves.push([currR, currC]);
              }
              break; // Hit another piece
            }
            currR += dr;
            currC += dc;
          }
        });
        break;
      }

      case 'b': {
        const directions = [[-1, -1], [-1, 1], [1, -1], [1, 1]];
        directions.forEach(([dr, dc]) => {
          let currR = r + dr;
          let currC = c + dc;
          while (inBounds(currR, currC)) {
            const target = currentBoard[currR][currC];
            if (!target) {
              moves.push([currR, currC]);
            } else {
              if (target.color === opponentColor) {
                moves.push([currR, currC]);
              }
              break;
            }
            currR += dr;
            currC += dc;
          }
        });
        break;
      }

      case 'q': {
        // Combined Rook and Bishop
        const directions = [
          [-1, 0], [1, 0], [0, -1], [0, 1],
          [-1, -1], [-1, 1], [1, -1], [1, 1]
        ];
        directions.forEach(([dr, dc]) => {
          let currR = r + dr;
          let currC = c + dc;
          while (inBounds(currR, currC)) {
            const target = currentBoard[currR][currC];
            if (!target) {
              moves.push([currR, currC]);
            } else {
              if (target.color === opponentColor) {
                moves.push([currR, currC]);
              }
              break;
            }
            currR += dr;
            currC += dc;
          }
        });
        break;
      }

      case 'n': {
        const knightJumps = [
          [r - 2, c - 1], [r - 2, c + 1],
          [r - 1, c - 2], [r - 1, c + 2],
          [r + 1, c - 2], [r + 1, c + 2],
          [r + 2, c - 1], [r + 2, c + 1]
        ];
        knightJumps.forEach(([nr, nc]) => {
          if (inBounds(nr, nc)) {
            const target = currentBoard[nr][nc];
            if (!target || target.color === opponentColor) {
              moves.push([nr, nc]);
            }
          }
        });
        break;
      }

      case 'k': {
        const kingMoves = [
          [r - 1, c - 1], [r - 1, c], [r - 1, c + 1],
          [r, c - 1],                 [r, c + 1],
          [r + 1, c - 1], [r + 1, c], [r + 1, c + 1]
        ];
        kingMoves.forEach(([nr, nc]) => {
          if (inBounds(nr, nc)) {
            const target = currentBoard[nr][nc];
            if (!target || target.color === opponentColor) {
              moves.push([nr, nc]);
            }
          }
        });
        break;
      }

      default:
        break;
    }

    return moves;
  };

  // Select square click
  const handleSquareClick = (r, c) => {
    if (winner || aiThinking) return;

    // AI is playing Black and it is Black's turn - player cannot click
    if (isVsAI && turn === 'b') return;

    const piece = board[r][c];

    // If square is highlighted, execute the move!
    const isMoveHighlighted = validMoves.some(([mr, mc]) => mr === r && mc === c);
    if (isMoveHighlighted && selectedPiece) {
      executeMove(selectedPiece.r, selectedPiece.c, r, c);
      return;
    }

    // Otherwise, select piece of current turn
    if (piece && piece.color === turn) {
      playChessSound('select', isMuted);
      setSelectedPiece({ r, c });
      setValidMoves(getPieceValidMoves(r, c, board));
    } else {
      setSelectedPiece(null);
      setValidMoves([]);
    }
  };

  // Move core executing
  const executeMove = (fromR, fromC, toR, toC) => {
    const nextBoard = board.map((row) => [...row]);
    const piece = nextBoard[fromR][fromC];
    const targetPiece = nextBoard[toR][toC];

    // Check pawn promotion to Queen
    if (piece.type === 'p' && (toR === 0 || toR === 7)) {
      piece.type = 'q';
      addLog(`[SYSTEM]: PAWN PROMOTED TO QUEEN ON ${getAlgebraicNotation(toR, toC)}`);
    }

    nextBoard[toR][toC] = piece;
    nextBoard[fromR][fromC] = null;

    // Track captured pieces
    if (targetPiece) {
      playChessSound('capture', isMuted);
      const capColor = targetPiece.color;
      setCaptured((prev) => ({
        ...prev,
        [capColor]: [...prev[capColor], targetPiece]
      }));

      addLog(`[COMBAT]: ${piece.color === 'w' ? 'WHITE' : 'BLACK'} CAPTURED ${getPieceName(targetPiece.type)} ON ${getAlgebraicNotation(toR, toC)}`);

      // If King captured, game over!
      if (targetPiece.type === 'k') {
        setWinner(piece.color);
        addLog(`[SYSTEM]: GAME OVER! WINNER: ${piece.color === 'w' ? 'WHITE (CYAN)' : 'BLACK (PURPLE)'}`);
        playChessSound('victory', isMuted);
        setBoard(nextBoard);
        setSelectedPiece(null);
        setValidMoves([]);
        return;
      }
    } else {
      playChessSound('move', isMuted);
    }

    // Log move description
    addLog(`[MOVE]: ${piece.color === 'w' ? 'WHITE' : 'BLACK'} ${getPieceName(piece.type)} ${getAlgebraicNotation(fromR, fromC)} → ${getAlgebraicNotation(toR, toC)}`);

    setBoard(nextBoard);
    setSelectedPiece(null);
    setValidMoves([]);

    // Turn change
    const nextTurn = turn === 'w' ? 'b' : 'w';
    setTurn(nextTurn);
    addLog(`[SYSTEM]: TURN: ${nextTurn === 'w' ? 'WHITE (CYAN)' : 'BLACK (PURPLE)'}`);
  };

  // Tactical Neural AI decision making (Simple Minimax/Capture evaluator)
  const makeAIMove = () => {
    // Find all legal moves for Black
    const allMoves = [];
    for (let r = 0; r < 8; r++) {
      for (let c = 0; c < 8; c++) {
        const piece = board[r][c];
        if (piece && piece.color === 'b') {
          const legal = getPieceValidMoves(r, c, board);
          legal.forEach(([tr, tc]) => {
            allMoves.push({
              from: { r, c },
              to: { r: tr, c: tc },
              piece,
              target: board[tr][tc]
            });
          });
        }
      }
    }

    if (allMoves.length === 0) {
      // AI has no moves, player wins or draw
      setWinner('w');
      addLog('[SYSTEM]: AI TERMINATED - NO MOVES AVAILABLE');
      playChessSound('victory', isMuted);
      setAiThinking(false);
      return;
    }

    // Score moves
    const scoredMoves = allMoves.map((m) => {
      let score = 0;

      // Prioritize Capturing
      if (m.target) {
        const values = { p: 10, n: 30, b: 30, r: 50, q: 90, k: 900 };
        score += values[m.target.type];
      }

      // Small bonus for pushing pawn forward
      if (m.piece.type === 'p') {
        score += m.to.r; // moving down increases row number (closer to promotion)
      }

      // Small bonus for knight/bishop moving to center columns (3, 4)
      if ((m.piece.type === 'n' || m.piece.type === 'b') && (m.to.c === 3 || m.to.c === 4)) {
        score += 2;
      }

      // Avoid immediate danger (very basic check)
      // Add organic random variability (0 to 3) so plays are unpredictable
      score += Math.random() * 3;

      return { ...m, score };
    });

    // Sort moves by score descending
    scoredMoves.sort((a, b) => b.score - a.score);

    // Pick top score (or one of the top if equal)
    const bestMove = scoredMoves[0];

    executeMove(bestMove.from.r, bestMove.from.c, bestMove.to.r, bestMove.to.c);
    setAiThinking(false);
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 backdrop-blur-md px-4 overflow-y-auto">
        <motion.div
          initial={{ scale: 0.9, opacity: 0, y: 30 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.9, opacity: 0, y: 30 }}
          className="relative max-w-4xl w-full bg-dark-card border border-neon-blue/30 rounded-3xl overflow-hidden p-6 md:p-8 hover:shadow-[0_0_50px_rgba(0,243,255,0.15)] transition-all duration-300"
        >
          {/* Header */}
          <div className="flex items-center justify-between mb-4 pb-3 border-b border-white/5">
            <div>
              <h3 className="text-xl font-bold tracking-tighter text-white">
                AETHER <span className="text-gradient">CYBER CHESS</span>
              </h3>
              <p className="text-[10px] text-gray-500 font-mono">HOLOGRAPHIC TURN-BASED CONFLICT ENGINE</p>
            </div>
            
            <div className="flex items-center gap-2">
              {/* Turn Indicator */}
              <div className="flex items-center gap-2 mr-4 bg-white/5 border border-white/10 px-3 py-1 rounded-full text-[10px] font-mono font-bold">
                <span className="text-gray-500">TURN:</span>
                <span className={turn === 'w' ? 'text-neon-cyan shadow-sm' : 'text-neon-purple'}>
                  {turn === 'w' ? 'WHITE (PLAYER)' : 'BLACK (OPPONENT)'}
                </span>
              </div>

              {/* Toggle AI Button */}
              <button
                onClick={() => {
                  setIsVsAI(!isVsAI);
                  resetGame();
                }}
                className={`p-1.5 rounded-lg border transition-colors flex items-center gap-1.5 text-[10px] font-mono cursor-pointer ${
                  isVsAI ? 'bg-neon-blue/10 border-neon-blue/40 text-neon-cyan' : 'bg-white/5 border-white/10 text-gray-400 hover:text-white'
                }`}
              >
                {isVsAI ? <Cpu size={12} /> : <Users size={12} />}
                {isVsAI ? 'Neural AI ON' : 'Pass & Play'}
              </button>

              {/* Mute Button */}
              <button
                onClick={() => setIsMuted(!isMuted)}
                className="p-1.5 rounded-lg bg-white/5 border border-white/10 hover:border-white/20 text-gray-400 hover:text-white transition-colors cursor-pointer"
              >
                {isMuted ? <VolumeX size={16} /> : <Volume2 size={16} />}
              </button>
              
              {/* Close Button */}
              <button
                onClick={onClose}
                className="p-1.5 rounded-lg bg-white/5 border border-white/10 hover:border-neon-purple hover:text-neon-purple text-gray-400 transition-colors cursor-pointer"
              >
                <X size={16} />
              </button>
            </div>
          </div>

          {/* Core Layout Grid */}
          <div className="grid md:grid-cols-12 gap-6">
            
            {/* Left/Middle Column: Chessboard Board Grid */}
            <div className="md:col-span-8 flex flex-col items-center">
              
              {/* Captured Material bar top (Opponent's captures) */}
              <div className="w-full max-w-[400px] flex gap-1 justify-start mb-2 font-mono text-[10px] text-gray-500 min-h-6 items-center px-2 bg-black/35 rounded-lg border border-white/5">
                <span>CAPTURED WHITE:</span>
                <div className="flex gap-0.5 text-neon-cyan/60">
                  {captured.w.map((p, i) => (
                    <span key={i} className="text-sm">{getPieceSymbol(p)}</span>
                  ))}
                </div>
              </div>

              {/* Chessboard container */}
              <div className="relative aspect-square w-full max-w-[400px] bg-black/60 rounded-2xl border border-white/10 overflow-hidden flex items-center justify-center p-2 shadow-2xl">
                
                {/* Visual holograms */}
                <div className="absolute inset-0 opacity-5 bg-[linear-gradient(to_bottom,transparent_50%,rgba(0,0,0,0.7)_50%)] bg-[size:100%_4px] pointer-events-none z-20" />
                <div className="absolute inset-0 opacity-10 bg-[linear-gradient(to_right,#808080_1px,transparent_1px),linear-gradient(to_bottom,#808080_1px,transparent_1px)] bg-[size:50px_50px] pointer-events-none" />

                {/* Game Over Screen */}
                <AnimatePresence>
                  {winner && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="absolute inset-0 z-30 flex flex-col items-center justify-center text-center bg-black/90 p-4"
                    >
                      <h4 className="text-2xl font-black text-white tracking-widest">
                        {winner === 'w' ? 'KONSOL MEMORI DIREBUT' : 'TERMINASI SISTEM'}
                      </h4>
                      <p className="text-[10px] text-neon-blue font-mono mt-1 mb-6">
                        {winner === 'w' ? 'PLAYER CYAN SECURES ABSOLUTE WIN' : 'AI NEURAL VECTOR OVERRIDES MATRIX'}
                      </p>
                      
                      <button
                        onClick={resetGame}
                        className="flex items-center gap-1.5 bg-gradient-to-r from-neon-blue to-neon-purple text-dark-bg font-extrabold px-6 py-2.5 rounded-full text-xs transition-all duration-300 hover:scale-105 shadow-[0_0_20px_rgba(0,243,255,0.2)] cursor-pointer"
                      >
                        <RotateCcw size={12} />
                        Reboot Match
                      </button>
                    </motion.div>
                  )}

                  {/* AI thinking scanner */}
                  {aiThinking && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 0.85 }}
                      exit={{ opacity: 0 }}
                      className="absolute inset-0 z-10 flex flex-col items-center justify-center text-center bg-black/70 p-4 pointer-events-none font-mono"
                    >
                      <div className="w-12 h-12 border-2 border-neon-purple border-t-transparent rounded-full animate-spin mb-4" />
                      <span className="text-neon-purple text-xs tracking-widest animate-pulse font-bold">AI NEURAL COGNITION RUNNING...</span>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* 8x8 Board Render */}
                <div className="grid grid-cols-8 grid-rows-8 w-full h-full border border-white/5 rounded-lg overflow-hidden bg-black/30">
                  {board.map((row, rIdx) => 
                    row.map((piece, cIdx) => {
                      const isDark = (rIdx + cIdx) % 2 === 1;
                      const isSelected = selectedPiece && selectedPiece.r === rIdx && selectedPiece.c === cIdx;
                      const isHighlighted = validMoves.some(([mr, mc]) => mr === rIdx && mc === cIdx);

                      return (
                        <div
                          key={`${rIdx}-${cIdx}`}
                          onClick={() => handleSquareClick(rIdx, cIdx)}
                          className={`relative flex items-center justify-center cursor-pointer transition-all duration-200 aspect-square select-none ${
                            isDark ? 'bg-white/[0.02]' : 'bg-transparent'
                          } ${
                            isSelected ? 'bg-neon-blue/20 ring-1 ring-neon-blue/40 z-10' : ''
                          } hover:bg-white/[0.06]`}
                        >
                          {/* Valid Move Neon dots */}
                          {isHighlighted && (
                            <div className={`absolute w-3.5 h-3.5 rounded-full z-10 shadow-lg ${
                              piece 
                                ? 'bg-neon-purple/80 ring-2 ring-neon-purple shadow-[0_0_10px_#bc13fe]' 
                                : 'bg-neon-blue/80 shadow-[0_0_10px_#00f3ff]'
                            }`} />
                          )}

                          {/* Pieces symbols with glowing styles */}
                          {piece && (
                            <motion.span
                              initial={{ scale: 0.8, opacity: 0 }}
                              animate={{ scale: 1, opacity: 1 }}
                              className={`text-3xl font-normal leading-none transform transition-transform ${
                                piece.color === 'w'
                                  ? 'text-neon-cyan drop-shadow-[0_0_8px_#00f3ff]'
                                  : 'text-neon-purple drop-shadow-[0_0_8px_#bc13fe]'
                              } hover:scale-110 z-0`}
                            >
                              {getPieceSymbol(piece)}
                            </motion.span>
                          )}
                        </div>
                      );
                    })
                  )}
                </div>
              </div>

              {/* Captured Material bar bottom (Player's captures) */}
              <div className="w-full max-w-[400px] flex gap-1 justify-start mt-2 font-mono text-[10px] text-gray-500 min-h-6 items-center px-2 bg-black/35 rounded-lg border border-white/5">
                <span>CAPTURED BLACK:</span>
                <div className="flex gap-0.5 text-neon-purple/60">
                  {captured.b.map((p, i) => (
                    <span key={i} className="text-sm">{getPieceSymbol(p)}</span>
                  ))}
                </div>
              </div>

            </div>

            {/* Right Column: Terminal Console Log */}
            <div className="md:col-span-4 flex flex-col justify-between h-[450px]">
              <div className="flex-grow bg-black/50 border border-white/5 rounded-2xl p-4 flex flex-col justify-between font-mono text-xs overflow-hidden h-full">
                
                {/* Console header */}
                <div className="flex items-center gap-1.5 text-gray-400 border-b border-white/5 pb-2 mb-3">
                  <Terminal size={14} className="text-neon-cyan" />
                  <span>TRANSCEIVER CONSOLE LOG</span>
                </div>

                {/* Logs scrolling area */}
                <div className="flex-grow overflow-y-auto space-y-1.5 text-[10px] text-gray-400 scrollbar-thin pr-1 select-all h-[340px]">
                  {logs.map((log, idx) => {
                    let colorClass = 'text-gray-400';
                    if (log.startsWith('[SYSTEM]')) colorClass = 'text-neon-cyan';
                    if (log.startsWith('[COMBAT]')) colorClass = 'text-red-400 font-bold';
                    if (log.startsWith('[MOVE]')) colorClass = 'text-gray-300';
                    
                    return (
                      <div key={idx} className={`${colorClass} leading-relaxed break-all`}>
                        {log}
                      </div>
                    );
                  })}
                  <div ref={logsEndRef} />
                </div>

                {/* Reboot button */}
                <div className="mt-3 border-t border-white/5 pt-3">
                  <button
                    onClick={resetGame}
                    className="w-full py-2 bg-white/5 hover:bg-white/10 border border-white/10 text-white rounded-xl font-bold tracking-wide uppercase transition-colors flex items-center justify-center gap-1.5 cursor-pointer active:scale-95"
                  >
                    <RotateCcw size={12} />
                    Reset Match
                  </button>
                </div>

              </div>
            </div>

          </div>

        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default ChessGame;
