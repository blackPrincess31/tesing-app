import React, { useState } from 'react';

const ListAddNote = ({ onAdded, isFiltered }) => {
    const [input, setInput] = useState('');

    const OnTextChanged = (e) => {
        setInput(e.target.value);
    }

    const OnTextSubmitted = (e) => {
        e.preventDefault();

        if (input) onAdded(input);

        setInput('');
    }

    if (isFiltered) {
        return null;
    }

    return (
        <form
            className='form'
            onSubmit={OnTextSubmitted}
        >
            <input
                type="text"
                placeholder="new note"
                value={input}
                onChange={OnTextChanged}
            />
            <button>add</button>
        </form>
    );
}

export default ListAddNote;
