import { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { useParams } from 'react-router-dom';

import Form from 'components/form/Form';
import OkModal from 'components/modal/OkModal';
import PurchaseOrderService from 'services/PurchaseOrderService';
import PurchaseOrderItem from 'interfaces/PurchaseOrderItem';

export default function New() {
	const [showModal, setShowModal] = useState(false);
	const { id } = useParams<{ id: string }>();

	const fields = [
		{ label: 'Código', name: 'code', type: 'text', value: '' },
		{ label: 'Fecha', name: 'date', type: 'date', value: '' },
		{ label: 'Monto', name: 'amount', type: 'number', value: 0 },
	];

	const handleFormSubmit = async (fieldValues: {[key: string]: string}) => {
		if (id) {
			const newPurchaseOrder: PurchaseOrderItem = {
				id: uuidv4(),
				projectId: id,
				code: fieldValues.code,
				date: fieldValues.date,
				amount: parseFloat(fieldValues.amount),
			};
	
			PurchaseOrderService.create(newPurchaseOrder)
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
        window.location.href = '/project/index';
    };

	return (
		<>
			<Form
			title='Nueva Orden de Compra'
			button='Crear Orden de Compra'
			fields={fields}
			onSubmit={handleFormSubmit}/>

			{showModal && <OkModal message="Proyecto creado correctamente." isOpen={showModal} onClose={closeModalAndRedirect} />}
		</>
	);
}