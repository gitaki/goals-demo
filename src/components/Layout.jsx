import React from 'react';

export default function Layout({ children }) {
    return (
        <div className="min-h-screen bg-system-bg text-white pb-20">
            <header className="sticky top-0 z-50 glass pt-safe-top pb-4 px-4 mb-4">
                <div className="flex items-center justify-between max-w-lg mx-auto pt-4">
                    <h1 className="text-xl font-semibold tracking-tight">Family Goals</h1>
                    <div className="w-8 h-8 rounded-full bg-system-gray3 overflow-hidden">
                        {/* Profile placeholder */}
                        <div className="w-full h-full flex items-center justify-center text-xs">A</div>
                    </div>
                </div>
            </header>

            <main className="max-w-lg mx-auto px-4 safe-area-bottom">
                {children}
            </main>
        </div>
    );
}
