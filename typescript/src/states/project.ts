import {Project, ProjectStatus} from '../models/project';
import {State} from './base';

class ProjectState extends State<Project> {
	private projects: Project[] = [];
	private static instance: ProjectState;

	private constructor() {
		super();
	}

	static getInstance() {
		if (this.instance) {
			return this.instance;
		} else {
			this.instance = new ProjectState();
			return this.instance;
		}
	}

	addProject(title: string, description: string, numOfPeople: number) {
		const newProject = new Project(
			Math.random().toString(),
			title,
			description,
			numOfPeople,
			ProjectStatus.Active
		);

		this.projects.push(newProject);
		this.updateListeners();
	}

	moveProject(projectId: string, newStatus: ProjectStatus) {
		const project = this.projects.find(prj => prj.id === projectId);
		if (project) project.status = newStatus;
		this.updateListeners();
	}

	private updateListeners() {
		for (const listenerFunc of this.listeners) {
			listenerFunc(this.projects.slice());
		}
	}
}

export const projectState = ProjectState.getInstance();
