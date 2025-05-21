import { useTranslation } from 'react-i18next';
import { useTheme } from './hooks/useTheme';
import { cn } from './lib/utils';
import DynamicTitleUpdater from './components/layout/DynamicTitleUpdater';
import ErrorBoundary from './components/layout/ErrorBoundary';
import { Button } from './components/ui/Button';
import { Moon, Sun, Languages, AlertTriangle, CheckCircle } from 'lucide-react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';

function App() {
  const { t, i18n } = useTranslation();
  const { theme, toggleTheme } = useTheme();
  const prefersReducedMotion = useReducedMotion();

  const themeButtonLabel = theme === 'light' ? t('toggle_theme_dark') : t('toggle_theme_light');
  const currentLanguageCode = i18n.language === 'es' ? 'ES' : 'EN';
  const langButtonLabel = i18n.language === 'es' ? t('toggle_language_en') : t('toggle_language_es');

  const changeLanguage = (lng: 'en' | 'es') => {
    i18n.changeLanguage(lng);
  };

  // Variantes para la animación del icono del tema (transformación por rotación)
  const themeIconVariants = {
    enter: { // Estado inicial cuando entra un nuevo icono
      rotateY: -180, // Comienza "de espaldas"
      opacity: 0,
      scale: 0.8, // Un poco más pequeño al entrar
    },
    center: { // Estado visible y estable
      rotateY: 0,    // Mirando al frente
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.3, // Duración de la animación de entrada
        ease: "easeOut",
      },
    },
    exit: { // Estado cuando el icono actual se va
      rotateY: 180,  // Gira para "desaparecer"
      opacity: 0,
      scale: 0.8, // Se encoge al salir
      transition: {
        duration: 0.3, // Duración de la animación de salida
        ease: "easeIn",
      },
    },
  };
  
  // Variantes para la animación de hover del icono
  const iconHoverVariants = {
    rest: { // Estado normal (sin hover)
      rotate: 0,
      scale: 1,
    },
    hover: { // Estado en hover
      rotate: prefersReducedMotion ? 0 : 20, // Solo rota el icono
      scale: 1.1, // Un poco más grande en hover
      transition: { type: "spring", stiffness: 300, damping: 10 }
    }
  };


  return (
    <ErrorBoundary fallback={/* ... tu fallback ... */ <div className="flex flex-col items-center justify-center min-h-screen p-4 text-center bg-slate-100 dark:bg-neutral-900"><AlertTriangle className="w-16 h-16 text-red-500 dark:text-red-400 mb-4" /><h1 className="text-2xl font-bold text-red-600 dark:text-red-400">¡Ups! Algo salió mal.</h1><p className="mt-2 text-slate-700 dark:text-slate-300">Por favor, intenta recargar la página.</p></div>}>
      <DynamicTitleUpdater titleKey="portfolio_title" />
      <div
        className={cn(
          "min-h-screen p-4 sm:p-8 flex flex-col items-center justify-center text-center",
          "bg-slate-50 text-slate-900",
          "dark:bg-neutral-950 dark:text-neutral-100 transition-colors duration-300 ease-in-out"
        )}
      >
        <div className="absolute top-4 right-4 z-10 flex items-center space-x-2">
          {/* Botón de Cambio de Tema con Animación de Giro en el Icono */}
          <Button
            variant="icon" // Asegúrate que tu Button tenga esta variante o una similar
            size="icon"   // y el tamaño adecuado
            onClick={toggleTheme}
            aria-label={themeButtonLabel}
            title={themeButtonLabel}
            className="relative overflow-hidden flex items-center justify-center" // Asegurar centrado
          >
            <AnimatePresence mode="wait" initial={false}>
              {/*
                La clave aquí es que el key del motion.div CAMBIE con el tema.
                Así AnimatePresence sabe que un elemento se va y otro entra.
              */}
              <motion.div
                key={theme} // Clave cambia entre 'light' y 'dark'
                variants={prefersReducedMotion ? {} : themeIconVariants}
                initial="enter"
                animate="center"
                exit="exit"
                className="flex items-center justify-center" // Centra el icono dentro de este div
                // La animación de hover se aplicará al icono específico
                // que esté actualmente visible, no al botón entero.
                whileHover="hover" // Activa la variante 'hover' de iconHoverVariants
                // No necesitamos `initial="rest"` aquí porque el estado 'center' ya es el reposo.
              >
                {/* Aplicamos iconHoverVariants al icono específico */}
                <motion.div variants={iconHoverVariants} className="flex items-center justify-center">
                 {theme === 'light' ? (
                    <Moon className="h-5 w-5" />
                  ) : (
                    <Sun className="h-5 w-5" />
                  )}
                </motion.div>
              </motion.div>
            </AnimatePresence>
          </Button>

          {/* Botón de Idioma */}
          <Button /* ... (código del botón de idioma como antes) ... */ 
            variant="secondary"
            size="sm"
            onClick={() => changeLanguage(i18n.language === 'es' ? 'en' : 'es')}
            aria-label={langButtonLabel}
            title={langButtonLabel}
            className="overflow-hidden relative px-3" // Ajuste de padding para variante 'secondary'
            style={{ minWidth: '60px' }} // Ancho mínimo para 'ES'/'EN' + icono
          >
            <div className="flex items-center justify-center">
              <Languages className="h-4 w-4 mr-1.5 flex-shrink-0" />
              <AnimatePresence mode="wait" initial={false}>
                <motion.span
                  key={currentLanguageCode}
                  initial={{ y: 10, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: -10, opacity: 0 }}
                  transition={{ duration: 0.2, ease: "easeInOut" }}
                  className="inline-block"
                >
                  {currentLanguageCode}
                </motion.span>
              </AnimatePresence>
            </div>
          </Button>
        </div>

        {/* Contenido principal de la página de demostración */}
        <main className="space-y-8 max-w-3xl w-full mt-16 sm:mt-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-sky-600 dark:text-sky-400">
              {t('greeting')}
            </h1>
            <p className="mt-4 text-lg sm:text-xl text-slate-700 dark:text-slate-300 font-inter">
              {t('welcome_message')}
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mt-8 p-6 bg-white dark:bg-neutral-900 shadow-lg rounded-lg border border-slate-200 dark:border-neutral-700"
          >
            <h2 className="text-2xl font-montserrat font-semibold text-indigo-600 dark:text-indigo-400 mb-3">
              Demostración de Componentes
            </h2>
            <div className="space-y-4">
              <div className="flex items-center space-x-2 text-slate-800 dark:text-slate-200">
                <CheckCircle className="h-5 w-5 text-green-500" />
                <span className="font-inter">Internacionalización (i18n) activa.</span>
              </div>
              <div className="flex items-center space-x-2 text-slate-800 dark:text-slate-200">
                <CheckCircle className="h-5 w-5 text-green-500" />
                <span className="font-inter">Gestión de tema claro/oscuro con persistencia.</span>
              </div>
              <div className="flex items-center space-x-2 text-slate-800 dark:text-slate-200">
                <CheckCircle className="h-5 w-5 text-green-500" />
                <span className="font-inter">Componente <code className="font-mono text-xs bg-slate-200 dark:bg-neutral-700 px-1 rounded">Button</code> reutilizable.</span>
              </div>
              <div className="flex items-center space-x-2 text-slate-800 dark:text-slate-200">
                <CheckCircle className="h-5 w-5 text-green-500" />
                <span className="font-inter">Fuentes personalizadas: <span className="font-montserrat font-semibold">Montserrat</span> (títulos) y <span className="font-inter font-semibold">Inter</span> (texto).</span>
              </div>
              <div className="flex items-center space-x-2 text-slate-800 dark:text-slate-200">
                <CheckCircle className="h-5 w-5 text-green-500" />
                <span className="font-inter">Animaciones sutiles con Framer Motion.</span>
              </div>
            </div>
            <div className="mt-6 flex flex-wrap gap-3 justify-center">
              <Button variant="primary" onClick={() => alert('Botón Primario Pulsado!')}>
                Botón Primario
              </Button>
              <Button variant="secondary" onClick={() => alert('Botón Secundario Pulsado!')}>
                Botón Secundario
              </Button>
              <Button variant="destructive" onClick={() => alert('Acción Destructiva!')}>
                Destructivo
              </Button>
              <Button variant="ghost" onClick={() => alert('Botón Fantasma!')}>
                Fantasma
              </Button>
              <Button variant="link" onClick={() => alert('Enlace Pulsado!')}>
                Tipo Enlace
              </Button>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="mt-8 text-left text-sm"
          >
            <h3 className="font-montserrat text-xl font-semibold text-slate-800 dark:text-slate-200 mb-2">
              Prueba de Párrafos:
            </h3>
            <p className="font-inter mb-1">
              Este párrafo usa <strong className="font-semibold">Inter</strong> por defecto desde la configuración del <code className="text-xs">body</code>. Lorem ipsum dolor sit amet, consectetur adipiscing elit.
            </p>
            <p className="font-montserrat mb-1">
              Este párrafo usa explícitamente la clase <code className="text-xs">.font-montserrat</code>. Vivamus magna justo, lacinia eget consectetur sed.
            </p>
            <p className="font-sans">
              Este párrafo usa <code className="text-xs">font-sans</code> de Tailwind. (Debería ser Inter si es tu sans por defecto).
            </p>
          </motion.div>
        </main>

        <motion.footer
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="mt-12 mb-6 text-xs text-slate-600 dark:text-neutral-400"
        >
          <p>Portafolio de Sebastian Cachis - {new Date().getFullYear()}</p>
          <p className="mt-1">
            Tema: <span className="font-semibold">{theme}</span> | Idioma: <span className="font-semibold">{i18n.language.toUpperCase()}</span>
          </p>
        </motion.footer>
      </div>
    </ErrorBoundary>
  );
}

export default App;