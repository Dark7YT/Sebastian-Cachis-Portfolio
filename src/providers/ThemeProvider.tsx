// src/providers/ThemeProvider.tsx
import { useState, useEffect, type ReactNode } from 'react';
import { ThemeContext, type Theme } from '../context/ThemeContext';

interface ThemeProviderProps {
  children: ReactNode;
}

export function ThemeProvider({ children }: ThemeProviderProps) {
  const [theme, setTheme] = useState<Theme>(() => {
    // La clase 'dark' ya debería estar en <html> gracias al script en index.html
    // Esta lógica ahora principalmente sirve para inicializar el estado de React
    // y para que React sepa cuál es el tema actual.

    let initialTheme: Theme = 'light'; // Fallback
    if (typeof window !== 'undefined') {
      const storedTheme = localStorage.getItem('theme') as Theme | null;
      if (storedTheme) {
        initialTheme = storedTheme;
      } else {
        if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
          initialTheme = 'dark';
        }
      }
    }
    // No necesitamos console.log aquí para la inicialización si el script del head funciona.
    return initialTheme;
  });

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const root = window.document.documentElement;
      root.classList.remove('dark', 'light'); // Quitar ambas
      if (theme === 'dark') {
        root.classList.add('dark');
      } else {
        root.classList.add('light'); // Añadir 'light' para el tema claro explícito
      }
      localStorage.setItem('theme', theme);
    }
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === 'light' ? 'dark' : 'light'));
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}