// Archivo: src/components/Navbar.jsx
import { useState, useEffect } from 'react';
import { Button } from 'flowbite-react';
import { Link, useLocation } from 'react-router-dom';
import { 
  HiDocumentAdd, 
  HiViewList, 
  HiChartPie, 
  HiMoon, 
  HiSun,
  HiMenu,
  HiX
} from 'react-icons/hi';
import { useTheme } from '../contexts/ThemeContext';
import { motion, AnimatePresence } from 'framer-motion';

function Navbar() {
  const location = useLocation();
  const { theme, toggleTheme } = useTheme();
  const [scrolled, setScrolled] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);

  // Detectar scroll para cambiar estilo de navbar
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  // Cerrar menú móvil cuando cambia la ruta
  useEffect(() => {
    setShowMobileMenu(false);
  }, [location.pathname]);

  // Enlaces de navegación
  const navLinks = [
    { to: '/', label: 'Formulario', icon: HiDocumentAdd },
    { to: '/respuestas', label: 'Respuestas', icon: HiViewList },
    { to: '/estadisticas', label: 'Estadísticas', icon: HiChartPie }
  ];

  return (
    <div className="no-print sticky top-0 z-50">
      <div 
        className={`w-full transition-all duration-300 ${
          scrolled 
            ? 'bg-white/90 dark:bg-gray-900/90 backdrop-blur-md shadow-lg' 
            : 'bg-white dark:bg-gray-900'
        }`}
      >
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            {/* Logo y nombre */}
            <Link to="/" className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-blue-700 rounded-lg flex items-center justify-center overflow-hidden shadow-md">
                <span className="text-white font-bold text-xl">SR</span>
              </div>
              <div>
                <span className="font-bold text-xl text-blue-700 dark:text-blue-400">Formularios</span>
                <span className="font-medium text-xl text-gray-600 dark:text-gray-300"> Santa Rosa</span>
              </div>
            </Link>

            {/* Menú de navegación para escritorio */}
            <div className="hidden md:flex items-center gap-2">
              {navLinks.map(link => (
                <Link 
                  key={link.to}
                  to={link.to} 
                  className={`px-3 py-2 rounded-lg flex items-center gap-2 font-medium transition-all duration-200 ${
                    location.pathname === link.to 
                      ? 'text-blue-700 bg-blue-50 dark:text-blue-300 dark:bg-blue-900/30' 
                      : 'text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800 hover:scale-105'
                  }`}
                >
                  <link.icon className="w-5 h-5" />
                  <span>{link.label}</span>
                  {location.pathname === link.to && (
                    <motion.div 
                      className="absolute bottom-0 left-0 h-0.5 w-full bg-blue-600 dark:bg-blue-400"
                      layoutId="activeTab"
                    />
                  )}
                </Link>
              ))}

              <Button
                onClick={toggleTheme}
                color="light"
                pill
                className="p-2 ml-2"
                title={theme === 'dark' ? 'Cambiar a modo claro' : 'Cambiar a modo oscuro'}
              >
                {theme === 'dark' ? <HiSun className="w-5 h-5" /> : <HiMoon className="w-5 h-5" />}
              </Button>
            </div>

            {/* Botón de menú móvil */}
            <div className="md:hidden">
              <Button
                onClick={() => setShowMobileMenu(!showMobileMenu)}
                color="light"
                pill
                className="p-2"
              >
                {showMobileMenu ? <HiX className="w-6 h-6" /> : <HiMenu className="w-6 h-6" />}
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Menú móvil */}
      <AnimatePresence>
        {showMobileMenu && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden bg-white/95 dark:bg-gray-900/95 backdrop-blur-sm shadow-lg overflow-hidden"
          >
            <div className="container mx-auto px-4 py-3 space-y-2">
              {navLinks.map(link => (
                <Link 
                  key={link.to}
                  to={link.to}
                  className={`flex items-center gap-3 px-4 py-3 rounded-lg font-medium ${
                    location.pathname === link.to 
                      ? 'text-blue-700 bg-blue-50 dark:text-blue-300 dark:bg-blue-900/30' 
                      : 'text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800'
                  }`}
                >
                  <link.icon className="w-5 h-5" />
                  <span>{link.label}</span>
                </Link>
              ))}

              <button
                onClick={toggleTheme}
                className="w-full flex items-center gap-3 px-4 py-3 rounded-lg font-medium text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800"
              >
                {theme === 'dark' ? <HiSun className="w-5 h-5" /> : <HiMoon className="w-5 h-5" />}
                <span>{theme === 'dark' ? 'Modo claro' : 'Modo oscuro'}</span>
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default Navbar;