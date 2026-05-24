/**
 * Default BTS player theme — asset map + CSS variables.
 * Future themes (butter, dynamite, etc.) can mirror this shape.
 */

import frame from '../assets/bts/frame.png';
import vinyl from '../assets/bts/vinyl.png';
import chibi1 from '../assets/bts/chibi-1.png';
import chibi2 from '../assets/bts/chibi-2.png';
import chibi3 from '../assets/bts/chibi-3.png';
import backwardButton from '../assets/bts/backward-button.png';
import forwardButton from '../assets/bts/forward-button.png';
import playButton from '../assets/bts/play-button.png';
import loopButton from '../assets/bts/loop.png';
import progressEmpty from '../assets/bts/progress-empty.png';
import progressFull from '../assets/bts/progress-full.png';
import progressThumb from '../assets/bts/progress-thumb.png';
import guitarCharm from '../assets/bts/guitar-charm.png';
import lollipopCharm from '../assets/bts/lollipop-charm.png';
import closeButton from '../assets/bts/close.png';
import minimizeButton from '../assets/bts/minimize.png';
import restoreButton from '../assets/bts/restore-down.png';
import volumeDown from '../assets/bts/volume-down.png';
import volumeUp from '../assets/bts/volume-up.png';
import volumeSlider from '../assets/bts/volume-slider.png';
import playlistSettings from '../assets/bts/playlist-selector.png';

/** Design canvas all layered assets share */
export const DESIGN_WIDTH = 1402;
export const DESIGN_HEIGHT = 1122;

/** Add your YouTube playlist URLs here for one-click album loads */
export const BTS_PRESET_PLAYLISTS = [
  { id: 'arirang', name: 'ARIRANG', url: 'https://youtube.com/playlist?list=PLxA687tYuMWh5kVzLXuL8VGeb0sS8dayD&si=FC5iNcQozk-O7TCh' },
  { id: 'proof', name: 'Proof', url: '' },
  { id: 'be', name: 'BE', url: 'https://youtube.com/playlist?list=PLvwxw_LiHMjhKgL7AjgOWUzI79xNDC2YM&si=q8-_dEXDR2E5AsDh' },
  { id: 'ly', name: 'Love Yourself', url: '' },
  { id: 'wings', name: 'Wings', url: '' },
  { id: 'daw', name: 'Dark & Wild', url: '' },
];

const defaultTheme = {
  id: 'default',
  name: 'BTS Classic',
  assets: {
    frame,
    vinyl,
    chibis: [chibi1, chibi2, chibi3],
    backwardButton,
    forwardButton,
    playButton,
    loopButton,
    progressEmpty,
    progressFull,
    progressThumb,
    guitarCharm,
    lollipopCharm,
    closeButton,
    minimizeButton,
    restoreButton,
    volumeDown,
    volumeUp,
    volumeSlider,
    playlistSettings,
  },
  cssVars: {
    '--color-title': '#1a1a1a',
    '--color-primary': '#c41e3a',
    '--color-secondary': '#5c5c5c',
    '--color-accent': '#e8a4b8',
    '--color-panel-bg': '#2a1520',
    '--color-panel-text': '#ffe8f0',
    '--color-panel-border': '#c41e3a',
    '--glow-color': 'rgba(196, 30, 58, 0.55)',
  },
};

/** Registry for future theme packs */
export const THEMES = {
  default: defaultTheme,
};

export function getTheme(themeId = 'default') {
  return THEMES[themeId] ?? THEMES.default;
}
