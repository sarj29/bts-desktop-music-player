function MarqueeText({ className, text }) {
  return (
    <div className={`${className} marquee-container`}>
      <span className="marquee-text">{text}</span>
    </div>
  );
}

/** Now-playing text block — right side of screen (vinyl is separate) */
export default function SongInfo({ track, albumName, loading }) {
  const title = track.title === 'No track' ? 'Load a playlist…' : track.title;
  const artist = track.artist || 'BTS';
  const album = albumName || track.album || '';

  return (
    <div className="song-info">
      <div className="song-label">{loading ? 'loading…' : 'now playing'}</div>
      <MarqueeText className="song-title" text={title} />
      <div className="song-artist">{artist}</div>
      {album && <div className="song-album">{album}</div>}
    </div>
  );
}
