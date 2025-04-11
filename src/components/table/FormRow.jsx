// Archivo: src/components/table/FormRow.jsx
import { Table, Avatar, Badge, Button, Dropdown } from 'flowbite-react';
import { HiEye, HiPencil, HiTrash, HiDotsVertical } from 'react-icons/hi';
import { motion } from 'framer-motion';

function FormRow({ form, index, formatDate, getInitials, getAvatarColor, handleView, handleEdit, confirmDelete }) {
  return (
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
  );
}

export default FormRow;