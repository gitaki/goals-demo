import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { ChevronLeft, Check } from 'lucide-react';
import clsx from 'clsx';

export default function ProfileView({ onBack }) {
    const { language, setLanguage, t } = useLanguage();

    const languages = [
        { id: 'es', label: 'Español' },
        { id: 'en', label: 'English' }
    ];

    return (
        <div className="space-y-6 pt-4 animate-in slide-in-from-right duration-300">
            {/* Header */}
            <div className="flex items-center gap-4 mb-8">
                <button
                    onClick={onBack}
                    className="p-2 bg-system-bg-secondary rounded-full hover:bg-white/10 transition"
                >
                    <ChevronLeft size={24} />
                </button>
                <h2 className="text-2xl font-bold">{t('profile.title')}</h2>
            </div>

            {/* Language Selection */}
            <div className="bg-system-bg-secondary rounded-xl overflow-hidden">
                <div className="p-4 border-b border-white/5">
                    <h3 className="text-sm font-medium text-system-gray uppercase tracking-wider">
                        {t('profile.language')}
                    </h3>
                </div>
                <div className="divide-y divide-white/5">
                    {languages.map((lang) => (
                        <button
                            key={lang.id}
                            onClick={() => setLanguage(lang.id)}
                            className="w-full p-4 flex items-center justify-between hover:bg-white/5 transition text-left"
                        >
                            <span className={clsx(
                                "text-base",
                                language === lang.id ? "text-white font-medium" : "text-system-gray"
                            )}>
                                {lang.label}
                            </span>
                            {language === lang.id && (
                                <Check size={20} className="text-system-blue" />
                            )}
                        </button>
                    ))}
                </div>
            </div>
        </div>
    );
}
