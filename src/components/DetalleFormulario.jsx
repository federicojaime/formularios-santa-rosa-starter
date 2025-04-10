// Archivo: src/components/DetalleFormulario.jsx
import { useEffect, useRef } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { 
  Card, 
  Button, 
  Badge
} from 'flowbite-react';
import { 
  HiArrowLeft, 
  HiPencil, 
  HiDocumentDuplicate,
  HiPrinter,
  HiDownload
} from 'react-icons/hi';
import { useFormData } from '../contexts/FormDataContext';
import jsPDF from 'jspdf';
import 'jspdf-autotable';

function DetalleFormulario() {
  const { id } = useParams();
  const { getFormById, loadForm } = useFormData();
  const navigate = useNavigate();
  const location = useLocation();
  const printRef = useRef(null);
  
  const form = getFormById(id);
  
  // Verificar si se debe imprimir automáticamente
  const shouldPrint = new URLSearchParams(location.search).get('print') === 'true';
  
  useEffect(() => {
    if (!form) {
      navigate('/respuestas');
      return;
    }
    
    if (shouldPrint) {
      setTimeout(() => {
        handlePrint();
      }, 500);
    }
  }, [form, shouldPrint]);
  
  if (!form) {
    return null;
  }
  
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
  
  const handleEdit = () => {
    if (loadForm(id)) {
      navigate('/');
    }
  };
  
  const handlePrint = () => {
    window.print();
  };
  
  const handleExportPDF = () => {
    const doc = new jsPDF();
    
    // Añadir título y fecha
    doc.setFontSize(18);
    doc.text('Formulario Santa Rosa', 105, 15, { align: 'center' });
    doc.setFontSize(12);
    doc.text(`Fecha: ${formatDate(form.fecha)}`, 105, 25, { align: 'center' });
    doc.text(`ID: ${form.id}`, 105, 32, { align: 'center' });
    
    // Datos personales
    doc.setFontSize(14);
    doc.text('Datos Personales', 14, 45);
    doc.setFontSize(10);
    
    const personalData = [
      ['Nombre', form.datos.nombre || 'No especificado'],
      ['Apellido', form.datos.apellido || 'No especificado'],
      ['DNI', form.datos.dni || 'No especificado'],
      ['Dirección', form.datos.direccion || 'No especificado'],
      ['Teléfono', form.datos.telefono || 'No especificado'],
      ['Email', form.datos.email || 'No especificado'],
      ['Cantidad de personas en el hogar', form.datos.cantidadPersonas || 'No especificado']
    ];
    
    doc.autoTable({
      startY: 50,
      head: [['Campo', 'Valor']],
      body: personalData,
      theme: 'striped',
      headStyles: { fillColor: [59, 130, 246] }
    });
    
    // Materiales e insumos
    let currentY = doc.previousAutoTable.finalY + 10;
    
    doc.setFontSize(14);
    doc.text('Materiales e Insumos', 14, currentY);
    doc.setFontSize(10);
    
    const materialesSeleccionados = [];
    if (form.datos.cemento) materialesSeleccionados.push('Cemento');
    if (form.datos.ladrillos) materialesSeleccionados.push('Ladrillos');
    if (form.datos.hierro) materialesSeleccionados.push('Hierro');
    if (form.datos.arena) materialesSeleccionados.push('Arena');
    if (form.datos.canto) materialesSeleccionados.push('Canto');
    if (form.datos.ceramica) materialesSeleccionados.push('Cerámica');
    if (form.datos.pintura) materialesSeleccionados.push('Pintura');
    if (form.datos.tuberias) materialesSeleccionados.push('Tuberías');
    if (form.datos.cableElectrico) materialesSeleccionados.push('Cable Eléctrico');
    
    const materialsData = [
      ['Materiales seleccionados', materialesSeleccionados.join(', ') || 'Ninguno seleccionado'],
      ['Otros materiales', form.datos.otrosMateriales || 'No especificado']
    ];
    
    doc.autoTable({
      startY: currentY + 5,
      head: [['Campo', 'Valor']],
      body: materialsData,
      theme: 'striped',
      headStyles: { fillColor: [59, 130, 246] }
    });
    
    // Tipo de vivienda
    currentY = doc.previousAutoTable.finalY + 10;
    
    doc.setFontSize(14);
    doc.text('Tipo de Vivienda', 14, currentY);
    doc.setFontSize(10);
    
    const viviendaData = [
      ['Tipo de vivienda', form.datos.tipoVivienda || 'No especificado'],
      ['Estado de la vivienda', form.datos.estadoVivienda || 'No especificado'],
      ['Cantidad de ambientes', form.datos.cantidadAmbientes || 'No especificado'],
      ['Tiene agua', form.datos.tieneAgua || 'No especificado'],
      ['Tiene luz', form.datos.tieneLuz || 'No especificado'],
      ['Tiene gas', form.datos.tieneGas || 'No especificado']
    ];
    
    doc.autoTable({
      startY: currentY + 5,
      head: [['Campo', 'Valor']],
      body: viviendaData,
      theme: 'striped',
      headStyles: { fillColor: [59, 130, 246] }
    });
    
    // Modalidad
    currentY = doc.previousAutoTable.finalY + 10;
    
    doc.setFontSize(14);
    doc.text('Modalidad', 14, currentY);
    doc.setFontSize(10);
    
    const modalidadData = [
      ['Modalidad', form.datos.modalidad || 'No especificado'],
      ['Detalle de modalidad', form.datos.detalleModalidad || 'No especificado']
    ];
    
    doc.autoTable({
      startY: currentY + 5,
      head: [['Campo', 'Valor']],
      body: modalidadData,
      theme: 'striped',
      headStyles: { fillColor: [59, 130, 246] }
    });
    
    // Otros datos
    currentY = doc.previousAutoTable.finalY + 10;
    
    if (currentY > 250) {
      doc.addPage();
      currentY = 20;
    }
    
    doc.setFontSize(14);
    doc.text('Otros Datos', 14, currentY);
    doc.setFontSize(10);
    
    const otrosData = [
      ['Situación laboral', form.datos.situacionLaboral || 'No especificado'],
      ['Ingreso mensual', form.datos.ingresoMensual ? `$${form.datos.ingresoMensual}` : 'No especificado'],
      ['Recibe subsidio', form.datos.recibeSubsidio || 'No especificado'],
      ['Tipo de subsidio', form.datos.tipoSubsidio || 'No especificado']
    ];
    
    doc.autoTable({
      startY: currentY + 5,
      head: [['Campo', 'Valor']],
      body: otrosData,
      theme: 'striped',
      headStyles: { fillColor: [59, 130, 246] }
    });
    
    // Motivos de consulta
    currentY = doc.previousAutoTable.finalY + 10;
    
    doc.setFontSize(14);
    doc.text('Motivos de Consulta', 14, currentY);
    doc.setFontSize(10);
    
    const motivosSeleccionados = [];
    if (form.datos.vivienda) motivosSeleccionados.push('Vivienda');
    if (form.datos.materialConstruccion) motivosSeleccionados.push('Material de construcción');
    if (form.datos.ayudaEconomica) motivosSeleccionados.push('Ayuda económica');
    if (form.datos.asesoramientoTecnico) motivosSeleccionados.push('Asesoramiento técnico');
    if (form.datos.subsidio) motivosSeleccionados.push('Subsidio');
    
    const motivosData = [
      ['Motivos seleccionados', motivosSeleccionados.join(', ') || 'Ninguno seleccionado'],
      ['Otros motivos', form.datos.otrosMotivos || 'No especificado'],
      ['Observaciones', form.datos.observaciones || 'No especificado']
    ];
    
    doc.autoTable({
      startY: currentY + 5,
      head: [['Campo', 'Valor']],
      body: motivosData,
      theme: 'striped',
      headStyles: { fillColor: [59, 130, 246] }
    });
    
    // Pie de página
    const pageCount = doc.internal.getNumberOfPages();
    for (let i = 1; i <= pageCount; i++) {
      doc.setPage(i);
      doc.setFontSize(8);
      doc.text(`Municipalidad de Santa Rosa - Formulario Digital - Página ${i} de ${pageCount}`, 105, 287, { align: 'center' });
    }
    
    doc.save(`formulario-santa-rosa-${form.id}.pdf`);
  };
  
  // Función para renderizar las secciones del formulario
  const renderSeccion = (titulo, campos) => (
    <div className="mb-8">
      <h3 className="text-lg font-medium text-gray-800 mb-3 pb-2 border-b">{titulo}</h3>
      <div className="grid md:grid-cols-2 gap-3">
        {campos.map((campo, index) => (
          <div key={index} className="mb-2">
            <span className="text-sm font-medium text-gray-600 block">{campo.label}:</span>
            <span className="text-gray-800">{campo.value}</span>
          </div>
        ))}
      </div>
    </div>
  );
  
  // Verificar materiales seleccionados
  const materialesSeleccionados = [];
  if (form.datos.cemento) materialesSeleccionados.push('Cemento');
  if (form.datos.ladrillos) materialesSeleccionados.push('Ladrillos');
  if (form.datos.hierro) materialesSeleccionados.push('Hierro');
  if (form.datos.arena) materialesSeleccionados.push('Arena');
  if (form.datos.canto) materialesSeleccionados.push('Canto');
  if (form.datos.ceramica) materialesSeleccionados.push('Cerámica');
  if (form.datos.pintura) materialesSeleccionados.push('Pintura');
  if (form.datos.tuberias) materialesSeleccionados.push('Tuberías');
  if (form.datos.cableElectrico) materialesSeleccionados.push('Cable Eléctrico');
  
  // Verificar motivos seleccionados
  const motivosSeleccionados = [];
  if (form.datos.vivienda) motivosSeleccionados.push('Vivienda');
  if (form.datos.materialConstruccion) motivosSeleccionados.push('Material de construcción');
  if (form.datos.ayudaEconomica) motivosSeleccionados.push('Ayuda económica');
  if (form.datos.asesoramientoTecnico) motivosSeleccionados.push('Asesoramiento técnico');
  if (form.datos.subsidio) motivosSeleccionados.push('Subsidio');
  
  return (
    <div className="max-w-5xl mx-auto">
      {/* Versión para pantalla */}
      <div className="no-print">
        <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
          <div className="flex items-center">
            <Button color="light" onClick={() => navigate('/respuestas')} className="mr-4">
              <HiArrowLeft className="mr-2 h-5 w-5" />
              Volver
            </Button>
            <div>
              <h1 className="text-3xl font-bold text-gray-800 mb-1">Detalle del Formulario</h1>
              <p className="text-gray-600">
                Fecha: {formatDate(form.fecha)} | ID: {form.id}
              </p>
            </div>
          </div>
          
          <div className="flex flex-wrap gap-2">
            <Button color="success" onClick={handleEdit}>
              <HiPencil className="mr-2 h-5 w-5" />
              Editar
            </Button>
            <Button color="info" onClick={handlePrint}>
              <HiPrinter className="mr-2 h-5 w-5" />
              Imprimir
            </Button>
            <Button color="purple" onClick={handleExportPDF}>
              <HiDownload className="mr-2 h-5 w-5" />
              Exportar PDF
            </Button>
          </div>
        </div>

        <Card>
          <div className="mb-6">
            <h2 className="text-2xl font-semibold mb-4 pb-2 border-b text-blue-700">
              {form.datos.nombre} {form.datos.apellido}
            </h2>
            
            {/* Sección Datos Personales */}
            {renderSeccion('Datos Personales', [
              { label: 'Nombre', value: form.datos.nombre || 'No especificado' },
              { label: 'Apellido', value: form.datos.apellido || 'No especificado' },
              { label: 'DNI', value: form.datos.dni || 'No especificado' },
              { label: 'Dirección', value: form.datos.direccion || 'No especificado' },
              { label: 'Teléfono', value: form.datos.telefono || 'No especificado' },
              { label: 'Email', value: form.datos.email || 'No especificado' },
              { label: 'Cantidad de personas en el hogar', value: form.datos.cantidadPersonas || 'No especificado' }
            ])}
            
            {/* Sección Materiales e Insumos */}
            {renderSeccion('Materiales e Insumos', [
                              { 
                label: 'Materiales seleccionados', 
                value: materialesSeleccionados.length > 0 ? materialesSeleccionados.join(', ') : 'Ninguno seleccionado' 
              },
              { label: 'Otros materiales', value: form.datos.otrosMateriales || 'No especificado' }
            ])}
            
            {/* Sección Tipo de Vivienda */}
            {renderSeccion('Tipo de Vivienda', [
              { label: 'Tipo de vivienda', value: form.datos.tipoVivienda || 'No especificado' },
              { label: 'Estado de la vivienda', value: form.datos.estadoVivienda || 'No especificado' },
              { label: 'Cantidad de ambientes', value: form.datos.cantidadAmbientes || 'No especificado' },
              { label: 'Tiene agua', value: form.datos.tieneAgua || 'No especificado' },
              { label: 'Tiene luz', value: form.datos.tieneLuz || 'No especificado' },
              { label: 'Tiene gas', value: form.datos.tieneGas || 'No especificado' }
            ])}
            
            {/* Sección Modalidad */}
            {renderSeccion('Modalidad', [
              { label: 'Modalidad', value: form.datos.modalidad || 'No especificado' },
              { label: 'Detalle de modalidad', value: form.datos.detalleModalidad || 'No especificado' }
            ])}
            
            {/* Sección Otros Datos */}
            {renderSeccion('Otros Datos', [
              { label: 'Situación laboral', value: form.datos.situacionLaboral || 'No especificado' },
              { label: 'Ingreso mensual', value: form.datos.ingresoMensual ? `${form.datos.ingresoMensual}` : 'No especificado' },
              { label: 'Recibe subsidio', value: form.datos.recibeSubsidio || 'No especificado' },
              { label: 'Tipo de subsidio', value: form.datos.tipoSubsidio || 'No especificado' }
            ])}
            
            {/* Sección Motivos de Consulta */}
            {renderSeccion('Motivos de Consulta', [
              { 
                label: 'Motivos seleccionados', 
                value: motivosSeleccionados.length > 0 ? motivosSeleccionados.join(', ') : 'Ninguno seleccionado' 
              },
              { label: 'Otros motivos', value: form.datos.otrosMotivos || 'No especificado' },
              { label: 'Observaciones', value: form.datos.observaciones || 'No especificado' }
            ])}
          </div>
        </Card>
      </div>
      
      {/* Versión para impresión */}
      <div className="print-only" ref={printRef}>
        <div className="mb-8 text-center">
          <h1 className="text-2xl font-bold mb-2">Municipalidad de Santa Rosa</h1>
          <h2 className="text-xl font-semibold mb-2">Formulario Digital</h2>
          <p>Fecha: {formatDate(form.fecha)}</p>
          <p>ID: {form.id}</p>
        </div>
        
        <div className="mb-6">
          <h2 className="text-xl font-semibold mb-4 pb-2 border-b text-black">
            {form.datos.nombre} {form.datos.apellido}
          </h2>
          
          {/* Sección Datos Personales */}
          <div className="mb-5">
            <h3 className="text-lg font-medium mb-3 pb-2 border-b">Datos Personales</h3>
            <div className="grid grid-cols-2 gap-2">
              <div><strong>Nombre:</strong> {form.datos.nombre || 'No especificado'}</div>
              <div><strong>Apellido:</strong> {form.datos.apellido || 'No especificado'}</div>
              <div><strong>DNI:</strong> {form.datos.dni || 'No especificado'}</div>
              <div><strong>Teléfono:</strong> {form.datos.telefono || 'No especificado'}</div>
              <div className="col-span-2"><strong>Dirección:</strong> {form.datos.direccion || 'No especificado'}</div>
              <div><strong>Email:</strong> {form.datos.email || 'No especificado'}</div>
              <div><strong>Personas en el hogar:</strong> {form.datos.cantidadPersonas || 'No especificado'}</div>
            </div>
          </div>
          
          {/* Sección Materiales e Insumos */}
          <div className="mb-5">
            <h3 className="text-lg font-medium mb-3 pb-2 border-b">Materiales e Insumos</h3>
            <div>
              <p><strong>Materiales seleccionados:</strong> {materialesSeleccionados.length > 0 ? materialesSeleccionados.join(', ') : 'Ninguno seleccionado'}</p>
              <p><strong>Otros materiales:</strong> {form.datos.otrosMateriales || 'No especificado'}</p>
            </div>
          </div>
          
          {/* Sección Tipo de Vivienda */}
          <div className="mb-5">
            <h3 className="text-lg font-medium mb-3 pb-2 border-b">Tipo de Vivienda</h3>
            <div className="grid grid-cols-2 gap-2">
              <div><strong>Tipo:</strong> {form.datos.tipoVivienda || 'No especificado'}</div>
              <div><strong>Estado:</strong> {form.datos.estadoVivienda || 'No especificado'}</div>
              <div><strong>Ambientes:</strong> {form.datos.cantidadAmbientes || 'No especificado'}</div>
              <div><strong>Agua:</strong> {form.datos.tieneAgua || 'No especificado'}</div>
              <div><strong>Luz:</strong> {form.datos.tieneLuz || 'No especificado'}</div>
              <div><strong>Gas:</strong> {form.datos.tieneGas || 'No especificado'}</div>
            </div>
          </div>
          
          {/* Sección Modalidad */}
          <div className="mb-5">
            <h3 className="text-lg font-medium mb-3 pb-2 border-b">Modalidad</h3>
            <div>
              <p><strong>Modalidad:</strong> {form.datos.modalidad || 'No especificado'}</p>
              <p><strong>Detalle:</strong> {form.datos.detalleModalidad || 'No especificado'}</p>
            </div>
          </div>
          
          {/* Sección Otros Datos */}
          <div className="mb-5">
            <h3 className="text-lg font-medium mb-3 pb-2 border-b">Otros Datos</h3>
            <div className="grid grid-cols-2 gap-2">
              <div><strong>Situación laboral:</strong> {form.datos.situacionLaboral || 'No especificado'}</div>
              <div><strong>Ingreso mensual:</strong> {form.datos.ingresoMensual ? `${form.datos.ingresoMensual}` : 'No especificado'}</div>
              <div><strong>Recibe subsidio:</strong> {form.datos.recibeSubsidio || 'No especificado'}</div>
              <div><strong>Tipo de subsidio:</strong> {form.datos.tipoSubsidio || 'No especificado'}</div>
            </div>
          </div>
          
          {/* Sección Motivos de Consulta */}
          <div className="mb-5">
            <h3 className="text-lg font-medium mb-3 pb-2 border-b">Motivos de Consulta</h3>
            <div>
              <p><strong>Motivos seleccionados:</strong> {motivosSeleccionados.length > 0 ? motivosSeleccionados.join(', ') : 'Ninguno seleccionado'}</p>
              <p><strong>Otros motivos:</strong> {form.datos.otrosMotivos || 'No especificado'}</p>
              <p><strong>Observaciones:</strong> {form.datos.observaciones || 'No especificado'}</p>
            </div>
          </div>
          
          <div className="mt-8 border-t pt-4 text-center text-sm">
            <p>Documento generado por el Sistema de Formularios Digitales - Municipalidad de Santa Rosa</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DetalleFormulario;