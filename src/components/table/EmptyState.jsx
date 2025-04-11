// Archivo: src/components/table/EmptyState.jsx
import { Button } from 'flowbite-react';
import { HiDocumentAdd } from 'react-icons/hi';
import { useNavigate } from 'react-router-dom';

function EmptyState() {
  const navigate = useNavigate();
  
  return (
    <div className="p-10 text-center">
      <div className="mb-4 flex justify-center">
        <div className="p-4 bg-blue-50 dark:bg-blue-900/30 rounded-full">
          <HiDocumentAdd className="w-16 h-16 text-blue-500 dark:text-blue-400" />
        </div>
      </div>
      <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-2">
        No hay formularios guardados
      </h3>
      <p className="text-gray-500 dark:text-gray-400 mb-6 max-w-md mx-auto">
        Complete un formulario para que aparezca en esta lista. Podrá consultarlos, editarlos y gestionarlos desde aquí.
      </p>
      <Button
        color="primary"
        onClick={() => navigate('/')}
        size="lg"
        className="px-6"
      >
        <HiDocumentAdd className="mr-2 h-5 w-5" />
        Crear nuevo formulario
      </Button>
    </div>
  );
}

export default EmptyState;