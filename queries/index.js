import { gql } from "@apollo/client";


export const GET_PRODUCTS = gql`
    query getProducts {
        getProducts {
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

export const GET_PRODUCT_TYPES = gql`
    query getProductTypes {
        getProductTypes {
            id
            name
        }
    }
`;