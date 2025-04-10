// Archivo: src/components/Estadisticas.jsx
import { useState, useEffect } from 'react';
import { Card, Button } from 'flowbite-react';
import { 
  Chart as ChartJS, 
  CategoryScale, 
  LinearScale, 
  BarElement, 
  Title, 
  Tooltip, 
  Legend, 
  ArcElement,
  PointElement,
  LineElement
} from 'chart.js';
import { Bar, Pie, Doughnut, Line } from 'react-chartjs-2';
import { useFormData } from '../contexts/FormDataContext';
import { HiDownload } from 'react-icons/hi';
import jsPDF from 'jspdf';
import 'jspdf-autotable';

// Registramos los componentes de ChartJS necesarios
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  PointElement,
  LineElement
);

function Estadisticas() {
  const { allForms } = useFormData();
  const [tipoViviendaData, setTipoViviendaData] = useState({ labels: [], datasets: [] });
  const [materialData, setMaterialData] = useState({ labels: [], datasets: [] });
  const [modalidadData, setModalidadData] = useState({ labels: [], datasets: [] });
  const [serviciosData, setServiciosData] = useState({ labels: [], datasets: [] });
  const [motivosData, setMotivosData] = useState({ labels: [], datasets: [] });
  const [formulariosPorMesData, setFormulariosPorMesData] = useState({ labels: [], datasets: [] });
  
  useEffect(() => {
    if (allForms.length > 0) {
      // Procesar datos para tipo de vivienda
      const tipoViviendaCounts = {};
      allForms.forEach(form => {
        const tipo = form.datos.tipoVivienda || 'No especificado';
        tipoViviendaCounts[tipo] = (tipoViviendaCounts[tipo] || 0) + 1;
      });
      
      setTipoViviendaData({
        labels: Object.keys(tipoViviendaCounts),
        datasets: [
          {
            label: 'Tipo de Vivienda',
            data: Object.values(tipoViviendaCounts),
            backgroundColor: [
              'rgba(54, 162, 235, 0.6)',
              'rgba(75, 192, 192, 0.6)',
              'rgba(255, 206, 86, 0.6)',
              'rgba(255, 99, 132, 0.6)',
              'rgba(153, 102, 255, 0.6)'
            ],
            borderColor: [
              'rgba(54, 162, 235, 1)',
              'rgba(75, 192, 192, 1)',
              'rgba(255, 206, 86, 1)',
              'rgba(255, 99, 132, 1)',
              'rgba(153, 102, 255, 1)'
            ],
            borderWidth: 1
          }
        ]
      });
      
      // Procesar datos para materiales
      const materialesLabels = ['Cemento', 'Ladrillos', 'Hierro', 'Arena', 'Canto', 'Cerámica', 'Pintura', 'Tuberías', 'Cable Eléctrico'];
      const materialesCounts = materialesLabels.map(material => {
        const materialKey = material.toLowerCase().replace(/\s+/g, '').replace(/á/g, 'a').replace(/é/g, 'e').replace(/í/g, 'i');
        return allForms.filter(form => form.datos[materialKey]).length;
      });
      
      setMaterialData({
        labels: materialesLabels,
        datasets: [
          {
            label: 'Materiales Solicitados',
            data: materialesCounts,
            backgroundColor: 'rgba(75, 192, 192, 0.6)',
            borderColor: 'rgba(75, 192, 192, 1)',
            borderWidth: 1
          }
        ]
      });
      
      // Procesar datos para modalidad
      const modalidadCounts = {};
      allForms.forEach(form => {
        const modalidad = form.datos.modalidad || 'No especificado';
        modalidadCounts[modalidad] = (modalidadCounts[modalidad] || 0) + 1;
      });
      
      setModalidadData({
        labels: Object.keys(modalidadCounts),
        datasets: [
          {
            label: 'Modalidad',
            data: Object.values(modalidadCounts),
            backgroundColor: [
              'rgba(255, 99, 132, 0.6)',
              'rgba(54, 162, 235, 0.6)',
              'rgba(255, 206, 86, 0.6)',
              'rgba(75, 192, 192, 0.6)',
              'rgba(153, 102, 255, 0.6)'
            ],
            borderColor: [
              'rgba(255, 99, 132, 1)',
              'rgba(54, 162, 235, 1)',
              'rgba(255, 206, 86, 1)',
              'rgba(75, 192, 192, 1)',
              'rgba(153, 102, 255, 1)'
            ],
            borderWidth: 1
          }
        ]
      });
      
      // Procesar datos para servicios
      const servicios = ['Agua', 'Luz', 'Gas'];
      const serviciosSi = servicios.map(servicio => {
        const servicioKey = `tiene${servicio}`;
        return allForms.filter(form => form.datos[servicioKey] === 'Si').length;
      });
      
      const serviciosNo = servicios.map(servicio => {
        const servicioKey = `tiene${servicio}`;
        return allForms.filter(form => form.datos[servicioKey] === 'No').length;
      });
      
      setServiciosData({
        labels: servicios,
        datasets: [
          {
            label: 'Sí',
            data: serviciosSi,
            backgroundColor: 'rgba(75, 192, 192, 0.6)',
            borderColor: 'rgba(75, 192, 192, 1)',
            borderWidth: 1,
            stack: 'Stack 0'
          },
          {
            label: 'No',
            data: serviciosNo,
            backgroundColor: 'rgba(255, 99, 132, 0.6)',
            borderColor: 'rgba(255, 99, 132, 1)',
            borderWidth: 1,
            stack: 'Stack 0'
          }
        ]
      });
      
      // Procesar datos para motivos de consulta
      const motivosLabels = ['Vivienda', 'Material de construcción', 'Ayuda económica', 'Asesoramiento técnico', 'Subsidio'];
      const motivosCounts = motivosLabels.map(motivo => {
        const motivoKey = motivo.toLowerCase().replace(/\s+/g, '').replace(/ó/g, 'o').replace(/í/g, 'i').replace(/é/g, 'e');
        return allForms.filter(form => form.datos[motivoKey]).length;
      });
      
      setMotivosData({
        labels: motivosLabels,
        datasets: [
          {
            label: 'Motivos de Consulta',
            data: motivosCounts,
            backgroundColor: [
              'rgba(255, 99, 132, 0.6)',
              'rgba(54, 162, 235, 0.6)',
              'rgba(255, 206, 86, 0.6)',
              'rgba(75, 192, 192, 0.6)',
              'rgba(153, 102, 255, 0.6)'
            ],
            borderColor: [
              'rgba(255, 99, 132, 1)',
              'rgba(54, 162, 235, 1)',
              'rgba(255, 206, 86, 1)',
              'rgba(75, 192, 192, 1)',
              'rgba(153, 102, 255, 1)'
            ],
            borderWidth: 1
          }
        ]
      });
      
      // Procesar datos para formularios por mes
      const formulariosPorMes = {};
      const meses = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];
      
      allForms.forEach(form => {
        const fecha = new Date(form.fecha);
        const month = fecha.getMonth(); // 0-11
        const year = fecha.getFullYear();
        const key = `${meses[month]} ${year}`;
        
        formulariosPorMes[key] = (formulariosPorMes[key] || 0) + 1;
      });
      
      // Ordenar las fechas cronológicamente
      const sortedLabels = Object.keys(formulariosPorMes).sort((a, b) => {
        const [monthA, yearA] = a.split(' ');
        const [monthB, yearB] = b.split(' ');
        
        if (yearA !== yearB) {
          return parseInt(yearA) - parseInt(yearB);
        }
        
        return meses.indexOf(monthA) - meses.indexOf(monthB);
      });
      
      setFormulariosPorMesData({
        labels: sortedLabels,
        datasets: [
          {
            label: 'Formularios por Mes',
            data: sortedLabels.map(label => formulariosPorMes[label]),
            backgroundColor: 'rgba(54, 162, 235, 0.6)',
            borderColor: 'rgba(54, 162, 235, 1)',
            borderWidth: 1,
            tension: 0.4,
            fill: false
          }
        ]
      });
    }
  }, [allForms]);
  
  const handleExportPDF = () => {
    const doc = new jsPDF();
    
    // Título
    doc.setFontSize(18);
    doc.text('Estadísticas de Formularios - Santa Rosa', 105, 15, { align: 'center' });
    doc.setFontSize(12);
    doc.text(`Total de formularios: ${allForms.length}`, 105, 25, { align: 'center' });
    doc.text(`Informe generado el: ${new Date().toLocaleDateString('es-AR')}`, 105, 30, { align: 'center' });
    
    // Resumen por tipo de vivienda
    doc.setFontSize(14);
    doc.text('Distribución por Tipo de Vivienda', 14, 45);
    
    const tipoViviendaTable = Object.entries(
      allForms.reduce((acc, form) => {
        const tipo = form.datos.tipoVivienda || 'No especificado';
        acc[tipo] = (acc[tipo] || 0) + 1;
        return acc;
      }, {})
    ).map(([tipo, cantidad]) => [tipo, cantidad, `${((cantidad / allForms.length) * 100).toFixed(1)}%`]);
    
    doc.autoTable({
      startY: 50,
      head: [['Tipo de Vivienda', 'Cantidad', 'Porcentaje']],
      body: tipoViviendaTable,
      theme: 'striped',
      headStyles: { fillColor: [59, 130, 246] }
    });
    
    // Resumen por materiales
    let currentY = doc.previousAutoTable.finalY + 10;
    
    doc.setFontSize(14);
    doc.text('Materiales Solicitados', 14, currentY);
    
    const materialesLabels = ['Cemento', 'Ladrillos', 'Hierro', 'Arena', 'Canto', 'Cerámica', 'Pintura', 'Tuberías', 'Cable Eléctrico'];
    const materialesTable = materialesLabels.map(material => {
      const materialKey = material.toLowerCase().replace(/\s+/g, '').replace(/á/g, 'a').replace(/é/g, 'e').replace(/í/g, 'i');
      const cantidad = allForms.filter(form => form.datos[materialKey]).length;
      return [material, cantidad, `${((cantidad / allForms.length) * 100).toFixed(1)}%`];
    });
    
    doc.autoTable({
      startY: currentY + 5,
      head: [['Material', 'Cantidad', 'Porcentaje']],
      body: materialesTable,
      theme: 'striped',
      headStyles: { fillColor: [59, 130, 246] }
    });
    
    // Resumen por modalidad
    currentY = doc.previousAutoTable.finalY + 10;
    
    doc.setFontSize(14);
    doc.text('Distribución por Modalidad', 14, currentY);
    
    const modalidadTable = Object.entries(
      allForms.reduce((acc, form) => {
        const modalidad = form.datos.modalidad || 'No especificado';
        acc[modalidad] = (acc[modalidad] || 0) + 1;
        return acc;
      }, {})
    ).map(([modalidad, cantidad]) => [modalidad, cantidad, `${((cantidad / allForms.length) * 100).toFixed(1)}%`]);
    
    doc.autoTable({
      startY: currentY + 5,
      head: [['Modalidad', 'Cantidad', 'Porcentaje']],
      body: modalidadTable,
      theme: 'striped',
      headStyles: { fillColor: [59, 130, 246] }
    });
    
    // Resumen por motivos de consulta
    if (doc.previousAutoTable.finalY > 240) {
      doc.addPage();
      currentY = 20;
    } else {
      currentY = doc.previousAutoTable.finalY + 10;
    }
    
    doc.setFontSize(14);
    doc.text('Motivos de Consulta', 14, currentY);
    
    const motivosLabels = ['Vivienda', 'Material de construcción', 'Ayuda económica', 'Asesoramiento técnico', 'Subsidio'];
    const motivosTable = motivosLabels.map(motivo => {
      const motivoKey = motivo.toLowerCase().replace(/\s+/g, '').replace(/ó/g, 'o').replace(/í/g, 'i').replace(/é/g, 'e');
      const cantidad = allForms.filter(form => form.datos[motivoKey]).length;
      return [motivo, cantidad, `${((cantidad / allForms.length) * 100).toFixed(1)}%`];
    });
    
    doc.autoTable({
      startY: currentY + 5,
      head: [['Motivo', 'Cantidad', 'Porcentaje']],
      body: motivosTable,
      theme: 'striped',
      headStyles: { fillColor: [59, 130, 246] }
    });
    
    // Información adicional
    currentY = doc.previousAutoTable.finalY + 10;
    
    // Agregar pie de página a todas las páginas
    const pageCount = doc.internal.getNumberOfPages();
    for (let i = 1; i <= pageCount; i++) {
      doc.setPage(i);
      doc.setFontSize(8);
      doc.text('Municipalidad de Santa Rosa - Sistema de Formularios Digitales', 105, 287, { align: 'center' });
    }
    
    doc.save('estadisticas-santa-rosa.pdf');
  };
  
  // Opciones comunes para gráficos
  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        font: {
          size: 16
        }
      }
    }
  };
  
  // Opciones específicas para gráfico de servicios
  const serviciosOptions = {
    ...options,
    scales: {
      x: {
        stacked: true,
      },
      y: {
        stacked: true,
        beginAtZero: true
      }
    }
  };
  
  // Opciones específicas para gráfico de línea
  const lineOptions = {
    ...options,
    scales: {
      y: {
        beginAtZero: true
      }
    }
  };
  
  return (
    <div className="max-w-7xl mx-auto">
      <div className="mb-6 flex flex-wrap justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Estadísticas</h1>
          <p className="text-gray-600">Análisis de los datos recopilados en los formularios.</p>
        </div>
        
        <Button color="purple" onClick={handleExportPDF} disabled={allForms.length === 0}>
          <HiDownload className="mr-2 h-5 w-5" />
          Exportar Estadísticas (PDF)
        </Button>
      </div>
      
      {allForms.length === 0 ? (
        <Card>
          <div className="text-center py-8">
            <h2 className="text-xl font-semibold text-gray-700 mb-2">No hay datos suficientes</h2>
            <p className="text-gray-600">
              Complete formularios para generar estadísticas y visualizaciones.
            </p>
          </div>
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Gráfico de Tipos de Vivienda */}
          <Card>
            <h2 className="text-lg font-semibold text-gray-800 mb-4">Distribución por Tipo de Vivienda</h2>
            <div className="h-64">
              <Pie 
                data={tipoViviendaData} 
                options={{
                  ...options,
                  plugins: {
                    ...options.plugins,
                    title: {
                      ...options.plugins.title,
                      text: `Total: ${allForms.length} formularios`
                    }
                  }
                }} 
              />
            </div>
          </Card>
          
          {/* Gráfico de Materiales */}
          <Card>
            <h2 className="text-lg font-semibold text-gray-800 mb-4">Materiales Solicitados</h2>
            <div className="h-64">
              <Bar 
                data={materialData} 
                options={options} 
              />
            </div>
          </Card>
          
          {/* Gráfico de Modalidad */}
          <Card>
            <h2 className="text-lg font-semibold text-gray-800 mb-4">Distribución por Modalidad</h2>
            <div className="h-64">
              <Doughnut 
                data={modalidadData} 
                options={options} 
              />
            </div>
          </Card>
          
          {/* Gráfico de Servicios */}
          <Card>
            <h2 className="text-lg font-semibold text-gray-800 mb-4">Disponibilidad de Servicios</h2>
            <div className="h-64">
              <Bar 
                data={serviciosData} 
                options={serviciosOptions} 
              />
            </div>
          </Card>
          
          {/* Gráfico de Motivos de Consulta */}
          <Card>
            <h2 className="text-lg font-semibold text-gray-800 mb-4">Motivos de Consulta</h2>
            <div className="h-64">
              <Pie 
                data={motivosData} 
                options={options} 
              />
            </div>
          </Card>
          
          {/* Gráfico de Formularios por Mes */}
          <Card>
            <h2 className="text-lg font-semibold text-gray-800 mb-4">Formularios por Mes</h2>
            <div className="h-64">
              <Line 
                data={formulariosPorMesData} 
                options={lineOptions} 
              />
            </div>
          </Card>
          
          {/* Resumen estadístico */}
          <Card className="md:col-span-2">
            <h2 className="text-lg font-semibold text-gray-800 mb-4">Resumen de Datos</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-blue-50 p-4 rounded-lg text-center">
                <p className="text-sm text-blue-600 font-medium">Total de Formularios</p>
                <p className="text-3xl font-bold text-blue-700">{allForms.length}</p>
              </div>
              
              <div className="bg-green-50 p-4 rounded-lg text-center">
                <p className="text-sm text-green-600 font-medium">Material más solicitado</p>
                <p className="text-xl font-bold text-green-700">
                  {materialData.labels && materialData.datasets && materialData.labels[
                    materialData.datasets[0].data.indexOf(Math.max(...materialData.datasets[0].data))
                  ] || 'N/A'}
                </p>
              </div>
              
              <div className="bg-purple-50 p-4 rounded-lg text-center">
                <p className="text-sm text-purple-600 font-medium">Motivo principal</p>
                <p className="text-xl font-bold text-purple-700">
                  {motivosData.labels && motivosData.datasets && motivosData.labels[
                    motivosData.datasets[0].data.indexOf(Math.max(...motivosData.datasets[0].data))
                  ] || 'N/A'}
                </p>
              </div>
            </div>
            
            <div className="mt-6">
              <h3 className="text-md font-medium text-gray-700 mb-3">Tendencias Importantes</h3>
              <ul className="space-y-2 text-gray-700">
                <li className="flex items-start">
                  <span className="inline-block w-2 h-2 bg-blue-500 rounded-full mt-2 mr-2"></span>
                  <span>
                    {tipoViviendaData.labels && tipoViviendaData.datasets && (
                      <>
                        El <strong>{tipoViviendaData.labels[
                          tipoViviendaData.datasets[0].data.indexOf(Math.max(...tipoViviendaData.datasets[0].data))
                        ]}</strong> es el tipo de vivienda más común entre los solicitantes.
                      </>
                    )}
                  </span>
                </li>
                <li className="flex items-start">
                  <span className="inline-block w-2 h-2 bg-green-500 rounded-full mt-2 mr-2"></span>
                  <span>
                    {modalidadData.labels && modalidadData.datasets && (
                      <>
                        La modalidad <strong>{modalidadData.labels[
                          modalidadData.datasets[0].data.indexOf(Math.max(...modalidadData.datasets[0].data))
                        ]}</strong> es la más solicitada.
                      </>
                    )}
                  </span>
                </li>
                <li className="flex items-start">
                  <span className="inline-block w-2 h-2 bg-purple-500 rounded-full mt-2 mr-2"></span>
                  <span>
                    {serviciosData.datasets && (
                      <>
                        <strong>{Math.round((allForms.filter(form => form.datos.tieneAgua === 'Si').length / allForms.length) * 100)}%</strong> de las viviendas cuentan con servicio de agua,
                        <strong> {Math.round((allForms.filter(form => form.datos.tieneLuz === 'Si').length / allForms.length) * 100)}%</strong> con electricidad y
                        <strong> {Math.round((allForms.filter(form => form.datos.tieneGas === 'Si').length / allForms.length) * 100)}%</strong> con gas.
                      </>
                    )}
                  </span>
                </li>
              </ul>
            </div>
          </Card>
        </div>
      )}
    </div>
  );
}

export default Estadisticas;