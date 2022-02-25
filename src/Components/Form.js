import React, { useState } from 'react';
import Post from './Post'

function Form() {
   
    const [value, setValue] = useState('');
    const [tag, setTag] = useState('');
    const [data, setData] = useState([]);
    const [note, setNote] = useState([]);
    const [json, setJson] = useState(null);

    const handleActive =item =>
    {
        setValue(item);
    };

    const noteChange = e => {
        setTag(e.target.value);
    };

    const searchTag = e => {
        e.preventDefault();
        
        // let indexOf_tag = data.findIndex(i => {i.indexOf(tag) !==-1});
        // data.unshift(data[indexOf_tag]);
        // data.splice(indexOf_tag,1,1);
        data.find (i => {i.indexOf(tag)});
        setData(data)
    };

   const handleChange = e => {
        setValue(e.target.value);
        let val = value.split(/(#[a-z\d-]+)/ig);
        for (let i = 0; i < val.length; i++) {
            if (val[i].charAt(0) === "#") {
                let array = [];
                array.push(val[i]);
                setNote(array);
            }
        }
    };

    const handleSubmit = e => {
        e.preventDefault();
        let myJson = {
            data: data,
            note: note
        };
        setData(data.concat(value));
        setJson(JSON.stringify(myJson));
    };

    const delPost = index => {
        let arr = data;
        arr.splice(index,1);
        setData(arr);
    };

    const delHashtag = index => {
        let tag = note;
        let val = value;
        let del = tag.splice(index,1);
        let clearTag = val.substring(0, val.length - 1).replace(del,'');
        setNote(tag);
        setValue(clearTag);
    };

    const edit = index => {
        let val = value;
        let arr = data;
        arr.splice(index,1,val);
        setData(arr);
    };

   
        return (
            <div>
               <Post
                   value={value}
                   data={data}
                   note={note}
                   tag={tag}
                   handleChange={handleChange}
                   delHashtag={delHashtag}
                   delPost={delPost}
                   edit={edit}
                   handleSubmit={handleSubmit}
                   handleActive={handleActive}
                   searchTag={searchTag}
                   noteChange={noteChange}
               />
            </div>
        );
   }

   export default Form;

    

