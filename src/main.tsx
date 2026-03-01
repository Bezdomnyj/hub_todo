import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import ListsProvider from './contexts/ListsContext.tsx'
import { StyleProvider } from './contexts/StylesContext.tsx'

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <StyleProvider>
            <ListsProvider>
                <App />
            </ListsProvider>
        </StyleProvider>
    </StrictMode>,
)
