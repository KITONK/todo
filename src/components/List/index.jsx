import React from 'react';
import './List.css';
import axios from 'axios';
import classNames from 'classnames';

import remove from '../../assets/img/close.png';

const List = ({items, isRemovable, onClick, onRemove, onClickItem, activeItem}) => {

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
            <li 
                key={index} 
                className={classNames(item.className, {
                    active: activeItem && activeItem.id === item.id
                })}
                onClick={onClickItem ? () => onClickItem(item) : null}
            >
                {/* <i>{item.icon}</i> */}
                <span>
                    {item.name}
                    <br/>
                    {item.tasks && `${item.tasks.length} Tasks`}
                </span>
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