import { Component, type ErrorInfo, type ReactNode } from 'react';
import { withTranslation, type WithTranslation } from 'react-i18next';
import { AlertTriangle } from 'lucide-react';

interface Props extends WithTranslation {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
}

class ErrorBoundary extends Component<Props, State> {
  public readonly state: State = {
    hasError: false,
  };

  // Actualiza el estado cuando ocurre un error
  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  // Maneja efectos secundarios y logging
  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    const { t, fallback } = this.props;
    // Cambia el título solo si no hay fallback
    if (typeof document !== 'undefined' && !fallback) {
      document.title = t('error_boundary_title');
    }
    // Logging
    console.error(`${t('error_boundary_title')}:`, error, errorInfo);
  }

  public render() {
    const { t, children, fallback } = this.props;
    const { hasError, error } = this.state;

    if (hasError) {
      if (fallback) {
        return fallback;
      }

      return (
        <div className="flex flex-col items-center justify-center min-h-screen p-4 text-center bg-slate-100 dark:bg-neutral-900 text-slate-800 dark:text-slate-200">
          <AlertTriangle className="w-16 h-16 text-red-500 dark:text-red-400 mb-4" />
          <h1 className="text-2xl font-bold text-red-600 dark:text-red-400">
            {t('error_boundary_oops')}
          </h1>
          <p className="mt-2">
            {t('error_boundary_message')}
          </p>
          {import.meta.env.DEV && error && (
            <details className="mt-6 text-left w-full max-w-2xl">
              <summary className="cursor-pointer text-sm text-slate-600 dark:text-slate-400 hover:underline">
                Detalles del Error (Solo Desarrollo)
              </summary>
              <pre className="mt-2 text-xs bg-slate-200 dark:bg-neutral-800 p-3 rounded overflow-auto whitespace-pre-wrap break-all">
                {error.toString()}
                <br />
                {error.stack}
              </pre>
            </details>
          )}
        </div>
      );
    }
    return children;
  }
}

export default withTranslation()(ErrorBoundary);