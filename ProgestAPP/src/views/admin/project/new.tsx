import { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';

import Form from 'components/form/Form';
import OkModal from 'components/modal/OkModal';
import ProjectService from 'services/ProjectService';
import ProjectItem from 'interfaces/ProjectItem';
import FormField from 'interfaces/FormField';

export default function New() {
	const [showModal, setShowModal] = useState(false);

	const fields: FormField[] = [
		{ label: 'Nombre', name: 'name', type: 'text', value: '' },
		{ label: 'Código interno', name: 'projectCode', type: 'text', value: '' },
		{ label: 'Fecha de solicitud', name: 'requestDate', type: 'date', value: new Date().toISOString().split('T')[0] },
		{ label: 'Cliente', name: 'client', type: 'text', value: '' },
		{ label: 'Tipo', name: 'type', type: 'text', value: '' },
		{ label: 'Presupuesto', name: 'budget', type: 'text', value: '' },
	];

	const handleFormSubmit = async (fieldValues: {[key: string]: string}) => {
		const newProject: ProjectItem = {
			id: uuidv4(),
			status: 'new',
			name: fieldValues.name,
			projectCode: fieldValues.projectCode,
			requestDate: fieldValues.requestDate,
			client: fieldValues.client,
			type: fieldValues.type,
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
        window.location.href = '/project/index';
    };

	return (
		<>
			<Form
			title='Nuevo Proyecto'
			button='Crear Proyecto'
			fields={fields}
			onSubmit={handleFormSubmit}/>

			{showModal && <OkModal message="Proyecto creado correctamente." isOpen={showModal} onClose={closeModalAndRedirect} />}
		</>
	);
}