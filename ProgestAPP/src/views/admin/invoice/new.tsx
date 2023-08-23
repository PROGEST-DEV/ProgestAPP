// Custom components
// Custom components
import Form from 'components/form/Form';

export default function New() {
	const fields = [
		{ label: 'Número de Factura', type: 'text' },
		{ label: 'Fecha', type: 'text' },
		{ label: 'Monto en colones', type: 'text' },
		{ label: 'IVA en colones', type: 'text' },
	  ];

	return (
		<Form
		title='Nueva Factura'
        button='Crear Factura'
		fields={null}
		onSubmit={null}/>
	);
}