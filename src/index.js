import React, { Suspense } from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import ErrorBoundary from './ErrorBoundary';
import i18next from 'i18next'
import { initReactI18next } from 'react-i18next'
import HttpApi from 'i18next-http-backend'
import LanguageDetector from 'i18next-browser-languagedetector'

i18next
  .use(HttpApi)
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    supportedLngs: ['en', 'es', 'zh'],
    fallbackLng: 'en',
    debug: false,
    // Options for language detector
    detection: {
      order: ['querystring', 'cookie', 'path', 'htmlTag'], //order: ['querystring', 'cookie', 'localStorage', 'sessionStorage', 'navigator', 'htmlTag', 'path', 'subdomain'],
      caches: ['cookie'],
    },
    // react: { useSuspense: false },
    backend: {
      loadPath: '/assets/locales/{{lng}}.json',
    },
  })

const LoadingPage = (
  <div>
    <h3>Loading language package..</h3>
  </div>
)

ReactDOM.render(
  <Suspense fallback={LoadingPage}>
    <React.StrictMode>
      <ErrorBoundary>
        <App />
      </ErrorBoundary>
    </React.StrictMode>
  </Suspense>,
  document.getElementById('root')
);
