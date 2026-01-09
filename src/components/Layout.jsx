import { useGoals } from '../context/GoalContext';
import { useLanguage } from '../context/LanguageContext';

export default function Layout({ children, currentView, onProfileClick }) {
    const { points } = useGoals();
    const { t } = useLanguage();

    // Only show header content if not in profile view (ProfileView has its own header)
    // Actually, let's keep the layout simple. If user clicks profile, maybe we hide the main header or change it?
    // ProfileView has a "Back" button, so it acts like a sub-page.
    // Let's hide the main header components when in Profile view to avoid clutter, 
    // OR we just rendered children.
    // The previous design put the header INSIDE Layout. If ProfileView is a child, it renders INSIDE the layout main.
    // But ProfileView has its own header.
    // Let's conditionally render the main header only if currentView === 'goals'.

    return (
        <div className="min-h-screen bg-system-bg text-white pb-20">
            {currentView === 'goals' && (
                <header className="sticky top-0 z-50 glass pt-safe-top pb-4 px-4 mb-4">
                    <div className="flex items-center justify-between max-w-lg mx-auto pt-4">
                        <h1 className="text-xl font-semibold tracking-tight">{t('app.title')}</h1>
                        <div className="flex items-center gap-3">
                            <div className="px-3 py-1 rounded-full bg-system-bg-secondary border border-white/10 text-sm font-medium text-system-yellow">
                                🏆 {points} {t('pts')}
                            </div>
                            <button
                                onClick={onProfileClick}
                                className="w-8 h-8 rounded-full bg-system-gray3 overflow-hidden active:scale-95 transition-transform"
                                title={t('profile.title')}
                            >
                                {/* Profile placeholder */}
                                <div className="w-full h-full flex items-center justify-center text-xs">A</div>
                            </button>
                        </div>
                    </div>
                </header>
            )}

            <main className="max-w-lg mx-auto px-4 safe-area-bottom">
                {children}
            </main>
        </div>
    );
}
