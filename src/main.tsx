import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.scss'
import 'bootstrap/dist/css/bootstrap.min.css';
import { QueryClient, QueryClientProvider } from 'react-query';
import AppContextProvider from './context/AppContext.tsx';
import arLang from "./languages/ar.json"
import i18next from 'i18next';
import { I18nextProvider } from 'react-i18next';

i18next.init({
  interpolation: { escapeValue: false },
  lng: "ar",
  resources: {
    ar: {
      global: arLang
    },
  }
})

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 0,
    },
  },
});

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <I18nextProvider i18n={i18next}>
        <AppContextProvider>
          <App />
        </AppContextProvider>
      </I18nextProvider>
    </QueryClientProvider>
  </React.StrictMode>,
)
