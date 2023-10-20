import { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { useParams, useHistory } from 'react-router-dom';

import OkModal from 'components/modal/OkModal';
import Form from 'components/form/Form';
import MaterialRequestService from 'services/MaterialRequestService';
import MaterialRequestItem from 'interfaces/MaterialRequestItem';

export default function New() {
	const [showModal, setShowModal] = useState(false);
	const history = useHistory();
	const { id } = useParams<{ id: string }>();

	const fields = [
		{ label: 'Consecutivo', name: 'consecutive', type: 'text', value: '', validation: { required: true, maxLength: 10 } },
		{ label: 'Cuenta de gasto', name: 'expenseAccount', type: 'text', value: '', validation: { required: true } },
		{ label: 'Fecha', name: 'date', type: 'date', value: new Date().toISOString().split('T')[0], validation: { required: true } },
		{ label: 'Monto', name: 'amountUSD', type: 'money', value: '', helper: 'Ingresa la cantidad en dólares', validation: { required: true, maxLength: 21, regex: /^\d{1,3}(,\d{3})*(\.\d{1,2})?$/ } },
		{ label: 'Monto', name: 'amountCOL', type: 'money', value: '', helper: 'Ingresa la cantidad en colones', validation: { required: true, maxLength: 21, regex: /^\d{1,3}(,\d{3})*(\.\d{1,2})?$/ } },
	];
	
	const handleFormSubmit = async (fieldValues: {[key: string]: string}) => {
		if (id) {
			const newMaterialRequest: MaterialRequestItem = {
				id: uuidv4(),
				projectId: id,
				date: `${fieldValues.date}T00:00:00Z`,
				amountUSD: parseFloat(fieldValues.amountUSD),
				amountCOL: parseFloat(fieldValues.amountCOL),
				consecutive: fieldValues.consecutive,
				expenseAccount: fieldValues.expenseAccount,
			};
	
			MaterialRequestService.create(newMaterialRequest)
				.then((response) => {
					console.log('Ok:', response);
					setShowModal(true);
				})
				.catch((error) => {
					console.error('Error:', error);
				});
		}
	};

	const closeModalAndRedirect = () => {
        setShowModal(false);
        history.push(`/expense/index/${id}`);
    };

	return (
		<>
			<Form
			title='Nueva Solicitud de Material'
			button='Crear Solicitud de Material'
			back={`/expense/index/${id}`}
			fields={fields}
			onSubmit={handleFormSubmit}/>

			{showModal && <OkModal message="Solicitud de Material creada correctamente." isOpen={showModal} onClose={closeModalAndRedirect} />}
		</>
	);
}