/** Full-canvas layered asset with pixel-perfect scaling */
export default function PixelImage({ src, className = '', alt = '', style }) {
  return (
    <img
      src={src}
      className={`pixel-layer ${className}`.trim()}
      alt={alt}
      draggable={false}
      style={style}
    />
  );
}
