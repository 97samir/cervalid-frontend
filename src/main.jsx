import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './styles/index.css'
import App from './App.jsx'

// Provider de estado global de autenticación
import AuthStoreProvider from './app/store/auth/AuthStoreProvider'
import ReactQueryProvider from "./app/providers/ReactQueryProvider";

// importar css
//import "@/features/student/styles/timeline.css";

import "bootstrap/dist/css/bootstrap.min.css";
import 'bootstrap/dist/js/bootstrap.bundle.min.js'
import 'bootstrap-icons/font/bootstrap-icons.css'

createRoot(document.getElementById('root')).render(

  <StrictMode>

    <ReactQueryProvider>
      <AuthStoreProvider>
        <App />
      
      </AuthStoreProvider>
    </ReactQueryProvider>
  
  </StrictMode>,
)
