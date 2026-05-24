import { useState, useCallback, useMemo } from 'react';
import { getTheme } from '../themes/default.js';

const STORAGE_KEY = 'bts-player-theme';

function getStoredThemeId() {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored && getTheme(stored)) return stored;
  } catch {
    // ignore
  }
  return 'default';
}

export default function useTheme() {
  const [themeId, setThemeId] = useState(getStoredThemeId);

  const theme = useMemo(() => getTheme(themeId), [themeId]);

  const setTheme = useCallback((id) => {
    if (!getTheme(id)) return;
    setThemeId(id);
    try {
      localStorage.setItem(STORAGE_KEY, id);
    } catch {
      // ignore
    }
  }, []);

  return { themeId, theme, setTheme, assets: theme.assets, cssVars: theme.cssVars };
}
