import { useCallback, useEffect, useState } from 'react';
import './App.css';
import useYouTubePlayer from './hooks/useYouTubePlayer.js';
import useTheme from './hooks/useTheme.js';
import { BTS_PRESET_PLAYLISTS } from './themes/default.js';
import { fetchPlaylistByUrl, parsePlaylistUrl } from './youtube/api.js';

import PlayerFrame from './components/PlayerFrame.jsx';
import VinylPlayer from './components/VinylPlayer.jsx';
import Controls from './components/Controls.jsx';
import ProgressBar from './components/ProgressBar.jsx';
import ChibiRow from './components/ChibiRow.jsx';
import SongInfo from './components/SongInfo.jsx';
import SideCharms from './components/SideCharms.jsx';
import WindowControls from './components/WindowControls.jsx';
import VolumeSlider from './components/VolumeSlider.jsx';
import PixelImage from './components/PixelImage.jsx';

function useResize(corner) {
  const onMouseDown = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
    let lastX = e.screenX;
    let lastY = e.screenY;
    const onMouseMove = (ev) => {
      const dx = ev.screenX - lastX;
      const dy = ev.screenY - lastY;
      lastX = ev.screenX;
      lastY = ev.screenY;
      window.cupid?.resize({ dx, dy, corner });
    };
    const onMouseUp = () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseup', onMouseUp);
    };
    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseup', onMouseUp);
  }, [corner]);
  return onMouseDown;
}

function formatTime(seconds) {
  if (!seconds || !isFinite(seconds) || seconds < 0) return '0:00';
  const m = Math.floor(seconds / 60);
  const s = Math.floor(seconds % 60);
  return `${m}:${s.toString().padStart(2, '0')}`;
}

