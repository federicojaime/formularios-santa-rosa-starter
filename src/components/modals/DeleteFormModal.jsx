// Archivo: src/components/modals/DeleteFormModal.jsx
import { Button, Modal } from 'flowbite-react';
import { HiExclamation } from 'react-icons/hi';

function DeleteFormModal({ isVisible, onClose, onConfirm }) {
  return (
    <Modal
      show={isVisible}
      onClose={onClose}
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
              onClick={onConfirm}
            >
              Sí, eliminar
            </Button>
            <Button
              color="gray"
              onClick={onClose}
            >
              No, cancelar
            </Button>
          </div>
        </div>
      </Modal.Body>
    </Modal>
  );
}

export default DeleteFormModal;