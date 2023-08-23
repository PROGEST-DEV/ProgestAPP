// Custom components
// Custom components
import Form from 'components/form/Form';

export default function New() {
	const fields = [
		{ label: 'Nombre', type: 'text' },
		{ label: 'Salario por hora', type: 'text' },
		{ label: 'Horas laboradas', type: 'text' },
		{ label: 'Horas adicionales', type: 'text' },
		{ label: 'Salario por hora adicional', type: 'text' },
	  ];

	return (
		<Form
		title='Nueva Planilla'
        button='Crear Planilla'
		fields={null}
		onSubmit={null}/>
	);
}