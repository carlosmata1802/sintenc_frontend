//Components
import Form from '../components/Form'
import Products from '../components/Products'
import Layout from '../components/_App.js/Layout'
import { stateProduct } from '../helpers/states';
import useForm from '../helpers/hooks/useForm';
import useProducts from '../helpers/hooks/useProducts';

export default function Home() {
    //Custom hooks
    const { form, setForm } = useForm({ initialState: stateProduct });
    const { handleChange, handleEdit, handleSubmit, handleDelete, handleAddType, data } = useProducts({ form, setForm });

    return (
        <Layout>
            <div className="mt-5 py-5">
                <h1 className="font-bold text-3xl mb-10 text-center">Productos CRUD</h1>
                <div className="flex flex-wrap">
                    <Form
                        form={form}
                        setForm={setForm}
                        handleAddType={handleAddType}
                        stateProduct={stateProduct}
                        handleChange={handleChange}
                        handleSubmit={handleSubmit}
                    />
                    <Products
                        data={data}
                        handleDelete={handleDelete}
                        handleEdit={handleEdit}
                    />
                </div>
            </div>
        </Layout>
    )
}
