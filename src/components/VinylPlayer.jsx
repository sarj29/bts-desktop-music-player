import PixelImage from './PixelImage.jsx';

export default function VinylPlayer({ vinylSrc, isPlaying }) {
  return (
    <div className={`vinyl-wrap ${isPlaying ? 'vinyl-spinning' : ''}`}>
      <PixelImage src={vinylSrc} className="vinyl-disc" alt="" />
    </div>
  );
}
