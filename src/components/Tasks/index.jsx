import React from 'react';
import alarm from '../../assets/img/notification.png';
import check from '../../assets/img/check.png';

import './Tasks.css';

const Tasks = ({list}) => {
    return (
        <div className="tasks">
          <div className="todo__title">
              <h2>
                  {list.name}
                  <div>
                    <img src={alarm} width="20" height="20" alt="notification"/>
                        <div className="more">
                            <div className="more__circle"></div>
                            <div className="more__circle"></div>
                            <div className="more__circle"></div>
                        </div>
                    </div>
              </h2>
              <p>Lorem ipsum dolor sit amet, consectetur adipiscing<br/> elit, aliquam.</p>
              <div className="tasks__items">
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
              </div>
          </div>
        </div>
    );
};

export default Tasks;