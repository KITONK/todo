import './App.css';
import React, {useState, useEffect} from 'react';
import weather from './assets/img/cloudy.png';
import axios from 'axios';
import {Route, useHistory} from 'react-router-dom';

import {List, AddButtonList, Tasks} from './components';

function App() {
  const [lists, setLists] = useState(null);
  const [listsconstant, setListsConstant] = useState(null);
  const [activeItem, setActiveItem] = useState(null);
  const [activeItemCon, setActiveItemCon] = useState(null);
  let history = useHistory();
  

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

  const onAddTask = (listId, taskObj) => {
    const newList = lists.map(item => {
      if(item.id === listId) {
        item.tasks = [...item.tasks, taskObj];
      }
      return item;
    });
    setLists(newList);
  };

  const onEditTask = (listId, taskObj) => {
    const newTaskText = window.prompt('Task text', taskObj.text);
    if(!newTaskText) {
      return;
    }
    const newList = lists.map(list => {
        if(list.id === listId) {
          list.tasks = list.tasks.map(task => {
            if(task.id === taskObj.id) {
              task.text = newTaskText;
            }
            return task;
          });
        }
        return list;
      });
      setLists(newList);
      axios.patch('http://localhost:3001/tasks/' + taskObj.id, {
        text: newTaskText
      })
      .catch(() => {
          alert('Failed to edit task');
      });
  };

  const onRemoveTask = (listId, taskId) => {
    if(window.confirm('Are you sure you want to delete this task?')) {
        const newList = lists.map(item => {
          if(item.id === listId) {
            item.tasks = item.tasks.filter(task => task.id !== taskId);
          }
          return item;
        });
        setLists(newList);
        axios.delete('http://localhost:3001/tasks/' + taskId)
        .catch(() => {
            alert('Failed to delete task');
        });
    }
  }

  const onCompleteTask = (listId, taskId, completed) => {
    const newList = lists.map(list => {
        if(list.id === listId) {
          list.tasks = list.tasks.map(task => {
            if(task.id === taskId) {
              task.completed = completed;
            }
            return task;
          });
        }
        return list;
      });
      setLists(newList);
      axios.patch('http://localhost:3001/tasks/' + taskId, {
        completed
      })
      .catch(() => {
          alert('Failed to update task');
      });
  }

  const onEditListTitle = (id, title) => {
    const newList = lists.map(item => {
      if(item.id === id) {
        item.name = title;
      }
      return item;
    });
    setLists(newList);
  };

  useEffect(() => {
    const listId = history.location.pathname.split('lists/')[1];
    const listconstantId = history.location.pathname.split('listsconstant/')[1];
    if(lists) {
      const list = lists.find(list => list.id === Number(listId));
      setActiveItem(list);
    }
    if(listsconstant) {
      const list = listsconstant.find(list => list.id === Number(listconstantId));
      setActiveItemCon(list);
    }
  }, [lists, listsconstant, history.location.pathname]);

  return (
    <div className="todo">
      <div className="todo__sidebar">
        <ul className="todo__list__head">
          <li>
            <div onClick={list => {
              history.push('/');
            }} className="menu">
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
          {listsconstant ? (
          <List
            items={listsconstant}
            onClickItem={list => {
              history.push(`/listsconstant/${list.id}`);
            }}
            activeItem={activeItemCon}
          />
          ) : ('Loading...')}
        <hr style={{marginTop: "15px", marginBottom: "15px"}}/>
          {lists ? (
            <List
              items={lists}
              onRemove={id => {
                const newList = lists.filter(item => item.id === id);
                setLists(newList);
              }}
              onClickItem={list => {
                history.push(`/lists/${list.id}`);
              }}
              activeItem={activeItem}
              isRemovable
            />
          ) : ('Loading...')}
          <AddButtonList onAdd={onAddList} />
      </div>
      <div className="todo__tasks">
        <Route exact path="/">
        {lists && lists.map(list => 
          <Tasks 
          key={list.id}
          list={list} 
          onAddTask={onAddTask} 
          onEditTitle={onEditListTitle} 
          onRemoveTask={onRemoveTask}
          onEditTask={onEditTask}
          onCompleteTask={onCompleteTask}
          withoutEmpty
        />
        )}
        </Route>
        <Route path="/listsconstant/:id">
        {listsconstant && activeItemCon && (
          <Tasks 
            list={activeItemCon} 
            onAddTask={onAddTask} 
            onEditTitle={onEditListTitle}
            onRemoveTask={onRemoveTask}
            onEditTask={onEditTask}
            onCompleteTask={onCompleteTask}
          />
        )}
        </Route>
        <Route path="/lists/:id">
        {lists && activeItem && (
          <Tasks 
            list={activeItem} 
            onAddTask={onAddTask} 
            onEditTitle={onEditListTitle}
            onRemoveTask={onRemoveTask}
            onEditTask={onEditTask}
            onCompleteTask={onCompleteTask}
          />
        )}
        </Route>
      </div>
    </div>
  );
}

export default App;
