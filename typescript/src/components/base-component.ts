type PositionValues = 'beforebegin' | 'afterbegin' | 'beforeend' | 'afterend';

export abstract class Component<T extends HTMLElement, U extends HTMLElement> {
	templateElement: HTMLTemplateElement;
	hostElement: T;
	element: U;

	constructor(
		templateId: string,
		hostElementId: string,
		elPosition: PositionValues = 'afterbegin',
		newElementId?: string
	) {
		this.templateElement = document.getElementById(
			templateId
		)! as HTMLTemplateElement;
		this.hostElement = document.getElementById(hostElementId)! as T;

		const contentNode = document.importNode(this.templateElement.content, true);
		this.element = contentNode.firstElementChild as U;
		if (newElementId) this.element.id = newElementId;

		this.attachContent(this.element, elPosition);
	}

	private attachContent(el: U, elPosition: PositionValues) {
		this.hostElement.insertAdjacentElement(elPosition, el);
	}

	abstract configure(): void;
	abstract renderContent(): void;
}
