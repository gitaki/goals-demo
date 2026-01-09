import React, { createContext, useContext, useState } from 'react';
import { enUS, es } from 'date-fns/locale';

const LanguageContext = createContext();

const translations = {
    es: {
        'app.title': 'Mis Metas',
        'app.no_goals': 'No metas para este día.',
        'nav.today': 'Hoy',
        'goal.daily': 'Diaria',
        'goal.weekly': 'Semanal',
        'goal.create': 'Nueva Meta',
        'goal.title.label': 'Título de la Meta',
        'goal.title.placeholder': 'Ej. Leer 20 páginas',
        'goal.repeats': 'Se repite el',
        'goal.days.week': 'días/sem',
        'goal.start_date': 'Fecha de Inicio',
        'goal.end_date': 'Fecha Final (Opcional)',
        'btn.create': 'Crear Meta',
        'profile.title': 'Perfil',
        'profile.language': 'Idioma',
        'profile.back': 'Volver',
        'days': ['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb'],
        'pts': 'pts'
    },
    en: {
        'app.title': 'My Targets',
        'app.no_goals': 'No goals for this day.',
        'nav.today': 'Today',
        'goal.daily': 'Daily',
        'goal.weekly': 'Weekly',
        'goal.create': 'New Goal',
        'goal.title.label': 'Goal Title',
        'goal.title.placeholder': 'e.g., Read 20 pages',
        'goal.repeats': 'Repeats On',
        'goal.days.week': 'days/wk',
        'goal.start_date': 'Start Date',
        'goal.end_date': 'End Date (Optional)',
        'btn.create': 'Create Goal',
        'profile.title': 'Profile',
        'profile.language': 'Language',
        'profile.back': 'Back',
        'days': ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
        'pts': 'pts'
    }
};

export function LanguageProvider({ children }) {
    const [language, setLanguage] = useState('es'); // Default to Spanish

    const t = (key) => {
        return translations[language][key] || key;
    };

    const dateLocale = language === 'es' ? es : enUS;

    return (
        <LanguageContext.Provider value={{ language, setLanguage, t, dateLocale }}>
            {children}
        </LanguageContext.Provider>
    );
}

export const useLanguage = () => useContext(LanguageContext);
