const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('cupid', {
  version: process.versions.electron,
  minimize: () => ipcRenderer.send('window-minimize'),
  maximize: () => ipcRenderer.send('window-maximize'),
  close: () => ipcRenderer.send('window-close'),
  resize: (data) => ipcRenderer.send('window-resize', data),
  openExternal: (url) => ipcRenderer.send('open-external', url),
  setTheme: (theme) => ipcRenderer.send('set-theme', theme),
  getStreamUrl: (title, artist) => ipcRenderer.invoke('get-stream-url', title, artist),
  getStreamUrlById: (videoId) => ipcRenderer.invoke('get-stream-url-by-id', videoId),
  youtubeFetchPlaylist: (url) => ipcRenderer.invoke('youtube-fetch-playlist', url),
  youtubeOauthStart: (opts) => ipcRenderer.invoke('youtube-oauth-start', opts),
  youtubeOauthCancel: () => ipcRenderer.invoke('youtube-oauth-cancel'),
  onMaximizedStateChange: (callback) => {
    const listener = (event, state) => callback(state);
    ipcRenderer.on('window-maximized-state', listener);
    return () => ipcRenderer.removeListener('window-maximized-state', listener);
  },
  getMaximizedState: () => ipcRenderer.invoke('get-maximized-state'),
});
