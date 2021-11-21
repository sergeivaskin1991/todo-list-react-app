import React, { Component } from 'react';

import AppHeader from '../AppHeader';
import SearchPanel from '../SearchPanel';
import TodoList from '../TodoList';
import ItemStatusFilter from '../ItemStatusFilter';
import ItemAddForm from '../ItemAddForm/ItemAddForm';
import Footer from '../Footer/Footer';

import './App.css';

export default class App extends Component {
	constructor(props) {
		super(props)
		this.state = {
			todoData: [
				this.createTodoItem('Drink Coffee'), 
				this.createTodoItem('Make Awesome App'), 
				this.createTodoItem('Have a lunch'), 
			],
			term: '',
			filter: 'all' 
		}
	};
	maxId = 100;

	createTodoItem = (label) => {
		return {
			label,
			important: false,
			done: false,
			id: this.maxId++
		}
	}

	deleteItem = (id) => {
		this.setState(({todoData}) => {
			const idx = todoData.findIndex((el) => el.id === id);
			const newArray = [...todoData.slice(0, idx), ...todoData.slice(idx + 1)];
			return {
				todoData: newArray
			}
		});
	};

	addItem = (text) => {
    const newItem = this.createTodoItem(text);
		this.setState(({todoData}) => {
		  const newArr = [
				...todoData,
				newItem
			]
			return {
				todoData: newArr
			}
		})
	}
	toggleProperty = (arr, id, propName) => {
		const idx = arr.findIndex((el) => el.id === id);
			const oldItem = arr[idx];
			const newItem = {...oldItem, [propName]: !oldItem[propName]};
			return [
				    ...arr.slice(0, idx), 
						newItem, 
						...arr.slice(idx + 1)
			];
	}
	onToggleImportant = (id) => {
		this.setState(({todoData}) => {
			return {
				todoData: this.toggleProperty(todoData, id, 'important')
			}
		});
	}
	onToggleDone = (id) => {
		this.setState(({todoData}) => {
			return {
				todoData: this.toggleProperty(todoData, id, 'done')
			}
		});
	};

	search = (items, term) => {
		if(term.length === 0) {
			return items;
		}

		return items.filter((item) => {
			return item.label.toLowerCase().includes(term.toLowerCase());
		});
	};

	onSearchChange = (term) => {
		this.setState({ term })
	}

	filter = (items, filter) => {
		switch(filter) {
			case 'all' :
				return items;
			case 'active' :
				return items.filter((item) => !item.done);
			case 'done' :
				return items.filter((item) => item.done);
			default :
			  return items;
		}
	}
	onFilterChange = (filter) => {
		this.setState({ filter })
	}

	render() {
		const { todoData, term, filter } = this.state;
		const visibleItems = this.filter(this.search(todoData, term), filter);
		const doneCount = todoData
					.filter((el) => el.done).length;
		const todoCount = todoData.length - doneCount;

		return (
			<div className="todo-app">
				<AppHeader toDo={todoCount} done={doneCount} />
				<div className="top-panel d-flex">
					<SearchPanel onSearchChange={this.onSearchChange} />
					<ItemStatusFilter filter={filter}
							onFilterChange={this.onFilterChange} />
				</div>

				{visibleItems.length !== 0
					? <TodoList todos={visibleItems} 
						onDeleted={this.deleteItem} 
						onToggleImportant={this.onToggleImportant}
						onToggleDone={this.onToggleDone} />
					: <h4 className="label-no-text">No ToDo List</h4>
				}
				<ItemAddForm onItemAdded={this.addItem} />
				<Footer />
			</div>
		);
	}
};
