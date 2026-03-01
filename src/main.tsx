import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import ListsProvider from './contexts/ListsContext.tsx'

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <ListsProvider>
            <App />
        </ListsProvider>
    </StrictMode>,
)
