import {autobind} from '../decorators/autobind';
import {Component} from './base-component';
import {projectState} from '../states/project';
import {DragTarget} from '../models/drap-drop';
import {Project, ProjectStatus} from '../models/project';
import {ProjectItem} from './project-item';

export class ProjectList
	extends Component<HTMLDivElement, HTMLElement>
	implements DragTarget
{
	assignedProjects: Project[];

	constructor(private type: 'active' | 'finished') {
		super('project-list', 'app', 'beforeend', `${type}-projects`);
		const theme = {
			active: ['bg-blue-100', 'border-blue-200'],
			finished: ['bg-green-100', 'border-green-200'],
		};

		const cl = this.element.classList;
		cl.add.apply(cl, theme[type]);

		this.assignedProjects = [];

		this.configure();
		this.renderContent();
	}

	@autobind
	dragOverHandler(event: DragEvent): void {
		if (event.dataTransfer && event.dataTransfer.types[0] === 'text/plain') {
			event.preventDefault();
			this.element.classList.add('border-orange-400');
		}
	}

	@autobind
	dropHandler(event: DragEvent): void {
		const prjId = event.dataTransfer!.getData('text/plain');
		const prjStatus =
			this.type === 'active' ? ProjectStatus.Active : ProjectStatus.Finished;
		if (prjId) projectState.moveProject(prjId, prjStatus);
		this.element.classList.remove('border-orange-400');
	}

	@autobind
	dragLeaveHandler(_: DragEvent): void {
		this.element.classList.remove('border-orange-400');
	}

	configure() {
		this.element.addEventListener('dragover', this.dragOverHandler);
		this.element.addEventListener('drop', this.dropHandler);
		this.element.addEventListener('dragleave', this.dragLeaveHandler);

		projectState.addListener((projects: Project[]) => {
			const relevantProjects = projects.filter(project => {
				if (this.type === 'active') {
					return project.status === ProjectStatus.Active;
				}
				return project.status === ProjectStatus.Finished;
			});
			this.assignedProjects = relevantProjects;
			this.renderProjects();
		});
	}

	renderProjects() {
		const listEl = document.getElementById(
			`${this.type}-projects-list`
		)! as HTMLUListElement;
		listEl.innerHTML = '';
		for (const project of this.assignedProjects) {
			new ProjectItem(`${this.type}-projects-list`, project);
		}
	}

	@autobind
	renderContent() {
		const listId = `${this.type}-projects-list`;
		this.element.querySelector('ul')!.id = listId;
		this.element.querySelector('h2')!.textContent = `${this.type} projects`;
	}
}
