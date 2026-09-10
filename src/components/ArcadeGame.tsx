import React, { useRef, useEffect, useState } from 'react';
import { Play, RotateCcw, Award, Zap, Shield, Volume2 } from 'lucide-react';

interface ArcadeGameProps {
  appName: string;
  onRecordScore?: (score: number) => void;
}

export const ArcadeGame: React.FC<ArcadeGameProps> = ({ appName, onRecordScore }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(14800);
  const [lives, setLives] = useState(3);
  const [gameOver, setGameOver] = useState(false);

  useEffect(() => {
    if (!isPlaying || !canvasRef.current) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let currentScore = 0;
    let currentLives = 3;

    // Game state
    const player = {
      x: canvas.width / 2 - 15,
      y: canvas.height - 45,
      w: 30,
      h: 30,
      vx: 0,
      speed: 6,
      color: '#3950E6',
    };

    let orbs: Array<{ x: number; y: number; r: number; vy: number; type: 'coin' | 'energy' | 'asteroid' }> = [];
    let bullets: Array<{ x: number; y: number; vy: number }> = [];
    let keys: Record<string, boolean> = {};

    const handleKeyDown = (e: KeyboardEvent) => {
      keys[e.key] = true;
      if (e.key === ' ' || e.key === 'ArrowUp') {
        e.preventDefault();
        bullets.push({ x: player.x + player.w / 2, y: player.y, vy: -8 });
      }
    };

    const handleKeyUp = (e: KeyboardEvent) => {
      keys[e.key] = false;
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);

    let frame = 0;

    const loop = () => {
      frame++;
      ctx.fillStyle = '#0F111A';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Stars background
      ctx.fillStyle = 'rgba(255, 255, 255, 0.4)';
      for (let i = 0; i < 20; i++) {
        const starX = (i * 37 + frame * 0.5) % canvas.width;
        const starY = (i * 47 + frame * 0.8) % canvas.height;
        ctx.fillRect(starX, starY, 2, 2);
      }

      // Handle keyboard movement
      if (keys['ArrowLeft'] || keys['q'] || keys['a']) {
        player.x = Math.max(10, player.x - player.speed);
      }
      if (keys['ArrowRight'] || keys['d']) {
        player.x = Math.min(canvas.width - player.w - 10, player.x + player.speed);
      }

      // Draw bullets
      ctx.fillStyle = '#FF6A00';
      for (let i = bullets.length - 1; i >= 0; i--) {
        const b = bullets[i];
        b.y += b.vy;
        ctx.fillRect(b.x - 2, b.y, 4, 10);
        if (b.y < -10) bullets.splice(i, 1);
      }

      // Spawn orbs
      if (frame % 40 === 0) {
        const typeRoll = Math.random();
        const orbType = typeRoll > 0.7 ? 'asteroid' : typeRoll > 0.3 ? 'coin' : 'energy';
        orbs.push({
          x: Math.random() * (canvas.width - 40) + 20,
          y: -20,
          r: orbType === 'asteroid' ? 14 : 10,
          vy: orbType === 'asteroid' ? 3.5 : 2.5,
          type: orbType,
        });
      }

      // Update & draw orbs
      for (let i = orbs.length - 1; i >= 0; i--) {
        const o = orbs[i];
        o.y += o.vy;

        // Collision with bullets
        for (let j = bullets.length - 1; j >= 0; j--) {
          const b = bullets[j];
          const dist = Math.hypot(b.x - o.x, b.y - o.y);
          if (dist < o.r + 4) {
            bullets.splice(j, 1);
            if (o.type === 'asteroid') {
              currentScore += 150;
            } else {
              currentScore += 50;
            }
            setScore(currentScore);
            orbs.splice(i, 1);
            break;
          }
        }

        // Collision with player
        const pDist = Math.hypot(player.x + player.w / 2 - o.x, player.y + player.h / 2 - o.y);
        if (pDist < o.r + 14) {
          if (o.type === 'asteroid') {
            currentLives--;
            setLives(currentLives);
            if (currentLives <= 0) {
              setGameOver(true);
              setIsPlaying(false);
              if (currentScore > highScore) {
                setHighScore(currentScore);
              }
              if (onRecordScore) onRecordScore(currentScore);
              return;
            }
          } else {
            currentScore += o.type === 'coin' ? 100 : 250;
            setScore(currentScore);
          }
          orbs.splice(i, 1);
          continue;
        }

        // Draw orb
        ctx.beginPath();
        ctx.arc(o.x, o.y, o.r, 0, Math.PI * 2);
        if (o.type === 'asteroid') {
          ctx.fillStyle = '#EF4444';
          ctx.shadowColor = '#EF4444';
          ctx.shadowBlur = 10;
        } else if (o.type === 'energy') {
          ctx.fillStyle = '#10B981';
          ctx.shadowColor = '#10B981';
          ctx.shadowBlur = 12;
        } else {
          ctx.fillStyle = '#FBBF24';
          ctx.shadowColor = '#FBBF24';
          ctx.shadowBlur = 8;
        }
        ctx.fill();
        ctx.shadowBlur = 0;

        if (o.y > canvas.height + 20) {
          orbs.splice(i, 1);
        }
      }

      // Draw player ship
      ctx.save();
      ctx.translate(player.x + player.w / 2, player.y + player.h / 2);

      // Ship body
      ctx.fillStyle = '#3950E6';
      ctx.shadowColor = '#3950E6';
      ctx.shadowBlur = 15;
      ctx.beginPath();
      ctx.moveTo(0, -16);
      ctx.lineTo(14, 14);
      ctx.lineTo(0, 8);
      ctx.lineTo(-14, 14);
      ctx.closePath();
      ctx.fill();

      // Thruster flame
      ctx.fillStyle = frame % 2 === 0 ? '#FF6A00' : '#FBBF24';
      ctx.beginPath();
      ctx.moveTo(-6, 11);
      ctx.lineTo(0, 20 + (frame % 4));
      ctx.lineTo(6, 11);
      ctx.closePath();
      ctx.fill();
      ctx.restore();

      animationFrameId = requestAnimationFrame(loop);
    };

    animationFrameId = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, [isPlaying]);

  const startGame = () => {
    setScore(0);
    setLives(3);
    setGameOver(false);
    setIsPlaying(true);
  };

  return (
    <div className="flex flex-col items-center justify-center p-4 bg-[#0F111A] rounded-2xl text-white shadow-2xl border border-[#232738] max-w-2xl mx-auto w-full">
      {/* Game header */}
      <div className="w-full flex items-center justify-between pb-3 mb-3 border-b border-gray-800">
        <div>
          <span className="text-xs font-mono tracking-widest text-[#FF6A00] uppercase font-bold">ARCADE VIBE ENGINE</span>
          <h4 className="text-lg font-bold">{appName}</h4>
        </div>
        <div className="flex items-center gap-4 text-xs font-mono">
          <div className="flex items-center gap-1.5 bg-gray-900 px-2.5 py-1 rounded border border-gray-800">
            <Shield className="w-3.5 h-3.5 text-blue-400" />
            <span>Vies: {lives}</span>
          </div>
          <div className="flex items-center gap-1.5 bg-gray-900 px-2.5 py-1 rounded border border-gray-800">
            <Award className="w-3.5 h-3.5 text-amber-400" />
            <span>Score: <strong className="text-white">{score}</strong></span>
          </div>
        </div>
      </div>

      {/* Canvas view */}
      <div className="relative w-full aspect-[16/9] max-h-[380px] bg-[#0A0C12] rounded-xl overflow-hidden flex items-center justify-center border border-gray-800">
        <canvas
          ref={canvasRef}
          width={580}
          height={340}
          className="w-full h-full object-contain"
        />

        {!isPlaying && (
          <div className="absolute inset-0 bg-black/75 backdrop-blur-sm flex flex-col items-center justify-center p-6 text-center">
            {gameOver ? (
              <div className="space-y-3">
                <div className="text-red-500 font-bold text-2xl font-mono tracking-wider">GAME OVER</div>
                <div className="text-sm text-gray-300">Score final : <strong className="text-amber-400 font-mono text-lg">{score} pts</strong></div>
                <button
                  onClick={startGame}
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#FF6A00] hover:bg-[#FF773C] text-black font-bold text-sm shadow-lg transition"
                >
                  <RotateCcw className="w-4 h-4" />
                  <span>Rejouer la partie</span>
                </button>
              </div>
            ) : (
              <div className="space-y-4 max-w-sm">
                <div className="w-12 h-12 rounded-full bg-[#3950E6]/20 border border-[#3950E6] flex items-center justify-center mx-auto text-[#3950E6]">
                  <Play className="w-6 h-6 fill-current ml-0.5" />
                </div>
                <div>
                  <h5 className="text-lg font-bold text-white">Prêt à jouer ?</h5>
                  <p className="text-xs text-gray-400 mt-1">
                    Utilisez les flèches <strong>← →</strong> pour vous déplacer et <strong>Espace</strong> pour tirer sur les astéroïdes.
                  </p>
                </div>
                <button
                  onClick={startGame}
                  className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-[#FF6A00] hover:bg-[#FF773C] text-[#0F111A] font-bold text-sm shadow-lg shadow-[#FF6A00]/20 transition"
                >
                  <Zap className="w-4 h-4 fill-current" />
                  <span>Lancer la partie (Canvas 2D)</span>
                </button>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Game controls guide footer */}
      <div className="w-full flex items-center justify-between pt-3 mt-2 text-[11px] text-gray-400 font-mono">
        <div className="flex items-center gap-2">
          <kbd className="px-1.5 py-0.5 bg-gray-800 rounded border border-gray-700 text-gray-300">←</kbd>
          <kbd className="px-1.5 py-0.5 bg-gray-800 rounded border border-gray-700 text-gray-300">→</kbd>
          <span>Déplacement</span>
          <span className="mx-1">•</span>
          <kbd className="px-1.5 py-0.5 bg-gray-800 rounded border border-gray-700 text-gray-300">Espace</kbd>
          <span>Tir laser</span>
        </div>
        <div className="flex items-center gap-1 text-emerald-400">
          <Volume2 className="w-3.5 h-3.5" />
          <span>Audio synthétique prêt</span>
        </div>
      </div>
    </div>
  );
};
