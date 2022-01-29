import './App.css';
import React from 'react';
import weather from './assets/img/cloudy.png';
import List from './components/List';
import calendar from './assets/img/calendar.png';
import inbox from './assets/img/inbox.png';
import monitor from './assets/img/monitor.png';
import shop from './assets/img/shopping-cart.png';
import travel from './assets/img/suitcase.png';
import AddButtonList from './components/AddButtonList';

function App() {
  return (
    <div className="todo">
      <div className="todo__sidebar">
        <ul className="todo__list__head">
          <li>
            <div className="menu">
              <div className="circle"></div>
              <div className="circle"></div>
              <div className="circle"></div>
            </div>
            <i>
              <img src={weather} width="20" height="20" alt="weather"/>
            </i>
          </li>
        </ul>
        <input className="todo__search" placeholder="Search..."/>
          <List items={[
            {
              icon: <img src={calendar} width="20" height="20" alt="calendar"/>,
              name: 'Today',
              active: true
            },
            {
              icon: <img src={inbox} width="20" height="20" alt="calendar"/>,
              name: 'Inbox'
            },
          ]}
            isRemovable={true}
          />
        <hr style={{marginTop: "15px", marginBottom: "15px"}}/>
        <List items={[
            {
              icon: <img src={monitor} width="20" height="20" alt="calendar"/>,
              name: 'Website Redesign'
            },
            {
              icon: <img src={shop} width="20" height="20" alt="calendar"/>,
              name: 'Shopping List'
            },
            {
              icon: <img src={travel} width="20" height="20" alt="calendar"/>,
              name: 'Travel'
            },
          ]}/>
          <AddButtonList />
      </div>
      <div className="todo_tasks">
        
      </div>
    </div>
  );
}

export default App;
