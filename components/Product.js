const Product = ({ product, handleDelete, handleEdit }) => {
    return (
        <div className="p-2 lg:w-1/3 md:w-1/2 w-full">
            <div className="border-gray-200 border p-4 rounded-lg">
                <div className="flex mb-3">
                    {product.types && product.types.map(type => (
                        <p key={type.id} className="mr-2 px-2 py-1 rounded-full text-gray-900 text-xs bg-gray-300">{type.name}</p>
                    ))}
                </div>
                <div className="h-full flex items-center">
                    <img alt={product.name} className="w-16 h-16 bg-gray-100 object-cover object-center flex-shrink-0 rounded-full mr-4"
                        src={product.photo || "https://dummyimage.com/80x80"}
                    />
                    <div className="flex-grow">
                        <h2 className="text-gray-900 title-font font-medium">{product.name}</h2>
                        <p className="text-gray-500">{product.active ? 'In stock' : 'Agotado'}</p>
                    </div>
                    <div>
                        Cantidad: <span>{product.count}</span>
                    </div>
                </div>
                <div className="flex mt-3 justify-between">
                    <button onClick={() => handleEdit(product.id)} className="bg-blue-500 hover:bg-blue-400 text-white font-bold py-2 px-5 rounded-full focus:outline-none">
                        Editar
                    </button>
                    <button onClick={() => handleDelete(product.id)} className="bg-red-500 hover:bg-red-400 text-white font-bold py-2 px-5 ml-3 rounded-full focus:outline-none">
                        Eliminar
                    </button>
                </div>
            </div>
        </div>
    );
}

export default Product;