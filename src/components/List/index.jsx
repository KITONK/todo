import React from 'react';
import './List.css';
import axios from 'axios';

import remove from '../../assets/img/close.png';

const List = ({items, isRemovable, onClick, onRemove}) => {

    const removeList = (item) => {
        if(window.confirm('Are you sure want to delete list?')) {
            axios.delete('http://localhost:3001/lists/' + item.id).then(() => {
                onRemove(item.id);
            })
        }
    }

    return (
        <ul onClick={onClick} className="list">
        {items.map((item, index) => (
            <li key={index} className={item.active ? 'active' : ''}>
                {/* <i>{item.icon}</i> */}
                <span>{item.name}</span>
                {isRemovable && (
                    <img 
                        className="list__remove-icon" 
                        src={remove} 
                        width="10" 
                        height="10" 
                        alt="Remove icon" 
                        onClick={() => removeList(item)}
                    />
                )}
            </li>
        ))
        }
        </ul>
    );
};

export default List;