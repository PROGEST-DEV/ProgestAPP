import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

import Form from 'components/form/Form';
import OkModal from 'components/modal/OkModal';
import ProjectService from 'services/ProjectService';
import ProjectItem from 'interfaces/ProjectItem';
import FormField from 'interfaces/FormField';

export default function Edit() {
	const { id } = useParams<{ id: string }>();
	const [showModal, setShowModal] = useState(false);
	const [fields, setFields] = useState<FormField[]>([]);
	useEffect(() => {
		if (id) {
			ProjectService.get(id)
			.then((project: ProjectItem) => {
				const newFields: FormField[] = [
				{ label: 'Nombre', name: 'name', type: 'text', value: project.name || '' },
				{ label: 'Código interno', name: 'projectCode', type: 'text', value: project.projectCode || '' },
				{ label: 'Fecha de solicitud', name: 'requestDate', type: 'date', value: project.requestDate.split('T')[0] || '' },
				{ label: 'Cliente', name: 'client', type: 'text', value: project.client || '' },
				{ label: 'Tipo', name: 'type', type: 'text', value: project.type || '' },
				{ label: 'Presupuesto', name: 'budget', type: 'text', value: project.budget.toString() || '' },
				];
				setFields(newFields);
			})
			.catch((error) => {
				console.error('Error fetching project data:', error);
			});
		}
		}, [id]);

	const handleFormSubmit = async (fieldValues: {[key: string]: string}) => {
		const editedProject: ProjectItem = {
			id: id,
			status: 'new',
			name: fieldValues.name,
			projectCode: fieldValues.projectCode,
			requestDate: fieldValues.requestDate,
			client: fieldValues.client,
			type: fieldValues.type,
			budget: parseFloat(fieldValues.budget),
		};

		ProjectService.edit(id, editedProject)
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
		
		fields.length > 0 && (
			<>
				<Form
				title='Actualización de Proyecto'
				button='Actualizar Proyecto'
				fields={fields}
				onSubmit={handleFormSubmit}/>
				{showModal && <OkModal message="Proyecto editado correctamente." isOpen={showModal} onClose={closeModalAndRedirect} />}
			</>
		)
	);
}