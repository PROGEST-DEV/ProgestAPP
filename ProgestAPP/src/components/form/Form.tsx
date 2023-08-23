
import { useState } from 'react';
import React from 'react';
import {
  Box,
  Button,
  Center,
  FormControl,
  FormLabel,
  Input,
  Text,
  useColorModeValue,
  Heading,
  Flex,
  FormErrorMessage
} from '@chakra-ui/react';
import { HSeparator } from "components/separator/Separator";
import { NavLink } from 'react-router-dom';
import FormField from 'interfaces/FormField';

const Form = (props:{
  title: string; 
  button?:string; 
  fields: FormField[];
  isDisabled?: boolean;
  onSubmit: (fieldValues: {[key: string]: string}) => void;
  }) => {
    const { title, button, fields, isDisabled } = props;
    const textColor = useColorModeValue('navy.700', 'white');
    const textColorSecondary = 'gray.400';
    const brandStars = useColorModeValue('brand.500', 'brand.400');
    const [fieldValues, setFieldValues] = useState<{ [key: string]: string }>(
      props.fields.reduce((acc, field) => {
        return {
          ...acc,
          [field.name]: field.value,
        };
      }, {} )
      
    );
    const [fieldErrors, setFieldErrors] = useState<{ [key: string]: string }>(
      props.fields.reduce((acc, field) => {
        return {
          ...acc,
          [field.name]: '',
        };
      }, {})
    );
    const handleInputChange = (fieldName: string, value: string) => {
      setFieldValues((prevValues) => ({
        ...prevValues,
        [fieldName]: value,
      }));

      if (value.trim() === '') {
        setFieldErrors((prevErrors) => ({
          ...prevErrors,
          [fieldName]: 'Este campo es requerido',
        }));
      } else {
        setFieldErrors((prevErrors) => ({
          ...prevErrors,
          [fieldName]: '',
        }));
      }
    };
  return (
      <Box me="auto">
        <Heading color={textColor} fontSize="36px" mb="10px" sx={{ letterSpacing: '-0.72px' }}>
          {title}
        </Heading>
        <Text
            mb="36px"
            ms='4px'
            color={textColorSecondary}
            fontWeight="400"
            fontSize="md"
          >
            {!title.includes('Detalles') && (
              <>¡Ingrese todos los datos requeridos!</>
            )}
        </Text>
        <Flex align='center' mb='25px'>
          <HSeparator />
        </Flex>
      <FormControl isDisabled={isDisabled}>
        {fields.map((field, index) => (
          <React.Fragment key={index}>
            <FormLabel
              display="flex"
              ms="4px"
              fontSize="sm"
              fontWeight="500"
              color={textColor}
              mb="4px"
            >
              {field.label}
              <Text color={brandStars}>*</Text>
            </FormLabel>
            <Input
              isRequired={true}
              variant="auth"
              fontSize="sm"
              ms={{ base: '0px', md: '0px' }}
              type={field.type}
              mb="12px"
              fontWeight="500"
              size="md"
              value={fieldValues[field.name]}
              onChange={(e) => handleInputChange(field.name, e.target.value)}
              />
            <FormErrorMessage>{fieldErrors.name}</FormErrorMessage>
          </React.Fragment>
        ))}
        {button !== undefined && (
            <>
                <Button
                    fontSize="sm"
                    variant="brand"
                    fontWeight="500"
                    w="100%"
                    h="50"
                    mb="12px"
                    onClick={() => {
                        props.onSubmit(fieldValues);
                    }}
                >
                    {button}
                </Button>
                <Center>
                    <NavLink to="/project/index">
                        <Text
                            color={brandStars}
                            as="span"
                            ms="5px"
                            fontWeight="500"
                            textAlign="center"
                        >
                            Volver
                        </Text>
                    </NavLink>
                </Center>
            </>
        )}
      </FormControl>
    </Box>
  );
};

export default Form;
