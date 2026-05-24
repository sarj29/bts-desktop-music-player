import { useRef } from 'react';
import PixelImage from './PixelImage.jsx';

export default function ProgressBar({
  progressEmpty,
  progressFull,
  progressThumb,
  progress,
  hoverProgress,
  onSeekStart,
  onSeekMove,
  onSeekEnd,
  onHoverEnter,
  onHoverLeave,
}) {
  const seekRef = useRef(null);
  const displayProgress = hoverProgress ?? progress;

  return (
    <div className="progress-bar-wrap">
      <PixelImage src={progressEmpty} className="progress-empty" alt="" />
      <div
        className="progress-fill-clip"
        style={{ clipPath: `inset(0 ${(1 - displayProgress) * 100}% 0 0)` }}
      >
        <PixelImage src={progressFull} className="progress-full" alt="" />
      </div>
      <PixelImage
        src={progressThumb}
        className="progress-thumb"
        alt=""
        style={{ '--thumb-pct': displayProgress }}
      />
      <div
        ref={seekRef}
        className="progress-seek"
        onMouseEnter={onHoverEnter}
        onMouseLeave={onHoverLeave}
        onMouseDown={(e) => {
          e.preventDefault();
          const rect = e.currentTarget.getBoundingClientRect();
          const pct = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width));
          onSeekStart(pct);
        }}
        onMouseMove={(e) => {
          if (e.buttons !== 1) return;
          const rect = seekRef.current.getBoundingClientRect();
          const pct = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width));
          onSeekMove(pct);
        }}
        onMouseUp={onSeekEnd}
      />
    </div>
  );
}
