import SelectInput from "./SelectInput"

const Form = ({ form, handleChange, handleSubmit, setForm, stateProduct, handleAddType }) => {
    const handleCancel = () => {
        setForm({ ...stateProduct, productTypes: form.productTypes })
    }
    return (
        <div className="lg:w-1/3 md:w-1/2 w-full p-3">
            <h1 className="text-2xl mb-6">{form.id ? `Editar producto ${form.name}` : 'Agregar producto'}</h1>
            <form className="w-full max-w-sm rounded" onSubmit={handleSubmit}>
                <div>
                    <label className="black text-gray-700 text-sm font-bold mb-2" htmlFor="name">Name</label>
                    <input type="text" id="name"
                        name="name"
                        className="relative w-full bg-white border border-gray-300 rounded-md shadow-sm pl-3 pr-10 py-2 text-left cursor-default focus:outline-none focus:ring-1 focus:ring-yellow-500 focus:border-yellow-500 sm:text-sm"
                        placeholder="Nombre de producto"
                        value={form.name}
                        onChange={({ target }) => handleChange({ field: target.name, value: target.value })}
                    />
                </div>
                <div>
                    <SelectInput productTypes={form.productTypes} form={form} handleChange={handleChange} handleAddType={handleAddType} />
                </div>
                <div>
                    <label className="black text-gray-700 text-sm font-bold mb-2" htmlFor="count">Cantidad</label>
                    <input type="number" id="count"
                        name="count"
                        min="0"
                        className="relative w-full bg-white border border-gray-300 rounded-md shadow-sm px-3 py-2 text-left cursor-default focus:outline-none focus:ring-1 focus:ring-yellow-500 focus:border-yellow-500 sm:text-sm"
                        placeholder="Total en stock"
                        value={form.count}
                        onChange={({ target }) => handleChange({ field: target.name, value: target.value })}
                    />
                </div>
                <div>
                    <label className="black text-gray-700 text-sm font-bold mb-2" htmlFor="active">En stock</label>
                    <input type="checkbox" id="active"
                        name="active"
                        className="ml-3 mt-3 form-checkbox"
                        checked={form.active}
                        onChange={({ target }) => handleChange({ field: target.name, value: !form.active })}
                    />
                </div>
                <div className="flex my-7 justify-between">
                    <button type="submit" className="bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-2 px-5 rounded-full focus:outline-none">
                        {form.id ? `Guardar cambios` : 'Crear producto'}
                    </button>
                    {form.id &&
                        <button onClick={handleCancel} type="submit" className="bg-gray-500 hover:bg-gray-600 text-white font-bold py-2 px-5 rounded-full focus:outline-none">
                            Cancelar
                        </button>
                    }
                </div>
            </form>
        </div>
    );
}

export default Form;