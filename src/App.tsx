import { useTranslation } from 'react-i18next'; // Necesario si no está ya aquí
import ErrorBoundary from './components/layout/ErrorBoundary';
import DynamicTitleUpdater from './components/layout/DynamicTitleUpdater';
import { Navbar } from './components/layout/Navbar';
import { Footer } from './components/layout/Footer';
import { ScrollToTopButton } from './components/ui/ScrollToTopButton'; // NUEVA IMPORTACIÓN

function App() {
  const { t } = useTranslation(); // Solo para el fallback del ErrorBoundary si es necesario

  return (
    <ErrorBoundary fallback={ 
      <div className="flex flex-col items-center justify-center min-h-screen p-4 text-center bg-slate-100 dark:bg-neutral-900">
        {/* ... (contenido del fallback del error boundary) ... */}
        <h1 className="text-2xl font-bold text-red-600 dark:text-red-400">
          {t('error_boundary_oops', 'Oops! Something went wrong.')}
        </h1>
        <p className="mt-2 text-slate-700 dark:text-slate-300">
          {t('error_boundary_message', 'Please try reloading the page.')}
        </p>
      </div>
    }>
      <div className="min-h-screen bg-primary text-primary transition-theme-ultra">
        <DynamicTitleUpdater titleKey="portfolio_title" />
        <Navbar />
        
        <main>
          {/* Placeholder Sections - Reemplazar con tus componentes de sección reales */}
          <section id="home" className="min-h-screen bg-slate-50 dark:bg-neutral-950 pt-20 flex items-center justify-center">
            <h1 className="text-5xl font-montserrat font-bold">Inicio</h1>
          </section>
          <section id="about" className="min-h-screen bg-white dark:bg-neutral-900 pt-20 flex items-center justify-center">
            <h1 className="text-5xl font-montserrat font-bold">Sobre Mí</h1>
          </section>
          <section id="projects" className="min-h-screen bg-slate-50 dark:bg-neutral-950 pt-20 flex items-center justify-center">
            <h1 className="text-5xl font-montserrat font-bold">Proyectos</h1>
          </section>
          <section id="skills" className="min-h-screen bg-white dark:bg-neutral-900 pt-20 flex items-center justify-center">
            <h1 className="text-5xl font-montserrat font-bold">Habilidades</h1>
          </section>
          <section id="experience" className="min-h-screen bg-slate-50 dark:bg-neutral-950 pt-20 flex items-center justify-center">
            <h1 className="text-5xl font-montserrat font-bold">Experiencia</h1>
          </section>
          <section id="education" className="min-h-screen bg-white dark:bg-neutral-900 pt-20 flex items-center justify-center">
            <h1 className="text-5xl font-montserrat font-bold">Educación</h1>
          </section>
          <section id="contact" className="min-h-screen bg-slate-50 dark:bg-neutral-950 pt-20 flex items-center justify-center">
            <h1 className="text-5xl font-montserrat font-bold">Contacto</h1>
          </section>
        </main>
          
        <Footer />
        <ScrollToTopButton />
      </div>
    </ErrorBoundary>
  );
}

export default App;