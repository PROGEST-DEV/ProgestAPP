import React, { useState } from 'react';
import {Box, Button, Flex, Text, useColorModeValue } from '@chakra-ui/react';
import { Link } from 'react-router-dom'; 
// Custom components
import Card from 'components/card/Card';
import Menu from 'components/menu/MainMenu';

export default function ProjectCard(props: {
	id: string
	name: string;
	client: string;
	projectCode: string | number;
}) {
	const { id, name, client, projectCode } = props;
	const [state] = useState({ id });
	const textColor = useColorModeValue('navy.700', 'white');
	const textColorBid = useColorModeValue('brand.500', 'white');
	return (
		<Card p='20px'>
			<Flex direction={{ base: 'column' }} justify='center'>
				<Box position='relative' display='flex' alignItems='center'>
					<Text isTruncated fontWeight='700' fontSize='sm' color={textColorBid}>
						Código: {projectCode}
					</Text>
					<Menu
						ml='auto'
						id={ id }
						name={name} 
					/>
				</Box>
				<Flex  flexGrow={1} flexDirection='column' justify='space-between' h='100%'>
					<Flex
						justify='space-between'
						direction={{
							base: 'row',
							md: 'column',
							lg: 'row',
							xl: 'column',
							'2xl': 'row'
						}}
						mb='auto'>
						<Flex direction='column'>
							<Text 
								isTruncated
								color={textColor}
								fontSize={{
									base: 'xl',
									md: 'lg',
									lg: 'lg',
									xl: 'lg',
									'2xl': 'md',
									'3xl': 'lg'
								}}
								mb='5px'
								fontWeight='bold'
								me='14px'>
								{name}
							</Text>
							<Text
								isTruncated
								color='secondaryGray.600'
								fontSize={{
									base: 'sm'
								}}
								fontWeight='400'
								me='14px'>
								{client}
							</Text>
						</Flex>
					</Flex>
				</Flex>
                <Box
                    pt='15px'
                >
                    <Link
                        to={{
                            pathname: '/project/details',
                            state,
                        }}
                    >
                        <Button
                            variant='darkBrand'
                            color='white'
                            fontSize='sm'
                            fontWeight='500'
                            borderRadius='70px'
                            py='5px'
                            w='100%'
                        >
                            Ver más
                        </Button>
                    </Link>
                </Box>
			</Flex>
		</Card>
	);
}
