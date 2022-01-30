import './App.css';
import React, {useState, useEffect} from 'react';
import weather from './assets/img/cloudy.png';
import axios from 'axios';

import {List, AddButtonList, Tasks} from './components';

function App() {
  const [lists, setLists] = useState(null);
  const [listsconstant, setListsConstant] = useState(null);
  const [activeItem, setActiveItem] = useState(null);
  

  useEffect(() => {
    axios.get('http://localhost:3001/listsconstant?_embed=tasks').then(({data}) => {
      setListsConstant(data);
    });
    axios.get('http://localhost:3001/lists?_embed=tasks').then(({data}) => {
      setLists(data);
    });
  }, []);

  const onAddList = (obj) => {
    const newList = [...lists, obj];
    setLists(newList);
  };

  const onEditListTitle = (id, title) => {
    const newList = lists.map(item => {
      if(item.id === id) {
        item.name = title;
      }
      return item;
    });
    setLists(newList);
  }

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
          <List
            items={listsconstant}
            onClickItem={item => {
              setActiveItem(item);
            }}
            activeItem={activeItem}
          />
        <hr style={{marginTop: "15px", marginBottom: "15px"}}/>
          {lists ? (
            <List
              items={lists}
              onRemove={id => {
                const newList = lists.filter(item => item.id === id);
                setLists(newList);
              }}
              onClickItem={item => {
                setActiveItem(item);
              }}
              activeItem={activeItem}
              isRemovable
            />
          ) : ('Loading...')}
          <AddButtonList onAdd={onAddList} />
      </div>
      <div className="todo__tasks">
        {lists && activeItem && <Tasks list={activeItem} onEditTitle={onEditListTitle} />}
      </div>
    </div>
  );
}

export default App;
