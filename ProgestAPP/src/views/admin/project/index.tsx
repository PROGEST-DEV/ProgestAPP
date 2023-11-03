import React, { useState, useEffect, useCallback } from 'react';
import { Box, Flex, Link, useColorModeValue, SimpleGrid, IconButton, Spinner, Center} from '@chakra-ui/react';
import { Link as RLink, useParams, useHistory } from 'react-router-dom';
import { MdAdd } from 'react-icons/md';
import ProjectCard from 'components/card/ProjectCard';
import Empty from 'components/exceptions/Empty';
import Error from 'components/exceptions/Error';
import ProjectService from 'services/ProjectService';
import ProjectItem from 'interfaces/ProjectItem';


export default function Index() {
	let { search = null } = useParams<{ search: string }>();

	const history = useHistory();
	const textColorBrand = useColorModeValue('brand.500', 'white');
    const spinnerColor = useColorModeValue('brand.700', 'white');

	const [projects, setProjects] = useState<ProjectItem[]>([]);
	const [uniqueTypes, setUniqueTypes] = useState([]);
	const [activeType, setActiveType] = useState('Todos');
	const [isLoading, setIsLoading] = useState(false);
	const [isError, setIsError] = useState(false);

	useEffect(() => {
		let promise;
		setIsLoading(true);
		if (search === null || search === ':search') {
		  promise = ProjectService.getAll(['type'], activeType === 'Todos' ? null : activeType);
		} else {
		  promise = ProjectService.getAll(['client', 'name', 'projectcode'], search);
		}
	  
		promise
			.then((projectsData: ProjectItem[]) => {
				setProjects(projectsData);
				if (activeType === 'Todos') {
					const types = projectsData.map((project) => project.type);
					const uniqueTypes = ['Todos', ...Array.from(new Set(types))];
					setUniqueTypes(uniqueTypes);
				}
			})
			.catch((error) => {
				console.error('Error fetching projects:', error);
				setIsError(true);
			})
			.finally(() => {
				setIsLoading(false);
			});	
	}, [search, activeType]);

	const handleTypeClick = useCallback((type: string) => {
		if (type === 'Todos') {
			history.replace('/project/index');
		} 
		setActiveType(type);
	}, [history]);

	return (
		<Box w='100%' pt={{ base: '180px', md: '80px', xl: '80px' }}>
			{isError ? (
        		<Error />
      		) : isLoading ? (
				<Center>
					<Spinner size="xl" variant='darkBrand' color={spinnerColor} />
				</Center>
			) : projects.length === 0 ? (
				<>
					<IconButton
						ml='auto'
						mb='20px'
						colorScheme="brand"
						aria-label="Add project"
						icon={<MdAdd />}
						as={RLink}
						padding="0px 8px"
						borderRadius="100%"
						to="/project/new"
					/>
					<Empty />
				</>
            ) : (
				<Flex flexDirection='column' w='100%'>
					<Flex
						flexWrap="wrap"
						align='center'
						mb='auto'
					>
						{uniqueTypes.map(type => (
							
							<Link
								isTruncated
								key={type}
								color={textColorBrand}
								fontWeight='500'
								onClick={() => handleTypeClick(type)}
								backgroundColor={activeType === type ? 'white' : 'transparent'}
								borderRadius="20px"
								p="10px"
								m="5px"
								maxWidth="150px"
								flex="1"
								textAlign="center"
							>
								{type}
							</Link>
						))}
						<IconButton
							ml='auto'
							mb='20px'
							colorScheme="brand"
							aria-label="Add project"
							icon={<MdAdd />}
							as={RLink}
							padding="0px 8px"
							borderRadius="100%"
							to="/project/new"
						/>
					</Flex>
					<SimpleGrid columns={{ base: 1, md: 4 }} gap='20px'>
						{projects.map(project => (
							<ProjectCard
								key={project.id}
								id={project.id}
								name={project.name}
								client={project.client}
								projectCode={project.projectCode}
							/>
						))}
					</SimpleGrid>
				</Flex>
			)}
		</Box>
	);
}