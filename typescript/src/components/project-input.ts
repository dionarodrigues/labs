import {autobind} from '../decorators/autobind';
import {Component} from './base-component';
import {ValidationProps, validate} from '../utils/validation';
import {projectState} from '../states/project';

export class ProjectInput extends Component<HTMLDivElement, HTMLFormElement> {
	titleInputElement: HTMLInputElement;
	descriptionInputElement: HTMLInputElement;
	peopleInputElement: HTMLInputElement;

	constructor() {
		super('project-input', 'app', 'afterbegin', 'user-input');

		this.titleInputElement = this.element.querySelector(
			'#title'
		) as HTMLInputElement;
		this.descriptionInputElement = this.element.querySelector(
			'#description'
		) as HTMLInputElement;
		this.peopleInputElement = this.element.querySelector(
			'#people'
		) as HTMLInputElement;

		this.configure();
	}

	configure() {
		this.element.addEventListener('submit', this.submitHandler);
	}

	renderContent() {}

	private getherUserInput(): [string, string, number] | void {
		const enteredTitle = this.titleInputElement.value;
		const enteredDescription = this.descriptionInputElement.value;
		const enteredPeople = +this.peopleInputElement.value;

		const validatableTitle: ValidationProps = {
			value: enteredTitle,
			isRequired: true,
			minLength: 2,
			maxLength: 20,
		};

		const validatableDescription: ValidationProps = {
			value: enteredDescription,
			isRequired: true,
			minLength: 5,
			maxLength: 200,
		};

		const validatablePeople: ValidationProps = {
			value: +enteredPeople,
			isRequired: true,
			min: 1,
			max: 10,
		};

		if (
			!validate(validatableTitle) ||
			!validate(validatableDescription) ||
			!validate(validatablePeople)
		) {
			alert('Invalid input. Please try again.');
			return;
		}

		return [enteredTitle, enteredDescription, +enteredPeople];
	}

	@autobind
	private submitHandler(event: Event) {
		event.preventDefault();
		const userInput = this.getherUserInput();
		if (Array.isArray(userInput)) {
			const [title, description, people] = userInput;
			projectState.addProject(title, description, people);
			this.element.reset();
		}
	}
}
