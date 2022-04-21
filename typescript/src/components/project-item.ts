import {Project} from '../models/project';
import {Draggable} from '../models/drap-drop';
import {autobind} from '../decorators/autobind';
import {Component} from './base-component';

export class ProjectItem
	extends Component<HTMLUListElement, HTMLLIElement>
	implements Draggable
{
	private project: Project;

	get peopleCount() {
		return this.project.people > 1
			? `${this.project.people} people`
			: '1 person';
	}

	constructor(hostId: string, project: Project) {
		super('single-project', hostId, 'beforeend', project.id);
		this.project = project;
		this.element.draggable = true;

		this.configure();
		this.renderContent();
	}

	@autobind
	dragStartHandler(event: DragEvent): void {
		event.dataTransfer!.setData('text/plain', this.project.id);
		event.dataTransfer!.effectAllowed = 'move';
	}

	@autobind
	dragEndHandler(_: DragEvent): void {
		console.log('end');
	}

	configure() {
		this.element.addEventListener('dragstart', this.dragStartHandler);
		this.element.addEventListener('dragend', this.dragEndHandler);
	}

	renderContent() {
		this.renderText('h2', this.project.title);
		this.renderText('h3', this.peopleCount);
		this.renderText('p', this.project.description);
	}

	renderText(selector: string, text: string) {
		this.element.querySelector(selector)!.textContent = text;
	}
}
