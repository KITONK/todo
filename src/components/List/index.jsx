import React from 'react';
import './List.css';

const List = ({items, isRemovable, onClick}) => {
    return (
        <ul onClick={onClick} className="list">
        {items.map((item, index) => (
            <li key={index} className={item.active ? 'active' : ''}>
                <i>{item.icon}</i>
                <span>{item.name}</span>
            </li>
        ))
        }
        </ul>
    );
};

export default List;