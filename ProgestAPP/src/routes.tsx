import { Icon } from '@chakra-ui/react';
import { MdHome, MdLock } from 'react-icons/md';

// Projects Imports
import Projects from 'views/admin/project';
import NewProject from 'views/admin/project/new';
import DetailsProject from 'views/admin/project/details';
import EditProject from 'views/admin/project/edit';

// PurchaseOrder Imports
import NewPurchaseOrder from 'views/admin/purchaseOrder/new';

import NewChangeOrder from 'views/admin/changeOrder/new';
import NewInvoice from 'views/admin/invoice/new';
import NewReceipt from 'views/admin/receipt/new';
import NewPayRoll from 'views/admin/payRoll/new';
import NewMaterialRequest from 'views/admin/materialRequest/new';
import NewReimbursement from 'views/admin/reimbursement/new';
import NewService from 'views/admin/service/new';
// Auth Imports
import SignInCentered from 'views/auth/signIn';
import SignUpCentered from 'views/auth/signUp';

const routes = [
	{
		name: 'Proyectos',
		layout: '/project',
		path: '/index/:search?',
		icon: <Icon as={MdHome} width='20px' height='20px' color='inherit' />,
		component: Projects,
	},
	{
		name: 'Detalles del Proyecto',
		layout: '/project',
		path: '/details',
		component: DetailsProject,
		secondary: true
	},
	{
		name: 'Nuevo Proyecto',
		layout: '/project',
		path: '/new',
		component: NewProject,
		secondary: true
	},
	{
		name: 'Actualizar Proyecto',
		layout: '/project',
		path: '/edit/:id',
		component: EditProject,
		secondary: true
	},
	{
		name: 'Nueva Orden de Compra',
		layout: '/purchase-order',
		path: '/new/:id',
		component: NewPurchaseOrder,
		secondary: true
	},
	{
		name: 'Nueva Orden de Cambio',
		layout: '/change-order',
		path: '/new',
		component: NewChangeOrder,
		secondary: true
	},
	{
		name: 'Nueva Factura',
		layout: '/invoice',
		path: '/new',
		component: NewInvoice,
		secondary: true
	},
	{
		name: 'Nuevo Recibo',
		layout: '/receipt',
		path: '/new',
		component: NewReceipt,
		secondary: true
	},
	{
		name: 'Nueva Planilla',
		layout: '/pay-roll',
		path: '/new',
		component: NewPayRoll,
		secondary: true
	},
	{
		name: 'Nueva Solicitud de Material',
		layout: '/material-request',
		path: '/new',
		component: NewMaterialRequest,
		secondary: true
	},
	{
		name: 'Nuevo Reembolso',
		layout: '/reimbursement',
		path: '/new',
		component: NewReimbursement,
		secondary: true
	},
	{
		name: 'Nuevo Servicio',
		layout: '/service',
		path: '/new',
		component: NewService,
		secondary: true
	},
	{
		name: 'Salir',
		layout: '/auth',
		path: '/sign-in',
		icon: <Icon as={MdLock} width='20px' height='20px' color='inherit' />,
		component: SignInCentered
	},
	{
		name: 'Sign Up',
		layout: '/auth',
		path: '/sign-up',
		icon: null,
		component: SignUpCentered
	},
];

export default routes;
