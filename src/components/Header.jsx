// Archivo: src/components/Header.jsx
import React from 'react';

function Header() {
  return (
    <header className="header">
      <div className="logo">
        <img src="/logo-santa-rosa.png" alt="Logo Santa Rosa" />
        <h1>Sistema de Formularios Digitales</h1>
      </div>
      <p>Municipalidad de Santa Rosa</p>
    </header>
  );
}

export default Header;