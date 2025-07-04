import React, { useState, useContext } from 'react'
import { LayoutTemplate, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { HomePageStyles } from '../assets/dummystyle.js';
import { UserContext } from '../context/UserContext.jsx';
import { Menu, X } from 'lucide-react';
import { ProfileInfoCard } from '../components/cards.jsx';
import Login from '../components/Login.jsx';
import Modal from '../components/Modal.jsx';
import Signup from '../components/SignUp.jsx';


const HomePage = () => {
    const { user } = useContext(UserContext);
    const navigate = useNavigate();
    const [openAuthModal, setOpenAuthModal] = useState(false);

    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [currentPage, setCurrentPage] = useState('login');

    const handleCTA = () => {
        if (user) {
            navigate('/dashboard');
        } else {
            setOpenAuthModal(true);
        }
    }

    return (
        <div className={HomePageStyles.container}>
            <header className={HomePageStyles.header}>
                <div className={HomePageStyles.headerContainer}>
                    <div className={HomePageStyles.logoContainer}>
                        <div className={HomePageStyles.logoIcon}>
                            <LayoutTemplate className={HomePageStyles.logoIconStyle} />
                        </div>
                        <span className={HomePageStyles.logoText}>
                            ResumeCraft
                        </span>
                    </div>
                    {/* Mobile menu */}
                    <button
                        className={HomePageStyles.mobileMenuButton}
                        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
                        {mobileMenuOpen ?
                            <X size={24} className={HomePageStyles.mobileMenuIcon} />
                            :
                            <Menu size={24} className={HomePageStyles.mobileMenuIcon} />
                        }

                    </button>

                    {/* Desktop menu */}
                    <div className='hidden md:flex items-center'>
                        {user ? (
                            <ProfileInfoCard />
                        ) : (
                            <button
                                className={HomePageStyles.desktopAuthButton}
                                onClick={() => setOpenAuthModal(true)}>
                                <div className={HomePageStyles.desktopAuthButtonOverlay}></div>
                                <span className={HomePageStyles.desktopAuthButtonText}>
                                    Get Started
                                </span>
                            </button>
                        )}
                    </div>
                </div>
                {/* Mobile menu */}
                {mobileMenuOpen && (
                    <div className={HomePageStyles.mobileMenu}>
                        <div className={HomePageStyles.mobileMenuContainer}>
                            {user ? (
                                <div className={HomePageStyles.mobileUserInfo}>
                                    <div className={HomePageStyles.mobileUserWelcome}>
                                        Welcome Back
                                    </div>
                                    <button className={HomePageStyles.mobileDashboardButton}
                                        onClick={() => {
                                            navigate('/dashboard');
                                            setMobileMenuOpen(false);
                                        }}>
                                        Go to Dashboard
                                    </button>
                                </div>
                            ) : (
                                <button className={HomePageStyles.mobileAuthButton}
                                    onClick={() => {
                                        setOpenAuthModal(true);
                                        setMobileMenuOpen(false);
                                    }}>
                                    Get Started
                                </button>
                            )}
                        </div>
                    </div>
                )}
            </header>

            {/* Main content */}
            <main className={HomePageStyles.main}>
                <section className={HomePageStyles.heroSection}>
                    <div className={HomePageStyles.heroGrid}>
                        <div className={HomePageStyles.heroLeft}>
                            <div className={HomePageStyles.tagline}>
                                Professional Resume Builder
                            </div>
                            <h1 className={HomePageStyles.heading}>
                                <span className={HomePageStyles.headingText}>Create a</span>
                                <span className={HomePageStyles.headingGradient}>Professional Resume</span>
                                <span className={HomePageStyles.headingText}>in Minutes</span>
                            </h1>
                            <p className="text-base sm:text-lg lg:text-xl text-slate-600 leading-relaxed max-w-lg font-medium">
                                Create powerful, responsive websites faster than ever. Intuitive, flexible, and beautifully designed for modern developers.
                            </p>
                            {/* CTA buttons */}
                            <div className={HomePageStyles.ctaButtons}>
                                <button
                                    className={HomePageStyles.primaryButton}
                                    onClick={handleCTA}>
                                    <div className={HomePageStyles.primaryButtonOverlay}></div>
                                    <span className={HomePageStyles.primaryButtonText}>
                                        Start Building
                                        <ArrowRight className={HomePageStyles.primaryButtonIcon} size={18} />
                                    </span>
                                </button>
                                <button
                                    className={HomePageStyles.secondaryButton}
                                    onClick={handleCTA}>
                                    View Templates
                                </button>
                            </div>

                        </div>
                        {/* Right Image or Illustration (Optional) */}
                        <div class="relative w-auto max-w-sm sm:max-w-md lg:max-w-lg mx-auto">
                            <div class="absolute -inset-8 bg-gradient-to-r from-violet-200/50 to-fuchsia-200/50 rounded-3xl blur-3xl"></div>

                            <div class="relative">
                                <svg viewBox="0 0 400 500" class="w-full h-200 max-w-md mx-auto">
                                    <defs>
                                        <linearGradient id="bgGradient" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stop-color="#8b5cf6"></stop><stop offset="100%" stop-color="#d946ef"></stop></linearGradient>
                                        <linearGradient id="cardGradient" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stop-color="#ffffff"></stop><stop offset="100%" stop-color="#f8fafc"></stop></linearGradient>
                                    </defs>
                                    <rect x="50" y="50" width="300" height="400" rx="20" class="fill-[url(#cardGradient)] stroke-[#e2e8f0] stroke-[2]"></rect>
                                    <circle cx="120" cy="120" r="25" class="fill-[url(#bgGradient)]"></circle>
                                    <rect x="160" y="105" width="120" height="8" rx="4" class="fill-[#8b5cf6]"></rect>
                                    <rect x="160" y="120" width="80" height="6" rx="3" class="fill-[#d946ef]"></rect>
                                    <rect x="70" y="170" width="260" height="4" rx="2" class="fill-[#e2e8f0]"></rect>
                                    <rect x="70" y="185" width="200" height="4" rx="2" class="fill-[#e2e8f0]"></rect>
                                    <rect x="70" y="200" width="240" height="4" rx="2" class="fill-[#e2e8f0]"></rect>
                                    <rect x="70" y="230" width="60" height="6" rx="3" class="fill-[#8b5cf6]"></rect>
                                    <rect x="70" y="250" width="40" height="15" rx="7" class="fill-[#ddd6fe]"></rect>
                                    <rect x="120" y="250" width="50" height="15" rx="7" class="fill-[#ddd6fe]"></rect>
                                    <rect x="180" y="250" width="45" height="15" rx="7" class="fill-[#ddd6fe]"></rect>
                                    <rect x="70" y="290" width="80" height="6" rx="3" class="fill-[#d946ef]"></rect>
                                    <rect x="70" y="310" width="180" height="4" rx="2" class="fill-[#e2e8f0]"></rect>
                                    <rect x="70" y="325" width="150" height="4" rx="2" class="fill-[#e2e8f0]"></rect>
                                    <rect x="70" y="340" width="200" height="4" rx="2" class="fill-[#e2e8f0]"></rect>
                                    <circle cx="320" cy="100" r="15" class="fill-[#f97316] opacity-80">
                                        <animateTransform attributeName="transform" type="translate" values="0,0; 0,-10; 0,0" dur="3s" repeatCount="indefinite"></animateTransform>
                                    </circle>
                                    <rect x="30" y="300" width="12" height="12" rx="6" class="fill-[#10b981] opacity-80">
                                        <animateTransform attributeName="transform" type="translate" values="0,0; 5,0; 0,0" dur="2s" repeatCount="indefinite"></animateTransform>
                                    </rect>
                                    <polygon points="360,200 370,220 350,220" class="fill-[#ef4444] opacity-80">
                                        <animateTransform attributeName="transform" type="rotate" values="0 360 210; 360 360 210; 0 360 210" dur="4s" repeatCount="indefinite"></animateTransform>
                                    </polygon>
                                </svg>
                            </div>

                        </div>
                    </div>
                </section>
            </main>
            {/* Footer */}
            <footer className="text-center py-6 text-gray-500 text-sm border-t">
                © {new Date().getFullYear()} ResumeCraft. All rights reserved.
            </footer>

            {/* Auth Modal */}
            <Modal isOpen={openAuthModal} onClose={() => {
                setOpenAuthModal(false)
                setCurrentPage('login')    
            }} hideHeader>
                <div>
                    {currentPage === 'login' && <Login setCurrentPage={setCurrentPage} />}
                    {currentPage === 'signup' && <Signup setCurrentPage={setCurrentPage} />}
                </div>
            </Modal>

        </div>
    )
}

export default HomePage
