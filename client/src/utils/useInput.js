import React, { useState } from 'react';

function useInput(initialValue) {
    const [value, setValue] = useState(initialValue);
    function handleChange(e) {
        console.log('event', e.target.value);
        setValue(e.target.value);
    }
    return [value, handleChange];
}

export default useInput;
