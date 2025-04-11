// src/App.jsx
import { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import { ThemeProvider as FlowbiteThemeProvider } from 'flowbite-react';   // ⬅️ nuevo
import Navbar from './components/Navbar';
import FormularioDigital from './components/FormularioDigital';
import VerRespuestas from './components/VerRespuestas';
import DetalleFormulario from './components/DetalleFormulario';
import Estadisticas from './components/Estadisticas';
import { FormDataProvider } from './contexts/FormDataContext';
import { ThemeProvider as AppThemeProvider } from './contexts/ThemeContext'; // ⬅️ renombrado para evitar choque

// Tema personalizado para Flowbite
const customTheme = {
  button: {
    color: {
      primary:
        'bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white focus:ring-4 focus:ring-blue-300 font-medium rounded-lg',
      success:
        'bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white focus:ring-4 focus:ring-green-300 font-medium rounded-lg',
      purple:
        'bg-gradient-to-r from-purple-500 to-indigo-600 hover:from-purple-600 hover:to-indigo-700 text-white focus:ring-4 focus:ring-purple-300 font-medium rounded-lg',
      info:
        'bg-gradient-to-r from-sky-400 to-blue-500 hover:from-sky-500 hover:to-blue-600 text-white focus:ring-4 focus:ring-blue-300 font-medium rounded-lg',
    },
  },
  card: {
    root: {
      base:
        'flex rounded-xl border border-gray-200 bg-white shadow-md transition-shadow duration-300 hover:shadow-lg backdrop-blur-sm dark:border-gray-700 dark:bg-gray-800',
    },
  },
  modal: {
    root: {
      base:
        'fixed top-0 right-0 left-0 z-50 h-modal h-screen overflow-y-auto overflow-x-hidden md:inset-0 md:h-full',
      show: 'flex bg-gray-900 bg-opacity-50 backdrop-blur-sm dark:bg-opacity-80',
      hidden: 'hidden',
    },
    content: {
      base: 'relative h-full w-full p-4 md:h-auto',
      inner:
        'relative rounded-xl bg-white shadow dark:bg-gray-800 flex flex-col max-h-[90vh]',
    },
  },
};

function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simular carga de la aplicación
    const timer = setTimeout(() => setLoading(false), 800);
    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-gradient-to-r from-blue-50 to-indigo-50">
        <div className="text-center">
          <div className="w-20 h-20 mx-auto mb-4 border-t-4 border-b-4 border-blue-600 rounded-full animate-spin"></div>
          <h2 className="text-xl font-semibold text-blue-800">
            Cargando Formularios Santa Rosa
          </h2>
        </div>
      </div>
    );
  }

  return (
    <AppThemeProvider>
      <FlowbiteThemeProvider theme={customTheme}>
        <FormDataProvider initialShowDeleteModal={false}>
          <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
            <Navbar />
            <div className="container mx-auto px-4 py-8">
              <Routes>
                <Route path="/" element={<FormularioDigital />} />
                <Route path="/respuestas" element={<VerRespuestas />} />
                <Route path="/respuestas/:id" element={<DetalleFormulario />} />
                <Route path="/estadisticas" element={<Estadisticas />} />
              </Routes>
            </div>
          </div>
        </FormDataProvider>
      </FlowbiteThemeProvider>
    </AppThemeProvider>
  );
}

export default App;
