import React, {useState} from 'react';
import add from '../../assets/img/add.png';
import axios from 'axios';

import './Tasks.css';

const AddTaskForm = ({list, onAddTask}) => {

    const [visibleForm, setVisibleForm] = useState(false);
    const [inputValue, setInputValue] = useState('');
    const [isLoading, setIsLoading] = useState('');

    const toogleFormVisible = () => {
        setVisibleForm(!visibleForm);
        setInputValue('');
    }

    const addTask = () => {
        const obj = {
            listId: list.id,
            text: inputValue,
            completed: false,
        };
        setIsLoading(true);
        axios.post('http://localhost:3001/tasks', obj).then(({data}) => {
            onAddTask(list.id, data);
            toogleFormVisible();
        }).catch(() => {
            alert('Error: Adding task');
        }).finally(() => {
            setIsLoading(false);
        });
    }

    return (
        <div className="tasks__form">
            {!visibleForm ? ( 
                    <div onClick={toogleFormVisible} className="tasks__form-new">
                        <img src={add} width="15" height="15" alt="Add icon" />
                        <span>New task</span>
                    </div>
                ) : ( 
                    <div className="tasks__form-block">
                        <input 
                            value={inputValue}
                            onChange={e => setInputValue(e.target.value) }
                            className="field" 
                            placeholder="Task text"/>
                        <button disabled={isLoading} onClick={addTask} className="button">
                           {isLoading ? 'Adding...' : 'Add task'}
                        </button>
                        <button onClick={toogleFormVisible} className="button button-cancel">
                            Cancel
                        </button>
                    </div>
            )}
        </div>
    );
};

export default AddTaskForm;