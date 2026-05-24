import PixelImage from './PixelImage.jsx';

export default function Controls({
  assets,
  isPlaying,
  playMode,
  onPrev,
  onTogglePlay,
  onNext,
  onCyclePlayMode,
}) {
  return (
    <div className="controls-wrap">
      <PixelImage src={assets.backwardButton} className="ctrl-visual btn-prev-visual" alt="" />
      <PixelImage src={assets.playButton} className="ctrl-visual btn-play-visual" alt="" />
      <PixelImage src={assets.forwardButton} className="ctrl-visual btn-next-visual" alt="" />
      <PixelImage
        src={assets.loopButton}
        className={`ctrl-visual btn-loop-visual ${playMode !== 'normal' ? 'active' : ''}`}
        alt=""
      />
      <button type="button" className="hit hit-prev" onClick={onPrev} aria-label="Previous" />
      <button type="button" className="hit hit-play" onClick={onTogglePlay} aria-label={isPlaying ? 'Pause' : 'Play'} />
      <button type="button" className="hit hit-next" onClick={onNext} aria-label="Next" />
      <button type="button" className="hit hit-loop" onClick={onCyclePlayMode} aria-label={playMode} />
    </div>
  );
}
