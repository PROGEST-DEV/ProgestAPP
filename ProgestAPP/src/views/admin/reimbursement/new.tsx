// Custom components
// Custom components
import Form from 'components/form/Form';

export default function New() {
	const fields = [
		{ label: 'Consecutivo', type: 'text' },
		{ label: 'Fecha', type: 'text' },
		{ label: 'Monto en colones', type: 'text' },
	  ];

	return (
		<Form
		title='Nuevo Reembolso'
        button='Crear Reembolso'
		fields={null}
		onSubmit={null}/>
	);
}