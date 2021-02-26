import { gql } from '@apollo/client';

export const DELETE_PRODUCT = gql`
    mutation deleteProduct($id: Int) {
        deleteProduct(id: $id) {
            status
            message
        } 
    } 
`;

export const CREATE_PRODUCT = gql`
    mutation createProduct($input: InputProduct){
        createProduct(input: $input) {
            id
            name
            photo
            active
            count
            types {
                id
                name
            }
        }
    }
`;

export const CREATE_TYPE = gql`
    mutation createProductType($input: InputProductType) {
        createProductType(input: $input) {
            id
            name
        }
    }
`;

export const UPDATE_PRODUCT = gql`
    mutation updateProduct($input: InputUpdate) {
        updateProduct(input:$input) {
            id
            name
            photo
            active
            count
            types {
                id
                name
            }
        }
    }
`;