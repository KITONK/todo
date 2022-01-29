import React, {useState} from 'react';
import close from '../../assets/img/close.png';

import './AddButtonList.css';

const AddButtonList = ({onAdd}) => {

    const [visiblePopup, setVisiblePopup] = useState(false);
    const [inputValue, setInputValue] = useState('');

    const onClose = () => {
        setVisiblePopup(false);
        setInputValue('');
    }

    const addList = () => {
        if(!inputValue){
            alert('Enter list name');
            return;
        }
        onAdd({id: Math.random(), name: inputValue});
        onClose();
    }

    return (
        <div className="add-list">
        <button onClick={() => setVisiblePopup(true)} className="todo__btn">Add list</button>
        {visiblePopup && (
        <div className="add-list__popup">
            <img 
                onClick={onClose}
                width ="20"
                height="20"
                src={close}
                className="add-list__popop-close-btn"
                alt="close"
            />
            <input value={inputValue} onChange={e => setInputValue(e.target.value)} className="field" placeholder="List name"/>
            {/* <div className="add-list__popup-image">
                <ul>
                    <li><i><img src={image} width="20" height="20"/></i></li>
                </ul>
            </div> */}
            <button onClick={addList} className="button">Add</button>
        </div>
        )}
        </div>
    );
};

export default AddButtonList;