export default function App() {
  const { theme, cssVars } = useTheme();
  const { assets } = theme;

  const [tracks, setTracks] = useState([]);
  const [albumName, setAlbumName] = useState('');
  const [playMode, setPlayMode] = useState('normal');
  const [youtubeUrlInput, setYoutubeUrlInput] = useState('');
  const [loadingPlaylist, setLoadingPlaylist] = useState(false);
  const [settingsError, setSettingsError] = useState(null);
  const [showSettings, setShowSettings] = useState(false);
  const [dragging, setDragging] = useState(false);
  const [hoverProgress, setHoverProgress] = useState(null);
  const [isMaximized, setIsMaximized] = useState(false);
  const player = useYouTubePlayer(tracks, playMode);
  const {
    track,
    isPlaying,
    progress,
    duration,
    currentTime,
    togglePlay,
    next,
    prev,
    seek,
    volume,
    setVolume,
    muted,
    loading,
  } = player;

  const cyclePlayMode = useCallback(() => {
    setPlayMode((m) => (m === 'normal' ? 'shuffle' : m === 'shuffle' ? 'repeat' : 'normal'));
  }, []);

  const loadYoutubePlaylistFromUrl = useCallback(async (rawInput, label = '') => {
    setSettingsError(null);
    const parsed = parsePlaylistUrl(rawInput);
    if (!parsed) {
      setSettingsError('Paste a valid YouTube playlist URL');
      return;
    }
    setLoadingPlaylist(true);
    try {
      const loaded = await fetchPlaylistByUrl(rawInput);
      if (loaded.length === 0) {
        setSettingsError('Playlist is empty or unavailable');
        return;
      }
      setTracks(loaded);
      setAlbumName(label || 'YouTube Playlist');
      setYoutubeUrlInput('');
      setShowSettings(false);
    } catch (err) {
      setSettingsError(err.message);
    } finally {
      setLoadingPlaylist(false);
    }
  }, []);

  useEffect(() => {
    if (!window.cupid) return;
    window.cupid.getMaximizedState().then(setIsMaximized).catch(console.error);
    const unsubscribe = window.cupid.onMaximizedStateChange((state) => {
      setIsMaximized(state);
    });
    return () => {
      unsubscribe();
    };
  }, []);

  const onSeekStart = useCallback((pct) => {
    setDragging(true);
    setHoverProgress(pct);
    seek(pct);
  }, [seek]);

  const onSeekMove = useCallback((pct) => {
    setHoverProgress(pct);
    seek(pct);
  }, [seek]);

  const onSeekEnd = useCallback(() => {
    setDragging(false);
    setHoverProgress(null);
  }, []);

  const resizeTop = useResize('top');
  const resizeRight = useResize('right');
  const resizeBottom = useResize('bottom');
  const resizeLeft = useResize('left');
  const resizeTL = useResize('top-left');
  const resizeTR = useResize('top-right');
  const resizeBL = useResize('bottom-left');
  const resizeBR = useResize('bottom-right');

  const themeStyle = { ...cssVars };

  return (
    <div className="player theme-default" style={themeStyle}>
      <div className="player-stage">
        {/* Layer 1 — background */}
        <div className="player-layer player-layer-bg" aria-hidden="true" />

        {/* Layer 2 — chibis (behind frame) */}
        <div className="player-layer player-layer-chibi">
          <ChibiRow chibiSrcs={assets.chibis} />
        </div>

        {/* Layer 3 — physical frame shell */}
        <div className="player-layer player-layer-frame">
          <PlayerFrame frameSrc={assets.frame} />
        </div>

        {/* Drag surface (above frame, below interactive UI) */}
        <div className="frame-drag-region" aria-hidden="true" />

        {/* Layer 4 — all UI above frame */}
        <div className="player-layer player-layer-ui">
          <VinylPlayer vinylSrc={assets.vinyl} isPlaying={isPlaying} />
          <SongInfo track={track} albumName={albumName} loading={loading || loadingPlaylist} />
          <ProgressBar
            progressEmpty={assets.progressEmpty}
            progressFull={assets.progressFull}
            progressThumb={assets.progressThumb}
            progress={progress}
            hoverProgress={hoverProgress}
            onSeekStart={onSeekStart}
            onSeekMove={onSeekMove}
            onSeekEnd={onSeekEnd}
            onHoverEnter={() => setHoverProgress(progress)}
            onHoverLeave={() => { if (!dragging) setHoverProgress(null); }}
          />
          <div className="time-display">
            <span className="time-current">{formatTime(currentTime)}</span>
            <span className="time-remaining">{formatTime(duration)}</span>
          </div>
          <Controls
            assets={assets}
            isPlaying={isPlaying}
            playMode={playMode}
            onPrev={prev}
            onTogglePlay={togglePlay}
            onNext={next}
            onCyclePlayMode={cyclePlayMode}
          />
          <SideCharms guitarSrc={assets.guitarCharm} lollipopSrc={assets.lollipopCharm} />
          <VolumeSlider
            volumeSliderSrc={assets.volumeSlider}
            volumeDownSrc={assets.volumeDown}
            volumeUpSrc={assets.volumeUp}
            volume={volume}
            muted={muted}
            onVolumeChange={setVolume}
          />
          <WindowControls
            assets={assets}
            isMaximized={isMaximized}
            onMinimize={() => window.cupid?.minimize()}
            onMaximize={() => window.cupid?.maximize()}
            onClose={() => window.cupid?.close()}
            onOpenSettings={() => setShowSettings((v) => !v)}
          />
        </div>
      </div>

      <div className="window-title">BTS Player</div>

      <div className="resize-edge edge-top" onMouseDown={resizeTop} />
      <div className="resize-edge edge-right" onMouseDown={resizeRight} />
      <div className="resize-edge edge-bottom" onMouseDown={resizeBottom} />
      <div className="resize-edge edge-left" onMouseDown={resizeLeft} />
      <div className="resize-handle corner top-left" onMouseDown={resizeTL} />
      <div className="resize-handle corner top-right" onMouseDown={resizeTR} />
      <div className="resize-handle corner bottom-left" onMouseDown={resizeBL} />
      <div className="resize-handle corner bottom-right" onMouseDown={resizeBR} />

      {showSettings && (
        <div className="settings-panel">
          <div className="settings-panel-inner">
            <div className="settings-label">YouTube playlist</div>
            <input
              className="settings-input"
              type="text"
              placeholder="Paste playlist URL"
              value={youtubeUrlInput}
              onChange={(e) => setYoutubeUrlInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' && youtubeUrlInput.trim()) {
                  loadYoutubePlaylistFromUrl(youtubeUrlInput.trim());
                }
              }}
              disabled={loadingPlaylist}
            />
            <button
              type="button"
              className="settings-btn"
              disabled={loadingPlaylist || !youtubeUrlInput.trim()}
              onClick={() => loadYoutubePlaylistFromUrl(youtubeUrlInput.trim())}
            >
              {loadingPlaylist ? 'Loading…' : 'Load playlist'}
            </button>

            <div className="settings-label">BTS albums</div>
            <div className="settings-preset-grid">
              {BTS_PRESET_PLAYLISTS.map((p) => (
                <button
                  key={p.id}
                  type="button"
                  className="settings-btn preset"
                  disabled={loadingPlaylist || !p.url}
                  onClick={() => loadYoutubePlaylistFromUrl(p.url, p.name)}
                  title={p.url ? p.name : `Add ${p.name} URL in themes/default.js`}
                >
                  {p.name}
                </button>
              ))}
            </div>
            <p className="settings-hint">Replace preset URLs in themes/default.js with your favorite BTS playlists.</p>

            {settingsError && <div className="settings-error">{settingsError}</div>}
          </div>
        </div>
      )}
    </div>
  );
}
