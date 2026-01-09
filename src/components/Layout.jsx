import { useGoals } from '../context/GoalContext';

export default function Layout({ children }) {
    const { points } = useGoals();

    return (
        <div className="min-h-screen bg-system-bg text-white pb-20">
            <header className="sticky top-0 z-50 glass pt-safe-top pb-4 px-4 mb-4">
                <div className="flex items-center justify-between max-w-lg mx-auto pt-4">
                    <h1 className="text-xl font-semibold tracking-tight">My Targets</h1>
                    <div className="flex items-center gap-3">
                        <div className="px-3 py-1 rounded-full bg-system-bg-secondary border border-white/10 text-sm font-medium text-system-yellow">
                            🏆 {points}
                        </div>
                        <div className="w-8 h-8 rounded-full bg-system-gray3 overflow-hidden">
                            {/* Profile placeholder */}
                            <div className="w-full h-full flex items-center justify-center text-xs">A</div>
                        </div>
                    </div>
                </div>
            </header>

            <main className="max-w-lg mx-auto px-4 safe-area-bottom">
                {children}
            </main>
        </div>
    );
}
