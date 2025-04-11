// Archivo: src/components/modals/DeleteAllFormsModal.jsx
import { Button, Modal } from 'flowbite-react';
import { HiExclamation } from 'react-icons/hi';

function DeleteAllFormsModal({ isVisible, onClose, onConfirm }) {
  return (
    <Modal
      show={isVisible}
      onClose={onClose}
      size="md"
    >
      <Modal.Header>
        <div className="flex items-center">
          <HiExclamation className="h-6 w-6 text-red-500 mr-2" />
          <span>Eliminar todos los formularios</span>
        </div>
      </Modal.Header>
      <Modal.Body>
        <div className="space-y-4">
          <p className="text-gray-700 dark:text-gray-300">
            ¿Está seguro de que desea eliminar <span className="font-bold">TODOS</span> los
            formularios guardados? Esta acción no se puede deshacer.
          </p>
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button
          color="failure"
          onClick={onConfirm}
        >
          Sí, eliminar todos
        </Button>
        <Button
          color="gray"
          onClick={onClose}
        >
          Cancelar
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default DeleteAllFormsModal;