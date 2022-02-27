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
            <div className="list">
                <span>{ item }</span>
                <button  className='btn' onClick={ onDeletedTag } value={ item }>delete_tag</button>
            </div>
        ));

    const tagsFormattedWithConditionalRendering = (tagsFormatted.length > 0) ?
            <div className="list">
                { tagsFormatted }
            </div>
        :
            null;

    if (isFiltered === false && isEditing === false) {
        return (
            <li className="list-of-notes__note">
                <div className="list">
                    <button className='btn' onClick={() => setIsEditing(true)}>edit</button>
                    <button className='btn' onClick={ onDeleted }>delete</button>
                </div>
                <p className="list">{ note }</p>
                <hr />
                { tagsFormattedWithConditionalRendering }
            </li>
        );
    }

    if (isFiltered === false && isEditing === true) {
        return (
            <li className="list">
                <form onSubmit={HandleSubmit}>
                <textarea
                    placeholder="Type in new text here"
                    value={newTextOfNote}
                    onChange={HandleChange}
                />
                <div className="list">
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
                <p className="list">{ note }</p>
                <hr />
                <div className="list">
                    { tagsFormattedWhenFiltered }
                </div>
            </li>
        );
    }
}

export default ListItem;
