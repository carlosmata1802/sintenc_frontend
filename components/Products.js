import Product from './Product';

const Products = ({ data, handleDelete, handleEdit }) => {
    return (
        <div className="flex flex-wrap -m-2 lg:w-2/3">
            {data && data.map((product, indx) => (
                <Product key={indx} handleDelete={handleDelete} handleEdit={handleEdit} product={product} />
            ))}
        </div>
    );
}

export default Products;