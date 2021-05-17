import { useState } from 'react';

const useInput = (initialValue) => {
    const [value, setValue] = useState(initialValue);
    const handleChange = (e) => {
        // console.log('event', e.target.value);
        setValue(e.target?.value);
    };
    return [value, handleChange];
};

export default useInput;
