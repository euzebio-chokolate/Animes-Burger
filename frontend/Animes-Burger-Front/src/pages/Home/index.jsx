import React from 'react';
import Banner from './Banner';
import DestaquesSection from './Destaques';
import FaleConoscoSection from './FaleConosco';

function Home() {
    return (
        <main className="overflow-x-hidden">
            <style>{`
                @keyframes slideUp {
                    from { opacity: 0; transform: translateY(40px); }
                    to { opacity: 1; transform: translateY(0); }
                }
                .animate-slide-up {
                    animation: slideUp 0.8s ease-out forwards;
                }
                .delay-100 { animation-delay: 0.1s; }
                .delay-200 { animation-delay: 0.2s; }
                .delay-300 { animation-delay: 0.3s; }
            `}</style>

            <div className="animate-slide-up">
                <Banner />
            </div>
            
            <div className="animate-slide-up delay-100">
                <DestaquesSection />
            </div>
            
            <div className="animate-slide-up delay-200">
                <FaleConoscoSection />
            </div>
        </main>
    );
}

export default Home;