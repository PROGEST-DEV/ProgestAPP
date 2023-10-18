import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useHistory } from 'react-router-dom';


import { formatValue } from 'utils/formatValue';
import Form from 'components/form/Form';
import OkModal from 'components/modal/OkModal';
import ProjectService from 'services/ProjectService';
import ProjectItem from 'interfaces/ProjectItem';
import FormField from 'interfaces/FormField';

export default function Edit() {
	const { id } = useParams<{ id: string }>();
	const [showModal, setShowModal] = useState(false);
	const [fields, setFields] = useState<FormField[]>([]);
	const history = useHistory();

	useEffect(() => {
		if (id) {

			ProjectService.get(id)
			.then((project: ProjectItem) => {
				const typeList = ['Inspección', 'Diseño', 'Consultoría'];
				if (typeList.includes(project.type)) {
					typeList.sort((a, b) => {
						if (a === project.type) {
						return -1; 
						} else if (b === project.type) {
						return 1; 
						}
						return 0;
					});
				}
				const newFields: FormField[] = [
					{ label: 'Nombre', name: 'name', type: 'text', value: project.name || '', validation: { required: true, maxLength: 50 } },
					{ label: 'Código interno', name: 'projectCode', type: 'text', value: project.projectCode || '', validation: { required: true, regex: /^PDI-[A-Z\d]{2}-[A-Z\d]{3}$/ } },
					{ label: 'Fecha de solicitud', name: 'requestDate', type: 'date', value: project.requestDate.split('T')[0] || '', validation: { required: true } },
					{ label: 'Cliente', name: 'client', type: 'text', value: project.client || '', validation: { required: true, maxLength: 50 } },
					{ label: 'Tipo', name: 'type', type: 'select', value: typeList , validation: { required: true } },
					{ label: 'Metros cuadrados', name: 'squareMeters', type: 'money', value: formatValue(project.squareMeters.toString()) || '', validation: { required: true, maxLength: 21, regex: /^\d{1,3}(,\d{3})*(\.\d{1,2})?$/ } },
					{ label: 'Presupuesto', name: 'budget', type: 'money', value: formatValue(project.budget.toString()) || '', validation: { required: true, maxLength: 21, regex: /^\d{1,3}(,\d{3})*(\.\d{1,2})?$/ } },
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
			squareMeters: parseFloat(fieldValues.squareMeters),
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
        history.push('/project/index');
    };

	return (
		
		fields.length > 0 && (
			<>
				<Form
				title='Actualización de Proyecto'
				button='Actualizar Proyecto'
				back='/project/index'
				fields={fields}
				onSubmit={handleFormSubmit}/>
				{showModal && <OkModal message="Proyecto editado correctamente." isOpen={showModal} onClose={closeModalAndRedirect} />}
			</>
		)
	);
}