import { useState, useEffect } from 'react';
import { useLocation, NavLink, } from 'react-router-dom';
import { Button, Center, Text, useColorModeValue, Flex } from '@chakra-ui/react';
import Form from 'components/form/Form';
import ProjectService from 'services/ProjectService';
import ProjectItem from 'interfaces/ProjectItem';
import FormField from 'interfaces/FormField';
import PurchaseOrderModal from 'components/modal/PurchaseOrderModal';

export default function Details() {
  const brandStars = useColorModeValue('brand.500', 'brand.400');
	const location = useLocation();
	const idFromState = location.state && (location.state as { id?: string }).id;
  const [fields, setFields] = useState<FormField[]>([]);
  const [isTableModalOpen, setIsTableModalOpen] = useState(false);

  useEffect(() => {    
    if (idFromState) {
      ProjectService.get(idFromState)
        .then((project: ProjectItem) => {
          const newFields: FormField[] = [
            { label: 'Nombre', name: 'name', type: 'text', value: project.name || '' },
            { label: 'Código interno', name: 'projectCode', type: 'text', value: project.projectCode || '' },
            { label: 'Fecha de solicitud', name: 'requestDate', type: 'date', value: project.requestDate.split('T')[0] || '' },
            { label: 'Cliente', name: 'client', type: 'text', value: project.client },
            { label: 'Tipo', name: 'type', type: 'text', value: project.type },
            { label: 'Presupuesto', name: 'budget', type: 'text', value: project.budget },
          ];
          setFields(newFields);
        })
        .catch((error) => {
          console.error('Error fetching project data:', error);
        });
    }
  }, [idFromState]);
	return (
		<>
		  {fields.length > 0 && (
        <>
        <Form
          title='Detalles del Proyecto'
          fields={fields}
          onSubmit={null}
          isDisabled={true}
        />
        <Flex direction="row">
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
            variant='darkBrand'
            color='white'
            fontSize='sm'
            fontWeight='500'
            borderRadius='70px'
            py='5px'
            w='100%'
          >
            Ver gastos
          </Button>
        </Flex>
        <Center>
          <NavLink to="/project/index">
            <Text
              color={brandStars}
              as="span"
              ms="5px"
              fontWeight="500"
              textAlign="center"
            >
              Volver
            </Text>
          </NavLink>
        </Center>
        <PurchaseOrderModal
          title="Ordenes de Compra"
          id={idFromState}
          isOpen={isTableModalOpen}
          onClose={() => setIsTableModalOpen(false)}
        />
    </>
    		  )}
		</>
	  );
}