import PixelImage from './PixelImage.jsx';

export default function PlayerFrame({ frameSrc }) {
  return <PixelImage src={frameSrc} className="player-frame" alt="" />;
}
