// Archivo: src/components/VerRespuestas.jsx
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Card, 
  Table, 
  Button, 
  Badge, 
  TextInput, 
  Modal,
  Alert,
  Select,
  Avatar,
  Dropdown,
  Pagination
} from 'flowbite-react';
import { 
  HiOutlineSearch, 
  HiEye, 
  HiPencil, 
  HiTrash, 
  HiDocumentDuplicate,
  HiExclamation,
  HiFilter,
  HiDownload,
  HiOutlineSortAscending,
  HiOutlineSortDescending,
  HiDotsVertical
} from 'react-icons/hi';
import { useFormData } from '../contexts/FormDataContext';
import { motion } from 'framer-motion';
import { useTheme } from '../contexts/ThemeContext';

function VerRespuestas() {
  const { allForms, loadForm, deleteForm, deleteAllForms } = useFormData();
  const { isDark } = useTheme();
  const [searchTerm, setSearchTerm] = useState('');
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [formToDelete, setFormToDelete] = useState(null);
  const [showDeleteAllModal, setShowDeleteAllModal] = useState(false);
  const [filterType, setFilterType] = useState('all');
  const [sortField, setSortField] = useState('fecha');
  const [sortDirection, setSortDirection] = useState('desc');
  const [currentPage, setCurrentPage] = useState(1);
  const [formsPerPage] = useState(10);
  
  const navigate = useNavigate();

  // Controlar búsqueda
  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1); // Resetear a primera página al buscar
  };

  // Filtrar formularios según criterios
  const filteredForms = allForms.filter(form => {
    // Filtro por búsqueda
    const searchLower = searchTerm.toLowerCase();
    const nombre = (form.datos.nombre || '').toLowerCase();
    const apellido = (form.datos.apellido || '').toLowerCase();
    const dni = (form.datos.dni || '').toLowerCase();
    
    const matchesSearch = nombre.includes(searchLower) || 
                         apellido.includes(searchLower) || 
                         dni.includes(searchLower);
                         
    // Filtro por tipo
    if (filterType === 'all') return matchesSearch;
    
    return matchesSearch && form.datos.tipoVivienda === filterType;
  });
  
  // Ordenar formularios
  const sortedForms = [...filteredForms].sort((a, b) => {
    let compareA, compareB;
    
    // Determinar campo de ordenación
    switch (sortField) {
      case 'nombre':
        compareA = `${a.datos.nombre || ''} ${a.datos.apellido || ''}`.toLowerCase();
        compareB = `${b.datos.nombre || ''} ${b.datos.apellido || ''}`.toLowerCase();
        break;
      case 'dni':
        compareA = (a.datos.dni || '').toLowerCase();
        compareB = (b.datos.dni || '').toLowerCase();
        break;
      case 'tipoVivienda':
        compareA = (a.datos.tipoVivienda || '').toLowerCase();
        compareB = (b.datos.tipoVivienda || '').toLowerCase();
        break;
      case 'modalidad':
        compareA = (a.datos.modalidad || '').toLowerCase();
        compareB = (b.datos.modalidad || '').toLowerCase();
        break;
      case 'fecha':
      default:
        compareA = new Date(a.fecha).getTime();
        compareB = new Date(b.fecha).getTime();
        break;
    }
    
    // Aplicar dirección de ordenación
    if (sortDirection === 'asc') {
      return compareA > compareB ? 1 : -1;
    } else {
      return compareA < compareB ? 1 : -1;
    }
  });
  
  // Paginación
  const indexOfLastForm = currentPage * formsPerPage;
  const indexOfFirstForm = indexOfLastForm - formsPerPage;
  const currentForms = sortedForms.slice(indexOfFirstForm, indexOfLastForm);
  const totalPages = Math.ceil(sortedForms.length / formsPerPage);
  
  // Cambiar página
  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  // Acciones de formularios
  const handleView = (id) => {
    navigate(`/respuestas/${id}`);
  };

  const handleEdit = (id) => {
    if (loadForm(id)) {
      navigate('/');
    }
  };

  const confirmDelete = (id) => {
    setFormToDelete(id);
    setShowDeleteModal(true);
  };

  const handleDelete = () => {
    if (formToDelete) {
      deleteForm(formToDelete);
      setShowDeleteModal(false);
      setFormToDelete(null);
    }
  };

  const confirmDeleteAll = () => {
    setShowDeleteAllModal(true);
  };

  const handleDeleteAll = () => {
    deleteAllForms();
    setShowDeleteAllModal(false);
  };
  
  // Cambiar ordenación
  const handleSort = (field) => {
    if (sortField === field) {
      // Si ya estamos ordenando por este campo, cambiar dirección
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      // Nuevo campo de ordenación
      setSortField(field);
      setSortDirection('asc');
    }
  };

  // Formatear fecha
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('es-AR', {
      day: '2-digit', 
      month: '2-digit', 
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }).format(date);
  };
  
  // Generar iniciales para avatar
  const getInitials = (nombre, apellido) => {
    if (!nombre && !apellido) return "??";
    
    const firstLetter = nombre ? nombre.charAt(0).toUpperCase() : "";
    const secondLetter = apellido ? apellido.charAt(0).toUpperCase() : "";
    
    return `${firstLetter}${secondLetter}`;
  };
  
  // Obtener color de avatar basado en ID
  const getAvatarColor = (id) => {
    const colors = ["blue", "green", "red", "purple", "pink", "yellow"];
    const hash = id.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
    return colors[hash % colors.length];
  };
  
  // Animación de la página
  const pageVariants = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0, transition: { duration: 0.4 } },
    exit: { opacity: 0, y: -20, transition: { duration: 0.3 } }
  };
  
  // Animación de elementos de la lista
  const listItemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.05,
        duration: 0.3
      }
    })
  };

  return (
    <motion.div 
      className="max-w-6xl mx-auto"
      initial="initial"
      animate="animate"
      exit="exit"
      variants={pageVariants}
    >
      <div className="mb-6">
        <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-700 to-indigo-700 dark:from-blue-500 dark:to-indigo-400 bg-clip-text text-transparent mb-2">Respuestas Guardadas</h1>
        <p className="text-gray-600 dark:text-gray-300">Consulte y gestione todos los formularios completados.</p>
      </div>

      <Card className="mb-6 border border-gray-200 dark:border-gray-700 shadow-lg">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
          <div className="relative w-full md:w-1/3">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <HiOutlineSearch className="w-5 h-5 text-gray-500 dark:text-gray-400" />
            </div>
            <TextInput
              type="search"
              value={searchTerm}
              onChange={handleSearch}
              placeholder="Buscar por nombre, apellido o DNI..."
              className="pl-10"
            />
          </div>
          
          <div className="flex flex-wrap items-center gap-2">
            <div className="flex items-center gap-2">
              <Select 
                id="filterType" 
                value={filterType}
                onChange={(e) => {
                  setFilterType(e.target.value);
                  setCurrentPage(1); // Resetear página al filtrar
                }}
                className="w-40"
              >
                <option value="all">Todos los tipos</option>
                <option value="Casa">Casa</option>
                <option value="Departamento">Departamento</option>
                <option value="Habitación">Habitación</option>
                <option value="Otro">Otro</option>
              </Select>
              
              <Button color="light" size="sm" onClick={() => {
                setSearchTerm('');
                setFilterType('all');
                setSortField('fecha');
                setSortDirection('desc');
                setCurrentPage(1);
              }}>
                <HiFilter className="mr-2 h-4 w-4" />
                Limpiar
              </Button>
            </div>
            
            {allForms.length > 0 && (
              <Button color="failure" size="sm" onClick={confirmDeleteAll}>
                <HiTrash className="mr-2 h-4 w-4" />
                Eliminar todos
              </Button>
            )}
          </div>
        </div>

        {allForms.length === 0 ? (
          <div className="p-8 text-center">
            <div className="mb-4 text-gray-400 dark:text-gray-500">
              <svg className="w-16 h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
              </svg>
            </div>
            <h3 className="text-xl font-medium text-gray-700 dark:text-gray-300 mb-2">No hay formularios guardados</h3>
            <p className="text-gray-500 dark:text-gray-400 mb-4">Complete un formulario para ver los resultados aquí.</p>
            <Button color="primary" onClick={() => navigate('/')}>
              Crear nuevo formulario
            </Button>
          </div>
        ) : filteredForms.length === 0 ? (
          <Alert color="warning" className="bg-yellow-50 dark:bg-yellow-900/30">
            <div className="flex items-center gap-3">
              <HiExclamation className="h-6 w-6 text-yellow-500 dark:text-yellow-400" />
              <span>No se encontraron resultados para la búsqueda "<strong>{searchTerm}</strong>".</span>
            </div>
          </Alert>
        ) : (
          <>
            <div className="overflow-x-auto">
              <Table hoverable>
                <Table.Head>
                  <Table.HeadCell className="cursor-pointer" onClick={() => handleSort('fecha')}>
                    <div className="flex items-center gap-1">
                      Fecha
                      {sortField === 'fecha' && (
                        sortDirection === 'asc' ? 
                          <HiOutlineSortAscending className="ml-1 h-4 w-4" /> : 
                          <HiOutlineSortDescending className="ml-1 h-4 w-4" />
                      )}
                    </div>
                  </Table.HeadCell>
                  <Table.HeadCell className="cursor-pointer" onClick={() => handleSort('nombre')}>
                    <div className="flex items-center gap-1">
                      Nombre y Apellido
                      {sortField === 'nombre' && (
                        sortDirection === 'asc' ? 
                          <HiOutlineSortAscending className="ml-1 h-4 w-4" /> : 
                          <HiOutlineSortDescending className="ml-1 h-4 w-4" />
                      )}
                    </div>
                  </Table.HeadCell>
                  <Table.HeadCell className="cursor-pointer" onClick={() => handleSort('dni')}>
                    <div className="flex items-center gap-1">
                      DNI
                      {sortField === 'dni' && (
                        sortDirection === 'asc' ? 
                          <HiOutlineSortAscending className="ml-1 h-4 w-4" /> : 
                          <HiOutlineSortDescending className="ml-1 h-4 w-4" />
                      )}
                    </div>
                  </Table.HeadCell>
                  <Table.HeadCell className="cursor-pointer" onClick={() => handleSort('tipoVivienda')}>
                    <div className="flex items-center gap-1">
                      Tipo de Vivienda
                      {sortField === 'tipoVivienda' && (
                        sortDirection === 'asc' ? 
                          <HiOutlineSortAscending className="ml-1 h-4 w-4" /> : 
                          <HiOutlineSortDescending className="ml-1 h-4 w-4" />
                      )}
                    </div>
                  </Table.HeadCell>
                  <Table.HeadCell className="cursor-pointer" onClick={() => handleSort('modalidad')}>
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
                <Table.Body className="divide-y">
                  {currentForms.map((form, index) => (
                    <motion.tr
                      key={form.id}
                      custom={index}
                      initial="hidden"
                      animate="visible"
                      variants={listItemVariants}
                      className="bg-white dark:border-gray-700 dark:bg-gray-800"
                    >
                      <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                        {formatDate(form.fecha)}
                      </Table.Cell>
                      <Table.Cell>
                        <div className="flex items-center space-x-3">
                          <Avatar 
                            size="xs" 
                            placeholderInitials={getInitials(form.datos.nombre, form.datos.apellido)} 
                            color={getAvatarColor(form.id)}
                            rounded
                          />
                          <span className="font-medium">
                            {form.datos.nombre} {form.datos.apellido}
                          </span>
                        </div>
                      </Table.Cell>
                      <Table.Cell>{form.datos.dni}</Table.Cell>
                      <Table.Cell>
                        {form.datos.tipoVivienda ? (
                          <Badge color="info" className="px-2.5 py-1 font-medium text-xs">
                            {form.datos.tipoVivienda}
                          </Badge>
                        ) : (
                          <Badge color="gray" className="px-2.5 py-1 font-medium text-xs">
                            No especificado
                          </Badge>
                        )}
                      </Table.Cell>
                      <Table.Cell>
                        {form.datos.modalidad ? (
                          <Badge 
                            color={
                              form.datos.modalidad === 'Construcción nueva' ? 'success' :
                              form.datos.modalidad === 'Refacción' ? 'purple' :
                              form.datos.modalidad === 'Ampliación' ? 'blue' :
                              form.datos.modalidad === 'Terminación' ? 'yellow' :
                              'indigo'
                            } 
                            className="px-2.5 py-1 font-medium text-xs"
                          >
                            {form.datos.modalidad}
                          </Badge>
                        ) : (
                          <Badge color="gray" className="px-2.5 py-1 font-medium text-xs">
                            No especificado
                          </Badge>
                        )}
                      </Table.Cell>
                      <Table.Cell>
                        <div className="flex items-center justify-end">
                          <Dropdown
                            label=""
                            dismissOnClick={true}
                            renderTrigger={() => (
                              <Button color="light" size="xs">
                                <HiDotsVertical className="h-4 w-4" />
                              </Button>
                            )}
                          >
                            <Dropdown.Item icon={HiEye} onClick={() => handleView(form.id)}>
                              Ver detalle
                            </Dropdown.Item>
                            <Dropdown.Item icon={HiPencil} onClick={() => handleEdit(form.id)}>
                              Editar
                            </Dropdown.Item>
                            <Dropdown.Divider />
                            <Dropdown.Item icon={HiTrash} onClick={() => confirmDelete(form.id)}>
                              Eliminar
                            </Dropdown.Item>
                          </Dropdown>
                        </div>
                      </Table.Cell>
                    </motion.tr>
                  ))}
                </Table.Body>
              </Table>
            </div>
            
            {/* Paginación */}
            {totalPages > 1 && (
              <div className="flex justify-center mt-4">
                <Pagination
                  currentPage={currentPage}
                  totalPages={totalPages}
                  onPageChange={handlePageChange}
                  showIcons
                />
              </div>
            )}
            
            {/* Contador de resultados */}
            <div className="text-sm text-gray-500 dark:text-gray-400 mt-4">
              Mostrando {indexOfFirstForm + 1}-{Math.min(indexOfLastForm, filteredForms.length)} de {filteredForms.length} resultados
            </div>
          </>
        )}
      </Card>

      {/* Modal para confirmar eliminación de un formulario */}
      <Modal
        show={showDeleteModal}
        onClose={() => setShowDeleteModal(false)}
        popup
        size="md"
      >
        <Modal.Header />
        <Modal.Body>
          <div className="text-center">
            <HiExclamation className="mx-auto mb-4 h-14 w-14 text-gray-400 dark:text-gray-200" />
            <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
              ¿Está seguro de que desea eliminar este formulario?
            </h3>
            <div className="flex justify-center gap-4">
              <Button
                color="failure"
                onClick={handleDelete}
              >
                Sí, eliminar
              </Button>
              <Button
                color="gray"
                onClick={() => setShowDeleteModal(false)}
              >
                No, cancelar
              </Button>
            </div>
          </div>
        </Modal.Body>
      </Modal>

      {/* Modal para confirmar eliminación de todos los formularios */}
      <Modal
        show={showDeleteAllModal}
        onClose={() => setShowDeleteAllModal(false)}
        popup
        size="md"
      >
        <Modal.Header />
        <Modal.Body>
          <div className="text-center">
            <HiExclamation className="mx-auto mb-4 h-14 w-14 text-gray-400 dark:text-gray-200" />
            <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
              ¿Está seguro de que desea eliminar TODOS los formularios guardados?
            </h3>
            <p className="mb-5 text-sm text-gray-500 dark:text-gray-400">
              Esta acción no se puede deshacer.
            </p>
            <div className="flex justify-center gap-4">
              <Button
                color="failure"
                onClick={handleDeleteAll}
              >
                Sí, eliminar todos
              </Button>
              <Button
                color="gray"
                onClick={() => setShowDeleteAllModal(false)}
              >
                No, cancelar
              </Button>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </motion.div>
  );
}

export default VerRespuestas;