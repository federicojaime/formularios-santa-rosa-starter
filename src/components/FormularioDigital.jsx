// Archivo: src/components/FormularioDigital.jsx
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Button, 
  Card, 
  Label, 
  TextInput, 
  Textarea, 
  Select, 
  Checkbox,
  Tabs,
  Toast,
  Progress,
  Badge
} from 'flowbite-react';
import { 
  HiCheck, 
  HiX, 
  HiOutlineSave, 
  HiPrinter, 
  HiDocumentAdd, 
  HiDocumentText, 
  HiUserCircle,
  HiBriefcase,
  HiHome,
  HiCube,
  HiCog,
  HiQuestionMarkCircle,
  HiArrowNarrowRight,
  HiArrowNarrowLeft
} from 'react-icons/hi';
import { useFormData } from '../contexts/FormDataContext';
import { useTheme } from '../contexts/ThemeContext';
import { motion } from 'framer-motion';

function FormularioDigital() {
  const { currentForm, updateCurrentForm, saveCurrentForm, createNewForm } = useFormData();
  const { isDark } = useTheme();
  const [activeTab, setActiveTab] = useState('datosPersonales');
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const [toastType, setToastType] = useState('success');
  const [completionPercentage, setCompletionPercentage] = useState(0);
  
  const navigate = useNavigate();

  // Calculando progreso del formulario
  useEffect(() => {
    // Campos obligatorios por sección
    const requiredFields = {
      datosPersonales: ['nombre', 'apellido', 'dni', 'direccion'],
      tipoVivienda: ['tipoVivienda', 'estadoVivienda'],
      modalidad: ['modalidad']
    };
    
    let completedFields = 0;
    let totalRequiredFields = 0;
    
    // Contar campos completados
    Object.keys(requiredFields).forEach(section => {
      requiredFields[section].forEach(field => {
        totalRequiredFields++;
        if (currentForm.datos[field]) {
          completedFields++;
        }
      });
    });
    
    // Calcular porcentaje
    const percentage = Math.round((completedFields / totalRequiredFields) * 100);
    setCompletionPercentage(percentage);
  }, [currentForm]);

  // Actualizamos el formulario dentro del objeto "datos"
  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    updateCurrentForm({
      datos: {
        ...currentForm.datos,
        [name]: type === 'checkbox' ? checked : value
      }
    });
  };

  const handleSave = () => {
    const formId = saveCurrentForm();
    setToastMessage('Formulario guardado correctamente');
    setToastType('success');
    setShowToast(true);
    setTimeout(() => {
      setShowToast(false);
    }, 3000);
  };

  const handleNew = () => {
    if (window.confirm('¿Estás seguro de crear un nuevo formulario? El actual quedará guardado.')) {
      const formId = saveCurrentForm(); // Guardar el actual antes de crear uno nuevo
      createNewForm();
      setToastMessage('Nuevo formulario creado');
      setToastType('success');
      setShowToast(true);
    }
  };

  const handlePrint = () => {
    const formId = saveCurrentForm();
    navigate(`/respuestas/${formId}?print=true`);
  };
  
  // Ayuda a navegar entre las pestañas
  const navigateToNextTab = () => {
    const tabs = ['datosPersonales', 'materialesInsumos', 'tipoVivienda', 'modalidad', 'otros', 'motivosConsulta'];
    const currentIndex = tabs.indexOf(activeTab);
    if (currentIndex < tabs.length - 1) {
      setActiveTab(tabs[currentIndex + 1]);
    }
  };
  
  const navigateToPreviousTab = () => {
    const tabs = ['datosPersonales', 'materialesInsumos', 'tipoVivienda', 'modalidad', 'otros', 'motivosConsulta'];
    const currentIndex = tabs.indexOf(activeTab);
    if (currentIndex > 0) {
      setActiveTab(tabs[currentIndex - 1]);
    }
  };

  // Obtener el color del progreso
  const getProgressColor = () => {
    if (completionPercentage < 30) return 'red';
    if (completionPercentage < 70) return 'yellow';
    return 'green';
  };

  // Animar componentes con framer-motion
  const pageVariants = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0, transition: { duration: 0.4 } },
    exit: { opacity: 0, y: -20, transition: { duration: 0.3 } }
  };

  return (
    <motion.div 
      className="max-w-5xl mx-auto"
      initial="initial"
      animate="animate"
      exit="exit"
      variants={pageVariants}
    >
      <div className="mb-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-700 to-indigo-700 dark:from-blue-500 dark:to-indigo-400 bg-clip-text text-transparent mb-2">
              Formulario Digital
            </h1>
            <p className="text-gray-600 dark:text-gray-300">
              Complete los datos del formulario para su registro.
            </p>
          </div>
          
          <div className="flex flex-col w-full md:w-auto items-end">
            <div className="flex items-center gap-2 w-full md:w-auto mb-2">
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                Progreso:
              </span>
              <div className="w-full md:w-48">
                <Progress
                  color={getProgressColor()}
                  progress={completionPercentage}
                  size="sm"
                  labelProgress
                  labelText
                />
              </div>
            </div>
            <Badge 
              color={completionPercentage === 100 ? "success" : "gray"}
              className="animate-pulse"
              size="sm"
            >
              {completionPercentage === 100 ? "Formulario completo" : "Formulario incompleto"}
            </Badge>
          </div>
        </div>
      </div>

      <Card className="mb-6 border border-gray-200 dark:border-gray-700 shadow-lg">
        <Tabs.Group 
          aria-label="Secciones del formulario" 
          style="underline"
          onActiveTabChange={(tab) => {
            const tabKeys = ['datosPersonales', 'materialesInsumos', 'tipoVivienda', 'modalidad', 'otros', 'motivosConsulta'];
            setActiveTab(tabKeys[tab]);
          }}
        >
          <Tabs.Item 
            active={activeTab === 'datosPersonales'} 
            title={
              <div className="flex items-center space-x-2">
                <HiUserCircle className="w-5 h-5" />
                <span>Datos Personales</span>
              </div>
            }
          >
            <div className="p-1">
              <div className="mb-4">
                <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-100 flex items-center">
                  <HiUserCircle className="mr-2 h-6 w-6 text-blue-600 dark:text-blue-400" />
                  Datos Personales
                </h2>
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                  Ingrese la información personal del solicitante
                </p>
              </div>
              
              <div className="grid md:grid-cols-2 gap-6">
                <div className="mb-4 group">
                  <Label htmlFor="nombre" value="Nombre" className="text-gray-700 dark:text-gray-300 group-focus-within:text-blue-600 transition-colors" />
                  <TextInput
                    id="nombre"
                    name="nombre"
                    value={currentForm.datos.nombre || ''}
                    onChange={handleInputChange}
                    placeholder="Ingrese el nombre"
                    className="mt-1 focus:border-blue-500 dark:bg-gray-800"
                    required
                  />
                </div>
                
                <div className="mb-4 group">
                  <Label htmlFor="apellido" value="Apellido" className="text-gray-700 dark:text-gray-300 group-focus-within:text-blue-600 transition-colors" />
                  <TextInput
                    id="apellido"
                    name="apellido"
                    value={currentForm.datos.apellido || ''}
                    onChange={handleInputChange}
                    placeholder="Ingrese el apellido"
                    className="mt-1 focus:border-blue-500 dark:bg-gray-800"
                    required
                  />
                </div>
                
                <div className="mb-4 group">
                  <Label htmlFor="dni" value="DNI" className="text-gray-700 dark:text-gray-300 group-focus-within:text-blue-600 transition-colors" />
                  <TextInput
                    id="dni"
                    name="dni"
                    value={currentForm.datos.dni || ''}
                    onChange={handleInputChange}
                    placeholder="Ingrese el DNI"
                    className="mt-1 focus:border-blue-500 dark:bg-gray-800"
                    required
                  />
                </div>
                
                <div className="mb-4 group">
                  <Label htmlFor="telefono" value="Teléfono" className="text-gray-700 dark:text-gray-300 group-focus-within:text-blue-600 transition-colors" />
                  <TextInput
                    id="telefono"
                    name="telefono"
                    type="tel"
                    value={currentForm.datos.telefono || ''}
                    onChange={handleInputChange}
                    placeholder="Ingrese el teléfono"
                    className="mt-1 focus:border-blue-500 dark:bg-gray-800"
                  />
                </div>
                
                <div className="md:col-span-2 mb-4 group">
                  <Label htmlFor="direccion" value="Dirección" className="text-gray-700 dark:text-gray-300 group-focus-within:text-blue-600 transition-colors" />
                  <TextInput
                    id="direccion"
                    name="direccion"
                    value={currentForm.datos.direccion || ''}
                    onChange={handleInputChange}
                    placeholder="Ingrese la dirección completa"
                    className="mt-1 focus:border-blue-500 dark:bg-gray-800"
                    required
                  />
                </div>
                
                <div className="mb-4 group">
                  <Label htmlFor="email" value="Email" className="text-gray-700 dark:text-gray-300 group-focus-within:text-blue-600 transition-colors" />
                  <TextInput
                    id="email"
                    name="email"
                    type="email"
                    value={currentForm.datos.email || ''}
                    onChange={handleInputChange}
                    placeholder="Ingrese el email"
                    className="mt-1 focus:border-blue-500 dark:bg-gray-800"
                  />
                </div>
                
                <div className="mb-4 group">
                  <Label htmlFor="cantidadPersonas" value="Cantidad de personas en el hogar" className="text-gray-700 dark:text-gray-300 group-focus-within:text-blue-600 transition-colors" />
                  <TextInput
                    id="cantidadPersonas"
                    name="cantidadPersonas"
                    type="number"
                    value={currentForm.datos.cantidadPersonas || ''}
                    onChange={handleInputChange}
                    placeholder="Ingrese la cantidad"
                    className="mt-1 focus:border-blue-500 dark:bg-gray-800"
                  />
                </div>
              </div>
            </div>
            
            <div className="flex justify-end mt-4">
              <Button color="primary" onClick={navigateToNextTab}>
                Siguiente 
                <HiArrowNarrowRight className="ml-2 h-5 w-5" />
              </Button>
            </div>
          </Tabs.Item>
          
          <Tabs.Item 
            active={activeTab === 'materialesInsumos'} 
            title={
              <div className="flex items-center space-x-2">
                <HiBriefcase className="w-5 h-5" />
                <span>Materiales</span>
              </div>
            }
          >
            <div className="p-1">
              <div className="mb-4">
                <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-100 flex items-center">
                  <HiBriefcase className="mr-2 h-6 w-6 text-blue-600 dark:text-blue-400" />
                  Materiales e Insumos
                </h2>
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                  Seleccione los materiales que necesita para su proyecto
                </p>
              </div>
              
              <div className="grid md:grid-cols-2 gap-6">
                <div className="md:col-span-2">
                  <fieldset className="border p-4 rounded-lg border-gray-200 dark:border-gray-700 bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm">
                    <legend className="text-sm font-medium text-gray-700 dark:text-gray-300 px-2">
                      Seleccione los materiales necesarios
                    </legend>
                    
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                      <div className="flex items-center gap-2">
                        <Checkbox
                          id="cemento"
                          name="cemento"
                          checked={currentForm.datos.cemento || false}
                          onChange={handleInputChange}
                          className="focus:ring-blue-500 h-4 w-4 text-blue-600"
                        />
                        <Label htmlFor="cemento" className="text-gray-700 dark:text-gray-300">
                          Cemento
                        </Label>
                      </div>
                      
                      <div className="flex items-center gap-2">
                        <Checkbox
                          id="ladrillos"
                          name="ladrillos"
                          checked={currentForm.datos.ladrillos || false}
                          onChange={handleInputChange}
                          className="focus:ring-blue-500 h-4 w-4 text-blue-600"
                        />
                        <Label htmlFor="ladrillos" className="text-gray-700 dark:text-gray-300">
                          Ladrillos
                        </Label>
                      </div>
                      
                      <div className="flex items-center gap-2">
                        <Checkbox
                          id="hierro"
                          name="hierro"
                          checked={currentForm.datos.hierro || false}
                          onChange={handleInputChange}
                          className="focus:ring-blue-500 h-4 w-4 text-blue-600"
                        />
                        <Label htmlFor="hierro" className="text-gray-700 dark:text-gray-300">
                          Hierro
                        </Label>
                      </div>
                      
                      <div className="flex items-center gap-2">
                        <Checkbox
                          id="arena"
                          name="arena"
                          checked={currentForm.datos.arena || false}
                          onChange={handleInputChange}
                          className="focus:ring-blue-500 h-4 w-4 text-blue-600"
                        />
                        <Label htmlFor="arena" className="text-gray-700 dark:text-gray-300">
                          Arena
                        </Label>
                      </div>
                      
                      <div className="flex items-center gap-2">
                        <Checkbox
                          id="canto"
                          name="canto"
                          checked={currentForm.datos.canto || false}
                          onChange={handleInputChange}
                          className="focus:ring-blue-500 h-4 w-4 text-blue-600"
                        />
                        <Label htmlFor="canto" className="text-gray-700 dark:text-gray-300">
                          Canto
                        </Label>
                      </div>
                      
                      <div className="flex items-center gap-2">
                        <Checkbox
                          id="ceramica"
                          name="ceramica"
                          checked={currentForm.datos.ceramica || false}
                          onChange={handleInputChange}
                          className="focus:ring-blue-500 h-4 w-4 text-blue-600"
                        />
                        <Label htmlFor="ceramica" className="text-gray-700 dark:text-gray-300">
                          Cerámica
                        </Label>
                      </div>
                      
                      <div className="flex items-center gap-2">
                        <Checkbox
                          id="pintura"
                          name="pintura"
                          checked={currentForm.datos.pintura || false}
                          onChange={handleInputChange}
                          className="focus:ring-blue-500 h-4 w-4 text-blue-600"
                        />
                        <Label htmlFor="pintura" className="text-gray-700 dark:text-gray-300">
                          Pintura
                        </Label>
                      </div>
                      
                      <div className="flex items-center gap-2">
                        <Checkbox
                          id="tuberias"
                          name="tuberias"
                          checked={currentForm.datos.tuberias || false}
                          onChange={handleInputChange}
                          className="focus:ring-blue-500 h-4 w-4 text-blue-600"
                        />
                        <Label htmlFor="tuberias" className="text-gray-700 dark:text-gray-300">
                          Tuberías
                        </Label>
                      </div>
                      
                      <div className="flex items-center gap-2">
                        <Checkbox
                          id="cableElectrico"
                          name="cableElectrico"
                          checked={currentForm.datos.cableElectrico || false}
                          onChange={handleInputChange}
                          className="focus:ring-blue-500 h-4 w-4 text-blue-600"
                        />
                        <Label htmlFor="cableElectrico" className="text-gray-700 dark:text-gray-300">
                          Cable Eléctrico
                        </Label>
                      </div>
                    </div>
                  </fieldset>
                </div>
                
                <div className="md:col-span-2 mb-4 group">
                  <Label htmlFor="otrosMateriales" value="Otros materiales requeridos" className="text-gray-700 dark:text-gray-300 group-focus-within:text-blue-600 transition-colors" />
                  <Textarea
                    id="otrosMateriales"
                    name="otrosMateriales"
                    value={currentForm.datos.otrosMateriales || ''}
                    onChange={handleInputChange}
                    rows={3}
                    placeholder="Describa otros materiales que necesita"
                    className="mt-1 focus:border-blue-500 dark:bg-gray-800"
                  />
                </div>
              </div>
            </div>
            
            <div className="flex justify-between mt-4">
              <Button color="light" onClick={navigateToPreviousTab}>
                <HiArrowNarrowLeft className="mr-2 h-5 w-5" />
                Anterior
              </Button>
              <Button color="primary" onClick={navigateToNextTab}>
                Siguiente
                <HiArrowNarrowRight className="ml-2 h-5 w-5" />
              </Button>
            </div>
          </Tabs.Item>
          
          <Tabs.Item 
            active={activeTab === 'tipoVivienda'} 
            title={
              <div className="flex items-center space-x-2">
                <HiHome className="w-5 h-5" />
                <span>Vivienda</span>
              </div>
            }
          >
            <div className="p-1">
              <div className="mb-4">
                <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-100 flex items-center">
                  <HiHome className="mr-2 h-6 w-6 text-blue-600 dark:text-blue-400" />
                  Tipo de Vivienda
                </h2>
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                  Información sobre la vivienda y sus servicios
                </p>
              </div>
              
              <div className="grid md:grid-cols-2 gap-6">
                <div className="mb-4 group">
                  <Label htmlFor="tipoVivienda" value="Tipo de vivienda" className="text-gray-700 dark:text-gray-300 group-focus-within:text-blue-600 transition-colors" />
                  <Select
                    id="tipoVivienda"
                    name="tipoVivienda"
                    value={currentForm.datos.tipoVivienda || ''}
                    onChange={handleInputChange}
                    className="mt-1 focus:border-blue-500 dark:bg-gray-800"
                    required
                  >
                    <option value="">Seleccione una opción</option>
                    <option value="Casa">Casa</option>
                    <option value="Departamento">Departamento</option>
                    <option value="Habitación">Habitación</option>
                    <option value="Otro">Otro</option>
                  </Select>
                </div>
                
                <div className="mb-4 group">
                  <Label htmlFor="estadoVivienda" value="Estado de la vivienda" className="text-gray-700 dark:text-gray-300 group-focus-within:text-blue-600 transition-colors" />
                  <Select
                    id="estadoVivienda"
                    name="estadoVivienda"
                    value={currentForm.datos.estadoVivienda || ''}
                    onChange={handleInputChange}
                    className="mt-1 focus:border-blue-500 dark:bg-gray-800"
                    required
                  >
                    <option value="">Seleccione una opción</option>
                    <option value="Muy bueno">Muy bueno</option>
                    <option value="Bueno">Bueno</option>
                    <option value="Regular">Regular</option>
                    <option value="Malo">Malo</option>
                    <option value="Muy malo">Muy malo</option>
                  </Select>
                </div>
                
                <div className="mb-4 group">
                  <Label htmlFor="cantidadAmbientes" value="Cantidad de ambientes" className="text-gray-700 dark:text-gray-300 group-focus-within:text-blue-600 transition-colors" />
                  <TextInput
                    id="cantidadAmbientes"
                    name="cantidadAmbientes"
                    type="number"
                    value={currentForm.datos.cantidadAmbientes || ''}
                    onChange={handleInputChange}
                    placeholder="Ingrese la cantidad"
                    className="mt-1 focus:border-blue-500 dark:bg-gray-800"
                  />
                </div>
                
                <div className="mb-4 group">
                  <Label htmlFor="tieneAgua" value="¿Tiene agua?" className="text-gray-700 dark:text-gray-300 group-focus-within:text-blue-600 transition-colors" />
                  <Select
                    id="tieneAgua"
                    name="tieneAgua"
                    value={currentForm.datos.tieneAgua || ''}
                    onChange={handleInputChange}
                    className="mt-1 focus:border-blue-500 dark:bg-gray-800"
                  >
                    <option value="">Seleccione una opción</option>
                    <option value="Si">Sí</option>
                    <option value="No">No</option>
                  </Select>
                </div>
                
                <div className="mb-4 group">
                  <Label htmlFor="tieneLuz" value="¿Tiene luz?" className="text-gray-700 dark:text-gray-300 group-focus-within:text-blue-600 transition-colors" />
                  <Select
                    id="tieneLuz"
                    name="tieneLuz"
                    value={currentForm.datos.tieneLuz || ''}
                    onChange={handleInputChange}
                    className="mt-1 focus:border-blue-500 dark:bg-gray-800"
                  >
                    <option value="">Seleccione una opción</option>
                    <option value="Si">Sí</option>
                    <option value="No">No</option>
                  </Select>
                </div>
                
                <div className="mb-4 group">
                  <Label htmlFor="tieneGas" value="¿Tiene gas?" className="text-gray-700 dark:text-gray-300 group-focus-within:text-blue-600 transition-colors" />
                  <Select
                    id="tieneGas"
                    name="tieneGas"
                    value={currentForm.datos.tieneGas || ''}
                    onChange={handleInputChange}
                    className="mt-1 focus:border-blue-500 dark:bg-gray-800"
                  >
                    <option value="">Seleccione una opción</option>
                    <option value="Si">Sí</option>
                    <option value="No">No</option>
                  </Select>
                </div>
              </div>
            </div>
            
            <div className="flex justify-between mt-4">
              <Button color="light" onClick={navigateToPreviousTab}>
                <HiArrowNarrowLeft className="mr-2 h-5 w-5" />
                Anterior
              </Button>
              <Button color="primary" onClick={navigateToNextTab}>
                Siguiente
                <HiArrowNarrowRight className="ml-2 h-5 w-5" />
              </Button>
            </div>
          </Tabs.Item>
          
          <Tabs.Item 
            active={activeTab === 'modalidad'} 
            title={
              <div className="flex items-center space-x-2">
                <HiCube className="w-5 h-5" />
                <span>Modalidad</span>
              </div>
            }
          >
            <div className="p-1">
              <div className="mb-4">
                <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-100 flex items-center">
                  <HiCube className="mr-2 h-6 w-6 text-blue-600 dark:text-blue-400" />
                  Modalidad
                </h2>
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                  Seleccione el tipo de proyecto que desea realizar
                </p>
              </div>
              
              <div className="grid md:grid-cols-2 gap-6">
                <div className="mb-4 group">
                  <Label htmlFor="modalidad" value="Seleccione la modalidad" className="text-gray-700 dark:text-gray-300 group-focus-within:text-blue-600 transition-colors" />
                  <Select
                    id="modalidad"
                    name="modalidad"
                    value={currentForm.datos.modalidad || ''}
                    onChange={handleInputChange}
                    className="mt-1 focus:border-blue-500 dark:bg-gray-800"
                    required
                  >
                    <option value="">Seleccione una opción</option>
                    <option value="Ampliación">Ampliación</option>
                    <option value="Refacción">Refacción</option>
                    <option value="Construcción nueva">Construcción nueva</option>
                    <option value="Terminación">Terminación</option>
                    <option value="Mejoras">Mejoras</option>
                  </Select>
                </div>
                
                <div className="md:col-span-2 mb-4 group">
                  <Label htmlFor="detalleModalidad" value="Detalle de la modalidad" className="text-gray-700 dark:text-gray-300 group-focus-within:text-blue-600 transition-colors" />
                  <Textarea
                    id="detalleModalidad"
                    name="detalleModalidad"
                    value={currentForm.datos.detalleModalidad || ''}
                    onChange={handleInputChange}
                    rows={3}
                    placeholder="Describa los detalles de la modalidad seleccionada"
                    className="mt-1 focus:border-blue-500 dark:bg-gray-800"
                  />
                </div>
              </div>
            </div>
            
            <div className="flex justify-between mt-4">
              <Button color="light" onClick={navigateToPreviousTab}>
                <HiArrowNarrowLeft className="mr-2 h-5 w-5" />
                Anterior
              </Button>
              <Button color="primary" onClick={navigateToNextTab}>
                Siguiente
                <HiArrowNarrowRight className="ml-2 h-5 w-5" />
              </Button>
            </div>
          </Tabs.Item>
          
          <Tabs.Item 
            active={activeTab === 'otros'} 
            title={
              <div className="flex items-center space-x-2">
                <HiCog className="w-5 h-5" />
                <span>Otros Datos</span>
              </div>
            }
          >
            <div className="p-1">
              <div className="mb-4">
                <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-100 flex items-center">
                  <HiCog className="mr-2 h-6 w-6 text-blue-600 dark:text-blue-400" />
                  Otros Datos
                </h2>
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                  Información adicional relevante para el trámite
                </p>
              </div>
              
              <div className="grid md:grid-cols-2 gap-6">
                <div className="mb-4 group">
                  <Label htmlFor="situacionLaboral" value="Situación laboral" className="text-gray-700 dark:text-gray-300 group-focus-within:text-blue-600 transition-colors" />
                  <Select
                    id="situacionLaboral"
                    name="situacionLaboral"
                    value={currentForm.datos.situacionLaboral || ''}
                    onChange={handleInputChange}
                    className="mt-1 focus:border-blue-500 dark:bg-gray-800"
                  >
                    <option value="">Seleccione una opción</option>
                    <option value="Empleado">Empleado</option>
                    <option value="Desempleado">Desempleado</option>
                    <option value="Trabajo informal">Trabajo informal</option>
                    <option value="Jubilado">Jubilado</option>
                    <option value="Otro">Otro</option>
                  </Select>
                </div>
                
                <div className="mb-4 group">
                  <Label htmlFor="ingresoMensual" value="Ingreso mensual aproximado" className="text-gray-700 dark:text-gray-300 group-focus-within:text-blue-600 transition-colors" />
                  <TextInput
                    id="ingresoMensual"
                    name="ingresoMensual"
                    type="number"
                    value={currentForm.datos.ingresoMensual || ''}
                    onChange={handleInputChange}
                    placeholder="Ingrese el monto en pesos"
                    className="mt-1 focus:border-blue-500 dark:bg-gray-800"
                  />
                </div>
                
                <div className="mb-4 group">
                  <Label htmlFor="recibeSubsidio" value="¿Recibe subsidio?" className="text-gray-700 dark:text-gray-300 group-focus-within:text-blue-600 transition-colors" />
                  <Select
                    id="recibeSubsidio"
                    name="recibeSubsidio"
                    value={currentForm.datos.recibeSubsidio || ''}
                    onChange={handleInputChange}
                    className="mt-1 focus:border-blue-500 dark:bg-gray-800"
                  >
                    <option value="">Seleccione una opción</option>
                    <option value="Si">Sí</option>
                    <option value="No">No</option>
                  </Select>
                </div>
                
                <div className="mb-4 group">
                  <Label htmlFor="tipoSubsidio" value="Tipo de subsidio" className="text-gray-700 dark:text-gray-300 group-focus-within:text-blue-600 transition-colors" />
                  <TextInput
                    id="tipoSubsidio"
                    name="tipoSubsidio"
                    value={currentForm.datos.tipoSubsidio || ''}
                    onChange={handleInputChange}
                    placeholder="Especifique el tipo de subsidio"
                    disabled={currentForm.datos.recibeSubsidio !== 'Si'}
                    className="mt-1 focus:border-blue-500 dark:bg-gray-800 disabled:bg-gray-100 disabled:dark:bg-gray-700"
                  />
                </div>
              </div>
            </div>
            
            <div className="flex justify-between mt-4">
              <Button color="light" onClick={navigateToPreviousTab}>
                <HiArrowNarrowLeft className="mr-2 h-5 w-5" />
                Anterior
              </Button>
              <Button color="primary" onClick={navigateToNextTab}>
                Siguiente
                <HiArrowNarrowRight className="ml-2 h-5 w-5" />
              </Button>
            </div>
          </Tabs.Item>
          
          <Tabs.Item 
            active={activeTab === 'motivosConsulta'} 
            title={
              <div className="flex items-center space-x-2">
                <HiQuestionMarkCircle className="w-5 h-5" />
                <span>Motivos</span>
              </div>
            }
          >
            <div className="p-1">
              <div className="mb-4">
                <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-100 flex items-center">
                  <HiQuestionMarkCircle className="mr-2 h-6 w-6 text-blue-600 dark:text-blue-400" />
                  Motivos de Consulta
                </h2>
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                  Indique los motivos de su consulta o solicitud
                </p>
              </div>
              
              <div className="grid md:grid-cols-2 gap-6">
                <div className="md:col-span-2">
                  <fieldset className="border p-4 rounded-lg border-gray-200 dark:border-gray-700 bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm">
                    <legend className="text-sm font-medium text-gray-700 dark:text-gray-300 px-2">
                      Seleccione los motivos de consulta
                    </legend>
                    
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                      <div className="flex items-center gap-2">
                        <Checkbox
                          id="vivienda"
                          name="vivienda"
                          checked={currentForm.datos.vivienda || false}
                          onChange={handleInputChange}
                          className="focus:ring-blue-500 h-4 w-4 text-blue-600"
                        />
                        <Label htmlFor="vivienda" className="text-gray-700 dark:text-gray-300">
                          Vivienda
                        </Label>
                      </div>
                      
                      <div className="flex items-center gap-2">
                        <Checkbox
                          id="materialConstruccion"
                          name="materialConstruccion"
                          checked={currentForm.datos.materialConstruccion || false}
                          onChange={handleInputChange}
                          className="focus:ring-blue-500 h-4 w-4 text-blue-600"
                        />
                        <Label htmlFor="materialConstruccion" className="text-gray-700 dark:text-gray-300">
                          Material de construcción
                        </Label>
                      </div>
                      
                      <div className="flex items-center gap-2">
                        <Checkbox
                          id="ayudaEconomica"
                          name="ayudaEconomica"
                          checked={currentForm.datos.ayudaEconomica || false}
                          onChange={handleInputChange}
                          className="focus:ring-blue-500 h-4 w-4 text-blue-600"
                        />
                        <Label htmlFor="ayudaEconomica" className="text-gray-700 dark:text-gray-300">
                          Ayuda económica
                        </Label>
                      </div>
                      
                      <div className="flex items-center gap-2">
                        <Checkbox
                          id="asesoramientoTecnico"
                          name="asesoramientoTecnico"
                          checked={currentForm.datos.asesoramientoTecnico || false}
                          onChange={handleInputChange}
                          className="focus:ring-blue-500 h-4 w-4 text-blue-600"
                        />
                        <Label htmlFor="asesoramientoTecnico" className="text-gray-700 dark:text-gray-300">
                          Asesoramiento técnico
                        </Label>
                      </div>
                      
                      <div className="flex items-center gap-2">
                        <Checkbox
                          id="subsidio"
                          name="subsidio"
                          checked={currentForm.datos.subsidio || false}
                          onChange={handleInputChange}
                          className="focus:ring-blue-500 h-4 w-4 text-blue-600"
                        />
                        <Label htmlFor="subsidio" className="text-gray-700 dark:text-gray-300">
                          Subsidio
                        </Label>
                      </div>
                    </div>
                  </fieldset>
                </div>
                
                <div className="mb-4 group">
                  <Label htmlFor="otrosMotivos" value="Otros motivos" className="text-gray-700 dark:text-gray-300 group-focus-within:text-blue-600 transition-colors" />
                  <Textarea
                    id="otrosMotivos"
                    name="otrosMotivos"
                    value={currentForm.datos.otrosMotivos || ''}
                    onChange={handleInputChange}
                    rows={3}
                    placeholder="Describa otros motivos de consulta"
                    className="mt-1 focus:border-blue-500 dark:bg-gray-800"
                  />
                </div>
                
                <div className="mb-4 group">
                  <Label htmlFor="observaciones" value="Observaciones generales" className="text-gray-700 dark:text-gray-300 group-focus-within:text-blue-600 transition-colors" />
                  <Textarea
                    id="observaciones"
                    name="observaciones"
                    value={currentForm.datos.observaciones || ''}
                    onChange={handleInputChange}
                    rows={4}
                    placeholder="Ingrese observaciones adicionales"
                    className="mt-1 focus:border-blue-500 dark:bg-gray-800"
                  />
                </div>
              </div>
            </div>
            
            <div className="flex justify-between mt-4">
              <Button color="light" onClick={navigateToPreviousTab}>
                <HiArrowNarrowLeft className="mr-2 h-5 w-5" />
                Anterior
              </Button>
              <Button color="success" onClick={handleSave}>
                <HiOutlineSave className="mr-2 h-5 w-5" />
                Guardar Formulario
              </Button>
            </div>
          </Tabs.Item>
        </Tabs.Group>
      </Card>
      
      <div className="flex flex-wrap items-center justify-between gap-4 mt-4">
        <div className="flex flex-wrap gap-3">
          <Button color="blue" onClick={handleSave} className="shadow-md hover:shadow-lg transition-shadow">
            <HiOutlineSave className="mr-2 h-5 w-5" />
            Guardar
          </Button>
          <Button color="purple" onClick={handleNew} className="shadow-md hover:shadow-lg transition-shadow">
            <HiDocumentAdd className="mr-2 h-5 w-5" />
            Nuevo
          </Button>
          <Button color="green" onClick={handlePrint} className="shadow-md hover:shadow-lg transition-shadow">
            <HiPrinter className="mr-2 h-5 w-5" />
            Imprimir
          </Button>
        </div>
        
        <Button color="light" onClick={() => navigate('/respuestas')} className="shadow-md hover:shadow-lg transition-shadow">
          Ver todas las respuestas
        </Button>
      </div>
      
      {showToast && (
        <div className="fixed bottom-4 right-4 z-50">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.3 }}
          >
            <Toast>
              <div className={`inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg ${toastType === 'success' ? 'bg-green-100 text-green-500' : 'bg-red-100 text-red-500'}`}>
                {toastType === 'success' ? (
                  <HiCheck className="h-5 w-5" />
                ) : (
                  <HiX className="h-5 w-5" />
                )}
              </div>
              <div className="ml-3 text-sm font-normal">
                {toastMessage}
              </div>
              <Toast.Toggle onClick={() => setShowToast(false)} />
            </Toast>
          </motion.div>
        </div>
      )}
    </motion.div>
  );
}

export default FormularioDigital;
