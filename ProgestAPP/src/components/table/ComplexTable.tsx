import React, { useMemo, useState } from 'react';
import {
	Box,
	Flex,
	Table,
	Tbody,
	Td,
	Text,
	Th,
	Thead,
	Tr,
	useColorModeValue,
	Icon
} from '@chakra-ui/react';
import {
	createColumnHelper,
	flexRender,
	getCoreRowModel,
	getSortedRowModel,
	SortingState,
	useReactTable,
} from '@tanstack/react-table';
import Card from 'components/card/Card';
import TransparentMenu from 'components/menu/TransparentMenu';
import Empty from 'components/exceptions/Empty';
import { NavLink } from 'react-router-dom';
import { IoEllipsisVertical } from 'react-icons/io5';


function ComplexTable<T>(props: { tableData: T[] }) {
	const { tableData } = props;
	const columnHelper = createColumnHelper<T>();
	const [sorting, setSorting] = useState<SortingState>([]);
	const textColor = useColorModeValue('secondaryGray.900', 'white');
	const borderColor = useColorModeValue('gray.200', 'whiteAlpha.100');
	const brandStars = useColorModeValue('brand.500', 'brand.400');

	const [data, setData] = useState([...tableData]);

	const translations: { [key: string]: string } = {
		'code': 'Código',
		'date': 'Fecha',
		'amount': 'Monto'
	};

	const columns = useMemo(() => {
		if (!tableData || tableData.length === 0) {
			return null;
		}
		return Object.keys(tableData[0])
		.filter(key => !key.toLowerCase().includes('id'))
		.map((key) => {
			const translatedKey = translations[key] || key;
			console.log("translatedKey", translatedKey);
			return columnHelper.accessor(
				(row: T) => key, 
				{
					id: key,
					header: () => (
						<Text
						justifyContent='space-between'
						align='center'
						fontSize={{ sm: '10px', lg: '12px' }}
						color='gray.400'
						>
						{translatedKey.toUpperCase()}
						</Text>
					),
					cell: (info: any) => (
						<Text color={textColor} fontSize='sm' fontWeight='700'>
						{info.row.original[key]}
						</Text>
					),
				}
			);
		});
	}, []);

	const table = useReactTable({
		data,
		columns,
		state: {
			sorting,
		},
		onSortingChange: setSorting,
		getCoreRowModel: getCoreRowModel(),
		getSortedRowModel: getSortedRowModel(),
		debugTable: true,
	});

	const renderTableContent = () => {
		if (columns === null) {
		  return <Empty />;
		}
		return(
			<Table variant='simple' color='gray.500' mb='24px' mt='12px'>
				<Thead>
					{table.getHeaderGroups().map((headerGroup) => (
					<Tr key={headerGroup.id}>
						<Th borderColor={borderColor}></Th>
						{headerGroup.headers.map((header) => (
						<Th
							key={header.id}
							colSpan={header.colSpan}
							pe='10px'
							borderColor={borderColor}
							cursor='pointer'
							onClick={header.column.getToggleSortingHandler()}
						>
							<Flex
							justifyContent='space-between'
							align='center'
							fontSize={{ sm: '10px', lg: '12px' }}
							color='gray.400'
							>
							{flexRender(header.column.columnDef.header, header.getContext())}
							{
								{
								asc: '',
								desc: '',
								}
								[header.column.getIsSorted() as string] || null
							}
							</Flex>
						</Th>
						))}
						<Th borderColor={borderColor}></Th>
					</Tr>
					))}
				</Thead>
				<Tbody>
					{table.getRowModel().rows.slice(0, 5).map((row) => (
						<Tr key={row.id}>
							<Td>
							<TransparentMenu
								ms='auto'
								mb='0px'
								icon={<Icon as={IoEllipsisVertical} w='24px' h='24px' color={textColor} />}
							/>
							</Td>
							{row.getVisibleCells().map((cell) => (
								
								<Td
									key={cell.id}
									fontSize={{ sm: '14px' }}
									width='auto'
									borderColor='transparent'
								>
									{flexRender(cell.column.columnDef.cell, cell.getContext())}
								</Td>
								
							))}
							<Td>
								<NavLink to="/project/index">
									<Text
										color={brandStars}
										as="span"
										ms="5px"
										fontWeight="500"
										textAlign="center"
									>
										Ver más
									</Text>
                    			</NavLink>
							</Td>
						</Tr>
					))}
				</Tbody>
			</Table>
		);
	};

	return (
		<Card flexDirection='column' w='auto' px='0px' overflowX={{ sm: 'scroll', lg: 'hidden' }}>
			<Box overflowX='auto'>
				{renderTableContent()}
			</Box>
		</Card>
	);
}
  
  export default ComplexTable;
  