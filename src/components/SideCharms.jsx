import PixelImage from './PixelImage.jsx';

export default function SideCharms({ guitarSrc, lollipopSrc }) {
  return (
    <div className="charms-layer">
      <div className="charm charm-guitar">
        <PixelImage src={guitarSrc} alt="" />
      </div>
      <div className="charm charm-lollipop">
        <PixelImage src={lollipopSrc} alt="" />
      </div>
    </div>
  );
}
