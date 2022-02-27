import React from 'react';
import PropTypes from "prop-types";

function Post(props) {
    return (
        <div className="Post">
            <form className="someText">
                {/* <textarea value={props.value} onChange={props.handleChange} placeholder="Input text"></textarea>
                <button className="save" onClick={props.handleSubmit}>ADD</button> */}
                <input value={props.value} onChange={props.changeValue} />
                <button onClick={props.add}>Добавить элемент</button>
            </form>
            <form className="searchTag">
                {/* <input placeholder="Искать заметку по тегу" value={props.tag} onChange={props.noteChange} />
                <button className="tagButton" onClick={props.searchTag}>Искать</button> */}
            </form>
            <ul className='listBox'>
                {props.data.length > 0 ? props.data.map((item, index) =>
                    <div key={index} className='notes'>
                        {/* <li onClick={() => props.handleActive(item)} className='someNote'>{item}</li>
                        <button onClick={() => props.edit(index)} className='changeNote'>Изменить заметку</button>
                        <button onClick={() => props.delPost(index)} className='delNote'>Удалить заметку</button> */}
                        <li onClick={() => props.handleActive(item)} className='someNote'>
                        {item}
                        </li>
                        <button onClick={() => props.edit } value ={props.value} className='changeNote'>Изменить заметку</button>
                        <button onClick={() => props.remove(index)} className='delNote'>Удалить заметку</button>
                    </div>
                ) : null}
            </ul>
            <ul className='containerNote'>
              {/* {props.note.length > 0 ? props.note.map((item, index) =>
                    <div key={index} className='tags'>
                        <li className='someTag'>{item}</li>
                        <button onClick={() => props.delHashtag(index)} className='delTag'>Удалить тэг</button>
                    </div>
                ) : null}  */}
            </ul>
        </div>
    )
};

Post.propTypes = {
    data: PropTypes.array,
   changeValue: PropTypes.func,
    
    edit: PropTypes.func,
    
    remove: PropTypes.func,
    add: PropTypes.func,
   
  
    value: PropTypes.string,
    
    // data: PropTypes.array,
    // note: PropTypes.array,
    // searchTag: PropTypes.func,
    // edit: PropTypes.func,
    // handleChange: PropTypes.func,
    // delHashtag: PropTypes.func,
    // delPost: PropTypes.func,
    // handleSubmit: PropTypes.func,
    // noteChange: PropTypes.func,
    // json: PropTypes.object,
    // value: PropTypes.string,
    // tag: PropTypes.string
};

export default Post;