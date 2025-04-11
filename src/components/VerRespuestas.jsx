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
  HiExclamation,
  HiFilter,
  HiOutlineSortAscending,
  HiOutlineSortDescending,
  HiDotsVertical,
  HiDocumentAdd
} from 'react-icons/hi';
import { useFormData } from '../contexts/FormDataContext';
import { motion, AnimatePresence } from 'framer-motion';

function VerRespuestas() {
  const { allForms, loadForm, deleteForm, deleteAllForms } = useFormData();
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

  // Cerrar automáticamente el modal si ya no hay formularios
  useEffect(() => {
    if (showDeleteAllModal && allForms.length === 0) {
      setShowDeleteAllModal(false);
    }
  }, [allForms, showDeleteAllModal]);

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

  // Función para manejar la ordenación
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
    return sortDirection === 'asc' ? compareA > compareB ? 1 : -1 : compareA < compareB ? 1 : -1;
  });

  // Paginación
  const indexOfLastForm = currentPage * formsPerPage;
  const indexOfFirstForm = indexOfLastForm - formsPerPage;
  const currentForms = sortedForms.slice(indexOfFirstForm, indexOfLastForm);
  const totalPages = Math.ceil(sortedForms.length / formsPerPage);

  // Acciones de formularios
  const handleView = (id) => navigate(`/respuestas/${id}`);
  const handleEdit = (id) => loadForm(id) && navigate('/');
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

  return (
    <motion.div
      className="max-w-6xl mx-auto"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      <div className="mb-6">
        <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-500 dark:to-indigo-400 bg-clip-text text-transparent mb-2">
          Respuestas Guardadas
        </h1>
        <p className="text-gray-600 dark:text-gray-300">
          Consulte y gestione todos los formularios completados.
        </p>
      </div>

      <Card className="mb-6 border border-gray-200 dark:border-gray-700 shadow-xl rounded-xl overflow-hidden">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
          {/* Búsqueda */}
          <div className="relative w-full md:w-1/3">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <HiOutlineSearch className="w-5 h-5 text-gray-500 dark:text-gray-400" />
            </div>
            <TextInput
              type="search"
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setCurrentPage(1);
              }}
              placeholder="Buscar por nombre, apellido o DNI..."
              className="pl-10"
            />
          </div>

          {/* Filtros */}
          <div className="flex flex-wrap items-center gap-2">
            <Select
              id="filterType"
              value={filterType}
              onChange={(e) => {
                setFilterType(e.target.value);
                setCurrentPage(1);
              }}
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
              onClick={() => {
                setSearchTerm('');
                setFilterType('all');
                setSortField('fecha');
                setSortDirection('desc');
                setCurrentPage(1);
              }}
              title="Limpiar filtros"
            >
              <HiFilter className="mr-2 h-4 w-4" />
              Limpiar
            </Button>

            {allForms.length > 0 && (
              <Button
                color="failure"
                size="sm"
                onClick={() => setShowDeleteAllModal(true)}
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

        {/* Estado sin formularios */}
        {allForms.length === 0 ? (
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
        ) : filteredForms.length === 0 ? (
          <Alert color="warning" className="bg-yellow-50 dark:bg-yellow-900/30">
            <div className="flex items-center gap-3">
              <HiExclamation className="h-6 w-6 text-yellow-500 dark:text-yellow-400" />
              <span>No se encontraron resultados para la búsqueda "<strong>{searchTerm}</strong>".</span>
            </div>
          </Alert>
        ) : (
          <>
            {/* Tabla de resultados */}
            <div className="overflow-x-auto">
              <Table hoverable>
                <Table.Head>
                  {/* Headers con ordenación */}
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
                <Table.Body className="divide-y">
                  <AnimatePresence>
                    {currentForms.map((form, index) => (
                      <motion.tr
                        key={form.id}
                        layoutId={form.id}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.3, delay: index * 0.05 }}
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
                              {form.datos.nombre || '—'} {form.datos.apellido || '—'}
                            </span>
                          </div>
                        </Table.Cell>
                        <Table.Cell>{form.datos.dni || '—'}</Table.Cell>
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
                          <div className="flex items-center justify-end gap-2">
                            {/* Acciones directas para pantallas medianas y grandes */}
                            <div className="hidden sm:flex gap-2">
                              <Button
                                color="info"
                                size="xs"
                                pill
                                onClick={() => handleView(form.id)}
                                title="Ver detalle"
                              >
                                <HiEye className="h-4 w-4" />
                              </Button>
                              <Button
                                color="warning"
                                size="xs"
                                pill
                                onClick={() => handleEdit(form.id)}
                                title="Editar"
                              >
                                <HiPencil className="h-4 w-4" />
                              </Button>
                              <Button
                                color="failure"
                                size="xs"
                                pill
                                onClick={() => confirmDelete(form.id)}
                                title="Eliminar"
                              >
                                <HiTrash className="h-4 w-4" />
                              </Button>
                            </div>

                            {/* Menú desplegable para pantallas pequeñas */}
                            <div className="sm:hidden">
                              <Dropdown
                                label=""
                                dismissOnClick={true}
                                renderTrigger={() => (
                                  <Button color="light" size="xs" pill>
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
                          </div>
                        </Table.Cell>
                      </motion.tr>
                    ))}
                  </AnimatePresence>
                </Table.Body>
              </Table>
            </div>

            {/* Paginación */}
            {totalPages > 1 && (
              <div className="flex justify-center mt-6">
                <Pagination
                  currentPage={currentPage}
                  totalPages={totalPages}
                  onPageChange={setCurrentPage}
                  showIcons
                  className="shadow-sm"
                />
              </div>
            )}

            {/* Contador de resultados */}
            <div className="text-sm text-gray-500 dark:text-gray-400 mt-4 text-center">
              Mostrando {indexOfFirstForm + 1}-{Math.min(indexOfLastForm, filteredForms.length)} de {filteredForms.length} {filteredForms.length === 1 ? 'resultado' : 'resultados'}
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

      {/* Modal para confirmar eliminación de todos los formularios */}
      <Modal
        show={showDeleteAllModal}
        onClose={() => setShowDeleteAllModal(false)}
        size="md"
      >
        <div className="bg-white dark:bg-gray-800 rounded-lg overflow-hidden shadow-xl">
          <div className="bg-red-50 dark:bg-red-900/30 p-4 border-b border-red-100 dark:border-red-800/50 flex items-center">
            <HiExclamation className="h-8 w-8 text-red-500 dark:text-red-400" />
            <h3 className="ml-3 text-lg font-semibold text-gray-800 dark:text-gray-100">
              Eliminar todos los formularios
            </h3>
            <button
              onClick={() => setShowDeleteAllModal(false)}
              className="ml-auto text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
              aria-label="Cerrar"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
              </svg>
            </button>
          </div>

          <div className="p-6">
            <p className="text-gray-700 dark:text-gray-300 text-base">
              ¿Está seguro de que desea eliminar <span className="font-bold">TODOS</span> los
              formularios guardados? Esta acción no se puede deshacer.
            </p>

            <div className="mt-6 flex justify-end gap-3">
              <Button
                color="gray"
                onClick={() => setShowDeleteAllModal(false)}
                className="px-4"
              >
                Cancelar
              </Button>
              <Button
                color="gray"
                onClick={() => {
                  deleteAllForms();
                  setShowDeleteAllModal(false);
                }}
                className="px-4"
              >
                Sí, eliminar todos
              </Button>
            </div>
          </div>
        </div>
      </Modal>
    </motion.div>
  );
}

export default VerRespuestas;