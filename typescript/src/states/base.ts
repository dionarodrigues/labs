type Listener<T> = (items: T[]) => void;

export class State<T> {
	protected listeners: Listener<T>[] = [];
	addListener(listenerFunc: Listener<T>) {
		this.listeners.push(listenerFunc);
	}
}
