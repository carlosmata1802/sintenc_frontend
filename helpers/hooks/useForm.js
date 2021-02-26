import { useState } from "react";

const useForm = ({ initialState }) => {

    const [form, setForm] = useState(initialState);

    return ({
        form, setForm
    });
}

export default useForm;