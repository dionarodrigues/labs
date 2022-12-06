import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import AddTodoForm from './components/AddTodoForm';
import TodoList from './components/TodoList';
import TotalCompleteItems from './components/TotalCompleteItems';

const App = () => {
	return (
		<div class="app-wrapper w-100 min-vh-100">
			<div className="container-lg" style={{maxWidth: '800px'}}>
				<h1 className="text-dark display-4">Frontend checklist</h1>
				<AddTodoForm />
				<TodoList />
				<TotalCompleteItems />
			</div>
		</div>
	);
};

export default App;
