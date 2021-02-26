import { useState } from "react";
import { useMutation, useQuery } from '@apollo/client';
import { GET_PRODUCTS, GET_PRODUCT_TYPES } from "../../queries";
import { CREATE_PRODUCT, CREATE_TYPE, DELETE_PRODUCT, UPDATE_PRODUCT } from "../../mutations";
import Swal from "sweetalert2";
import { stateProduct } from "./../states";

const onError = ({ graphQLErrors, networkError }) => {
    graphQLErrors.map(({ message, locations, path }) =>
        console.log(
            `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`,
        ),
    );
    if (networkError) console.log(`[Network error]: ${networkError}`);
}

const useProducts = ({ form, setForm }) => {

    const [data, setData] = useState(null);
    useQuery(GET_PRODUCTS, {
        onCompleted({ getProducts }) {
            console.log(getProducts)
            setData(getProducts);

        },
        onError(e) {
            onError(e)
        }
    });

    useQuery(GET_PRODUCT_TYPES, {
        onCompleted({ getProductTypes }) {
            console.log(getProductTypes);
            setForm({ ...form, productTypes: getProductTypes })
        },
        onError(e) {
            onError(e);
        }
    })

    const [create] = useMutation(CREATE_PRODUCT, {
        onCompleted({ createProduct }) {
            console.log("CREADO", createProduct)
            setData([...data, createProduct])
            setForm({ ...stateProduct, productTypes: form.productTypes })

        }
    })

    const [createProductType] = useMutation(CREATE_TYPE, {
        onCompleted({ createProductType }) {
            console.log(createProductType);
            setForm({
                ...form,
                productTypes: form.productTypes.length === 0 ? [createProductType] : [...form.productTypes, createProductType]
            })
        }
    })

    const [update] = useMutation(UPDATE_PRODUCT, {
        onCompleted({ updateProduct }) {
            console.log("UPDATE", updateProduct);
            const products = data.map(product => {
                if (product.id === updateProduct.id) {
                    return { ...product, ...updateProduct }
                }
                return product
            });
            setData(products);
        }
    })

    const [deleteProductMutation] = useMutation(DELETE_PRODUCT, {
        onCompleted({ deleteProduct }) {
            console.log(deleteProduct);
        },
        onError(e) {
            onError(e);
        }
    })

    const createProduct = ({ name, photo, count, active, types }) => {
        console.log("Create product", form, active);
        let input = {
            name,
            photo: "https://cdn.shopify.com/s/files/1/0461/8875/7156/products/Avena-Frente_720x720.jpg?v=1603771638",
            count: Number(count),
            active,
            types: types.map(({ id, name }) => {
                return { id, name }
            })
        }
        console.log(input)
        create({ variables: { input } })

    }

    const updateProduct = ({ id, name, active, count, types }) => {
        let input = {
            id: Number(id),
            name,
            photo: "https://cdn.shopify.com/s/files/1/0461/8875/7156/products/Avena-Frente_720x720.jpg?v=1603771638",
            count: Number(count),
            active,
            types: types.map(({ id, name }) => {
                return { id, name }
            })
        }
        console.log("UPDATE product", input);

        update({ variables: { input } })
    }

    const deleteProduct = id => {
        console.log("Eliminar product", id);
        const products = data.filter(e => e.id !== id);
        setData(products);
        deleteProductMutation({ variables: { id: Number(id) } });
    }

    const handleChange = ({ field, value }) => {
        setForm({
            ...form,
            [field]: value
        })
    }

    const handleEdit = id => {
        const element = data.find(e => e.id === id);
        setForm({ ...element, productTypes: form.productTypes })
    }

    const handleSubmit = e => {
        e.preventDefault();
        form.id ? updateProduct(form) : createProduct(form);
    }

    const handleDelete = id => {
        Swal.fire({
            title: '¿Seguro que desea eliminar este elemento?',
            text: "No lo podrá recuperar después",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Sí, borrar'
        }).then((result) => {
            if (result.isConfirmed) {
                deleteProduct(id);
                Swal.fire(
                    'Completado',
                    'Su archivo ha sido eliminado.',
                    'success'
                )
            }
        })
    }

    const handleAddType = () => {
        Swal.fire({
            title: "Tipo de producto",
            text: "Agrega un nuevo tipo",
            input: 'text',
            showCancelButton: true
        }).then((result) => {
            if (result.value) {
                createProductType({ variables: { input: { name: result.value } } })
            }
        });
        //
    }


    return ({ handleChange, handleEdit, handleSubmit, handleDelete, handleAddType, data });
}

export default useProducts;