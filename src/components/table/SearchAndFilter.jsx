// Archivo: src/components/table/SearchAndFilter.jsx
import { TextInput, Select, Button } from 'flowbite-react';
import { HiOutlineSearch, HiFilter, HiTrash } from 'react-icons/hi';

function SearchAndFilter({ 
  searchTerm, 
  setSearchTerm, 
  filterType, 
  setFilterType, 
  resetFilters, 
  hasData,
  onDeleteAll 
}) {
  return (
    <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
      {/* Búsqueda */}
      <div className="relative w-full md:w-1/3">
        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
          <HiOutlineSearch className="w-5 h-5 text-gray-500 dark:text-gray-400" />
        </div>
        <TextInput
          type="search"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Buscar por nombre, apellido o DNI..."
          className="pl-10"
        />
      </div>

      {/* Filtros */}
      <div className="flex flex-wrap items-center gap-2">
        <Select
          id="filterType"
          value={filterType}
          onChange={(e) => setFilterType(e.target.value)}
          className="w-44"
        >
          <option value="all">Todos los tipos</option>
          <option value="Casa">Casa</option>
          <option value="Departamento">Departamento</option>
          <option value="Habitación">Habitación</option>
          <option value="Otro">Otro</option>
        </Select>

        <Button
          color="light"
          size="sm"
          onClick={resetFilters}
          title="Limpiar filtros"
        >
          <HiFilter className="mr-2 h-4 w-4" />
          Limpiar
        </Button>

        {hasData && (
          <Button
            color="failure"
            size="sm"
            onClick={onDeleteAll}
            title="Eliminar todos los registros"
            className="transition-all hover:bg-red-700 hover:shadow-md flex items-center"
            pill
          >
            <HiTrash className="mr-2 h-4 w-4" />
            Eliminar todos
          </Button>
        )}
      </div>
    </div>
  );
}

export default SearchAndFilter;
