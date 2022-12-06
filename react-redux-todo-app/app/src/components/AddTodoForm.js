import {useState} from 'react';
import {useDispatch} from 'react-redux';
import {addTodoAsync} from '../redux/todoSlice';

const AddTodoForm = () => {
	const [value, setValue] = useState('');

	const dispatch = useDispatch();

	const onSubmit = event => {
		event.preventDefault();
		dispatch(
			addTodoAsync({
				title: value,
			})
		);
		setValue('');
	};

	return (
		<form onSubmit={onSubmit} className="form-inline mt-3 mb-3">
			<div class="row g-3 align-items-center">
				<div class="col-auto d-none d-sm-block">
					<label for="inputText" class="col-form-label text-dark fs-5">
						Item
					</label>
				</div>
				<div class="col-auto">
					<input
						type="text"
						id="inputText"
						class="form-control"
						aria-describedby="passwordHelpInline"
						value={value}
						placeholder="Add todo..."
						onChange={event => setValue(event.target.value)}
					/>
				</div>
				<div class="col-auto">
					<button type="submit" className="btn btn-primary">
						Submit
					</button>
				</div>
			</div>
		</form>
	);
};

export default AddTodoForm;
