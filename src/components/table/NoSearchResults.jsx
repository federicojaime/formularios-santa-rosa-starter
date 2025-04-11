// Archivo: src/components/table/NoSearchResults.jsx
import { Alert } from 'flowbite-react';
import { HiExclamation } from 'react-icons/hi';

function NoSearchResults({ searchTerm }) {
  return (
    <Alert color="warning" className="bg-yellow-50 dark:bg-yellow-900/30">
      <div className="flex items-center gap-3">
        <HiExclamation className="h-6 w-6 text-yellow-500 dark:text-yellow-400" />
        <span>No se encontraron resultados para la búsqueda "<strong>{searchTerm}</strong>".</span>
      </div>
    </Alert>
  );
}

export default NoSearchResults;