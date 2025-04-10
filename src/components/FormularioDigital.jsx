// Archivo: src/components/FormularioDigital.jsx
import { useState } from 'react';
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
  Toast
} from 'flowbite-react';
import { HiCheck, HiX, HiOutlineSave, HiPrinter, HiTrash, HiDocumentText } from 'react-icons/hi';
import { useFormData } from '../contexts/FormDataContext';

function FormularioDigital() {
  const { currentForm, updateCurrentForm, saveCurrentForm, createNewForm } = useFormData();
  const [activeTab, setActiveTab] = useState('datosPersonales');
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const [toastType, setToastType] = useState('success');
  
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    updateCurrentForm({
      [name]: type === 'checkbox' ? checked : value
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

  return (
    <div className="max-w-5xl mx-auto">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">Formulario Digital</h1>
        <p className="text-gray-600">Complete los datos del formulario. Los cambios se guardan automáticamente.</p>
      </div>

      <Tabs.Group aria-label="Secciones del formulario" style="underline">
        <Tabs.Item active={activeTab === 'datosPersonales'} title="Datos Personales" onClick={() => setActiveTab('datosPersonales')}>
          <Card>
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Datos Personales</h2>
            
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <div className="mb-4">
                  <Label htmlFor="nombre" value="Nombre" />
                  <TextInput
                    id="nombre"
                    name="nombre"
                    value={currentForm.datos.nombre || ''}
                    onChange={handleInputChange}
                    placeholder="Ingrese el nombre"
                  />
                </div>
              </div>
              
              <div>
                <div className="mb-4">
                  <Label htmlFor="apellido" value="Apellido" />
                  <TextInput
                    id="apellido"
                    name="apellido"
                    value={currentForm.datos.apellido || ''}
                    onChange={handleInputChange}
                    placeholder="Ingrese el apellido"
                  />
                </div>
              </div>
              
              <div>
                <div className="mb-4">
                  <Label htmlFor="dni" value="DNI" />
                  <TextInput
                    id="dni"
                    name="dni"
                    value={currentForm.datos.dni || ''}
                    onChange={handleInputChange}
                    placeholder="Ingrese el DNI"
                  />
                </div>
              </div>
              
              <div>
                <div className="mb-4">
                  <Label htmlFor="telefono" value="Teléfono" />
                  <TextInput
                    id="telefono"
                    name="telefono"
                    type="tel"
                    value={currentForm.datos.telefono || ''}
                    onChange={handleInputChange}
                    placeholder="Ingrese el teléfono"
                  />
                </div>
              </div>
              
              <div className="md:col-span-2">
                <div className="mb-4">
                  <Label htmlFor="direccion" value="Dirección" />
                  <TextInput
                    id="direccion"
                    name="direccion"
                    value={currentForm.datos.direccion || ''}
                    onChange={handleInputChange}
                    placeholder="Ingrese la dirección completa"
                  />
                </div>
              </div>
              
              <div>
                <div className="mb-4">
                  <Label htmlFor="email" value="Email" />
                  <TextInput
                    id="email"
                    name="email"
                    type="email"
                    value={currentForm.datos.email || ''}
                    onChange={handleInputChange}
                    placeholder="Ingrese el email"
                  />
                </div>
              </div>
              
              <div>
                <div className="mb-4">
                  <Label htmlFor="cantidadPersonas" value="Cantidad de personas en el hogar" />
                  <TextInput
                    id="cantidadPersonas"
                    name="cantidadPersonas"
                    type="number"
                    value={currentForm.datos.cantidadPersonas || ''}
                    onChange={handleInputChange}
                    placeholder="Ingrese la cantidad"
                  />
                </div>
              </div>
            </div>
          </Card>
        </Tabs.Item>
        
        <Tabs.Item active={activeTab === 'materialesInsumos'} title="Materiales e Insumos" onClick={() => setActiveTab('materialesInsumos')}>
          <Card>
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Materiales e Insumos</h2>
            
            <div className="grid md:grid-cols-2 gap-6">
              <div className="md:col-span-2">
                <fieldset className="border p-4 rounded border-gray-200">
                  <legend className="text-sm font-medium text-gray-700 px-2">Seleccione los materiales necesarios</legend>
                  
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                    <div className="flex items-center gap-2">
                      <Checkbox
                        id="cemento"
                        name="cemento"
                        checked={currentForm.datos.cemento || false}
                        onChange={handleInputChange}
                      />
                      <Label htmlFor="cemento">Cemento</Label>
                    </div>
                    
                    <div className="flex items-center gap-2">
                      <Checkbox
                        id="ladrillos"
                        name="ladrillos"
                        checked={currentForm.datos.ladrillos || false}
                        onChange={handleInputChange}
                      />
                      <Label htmlFor="ladrillos">Ladrillos</Label>
                    </div>
                    
                    <div className="flex items-center gap-2">
                      <Checkbox
                        id="hierro"
                        name="hierro"
                        checked={currentForm.datos.hierro || false}
                        onChange={handleInputChange}
                      />
                      <Label htmlFor="hierro">Hierro</Label>
                    </div>
                    
                    <div className="flex items-center gap-2">
                      <Checkbox
                        id="arena"
                        name="arena"
                        checked={currentForm.datos.arena || false}
                        onChange={handleInputChange}
                      />
                      <Label htmlFor="arena">Arena</Label>
                    </div>
                    
                    <div className="flex items-center gap-2">
                      <Checkbox
                        id="canto"
                        name="canto"
                        checked={currentForm.datos.canto || false}
                        onChange={handleInputChange}
                      />
                      <Label htmlFor="canto">Canto</Label>
                    </div>
                    
                    <div className="flex items-center gap-2">
                      <Checkbox
                        id="ceramica"
                        name="ceramica"
                        checked={currentForm.datos.ceramica || false}
                        onChange={handleInputChange}
                      />
                      <Label htmlFor="ceramica">Cerámica</Label>
                    </div>
                    
                    <div className="flex items-center gap-2">
                      <Checkbox
                        id="pintura"
                        name="pintura"
                        checked={currentForm.datos.pintura || false}
                        onChange={handleInputChange}
                      />
                      <Label htmlFor="pintura">Pintura</Label>
                    </div>
                    
                    <div className="flex items-center gap-2">
                      <Checkbox
                        id="tuberias"
                        name="tuberias"
                        checked={currentForm.datos.tuberias || false}
                        onChange={handleInputChange}
                      />
                      <Label htmlFor="tuberias">Tuberías</Label>
                    </div>
                    
                    <div className="flex items-center gap-2">
                      <Checkbox
                        id="cableElectrico"
                        name="cableElectrico"
                        checked={currentForm.datos.cableElectrico || false}
                        onChange={handleInputChange}
                      />
                      <Label htmlFor="cableElectrico">Cable Eléctrico</Label>
                    </div>
                  </div>
                </fieldset>
              </div>
              
              <div className="md:col-span-2">
                <div className="mb-4">
                  <Label htmlFor="otrosMateriales" value="Otros materiales requeridos" />
                  <Textarea
                    id="otrosMateriales"
                    name="otrosMateriales"
                    value={currentForm.datos.otrosMateriales || ''}
                    onChange={handleInputChange}
                    rows={3}
                    placeholder="Describa otros materiales que necesita"
                  />
                </div>
              </div>
            </div>
          </Card>
        </Tabs.Item>
        
        <Tabs.Item active={activeTab === 'tipoVivienda'} title="Tipo de Vivienda" onClick={() => setActiveTab('tipoVivienda')}>
          <Card>
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Tipo de Vivienda</h2>
            
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <div className="mb-4">
                  <Label htmlFor="tipoVivienda" value="Tipo de vivienda" />
                  <Select
                    id="tipoVivienda"
                    name="tipoVivienda"
                    value={currentForm.datos.tipoVivienda || ''}
                    onChange={handleInputChange}
                  >
                    <option value="">Seleccione una opción</option>
                    <option value="Casa">Casa</option>
                    <option value="Departamento">Departamento</option>
                    <option value="Habitación">Habitación</option>
                    <option value="Otro">Otro</option>
                  </Select>
                </div>
              </div>
              
              <div>
                <div className="mb-4">
                  <Label htmlFor="estadoVivienda" value="Estado de la vivienda" />
                  <Select
                    id="estadoVivienda"
                    name="estadoVivienda"
                    value={currentForm.datos.estadoVivienda || ''}
                    onChange={handleInputChange}
                  >
                    <option value="">Seleccione una opción</option>
                    <option value="Muy bueno">Muy bueno</option>
                    <option value="Bueno">Bueno</option>
                    <option value="Regular">Regular</option>
                    <option value="Malo">Malo</option>
                    <option value="Muy malo">Muy malo</option>
                  </Select>
                </div>
              </div>
              
              <div>
                <div className="mb-4">
                  <Label htmlFor="cantidadAmbientes" value="Cantidad de ambientes" />
                  <TextInput
                    id="cantidadAmbientes"
                    name="cantidadAmbientes"
                    type="number"
                    value={currentForm.datos.cantidadAmbientes || ''}
                    onChange={handleInputChange}
                    placeholder="Ingrese la cantidad"
                  />
                </div>
              </div>
              
              <div>
                <div className="mb-4">
                  <Label htmlFor="tieneAgua" value="¿Tiene agua?" />
                  <Select
                    id="tieneAgua"
                    name="tieneAgua"
                    value={currentForm.datos.tieneAgua || ''}
                    onChange={handleInputChange}
                  >
                    <option value="">Seleccione una opción</option>
                    <option value="Si">Sí</option>
                    <option value="No">No</option>
                  </Select>
                </div>
              </div>
              
              <div>
                <div className="mb-4">
                  <Label htmlFor="tieneLuz" value="¿Tiene luz?" />
                  <Select
                    id="tieneLuz"
                    name="tieneLuz"
                    value={currentForm.datos.tieneLuz || ''}
                    onChange={handleInputChange}
                  >
                    <option value="">Seleccione una opción</option>
                    <option value="Si">Sí</option>
                    <option value="No">No</option>
                  </Select>
                </div>
              </div>
              
              <div>
                <div className="mb-4">
                  <Label htmlFor="tieneGas" value="¿Tiene gas?" />
                  <Select
                    id="tieneGas"
                    name="tieneGas"
                    value={currentForm.datos.tieneGas || ''}
                    onChange={handleInputChange}
                  >
                    <option value="">Seleccione una opción</option>
                    <option value="Si">Sí</option>
                    <option value="No">No</option>
                  </Select>
                </div>
              </div>
            </div>
          </Card>
        </Tabs.Item>
        
        <Tabs.Item active={activeTab === 'modalidad'} title="Modalidad" onClick={() => setActiveTab('modalidad')}>
          <Card>
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Modalidad</h2>
            
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <div className="mb-4">
                  <Label htmlFor="modalidad" value="Seleccione la modalidad" />
                  <Select
                    id="modalidad"
                    name="modalidad"
                    value={currentForm.datos.modalidad || ''}
                    onChange={handleInputChange}
                  >
                    <option value="">Seleccione una opción</option>
                    <option value="Ampliación">Ampliación</option>
                    <option value="Refacción">Refacción</option>
                    <option value="Construcción nueva">Construcción nueva</option>
                    <option value="Terminación">Terminación</option>
                    <option value="Mejoras">Mejoras</option>
                  </Select>
                </div>
              </div>
              
              <div className="md:col-span-2">
                <div className="mb-4">
                  <Label htmlFor="detalleModalidad" value="Detalle de la modalidad" />
                  <Textarea
                    id="detalleModalidad"
                    name="detalleModalidad"
                    value={currentForm.datos.detalleModalidad || ''}
                    onChange={handleInputChange}
                    rows={3}
                    placeholder="Describa los detalles de la modalidad seleccionada"
                  />
                </div>
              </div>
            </div>
          </Card>
        </Tabs.Item>
        
        <Tabs.Item active={activeTab === 'otros'} title="Otros Datos" onClick={() => setActiveTab('otros')}>
          <Card>
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Otros Datos</h2>
            
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <div className="mb-4">
                  <Label htmlFor="situacionLaboral" value="Situación laboral" />
                  <Select
                    id="situacionLaboral"
                    name="situacionLaboral"
                    value={currentForm.datos.situacionLaboral || ''}
                    onChange={handleInputChange}
                  >
                    <option value="">Seleccione una opción</option>
                    <option value="Empleado">Empleado</option>
                    <option value="Desempleado">Desempleado</option>
                    <option value="Trabajo informal">Trabajo informal</option>
                    <option value="Jubilado">Jubilado</option>
                    <option value="Otro">Otro</option>
                  </Select>
                </div>
              </div>
              
              <div>
                <div className="mb-4">
                  <Label htmlFor="ingresoMensual" value="Ingreso mensual aproximado" />
                  <TextInput
                    id="ingresoMensual"
                    name="ingresoMensual"
                    type="number"
                    value={currentForm.datos.ingresoMensual || ''}
                    onChange={handleInputChange}
                    placeholder="Ingrese el monto en pesos"
                  />
                </div>
              </div>
              
              <div>
                <div className="mb-4">
                  <Label htmlFor="recibeSubsidio" value="¿Recibe subsidio?" />
                  <Select
                    id="recibeSubsidio"
                    name="recibeSubsidio"
                    value={currentForm.datos.recibeSubsidio || ''}
                    onChange={handleInputChange}
                  >
                    <option value="">Seleccione una opción</option>
                    <option value="Si">Sí</option>
                    <option value="No">No</option>
                  </Select>
                </div>
              </div>
              
              <div>
                <div className="mb-4">
                  <Label htmlFor="tipoSubsidio" value="Tipo de subsidio" />
                  <TextInput
                    id="tipoSubsidio"
                    name="tipoSubsidio"
                    value={currentForm.datos.tipoSubsidio || ''}
                    onChange={handleInputChange}
                    placeholder="Especifique el tipo de subsidio"
                    disabled={currentForm.datos.recibeSubsidio !== 'Si'}
                  />
                </div>
              </div>
            </div>
          </Card>
        </Tabs.Item>
        
        <Tabs.Item active={activeTab === 'motivosConsulta'} title="Motivos de Consulta" onClick={() => setActiveTab('motivosConsulta')}>
          <Card>
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Motivos de Consulta</h2>
            
            <div className="grid md:grid-cols-2 gap-6">
              <div className="md:col-span-2">
                <fieldset className="border p-4 rounded border-gray-200">
                  <legend className="text-sm font-medium text-gray-700 px-2">Seleccione los motivos de consulta</legend>
                  
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                    <div className="flex items-center gap-2">
                      <Checkbox
                        id="vivienda"
                        name="vivienda"
                        checked={currentForm.datos.vivienda || false}
                        onChange={handleInputChange}
                      />
                      <Label htmlFor="vivienda">Vivienda</Label>
                    </div>
                    
                    <div className="flex items-center gap-2">
                      <Checkbox
                        id="materialConstruccion"
                        name="materialConstruccion"
                        checked={currentForm.datos.materialConstruccion || false}
                        onChange={handleInputChange}
                      />
                      <Label htmlFor="materialConstruccion">Material de construcción</Label>
                    </div>
                    
                    <div className="flex items-center gap-2">
                      <Checkbox
                        id="ayudaEconomica"
                        name="ayudaEconomica"
                        checked={currentForm.datos.ayudaEconomica || false}
                        onChange={handleInputChange}
                      />
                      <Label htmlFor="ayudaEconomica">Ayuda económica</Label>
                    </div>
                    
                    <div className="flex items-center gap-2">
                      <Checkbox
                        id="asesoramientoTecnico"
                        name="asesoramientoTecnico"
                        checked={currentForm.datos.asesoramientoTecnico || false}
                        onChange={handleInputChange}
                      />
                      <Label htmlFor="asesoramientoTecnico">Asesoramiento técnico</Label>
                    </div>
                    
                    <div className="flex items-center gap-2">
                      <Checkbox
                        id="subsidio"
                        name="subsidio"
                        checked={currentForm.datos.subsidio || false}
                        onChange={handleInputChange}
                      />
                      <Label htmlFor="subsidio">Subsidio</Label>
                    </div>
                  </div>
                </fieldset>
              </div>
              
              <div>
                <div className="mb-4">
                  <Label htmlFor="otrosMotivos" value="Otros motivos" />
                  <Textarea
                    id="otrosMotivos"
                    name="otrosMotivos"
                    value={currentForm.datos.otrosMotivos || ''}
                    onChange={handleInputChange}
                    rows={3}
                    placeholder="Describa otros motivos de consulta"
                  />
                </div>
              </div>
              
              <div>
                <div className="mb-4">
                  <Label htmlFor="observaciones" value="Observaciones generales" />
                  <Textarea
                    id="observaciones"
                    name="observaciones"
                    value={currentForm.datos.observaciones || ''}
                    onChange={handleInputChange}
                    rows={4}
                    placeholder="Ingrese observaciones adicionales"
                  />
                </div>
              </div>
            </div>
          </Card>
        </Tabs.Item>
      </Tabs.Group>
      
      <div className="flex flex-wrap items-center justify-between gap-4 mt-6">
        <div className="flex flex-wrap gap-3">
          <Button color="blue" onClick={handleSave}>
            <HiOutlineSave className="mr-2 h-5 w-5" />
            Guardar
          </Button>
          <Button color="purple" onClick={handleNew}>
            <HiDocumentText className="mr-2 h-5 w-5" />
            Nuevo
          </Button>
          <Button color="green" onClick={handlePrint}>
            <HiPrinter className="mr-2 h-5 w-5" />
            Imprimir
          </Button>
        </div>
        
        <Button color="light" onClick={() => navigate('/respuestas')}>
          Ver todas las respuestas
        </Button>
      </div>
      
      {showToast && (
        <Toast className="fixed bottom-4 right-4">
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
      )}
    </div>
  );
}

export default FormularioDigital;