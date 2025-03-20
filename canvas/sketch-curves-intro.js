const canvasSketch = require('canvas-sketch');

const settings = {
	dimensions: [1080, 1080],
	animate: true,
};

let elCanvas;
let points;

const sketch = ({canvas}) => {
	elCanvas = canvas;
	canvas.addEventListener('mousedown', onMouseDown);

	points = [
		new Point({x: 200, y: 540}),
		new Point({x: 400, y: 340, control: true}),
		new Point({x: 880, y: 540}),
	];

	return ({context, width, height}) => {
		context.fillStyle = 'white';
		context.fillRect(0, 0, width, height);

		context.beginPath();
		context.moveTo(points[0].x, points[0].y);
		context.quadraticCurveTo(
			points[1].x,
			points[1].y,
			points[2].x,
			points[2].y
		);
		context.strokeStyle = 'red';
		context.stroke();

		points.forEach(point => {
			point.draw(context);
		});
	};
};

canvasSketch(sketch, settings);

const onMouseDown = e => {
	window.addEventListener('mousemove', onMouseMove);
	window.addEventListener('mouseup', onMouseUp);

	const x = (e.offsetX / elCanvas.offsetWidth) * elCanvas.width;
	const y = (e.offsetY / elCanvas.offsetHeight) * elCanvas.height;

	points.forEach(point => {
		point.isDraging = point.hitTest(x, y);
	});
};

const onMouseMove = e => {
	const x = (e.offsetX / elCanvas.offsetWidth) * elCanvas.width;
	const y = (e.offsetY / elCanvas.offsetHeight) * elCanvas.height;

	points.forEach(point => {
		if (point.isDraging) {
			point.x = x;
			point.y = y;
		}
	});
};

const onMouseUp = () => {
	window.removeEventListener('mousemove', onMouseMove);
	window.removeEventListener('mouseup', onMouseUp);
};

class Point {
	constructor({x, y, control = false}) {
		this.x = x;
		this.y = y;
		this.control = control;
	}

	draw(context) {
		context.save();
		context.translate(this.x, this.y);
		context.fillStyle = this.control ? 'red' : 'black';

		context.beginPath();
		context.arc(0, 0, 10, 0, Math.PI * 2);
		context.fill();

		context.restore();
	}

	hitTest(x, y) {
		const dx = this.x - x;
		const dy = this.y - y;
		const dd = Math.sqrt(dx * dx + dy * dy);

		return dd < 20;
	}
}
