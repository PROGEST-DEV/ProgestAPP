import { Portal, Box, useDisclosure } from '@chakra-ui/react';
import Sidebar from 'components/sidebar/Sidebar';
import { SidebarContext } from 'contexts/SidebarContext';
import { Redirect, Route, Switch, useParams } from 'react-router-dom';
import routes from 'routes';
import React, { useState } from 'react';
import Navbar from 'components/navbar/NavbarAdmin';

export default function Dashboard(props: { [x: string]: any }) {
  const { ...rest } = props;
  const { search } = useParams<{ search: string }>();

  const [toggleSidebar, setToggleSidebar] = useState(false);
  const { onOpen } = useDisclosure();

  const currentPath = window.location.href;

  const getActiveRoute = (routes: RoutesType[]): string => {
    const matchingRoute = routes.find(route => currentPath.includes(route.layout + route.path.split("/")[0]));
    return matchingRoute ? matchingRoute.name : 'Default Brand Text';
  };

  const getActiveNavbar = (routes: RoutesType[]): boolean => {
    const matchingRoute = routes.find(route => currentPath.includes(route.layout + route.path.split("/")[0]));
    return matchingRoute ? matchingRoute.secondary : false;
  };

  const getActiveNavbarText = (routes: RoutesType[]): string | boolean => {
    const matchingRoute = routes.find(route => currentPath.includes(route.layout + route.path.split("/")[0]));
    return matchingRoute ? matchingRoute.name : false;
  };

  const getRoutes = (routes: RoutesType[]): JSX.Element[] => {
    const validLayouts = ['/project', '/purchase-order', '/change-order', '/invoice', '/receipt', '/expense', '/pay-roll', '/material-request', '/reimbursement', '/service', '/dashboard'];
    return routes.map((route: RoutesType, key: any) => {
      if (validLayouts.includes(route.layout)) {
        return <Route path={route.layout + route.path} component={route.component} key={key} />;
      } else {
        return null;
      }
    });
  };

  const shouldShowBox = currentPath.includes('/project/index') ||  currentPath.includes('/dashboard/index');
  const size = currentPath.includes('/expense/index') ? '4xl' : 'lg';
  return (
    <Box>
		{shouldShowBox ? (
			<SidebarContext.Provider value={{ toggleSidebar, setToggleSidebar }}>
				<Sidebar routes={routes} display='none' {...rest} />
					<Box
						float='right'
						minHeight='100vh'
						height='100%'
						overflow='auto'
						position='relative'
						maxHeight='100%'
						w={{ base: '100%', xl: 'calc( 100% - 290px )' }}
						maxWidth={{ base: '100%', xl: 'calc( 100% - 290px )' }}
						transition='all 0.33s cubic-bezier(0.685, 0.0473, 0.346, 1)'
						transitionDuration='.2s, .2s, .35s'
						transitionProperty='top, bottom, width'
						transitionTimingFunction='linear, linear, ease'
					>
						<Portal>
						<Navbar
							onOpen={onOpen}
							brandText={getActiveRoute(routes)}
							secondary={getActiveNavbar(routes)}
							message={getActiveNavbarText(routes)}
							fixed={false}
							{...rest}
						/>
						</Portal>
						<Box mx='auto' p={{ base: '20px', md: '30px' }} pe='20px' minH='100vh' pt='50px'>						
							<Switch>
								{getRoutes(routes)}
								<Redirect from='/' to={`/project/index/${search}`} />
							</Switch>
						</Box>
					</Box>
			</SidebarContext.Provider>
  		):(
			<Box mx='auto' p={{ base: '20px', md: '30px' }} pe='20px' maxW={size}>
				<Switch>
					{getRoutes(routes)}
					<Redirect from='/' to='/project/index' />
				</Switch>
			</Box>
		)}
    </Box>
  );
}