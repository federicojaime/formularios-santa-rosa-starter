// Archivo: src/App.jsx
import { useState, useEffect } from 'react'
import { Routes, Route } from 'react-router-dom'
import { Flowbite } from 'flowbite-react'
import Navbar from './components/Navbar'
import FormularioDigital from './components/FormularioDigital'
import VerRespuestas from './components/VerRespuestas'
import DetalleFormulario from './components/DetalleFormulario'
import Estadisticas from './components/Estadisticas'
import { FormDataProvider } from './contexts/FormDataContext'

function App() {
  return (
    <Flowbite>
      <FormDataProvider>
        <div className="min-h-screen bg-gray-50">
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
    </Flowbite>
  )
}

export default App