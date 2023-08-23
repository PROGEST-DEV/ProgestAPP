// Custom components
// Custom components
import Form from 'components/form/Form';

export default function New() {
	const fields = [
		{ label: 'Número de Recibo', type: 'text' },
		{ label: 'Fecha', type: 'text' },
		{ label: 'Monto en colones', type: 'text' },
	  ];

	return (
		<Form
		title='Nuevo Recibo'
        button='Crear Recibo'
		fields={null}
		onSubmit={null}/>
	);
}