import { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { useHistory } from 'react-router-dom';

import Form from 'components/form/Form';
import OkModal from 'components/modal/OkModal';
import ProjectService from 'services/ProjectService';
import ProjectItem from 'interfaces/ProjectItem';
import FormField from 'interfaces/FormField';

export default function New() {
	const [showModal, setShowModal] = useState(false);
	const history = useHistory();

	const fields: FormField[] = [
		{ label: 'Nombre', name: 'name', type: 'text', value: '', validation: { required: true, maxLength: 50 } },
		{ label: 'Código interno', name: 'projectCode', type: 'text', helper: 'Utiliza el formato PDI-XX-XXX', value: 'PDI-', validation: { required: true, regex: /^PDI-[A-Z\d]{2}-[A-Z\d]{3}$/ } },
		{ label: 'Fecha de solicitud', name: 'requestDate', type: 'date', value: new Date().toISOString().split('T')[0], validation: { required: true } },
		{ label: 'Cliente', name: 'client', type: 'text', value: '', validation: { required: true, maxLength: 50 } },
		{ label: 'Tipo', name: 'type', type: 'select', value: ['Inspección', 'Diseño', 'Consultoría'], validation: { required: true } },
		{ label: 'Metros cuadrados', name: 'squareMeters', type: 'money', value: '', validation: { required: true, maxLength: 21, regex: /^\d{1,3}(,\d{3})*(\.\d{1,2})?$/ } },
		{ label: 'Presupuesto', name: 'budget', type: 'money', value: '', helper: 'Ingresa la cantidad en dólares', validation: { required: true, maxLength: 21, regex: /^\d{1,3}(,\d{3})*(\.\d{1,2})?$/ } },
	];

	const handleFormSubmit = async (fieldValues: {[key: string]: string}) => {
		const newProject: ProjectItem = {
			id: uuidv4(),
			status: 'new',
			name: fieldValues.name,
			projectCode: fieldValues.projectCode,
			requestDate: `${fieldValues.requestDate}T00:00:00Z`,
			client: fieldValues.client,
			type: fieldValues.type,
			squareMeters: parseFloat(fieldValues.squareMeters),
			budget: parseFloat(fieldValues.budget),
		};

		ProjectService.create(newProject)
			.then((response) => {
				console.log('Ok:', response);
				setShowModal(true);
			})
			.catch((error) => {
				console.error('Error:', error);
			});
	};
	

	const closeModalAndRedirect = () => {
        setShowModal(false);
		history.push('/project/index');
    };

	return (
		<>
			<Form
			title='Nuevo Proyecto'
			button='Crear Proyecto'
			back='/project/index'
			fields={fields}
			onSubmit={handleFormSubmit}/>

			{showModal && <OkModal message="Proyecto creado correctamente." isOpen={showModal} onClose={closeModalAndRedirect} />}
		</>
	);
}