import React from 'react';
import alarm from '../../assets/img/notification.png';
import check from '../../assets/img/check.png';
import axios from 'axios';

import './Tasks.css';
import AddTaskForm from './AddTaskForm';

const Tasks = ({list, onEditTitle, onAddTask}) => {

    const editTitle = () => {
        const newTitle = window.prompt('List title', list.name);
        if(newTitle) {
            onEditTitle(list.id, newTitle);
            axios.patch('http://localhost:3001/lists/' + list.id, {
                name: newTitle
            }).catch(() => {
                alert('Failed to update list name');
            });
        }
    }

    return (
        <div className="tasks">
          <div className="todo__title">
              <h2>
                  {list.name}
                  <div>
                    <img src={alarm} width="20" height="20" alt="notification"/>
                        <div onClick={editTitle} className="more">
                            <div className="more__circle"></div>
                            <div className="more__circle"></div>
                            <div className="more__circle"></div>
                        </div>
                    </div>
              </h2>
              <p>Lorem ipsum dolor sit amet, consectetur adipiscing<br/> elit, aliquam.</p>
              <div className="tasks__items">
                  {!list.tasks.length && <h2>No tasks yet</h2>}
                  {list.tasks.map(task =>
                    <div key={task.id} className="tasks__items-row">
                        <div className="checkbox">
                                <input id={`task-${task.id}`} type="checkbox" />
                                <label htmlFor={`task-${task.id}`}>
                                    <img src={check} width="10" height="10" alt='check'/>
                                </label>
                        </div>
                        <input readOnly value={task.text}/>
                    </div>
                    )}
                    <AddTaskForm list={list} onAddTask={onAddTask} />
              </div>
          </div>
        </div>
    );
};

export default Tasks;