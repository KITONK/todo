import React from 'react';
import alarm from '../../assets/img/notification.png';
import axios from 'axios';

import './Tasks.css';
import AddTaskForm from './AddTaskForm';
import Task from './Task';

const Tasks = ({list, onEditTitle, onAddTask, withoutEmpty, onEditTask, onRemoveTask, onComplateTask}) => {

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
                  {!withoutEmpty && list.tasks && !list.tasks.length && <h2>No tasks yet</h2>}
                  {list.tasks && list.tasks.map(task =>
                    <Task 
                        key={task.id} 
                        list={list} 
                        onEdit={onEditTask} 
                        onRemove={onRemoveTask} 
                        onComplete={onComplateTask}
                        {...task} 
                    />
                    )}
                    <AddTaskForm key={list.id} list={list} onAddTask={onAddTask} />
              </div>
          </div>
        </div>
    );
};

export default Tasks;