export const THEME_STORAGE_KEY = "theme";

/**
 * Runs synchronously in <head>, before the first paint, so a stored choice
 * never flashes the other theme. With nothing stored it does nothing at all
 * and the `prefers-color-scheme` rules in globals.css decide.
 */
export const themeInitScript = `try{var t=localStorage.getItem(${JSON.stringify(
  THEME_STORAGE_KEY,
)});if(t==="light"||t==="dark")document.documentElement.dataset.theme=t}catch(e){}`;
