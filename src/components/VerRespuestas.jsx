// Archivo: src/components/VerRespuestas.jsx
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Card, 
  Table, 
  Button, 
  Badge, 
  TextInput, 
  Modal,
  Alert
} from 'flowbite-react';
import { 
  HiOutlineSearch, 
  HiEye, 
  HiPencil, 
  HiTrash, 
  HiDocumentDuplicate,
  HiExclamation
} from 'react-icons/hi';
import { useFormData } from '../contexts/FormDataContext';

function VerRespuestas() {
  const { allForms, loadForm, deleteForm, deleteAllForms } = useFormData();
  const [searchTerm, setSearchTerm] = useState('');
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [formToDelete, setFormToDelete] = useState(null);
  const [showDeleteAllModal, setShowDeleteAllModal] = useState(false);
  
  const navigate = useNavigate();

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const filteredForms = allForms.filter(form => {
    const searchLower = searchTerm.toLowerCase();
    const nombre = (form.datos.nombre || '').toLowerCase();
    const apellido = (form.datos.apellido || '').toLowerCase();
    const dni = (form.datos.dni || '').toLowerCase();
    
    return nombre.includes(searchLower) || 
           apellido.includes(searchLower) || 
           dni.includes(searchLower);
  });

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

  return (
    <div className="max-w-6xl mx-auto">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">Respuestas Guardadas</h1>
        <p className="text-gray-600">Consulte y gestione todos los formularios completados.</p>
      </div>

      <Card>
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-4">
          <div className="relative w-full md:w-1/3">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <HiOutlineSearch className="w-5 h-5 text-gray-500" />
            </div>
            <TextInput
              type="search"
              value={searchTerm}
              onChange={handleSearch}
              placeholder="Buscar por nombre, apellido o DNI..."
              className="pl-10"
            />
          </div>
          
          {allForms.length > 0 && (
            <Button color="failure" onClick={confirmDeleteAll}>
              <HiTrash className="mr-2 h-5 w-5" />
              Eliminar todos
            </Button>
          )}
        </div>

        {allForms.length === 0 ? (
          <Alert color="info">
            No hay formularios guardados. Complete un formulario para ver los resultados aquí.
          </Alert>
        ) : filteredForms.length === 0 ? (
          <Alert color="warning">
            No se encontraron resultados para la búsqueda "{searchTerm}".
          </Alert>
        ) : (
          <Table hoverable>
            <Table.Head>
              <Table.HeadCell>Fecha</Table.HeadCell>
              <Table.HeadCell>Nombre y Apellido</Table.HeadCell>
              <Table.HeadCell>DNI</Table.HeadCell>
              <Table.HeadCell>Tipo de Vivienda</Table.HeadCell>
              <Table.HeadCell>Modalidad</Table.HeadCell>
              <Table.HeadCell>Acciones</Table.HeadCell>
            </Table.Head>
            <Table.Body className="divide-y">
              {filteredForms.map((form) => (
                <Table.Row key={form.id} className="bg-white dark:border-gray-700 dark:bg-gray-800">
                  <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                    {formatDate(form.fecha)}
                  </Table.Cell>
                  <Table.Cell>
                    {form.datos.nombre} {form.datos.apellido}
                  </Table.Cell>
                  <Table.Cell>{form.datos.dni}</Table.Cell>
                  <Table.Cell>
                    {form.datos.tipoVivienda ? (
                      <Badge color="info">{form.datos.tipoVivienda}</Badge>
                    ) : (
                      <Badge color="gray">No especificado</Badge>
                    )}
                  </Table.Cell>
                  <Table.Cell>
                    {form.datos.modalidad ? (
                      <Badge color="success">{form.datos.modalidad}</Badge>
                    ) : (
                      <Badge color="gray">No especificado</Badge>
                    )}
                  </Table.Cell>
                  <Table.Cell>
                    <div className="flex items-center space-x-2">
                      <Button 
                        size="xs"
                        color="info"
                        onClick={() => handleView(form.id)}
                      >
                        <HiEye className="h-4 w-4" />
                      </Button>
                      <Button 
                        size="xs"
                        color="success"
                        onClick={() => handleEdit(form.id)}
                      >
                        <HiPencil className="h-4 w-4" />
                      </Button>
                      <Button 
                        size="xs"
                        color="failure"
                        onClick={() => confirmDelete(form.id)}
                      >
                        <HiTrash className="h-4 w-4" />
                      </Button>
                    </div>
                  </Table.Cell>
                </Table.Row>
              ))}
            </Table.Body>
          </Table>
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
    </div>
  );
}

export default VerRespuestas;