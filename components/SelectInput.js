import { useState } from "react";


const SelectInput = ({ productTypes, form, handleChange, handleAddType }) => {
    const [show, setShow] = useState(false);

    const verifyTags = value => {
        let tagExist = form.types.find(tag => tag.id === value.id);
        if (tagExist) {
            let newTags = form.types.filter(tag => tag.id !== value.id);
            return newTags;
        }
        return [...form.types, value]
    }

    const handleSelect = value => {
        setShow(!show);
        handleChange({ field: 'types', value: form.types ? verifyTags(value) : [value] });
    }

    const tagsSelected = id => {
        let tag = form.types.find(type => type.id === id);
        return tag !== undefined ? true : false;
    }
    return (
        <div className="mt-4">
            <label id="listbox-label" className="black text-gray-700 text-sm font-bold mb-2">
                Tipo de producto
            </label>
            <div className="mt-1 relative">
                <button type="button" aria-haspopup="listbox" aria-expanded="true" aria-labelledby="listbox-label"
                    className="relative w-full bg-white border border-gray-300 rounded-md shadow-sm pl-3 pr-10 py-2 text-left cursor-default focus:outline-none focus:ring-1 focus:ring-yellow-500 focus:border-yellow-500 sm:text-sm"
                    onClick={() => setShow(!show)}
                >
                    <span className="flex items-center">
                        <span className="ml-3 block truncate">
                            Selecciona una o más opciones
                        </span>
                    </span>
                    <span className="ml-3 absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">

                        <svg className="h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                            <path fillRule="evenodd" d="M10 3a1 1 0 01.707.293l3 3a1 1 0 01-1.414 1.414L10 5.414 7.707 7.707a1 1 0 01-1.414-1.414l3-3A1 1 0 0110 3zm-3.707 9.293a1 1 0 011.414 0L10 14.586l2.293-2.293a1 1 0 011.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clipRule="evenodd" />
                        </svg>
                    </span>
                </button>
                {show &&
                    <div className="absolute mt-1 w-full rounded-md bg-white shadow-lg z-20">
                        <ul tabIndex="-1" role="listbox" aria-labelledby="listbox-label" aria-activedescendant="listbox-item-3" className="max-h-56 rounded-md py-1 text-base ring-1 ring-black ring-opacity-5 overflow-auto focus:outline-none sm:text-sm">
                            {productTypes && productTypes.map(type => (
                                <li key={type.id} id="listbox-item-0"
                                    role="option"
                                    className="text-gray-900 cursor-pointer hover:bg-yellow-500 hover:text-white select-none relative py-2 pl-3 pr-9"
                                    onClick={() => handleSelect(type)}
                                >
                                    <div className="flex items-center">
                                        <span className="ml-3 block font-normal truncate">
                                            {type.name}
                                        </span>
                                    </div>
                                    {form.types && tagsSelected(type.id) &&
                                        <span className="absolute inset-y-0 right-0 flex items-center pr-4">
                                            <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                            </svg>
                                        </span>
                                    }
                                </li>
                            ))}
                            <li id="listbox-item-0"
                                role="option"
                                className="text-gray-900 cursor-pointer hover:bg-yellow-500 hover:text-white select-none relative py-2 pl-3 pr-9"
                                onClick={() => handleAddType()}
                            >
                                <div className="flex items-center">
                                    <span className="ml-3 block font-normal truncate">
                                        + Agregar
                                    </span>
                                </div>
                            </li>
                        </ul>
                    </div>
                }

                <div className="flex my-5">
                    {form.types && form.types.map(type => (
                        <p key={type.id} className="mr-2 px-2 py-1 rounded-full text-gray-900 text-xs bg-gray-300">{type.name}</p>
                    ))}
                </div>
            </div>
        </div>

    );
}

export default SelectInput;