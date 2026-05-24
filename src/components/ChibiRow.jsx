import { useState, useEffect } from 'react';
import PixelImage from './PixelImage.jsx';

/** Ping-pong sprite loop: 1 → 2 → 3 → 2 → … */
const FRAME_SEQUENCE = [0, 1, 2, 1];
const FRAME_INTERVAL_MS = 500;

export default function ChibiRow({ chibiSrcs }) {
  const [sequenceStep, setSequenceStep] = useState(0);

  useEffect(() => {
    if (!chibiSrcs?.length) return undefined;

    const id = setInterval(() => {
      setSequenceStep((step) => (step + 1) % FRAME_SEQUENCE.length);
    }, FRAME_INTERVAL_MS);

    return () => clearInterval(id);
  }, [chibiSrcs]);

  if (!chibiSrcs?.length) return null;

  const frameIndex = FRAME_SEQUENCE[sequenceStep % FRAME_SEQUENCE.length];
  const src = chibiSrcs[frameIndex] ?? chibiSrcs[0];

  return (
    <div className="chibi-row">
      <PixelImage src={src} className="chibi-sprite" alt="" />
    </div>
  );
}
