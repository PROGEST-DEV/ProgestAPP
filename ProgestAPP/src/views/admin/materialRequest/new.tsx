// Custom components
// Custom components
import Form from 'components/form/Form';

export default function New() {
	const fields = [
		{ label: 'Consecutivo', type: 'text' },
		{ label: 'Cuenta de gasto', type: 'text' },
		{ label: 'Fecha', type: 'text' },
		{ label: 'Monto en colones', type: 'text' },
	  ];

	return (
		<Form
		title='Nueva Solicitud de Material'
        button='Crear Solicitud de Material'
		fields={null}
		onSubmit={null}/>
	);
}