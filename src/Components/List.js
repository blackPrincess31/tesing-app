import React from 'react';
import ListItem from './List_Item';


function List ({ notes, isFiltered, onDeleted, onDeletedTag, onEdited }) {

    const note = notes.map(
            ({ id, note, tags }) => 
            <ListItem

                id={ id }
                key={ id }
                note={ note }
                tags={ tags }
                isFiltered={ isFiltered }
                onDeleted= { () => onDeleted(id) }
                onDeletedTag={ (e) => onDeletedTag(id, e) }
                onEdited={ onEdited }
            />
        );

        
    return (
        <ul >
            { note }
        </ul>
    );
}

export default List;