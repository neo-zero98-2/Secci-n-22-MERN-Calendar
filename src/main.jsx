import React from 'react'
import ReactDOM from 'react-dom/client'
import { CalendarApp } from './CalendarApp'
import './styles.css'

const enableMocking = async () => {
  
  if (import.meta.env.VITE_IS_MOCKS === 'false') {
    return;
  }
  
  const { worker } = await import('./mocks/browser');
  
  // `worker.start()` returns a Promise that resolves
  // once the Service Worker is up and ready to intercept requests.
  return worker.start()
}

enableMocking().then(() => {
  ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
      <CalendarApp/>
    </React.StrictMode>,
  )
});

