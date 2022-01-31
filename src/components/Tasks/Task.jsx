import React from 'react';
import check from '../../assets/img/check.png';
import edit from '../../assets/img/edit.png';
import remove from '../../assets/img/close.png';

const Task = ({id, text, list, completed, onRemove, onEdit, onComplete}) => {

    const onChangeCheckbox = e => {
        onComplete(list.id, id, e.target.checked);
    }

    return (
        <div key={id} className="tasks__items-row">
            <div className="checkbox">
                <input onChange={onChangeCheckbox} id={`task-${id}`} type="checkbox" checked={completed} />
                <label htmlFor={`task-${id}`}>
                    <img src={check} width="10" height="10" alt='check'/>
                </label>
            </div>
            <p>{text}</p>
            <div className="tasks__items-row-actions">
                <div onClick={() => onEdit(list.id, {id, text})}>
                    <img src={edit} width="15" height="15" alt='edit'/>
                </div>
                <div onClick={() => onRemove(list.id, id)}>
                    <img src={remove} width="15" height="15" alt='remove'/>
                </div>
            </div>
        </div>
    );
}

export default Task;
