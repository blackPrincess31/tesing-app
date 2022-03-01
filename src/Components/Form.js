import React, { useState, useEffect } from 'react';
import { customAlphabet } from "nanoid";
import List from './List';
import TagFilter from "./tag-filter";
import ListAddNote from "./ListAddNote";

function Form() {

    const useLocalStorage = (key, defaultValue) => {

        const [storedValue, setStoredValue] = useState(() => {
          try {
            const value = window.localStorage.getItem(key);
      
            if (value) {
              return JSON.parse(value);
            } else {
              window.localStorage.setItem(key, JSON.stringify(defaultValue));
              return defaultValue;
            }
          } catch (err) {
            return defaultValue;
          }
        });
      
        const setValue = newValue => {
          try {
            window.localStorage.setItem(key, JSON.stringify(newValue));
          } catch (err) {}
          setStoredValue(newValue);
        };
      
        return [storedValue, setValue];
      };

    const [notes, setNotes] = useLocalStorage('notes');
    const [isFiltered, setIsFiltered] = useState(false);
    const [notesBeforeFilter, setNotesBeforeFilter] = useState([]);

    const tags = new Set();
    
    const nanoid = customAlphabet('0123456789', 5);
    
    const btn_notes = notes.forEach(item =>
        item.tags.forEach(item => tags.add(item))
    );
        
    function ejectHashtagsFromText (text) {

        const regexAvoidOnlyHashTags = /[^#]/g;
        return text.match(regexAvoidOnlyHashTags).join('');
    }
    
    function findHashtags (text) {
        const regexHashtags = /#\S*/ig;
        const hashtags = text.match(regexHashtags);
    
        return hashtags ? hashtags : [];
    }

    const AddNote = (text) => {
        const notesWithNewItem = [...notes];

        notesWithNewItem.push({
            id: parseInt(nanoid()),
            note: ejectHashtagsFromText(text),
            tags: findHashtags(text)
        });

        setNotes(notesWithNewItem);
    };

    const EditNote = (id, newText) => {
       
        const newNotesArray = [];

        notes.map(item => {
            if (id === item.id) {
                return newNotesArray.push({
                    id,
                    note: ejectHashtagsFromText(newText),
                    tags: findHashtags(newText)
                });
            }
            return newNotesArray.push(item);
        });

        setNotes(newNotesArray);
    };

    const DeleteNote = (id) => {

        const indexOfItemToDelete = notes.findIndex(item => item.id === id);
        const notesWithoutDeletedItem = 
        [
            ...notes.slice(0, indexOfItemToDelete),
            ...notes.slice(indexOfItemToDelete + 1)
        ];

        setNotes(notesWithoutDeletedItem);
    };

    const DeleteTag = (id, e) => {
        e.preventDefault();
        const notesCopy = [...notes];
        const hashtagToDelete = e.target.value;
        const indexOfItemWithTagToDelete = notes.findIndex(item => item.id === id);
       
        notesCopy[indexOfItemWithTagToDelete]["tags"] =
            notes[indexOfItemWithTagToDelete]["tags"].filter(item => item !== hashtagToDelete);

        setNotes(notesCopy);
    };

    const FilterNotes = (value) => {
        setNotesBeforeFilter(notes);

        const notesCopy = [...notes];
        const arrOfFilteredValues = [];
        const filteredData = [];
        notesCopy.map(item => arrOfFilteredValues.push(item.tags.filter(item => item === value)));
        for (let i = 0; i < notesCopy.length; i++) {
            if (arrOfFilteredValues[i].length > 0) {
                filteredData.push(notesCopy[i])
            }
        }

        setIsFiltered(true);
        setNotes(filteredData);
    }

    const ResetFilter = () => {
        setNotes(notesBeforeFilter);
        setIsFiltered(false);
    }


    useEffect(() => {
        document.title = `My_Notes: ${notes.length}`;
    });
  
        return (

            <div className="container">
            <h1> My testing_app</h1>
             <ListAddNote
                onAdded={ AddNote }
                isFiltered={ isFiltered }
            />
            <TagFilter
                tags={ [...tags] }
                isFiltered={ isFiltered }
                onTagsFiltered={ FilterNotes }
                onFilterReset={ ResetFilter }
            />
            <List
                notes={ notes }
                isFiltered={ isFiltered }
                onDeletedTag = { DeleteTag }
                onDeleted={ DeleteNote }
                onEdited={ EditNote }
            />
        </div>
    );
        
    }

    export default Form;



