import { useCallback, useEffect, useRef, useState } from 'react';
import PixelImage from './PixelImage.jsx';

/** Vertical volume: track + max ref always visible; volume-down thumb drags between min/max */
export default function VolumeSlider({
  volumeSliderSrc,
  volumeDownSrc,
  volumeUpSrc,
  volume,
  muted,
  onVolumeChange,
}) {
  const railRef = useRef(null);
  const [dragging, setDragging] = useState(false);
  const level = muted ? 0 : volume;

  const volumeFromClientY = useCallback((clientY) => {
    const rail = railRef.current;
    if (!rail) return level;
    const rect = rail.getBoundingClientRect();
    return Math.max(0, Math.min(1, 1 - (clientY - rect.top) / rect.height));
  }, [level]);

  const applyVolume = useCallback((clientY) => {
    onVolumeChange(volumeFromClientY(clientY));
  }, [onVolumeChange, volumeFromClientY]);

  const onRailMouseDown = useCallback((e) => {
    e.preventDefault();
    setDragging(true);
    applyVolume(e.clientY);
  }, [applyVolume]);

  const onThumbMouseDown = useCallback((e) => {
  e.preventDefault();
  e.stopPropagation();

  setDragging(true);
  applyVolume(e.clientY);
}, [applyVolume]);

  useEffect(() => {
    if (!dragging) return undefined;

    const onMouseMove = (e) => applyVolume(e.clientY);
    const onMouseUp = () => setDragging(false);

    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseup', onMouseUp);
    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseup', onMouseUp);
    };
  }, [dragging, applyVolume]);

  return (
    <div
      className={`volume-control ${dragging ? 'is-dragging' : ''}`}
      style={{ '--vol-level': level }}
    >
      <PixelImage
          src={volumeSliderSrc}
          className="vol-track"
          alt=""
        />
      
      <div className="volume-thumb-wrap">
        <PixelImage src={volumeDownSrc} className="vol-thumb" alt="" />
        <div
          className="volume-thumb-hit"
          onMouseDown={onThumbMouseDown}
          role="slider"
          aria-label="Volume"
          aria-valuemin={0}
          aria-valuemax={100}
          aria-valuenow={Math.round(level * 100)}
          tabIndex={0}
          onKeyDown={(e) => {
            if (e.key === 'ArrowUp') onVolumeChange(Math.min(1, level + 0.05));
            if (e.key === 'ArrowDown') onVolumeChange(Math.max(0, level - 0.05));
          }}
        />
      </div>
      <div
        ref={railRef}
        className="volume-rail"
        onMouseDown={onRailMouseDown}
        aria-hidden="true"
      />
    </div>
  );
}
