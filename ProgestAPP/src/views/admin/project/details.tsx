import { useState, useEffect } from 'react';
import { useParams, NavLink, Link } from 'react-router-dom';

import { Button, Center, Text, useColorModeValue, Flex } from '@chakra-ui/react';

import { formatValue } from 'utils/formatValue';
import Form from 'components/form/Form';
import ProjectService from 'services/ProjectService';
import ProjectItem from 'interfaces/ProjectItem';
import FormField from 'interfaces/FormField';
import PurchaseOrderModal from 'components/modal/PurchaseOrderModal';

export default function Details() {
  const brandStars = useColorModeValue('brand.500', 'brand.400');
	const { id } = useParams<{ id: string }>();
  const [fields, setFields] = useState<FormField[]>([]);
  const [isTableModalOpen, setIsTableModalOpen] = useState(false);

  useEffect(() => {    
    if (id) {
      ProjectService.get(id)
        .then((project: ProjectItem) => {
          const newFields: FormField[] = [
            { label: 'Nombre', name: 'name', type: 'text', value: project.name || '' },
            { label: 'Código interno', name: 'projectCode', type: 'text', value: project.projectCode || '' },
            { label: 'Fecha de solicitud', name: 'requestDate', type: 'date', value: project.requestDate.split('T')[0] || '' },
            { label: 'Cliente', name: 'client', type: 'text', value: project.client },
            { label: 'Tipo', name: 'type', type: 'text', value: project.type || ''},
            { label: 'Metros cuadrados', name: 'meters', type: 'money', value: formatValue(project.squareMeters.toString()) || ''},
            { label: 'Presupuesto', name: 'budget', type: 'money', value: formatValue(project.budget.toString()) || ''},
          ];
          setFields(newFields);
        })
        .catch((error) => {
          console.error('Error fetching project data:', error);
        });
    }
  }, [id]);
	return (
		<>
		  {fields.length > 0 && (
        <>
        <Form
          title='Detalles del Proyecto'
          fields={fields}
          back={null}
          onSubmit={null}
          isDisabled={true}
        />
        <Flex direction="row" mt="16px">
          <Button
            variant='darkBrand'
            color='white'
            fontSize='sm'
            fontWeight='500'
            borderRadius='70px'
            py='5px'
            w='100%'
            mr="10px"
            onClick={() => setIsTableModalOpen(true)}
          >
            Ver ingresos
          </Button>
          <Button
            as={Link}
            variant='darkBrand'
            color='white'
            fontSize='sm'
            fontWeight='500'
            borderRadius='70px'
            py='5px'
            w='100%'
            to={`/expense/index/${id}`}
          >
            Ver gastos
          </Button>
        </Flex>
        <Center mt="8px">
          <NavLink to="/project/index">
            <Text
              color={brandStars}
              as="span"   
              fontWeight="500"
              textAlign="center"
            >
              Volver
            </Text>
          </NavLink>
        </Center>
        <PurchaseOrderModal
          title="Ordenes de Compra"
          id={id}
          isOpen={isTableModalOpen}
          onClose={() => setIsTableModalOpen(false)}
        />
    </>
    		  )}
		</>
	  );
}