import { createContext, useContext, type ReactNode, useMemo, useState, useEffect, useCallback } from 'react';

type Style = Record<string, any>;
type View = 'mobile' | 'tablet' | 'desktop';

type StyleContextType = {
    cssConstants: Style,
    view: View
    fontsReady: boolean
}

const StyleContext = createContext<StyleContextType | null>(null);

export const StyleProvider = ({ children }: { children: ReactNode }) => {

    const [fontsReady, setFontsReady] = useState<boolean>(false);

    const cssConstants = useMemo(() => {
        const res: Style = {};
        const computed = getComputedStyle(document.documentElement);
        for (const propertyIndex in computed) {
            if (isNaN(propertyIndex as any)) {
                break;
            }
            const propertyName = computed[propertyIndex];
            const propertyValue = computed.getPropertyValue(propertyName)
            if (propertyName.startsWith('--')) {
                res[propertyName] = propertyValue;
            }
        }
        return res;
    }, []);

    useEffect(() => {
        document.fonts.onloadingdone = () => {
            setFontsReady(true);
        };
        if (document.fonts.status === 'loaded') {
            setFontsReady(true);
        }
    }, []);

    const tabletQuery = useMemo(() => window.matchMedia(`(max-width: ${cssConstants['--breakpoint-tablet']})`), []);

    const mobileQuery = useMemo(() => window.matchMedia(`(max-width: ${cssConstants['--breakpoint-mobile']})`), []);

    const evaluateView = useCallback(() => {
        if (mobileQuery.matches) {
            return 'mobile';
        }
        if (tabletQuery.matches) {
            return 'tablet';
        }
        return 'desktop';
    }, []);

    const initialView = useMemo(() => evaluateView(), []);

    const [view, setView] = useState<View>(initialView);

    useEffect(() => {
        const controller = new AbortController();
        const handleChange = () => {
            if (mobileQuery.matches) {
                setView('mobile');
                return;
            }
            if (tabletQuery.matches) {
                setView('tablet');
                return;
            }
            setView('desktop');
        };
        tabletQuery.addEventListener('change', handleChange, { signal: controller.signal });
        mobileQuery.addEventListener('change', handleChange, { signal: controller.signal });
        return () => { controller.abort() };
    }, []);

    const value = useMemo(() => ({ cssConstants, view, fontsReady }), [cssConstants, view, fontsReady]);

    return <StyleContext.Provider value={value}>{children}</StyleContext.Provider>;
};

export const useStyle = () => {
    const context = useContext(StyleContext);

    if (context === undefined) {
        throw new Error('Il componente non è racchiuso da StyleProvider');
    }

    if (context === null) {
        throw new Error('Errore durante l\'elaborazione di StyleContext');
    }

    return context;
};