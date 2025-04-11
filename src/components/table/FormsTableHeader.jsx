// Archivo: src/components/table/FormsTableHeader.jsx
import { Table } from 'flowbite-react';
import { HiOutlineSortAscending, HiOutlineSortDescending } from 'react-icons/hi';

function FormsTableHeader({ sortField, sortDirection, handleSort }) {
  return (
    <Table.Head>
      <Table.HeadCell
        className="cursor-pointer"
        onClick={() => handleSort('fecha')}
      >
        <div className="flex items-center gap-1">
          Fecha
          {sortField === 'fecha' && (
            sortDirection === 'asc' ?
              <HiOutlineSortAscending className="ml-1 h-4 w-4" /> :
              <HiOutlineSortDescending className="ml-1 h-4 w-4" />
          )}
        </div>
      </Table.HeadCell>
      
      <Table.HeadCell
        className="cursor-pointer"
        onClick={() => handleSort('nombre')}
      >
        <div className="flex items-center gap-1">
          Nombre y Apellido
          {sortField === 'nombre' && (
            sortDirection === 'asc' ?
              <HiOutlineSortAscending className="ml-1 h-4 w-4" /> :
              <HiOutlineSortDescending className="ml-1 h-4 w-4" />
          )}
        </div>
      </Table.HeadCell>
      
      <Table.HeadCell
        className="cursor-pointer"
        onClick={() => handleSort('dni')}
      >
        <div className="flex items-center gap-1">
          DNI
          {sortField === 'dni' && (
            sortDirection === 'asc' ?
              <HiOutlineSortAscending className="ml-1 h-4 w-4" /> :
              <HiOutlineSortDescending className="ml-1 h-4 w-4" />
          )}
        </div>
      </Table.HeadCell>
      
      <Table.HeadCell
        className="cursor-pointer"
        onClick={() => handleSort('tipoVivienda')}
      >
        <div className="flex items-center gap-1">
          Tipo de Vivienda
          {sortField === 'tipoVivienda' && (
            sortDirection === 'asc' ?
              <HiOutlineSortAscending className="ml-1 h-4 w-4" /> :
              <HiOutlineSortDescending className="ml-1 h-4 w-4" />
          )}
        </div>
      </Table.HeadCell>
      
      <Table.HeadCell
        className="cursor-pointer"
        onClick={() => handleSort('modalidad')}
      >
        <div className="flex items-center gap-1">
          Modalidad
          {sortField === 'modalidad' && (
            sortDirection === 'asc' ?
              <HiOutlineSortAscending className="ml-1 h-4 w-4" /> :
              <HiOutlineSortDescending className="ml-1 h-4 w-4" />
          )}
        </div>
      </Table.HeadCell>
      
      <Table.HeadCell>
        <span className="sr-only">Acciones</span>
      </Table.HeadCell>
    </Table.Head>
  );
}

export default FormsTableHeader;