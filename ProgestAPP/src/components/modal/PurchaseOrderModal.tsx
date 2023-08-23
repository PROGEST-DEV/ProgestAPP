import React, { useState, useEffect } from 'react';
import { Modal, ModalOverlay, ModalContent, ModalBody, Spinner, Center, Flex, Text, useColorModeValue } from '@chakra-ui/react';
import ComplexTable from 'components/table/ComplexTable';
import AddButton from 'components/button/AddButton';
import PurchaseOrderService from 'services/PurchaseOrderService';
import PurchaseOrderItem from 'interfaces/PurchaseOrderItem';


function PurchaseOrderModal(props:{title: string, id: string, isOpen: boolean, onClose: () => void}) {
    const { title, id, isOpen, onClose } = props;
    const [purchaseOrders, setPurchaseOrders] = useState<PurchaseOrderItem[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const textColor = useColorModeValue('secondaryGray.900', 'white');


    useEffect(() => {
        if (isOpen) {
            setIsLoading(true);
            PurchaseOrderService.getAll()
                .then((purchaseOrderData:  PurchaseOrderItem[]) => {
                    setPurchaseOrders(purchaseOrderData);
                })
                .catch(error => {
                    console.error('Error fetching purchase orders:', error);
                })
                .finally(() => {
                    setIsLoading(false);
                });
        }
    }, [isOpen]);

    return (
        <>
            <Modal  isOpen={isOpen} onClose={onClose} size="auto">
                <ModalOverlay />
                <ModalContent borderRadius="20px"  w='auto'>
                    <ModalBody>
                        {isLoading ? (
                            <Center>
                                <Spinner size="xl" />
                            </Center>
                        ) : (
                            <>
                                <Flex mt='24px' mb='12px' justifyContent='space-between' align='center'>
                                    <Text isTruncated color={textColor} fontSize='22px' fontWeight='700' lineHeight='100%'>
                                        {title}
                                    </Text>
                                    <AddButton redirect={`/purchase-order/new/${id}`}/>
                                </Flex>
                                <ComplexTable tableData={purchaseOrders} />
                            </>
                        )}
                    </ModalBody>
                </ModalContent>
            </Modal>
        </>
    );
}

export default PurchaseOrderModal;
