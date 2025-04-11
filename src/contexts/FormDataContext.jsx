// Archivo: src/contexts/FormDataContext.jsx
import { createContext, useContext, useState, useEffect } from 'react';

const FormDataContext = createContext();

export const useFormData = () => useContext(FormDataContext);

export const FormDataProvider = ({ children, initialShowDeleteModal = false }) => {
    // Estado para almacenar todos los formularios
    const [allForms, setAllForms] = useState(() => {
        const savedForms = localStorage.getItem('santaRosaForms');
        return savedForms ? JSON.parse(savedForms) : [];
    });

    // Estado para el formulario actual
    const [currentForm, setCurrentForm] = useState(() => {
        const savedForm = localStorage.getItem('currentForm');
        return savedForm ? JSON.parse(savedForm) : {
            id: Date.now().toString(),
            fecha: new Date().toISOString(),
            datos: {}
        };
    });
    
    // Estado para controlar el modal de eliminación
    const [showDeleteAllModal, setShowDeleteAllModal] = useState(initialShowDeleteModal);

    // Guardar formularios en localStorage cuando cambian
    useEffect(() => {
        localStorage.setItem('santaRosaForms', JSON.stringify(allForms));
    }, [allForms]);

    // Guardar formulario actual en localStorage
    useEffect(() => {
        localStorage.setItem('currentForm', JSON.stringify(currentForm));
    }, [currentForm]);

    // Asegurarse de que el modal se cierre si no hay formularios
    useEffect(() => {
        if (allForms.length === 0) {
            setShowDeleteAllModal(false);
        }
    }, [allForms]);

    // Actualizar datos del formulario actual
    const updateCurrentForm = (data) => {
        setCurrentForm(prev => ({
            ...prev,
            datos: {
                ...prev.datos,
                ...data
            }
        }));
    };

    // Guardar formulario actual en la lista de todos los formularios
    const saveCurrentForm = () => {
        // Verificar si el formulario ya existe en la lista
        const formIndex = allForms.findIndex(form => form.id === currentForm.id);

        if (formIndex >= 0) {
            // Actualizar formulario existente
            const updatedForms = [...allForms];
            updatedForms[formIndex] = currentForm;
            setAllForms(updatedForms);
        } else {
            // Añadir nuevo formulario
            setAllForms(prev => [...prev, currentForm]);
        }

        return currentForm.id;
    };

    // Crear un nuevo formulario
    const createNewForm = () => {
        const newForm = {
            id: Date.now().toString(),
            fecha: new Date().toISOString(),
            datos: {}
        };
        setCurrentForm(newForm);
        return newForm.id;
    };

    // Obtener un formulario por su ID
    const getFormById = (id) => {
        return allForms.find(form => form.id === id);
    };

    // Cargar un formulario existente como el actual
    const loadForm = (id) => {
        const form = getFormById(id);
        if (form) {
            setCurrentForm(form);
            return true;
        }
        return false;
    };

    // Eliminar un formulario
    const deleteForm = (id) => {
        setAllForms(prev => prev.filter(form => form.id !== id));
        if (currentForm.id === id) {
            createNewForm();
        }
    };

    // Eliminar todos los formularios
    const deleteAllForms = () => {
        setAllForms([]);
        createNewForm();
        setShowDeleteAllModal(false); // Cerrar el modal después de eliminar
    };

    const value = {
        allForms,
        currentForm,
        updateCurrentForm,
        saveCurrentForm,
        createNewForm,
        getFormById,
        loadForm,
        deleteForm,
        deleteAllForms,
        showDeleteAllModal,
        setShowDeleteAllModal
    };

    return (
        <FormDataContext.Provider value={value}>
            {children}
        </FormDataContext.Provider>
    );
};