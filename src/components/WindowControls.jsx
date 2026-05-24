import PixelImage from './PixelImage.jsx';

function WinButton({ visualClass, hitClass, src, onClick, title, label }) {
  return (
    <div className={`win-btn ${visualClass}-btn`}>
      <PixelImage src={src} className={`win-visual ${visualClass}`} alt="" />
      <button
        type="button"
        className={`hit ${hitClass}`}
        onClick={onClick}
        title={title}
        aria-label={label}
      />
    </div>
  );
}

export default function WindowControls({
  assets,
  isMaximized,
  onMinimize,
  onMaximize,
  onClose,
  onOpenSettings,
}) {
  const maximizeIcon = assets.maximizeButton || assets.restoreButton;
  const currentMaximizeIcon = isMaximized ? assets.restoreButton : maximizeIcon;

  return (
    <div className="window-controls">
      <WinButton
        visualClass="win-playlist-visual"
        hitClass="hit-playlist"
        src={assets.playlistSettings}
        onClick={onOpenSettings}
        title="Playlists"
        label="Playlists"
      />
      
      <WinButton
        visualClass="win-minimize-visual"
        hitClass="hit-minimize"
        src={assets.minimizeButton}
        onClick={onMinimize}
        title="Minimize"
        label="Minimize"
      />
      <WinButton
        visualClass="win-maximize-visual"
        hitClass="hit-maximize"
        src={currentMaximizeIcon}
        onClick={onMaximize}
        title={isMaximized ? "Restore Down" : "Maximize"}
        label={isMaximized ? "Restore Down" : "Maximize"}
      />
      <WinButton
        visualClass="win-close-visual"
        hitClass="hit-close"
        src={assets.closeButton}
        onClick={onClose}
        title="Close"
        label="Close"
      />
    </div>
  );
}
