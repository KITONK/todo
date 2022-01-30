import React, {useState} from 'react';
import close from '../../assets/img/close.png';
import axios from 'axios';

import './AddButtonList.css';

const AddButtonList = ({onAdd}) => { 
    const [visiblePopup, setVisiblePopup] = useState(false);
    const [inputValue, setInputValue] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const onClose = () => {
        setVisiblePopup(false);
        setInputValue('');
    }

    const addList = () => {
        if(!inputValue){
            alert('Enter list name');
            return;
        }
        setIsLoading(true);
        axios.post('http://localhost:3001/lists', {
            name: inputValue
        })
        .then(({data}) =>{
            const listObj = {...data};
            onAdd(listObj);
            onClose();
        })
        .finally(() => {
            setIsLoading(false);
        });
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
            <button onClick={addList} className="button">
                {isLoading ? 'Добавление...' : 'Добавить'}
            </button>
        </div>
        )}
        </div>
    );
};

export default AddButtonList;