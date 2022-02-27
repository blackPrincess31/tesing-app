import React, { useState } from 'react';

const ListItem = ({ id, note, tags, isFiltered, onDeleted, onDeletedTag, onEdited }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [newTextOfNote, setNewTextOfNote] = useState('');

    const HandleChange = (e) => {
        setNewTextOfNote(e.target.value);
    }

    const HandleSubmit = (e) => {
        e.preventDefault();
        onEdited(id, newTextOfNote);
        setNewTextOfNote('');
        setIsEditing(false);
    }

    const tagsFormatted = [];
    tags.forEach(item => tagsFormatted.push(
        <div>
            <li >
                <span className='tags'>{ item }</span>
                <button  className='btn' onClick={ onDeletedTag } value={ item }>delete_tag</button>
            </li>
        </div>
        ));

    const tagsFormattedWithConditionalRendering = (tagsFormatted.length > 0) ?
            <div>
                { tagsFormatted }
            </div>
        :
            null;

    if (isFiltered === false && isEditing === false) {
        return (
            <li >
                <div >
                    <button className='btn' onClick={() => setIsEditing(true)}>edit</button>
                    <button className='btn' onClick={ onDeleted }>delete</button>
                </div>
                <p >{ note }</p>
                <span>
                { tagsFormattedWithConditionalRendering }
                </span>
            </li>
        );
    }

    if (isFiltered === false && isEditing === true) {
        return (
            <li >
                <form onSubmit={HandleSubmit}>
                <textarea
                    placeholder="Type in new text here"
                    value={newTextOfNote}
                    onChange={HandleChange}
                />
                <div>
                    <input  type="submit" value="Save"/>
                    <button onClick={() => setIsEditing(false)}>Cancel</button>
                </div>
                </form>
            </li>
        );
    }

    if (isFiltered) {
        const tagsFormattedWhenFiltered = [];
        tags.forEach(item => tagsFormattedWhenFiltered.push(<span>{ item }</span>));

        return (
            <li>
                <p >{ note }</p>
                <hr />
                <li>
                    { tagsFormattedWhenFiltered }
                </li>
            </li>
        );
    }
}

export default ListItem;
