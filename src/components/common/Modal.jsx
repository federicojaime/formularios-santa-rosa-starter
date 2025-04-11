// src/components/common/Modal.jsx
import React from 'react';
import { createPortal } from 'react-dom';
import { HiX } from 'react-icons/hi';

function Modal({ isOpen, onClose, title, children, footer }) {
  if (!isOpen) return null;
  
  // Crear portal para renderizar el modal fuera de la jerarquía del DOM
  return createPortal(
    <div className="fixed inset-0 z-50 overflow-y-auto bg-gray-900 bg-opacity-50 dark:bg-opacity-80 flex items-center justify-center">
      <div className="relative bg-white dark:bg-gray-800 rounded-xl shadow-xl p-6 m-4 max-w-md w-full">
        {/* Header */}
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold text-gray-800 dark:text-white">{title}</h3>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
          >
            <HiX className="w-5 h-5" />
          </button>
        </div>
        
        {/* Body */}
        <div className="mb-6">{children}</div>
        
        {/* Footer */}
        {footer && <div className="mt-4">{footer}</div>}
      </div>
    </div>,
    document.body
  );
}

export default Modal;