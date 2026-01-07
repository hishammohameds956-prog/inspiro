import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Search, Bell, UserPlus } from 'lucide-react';
import { Link } from 'react-router-dom';
import logo from '../assets/logo-final.png';

const Navbar = () => {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isOpen, setIsOpen] = useState(false);
    const [isSearchOpen, setIsSearchOpen] = useState(false);
    const [isBlasting, setIsBlasting] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 0) {
                setIsScrolled(true);
            } else {
                setIsScrolled(false);
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const navLinks = [
        { name: 'Home', href: '#' },
        { name: 'Events', href: '#events' },
        { name: 'The Other Side', href: '#about' },
        { name: 'My List', href: '#gallery' },
    ];

    return (
        <nav className={`fixed w-full z-50 transition-all duration-500 ${isScrolled ? 'bg-[#141414] border-b border-[#E50914]/50 shadow-[0_4px_30px_rgba(229,9,20,0.15)]' : 'bg-gradient-to-b from-black/90 via-black/60 to-transparent'}`}>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16 md:h-24 transition-all duration-300">
                    <div className="flex items-center gap-8">
                        <div className="flex-shrink-0">
                            <img src={logo} alt="Inspiro 26" className="h-12 md:h-20 w-auto object-contain transition-all duration-300" />
                        </div>

                        <div className="hidden md:block">
                            <div className="flex items-baseline space-x-4">
                                {navLinks.map((link) => (
                                    <a
                                        key={link.name}
                                        href={link.href}
                                        className="text-gray-300 hover:text-[#E50914] px-3 py-2 rounded-md text-sm font-medium transition-colors duration-300 hover:drop-shadow-[0_0_8px_rgba(229,9,20,0.5)]"
                                    >
                                        {link.name}
                                    </a>
                                ))}
                            </div>
                        </div>
                    </div>

                    <div className="hidden md:flex items-center space-x-6 text-white">
                        <Link to="/register">
                            <button className="bg-[#E50914] hover:bg-[#b00710] text-white px-4 py-2 rounded text-sm font-bold transition-all hover:scale-105 flex items-center gap-2">
                                <UserPlus size={16} /> Register
                            </button>
                        </Link>
                        <Search className="w-5 h-5 cursor-pointer hover:text-gray-300" onClick={() => setIsSearchOpen(true)} />
                        <Bell className="w-5 h-5 cursor-pointer hover:text-gray-300" />
                        <div className="w-8 h-8 rounded bg-primary/20 flex items-center justify-center cursor-pointer">
                            <img src="https://upload.wikimedia.org/wikipedia/commons/0/0b/Netflix-avatar.png" alt="Profile" className="rounded" />
                        </div>
                    </div>

                    <div className="md:hidden flex items-center gap-4 text-white">
                        <Search className="w-5 h-5" onClick={() => setIsSearchOpen(true)} />
                        <button
                            onClick={() => setIsOpen(!isOpen)}
                            className="text-white hover:text-gray-300"
                        >
                            {isOpen ? <X size={24} /> : <Menu size={24} />}
                        </button>
                    </div>
                </div>
            </div>

            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="md:hidden bg-black/95 backdrop-blur-xl border-t border-red-900/50 overflow-hidden shadow-[0_10px_30px_rgba(0,0,0,0.9)]"
                    >
                        <div className="px-4 pt-4 pb-6 space-y-2">
                            {navLinks.map((link) => (
                                <a
                                    key={link.name}
                                    href={link.href}
                                    className="block px-3 py-3 rounded-md text-base font-medium text-gray-300 hover:text-red-500 hover:bg-red-900/10 hover:pl-6 transition-all duration-300 border-l-2 border-transparent hover:border-red-600"
                                    onClick={() => setIsOpen(false)}
                                >
                                    {link.name}
                                </a>
                            ))}
                            <Link
                                to="/register"
                                className="block px-3 py-3 rounded-md text-base font-medium text-white bg-[#E50914] hover:bg-[#b00710] hover:pl-6 transition-all duration-300 border-l-2 border-transparent"
                                onClick={() => setIsOpen(false)}
                            >
                                Register Now
                            </Link>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Retro Terminal Search Overlay */}
            <AnimatePresence>
                {isSearchOpen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-[60] bg-black flex flex-col items-center justify-center font-mono p-4 overflow-hidden"
                    >
                        {/* Blast Effect */}
                        <AnimatePresence>
                            {isBlasting && (
                                <motion.div
                                    initial={{ scale: 0, opacity: 1 }}
                                    animate={{ scale: 30, opacity: 0 }}
                                    exit={{ opacity: 0 }}
                                    transition={{ duration: 0.8, ease: "easeOut" }}
                                    className="absolute inset-0 bg-red-600 rounded-full z-0 pointer-events-none"
                                    style={{ left: '50%', top: '50%', x: '-50%', y: '-50%', width: '100px', height: '100px' }}
                                />
                            )}
                        </AnimatePresence>

                        <button
                            onClick={() => setIsSearchOpen(false)}
                            className="absolute top-6 right-6 text-red-600 hover:text-red-500 z-10"
                        >
                            <X size={32} />
                        </button>

                        <div className="w-full max-w-2xl z-10 relative">
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.2 }}
                                className="text-red-600 mb-4 text-sm md:text-base tracking-widest flex justify-between"
                            >
                                <span>HAWKINS_LAB_TERMINAL_V2.0</span>
                                <span className="animate-pulse">WARNING: BREACH DETECTED</span>
                            </motion.div>

                            <div className="relative border-b-2 border-red-600/50">
                                <span className="absolute left-0 top-1/2 -translate-y-1/2 text-red-600 text-xl md:text-3xl font-bold">{'>'}</span>
                                <input
                                    type="text"
                                    autoFocus
                                    placeholder="ENTER_QUERY..."
                                    className="w-full bg-transparent text-red-600 text-xl md:text-3xl font-bold py-4 pl-8 focus:outline-none placeholder-red-600/30 uppercase"
                                    onKeyDown={(e) => {
                                        if (e.key === 'Enter') {
                                            setIsBlasting(true);
                                            setTimeout(() => setIsBlasting(false), 1000);
                                        }
                                    }}
                                />
                                <motion.div
                                    animate={{ opacity: [0, 1, 0] }}
                                    transition={{ repeat: Infinity, duration: 0.8 }}
                                    className="absolute right-0 top-1/2 -translate-y-1/2 w-3 h-6 bg-red-600"
                                />
                            </div>

                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 0.5 }}
                                className="mt-8 text-red-600/70 text-xs md:text-sm space-y-2"
                            >
                                <p>SEARCHING DATABASE...</p>
                                <p>ACCESS LEVEL: RESTRICTED</p>
                                <p>CAUTION: CLASSIFIED MATERIALS</p>
                            </motion.div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </nav>
    );
};

export default Navbar;
