import React from 'react';
import headerLogo from '../../to-do-list.png';
import './AppHeader.css';

const AppHeader = ({toDo, done}) => {
    return (
      <div className="app-header__block">
        <img alt="To Do List logo" className="app-header__logo" src={headerLogo} />
        <div className="app-header d-flex">
          <h1>Todo List</h1>
          <h2>{toDo} more to do, {done} done</h2>
        </div>
      </div>
    )
}

export default AppHeader;
