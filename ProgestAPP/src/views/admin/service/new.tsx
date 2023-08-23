// Custom components
// Custom components
import Form from 'components/form/Form';
import FormField from 'interfaces/FormField';

export default function New() {
	const fields:FormField[] = [/*
		{ label: 'Descripción', type: 'text' },
		{ label: 'Tipo de Pago', type: 'text' },
		{ label: 'Fecha', type: 'text' },
		{ label: 'Monto en colones', type: 'text' },*/
	  ];

	return (
		<Form
		title='Nuevo Servicio'
        button='Crear Servicio'
		fields={fields}
		onSubmit={null}/>
	);
}