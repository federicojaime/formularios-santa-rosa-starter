// Archivo: src/components/Navbar.jsx
import { useState, useEffect } from 'react';
import { Navbar as FlowbiteNavbar, Button, Tooltip } from 'flowbite-react';
import { Link, useLocation } from 'react-router-dom';
import { HiMenuAlt2, HiDocumentAdd, HiViewList, HiChartPie, HiMoon, HiSun } from 'react-icons/hi';
import { useTheme } from '../contexts/ThemeContext';

function Navbar() {
    const location = useLocation();
    const { theme, toggleTheme } = useTheme();
    const [scrolled, setScrolled] = useState(false);
    const [showMobileMenu, setShowMobileMenu] = useState(false);

    // Detectar scroll para cambiar estilo de navbar
    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 10) {
                setScrolled(true);
            } else {
                setScrolled(false);
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <div className="no-print sticky top-0 z-50">
            <div className={`w-full transition-all duration-300 ${
                scrolled 
                    ? 'bg-white/80 dark:bg-gray-900/80 backdrop-blur-md shadow-md' 
                    : 'bg-white dark:bg-gray-900'
            }`}>
                <div className="container mx-auto px-4">
                    <div className="flex items-center justify-between h-16">
                        {/* Logo y nombre */}
                        <Link to="/" className="flex items-center space-x-3">
                            <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center overflow-hidden shadow-md">
                                <img
                                    src="/src/assets/logo-santa-rosa.png"
                                    className="h-8 w-8 object-contain"
                                    alt="Logo Santa Rosa"
                                    onError={(e) => {
                                        e.target.onerror = null;
                                        e.target.src = 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="white"><path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/></svg>';
                                    }}
                                />
                            </div>
                            <div>
                                <span className="font-bold text-xl text-blue-800 dark:text-blue-400">Formularios</span>
                                <span className="font-medium text-xl text-gray-600 dark:text-gray-300"> Santa Rosa</span>
                            </div>
                        </Link>

                        {/* Menú de navegación para escritorio */}
                        <div className="hidden md:flex items-center space-x-1">
                            <Link 
                                to="/" 
                                className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors duration-200 relative group ${
                                    location.pathname === '/' 
                                        ? 'text-blue-700 bg-blue-50 dark:text-blue-300 dark:bg-blue-900/30' 
                                        : 'text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800'
                                }`}
                            >
                                <div className="flex items-center space-x-1">
                                    <HiDocumentAdd className="w-5 h-5" />
                                    <span>Formulario</span>
                                </div>
                                {location.pathname === '/' && (
                                    <div className="absolute bottom-0 left-0 h-0.5 w-full bg-blue-600 dark:bg-blue-400"></div>
                                )}
                            </Link>
                            
                            <Link 
                                to="/respuestas" 
                                className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors duration-200 relative group ${
                                    location.pathname === '/respuestas' 
                                        ? 'text-blue-700 bg-blue-50 dark:text-blue-300 dark:bg-blue-900/30' 
                                        : 'text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800'
                                }`}
                            >
                                <div className="flex items-center space-x-1">
                                    <HiViewList className="w-5 h-5" />
                                    <span>Respuestas</span>
                                </div>
                                {location.pathname === '/respuestas' && (
                                    <div className="absolute bottom-0 left-0 h-0.5 w-full bg-blue-600 dark:bg-blue-400"></div>
                                )}
                            </Link>
                            
                            <Link 
                                to="/estadisticas" 
                                className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors duration-200 relative group ${
                                    location.pathname === '/estadisticas' 
                                        ? 'text-blue-700 bg-blue-50 dark:text-blue-300 dark:bg-blue-900/30' 
                                        : 'text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800'
                                }`}
                            >
                                <div className="flex items-center space-x-1">
                                    <HiChartPie className="w-5 h-5" />
                                    <span>Estadísticas</span>
                                </div>
                                {location.pathname === '/estadisticas' && (
                                    <div className="absolute bottom-0 left-0 h-0.5 w-full bg-blue-600 dark:bg-blue-400"></div>
                                )}
                            </Link>

                            <Tooltip content={theme === 'dark' ? 'Modo claro' : 'Modo oscuro'}>
                                <button
                                    onClick={toggleTheme}
                                    className="p-2 rounded-lg text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800 transition-colors duration-200"
                                    aria-label="Cambiar tema"
                                >
                                    {theme === 'dark' ? <HiSun className="w-5 h-5" /> : <HiMoon className="w-5 h-5" />}
                                </button>
                            </Tooltip>
                        </div>

                        {/* Botón de menú móvil */}
                        <div className="md:hidden flex items-center">
                            <button
                                onClick={() => setShowMobileMenu(!showMobileMenu)}
                                className="p-2 rounded-lg text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800"
                                aria-label="Menú principal"
                            >
                                <HiMenuAlt2 className="w-6 h-6" />
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Menú móvil */}
            {showMobileMenu && (
                <div className="md:hidden bg-white/95 dark:bg-gray-900/95 backdrop-blur-sm shadow-lg">
                    <div className="container mx-auto px-4 py-3 space-y-1">
                        <Link 
                            to="/" 
                            onClick={() => setShowMobileMenu(false)}
                            className={`block px-3 py-2 rounded-lg text-base font-medium ${
                                location.pathname === '/' 
                                    ? 'text-blue-700 bg-blue-50 dark:text-blue-300 dark:bg-blue-900/30' 
                                    : 'text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800'
                            }`}
                        >
                            <div className="flex items-center space-x-2">
                                <HiDocumentAdd className="w-5 h-5" />
                                <span>Formulario</span>
                            </div>
                        </Link>
                        
                        <Link 
                            to="/respuestas" 
                            onClick={() => setShowMobileMenu(false)}
                            className={`block px-3 py-2 rounded-lg text-base font-medium ${
                                location.pathname === '/respuestas' 
                                    ? 'text-blue-700 bg-blue-50 dark:text-blue-300 dark:bg-blue-900/30' 
                                    : 'text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800'
                            }`}
                        >
                            <div className="flex items-center space-x-2">
                                <HiViewList className="w-5 h-5" />
                                <span>Respuestas</span>
                            </div>
                        </Link>
                        
                        <Link 
                            to="/estadisticas" 
                            onClick={() => setShowMobileMenu(false)}
                            className={`block px-3 py-2 rounded-lg text-base font-medium ${
                                location.pathname === '/estadisticas' 
                                    ? 'text-blue-700 bg-blue-50 dark:text-blue-300 dark:bg-blue-900/30' 
                                    : 'text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800'
                            }`}
                        >
                            <div className="flex items-center space-x-2">
                                <HiChartPie className="w-5 h-5" />
                                <span>Estadísticas</span>
                            </div>
                        </Link>

                        <button
                            onClick={() => {
                                toggleTheme();
                                setShowMobileMenu(false);
                            }}
                            className="w-full px-3 py-2 rounded-lg text-base font-medium text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800"
                        >
                            <div className="flex items-center space-x-2">
                                {theme === 'dark' ? <HiSun className="w-5 h-5" /> : <HiMoon className="w-5 h-5" />}
                                <span>{theme === 'dark' ? 'Modo claro' : 'Modo oscuro'}</span>
                            </div>
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}

export default Navbar;