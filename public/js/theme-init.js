(function() {
  function applyTheme(theme) {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }

  let themeToApply;
  try {
    const storedTheme = localStorage.getItem('theme');

    if (storedTheme) {
      themeToApply = storedTheme;
    } else {
      if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
        themeToApply = 'dark';
      } else {
        themeToApply = 'light';
      }
    }
    applyTheme(themeToApply);
  } catch (e) {
    applyTheme('light');
  }
})();