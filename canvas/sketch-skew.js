const canvasSketch = require('canvas-sketch');
const math = require('canvas-sketch-util/math');
const random = require('canvas-sketch-util/random');
const Color = require('canvas-sketch-util/color');
const risoColors = require('riso-colors');

// const seed = random.setSeed('butterfly'); // it's a way to lock the shapes and colors

const settings = {
	dimensions: [1080, 1080],
	animate: true,
	// name: seed,
};

const sketch = ({width, height}) => {
	const num = 40;
	const degress = -30;

	const rects = [];

	const rectColors = [random.pick(risoColors), random.pick(risoColors)];

	const bgColor = random.pick(rectColors).hex;

	const mask = {
		radius: width * 0.4,
		sides: 4,
		x: width * 0.5,
		y: height * 0.5,
	};

	for (let i = 0; i < num; i++) {
		const x = random.range(0, width);
		const y = random.range(0, height);
		const w = random.range(400, width);
		const h = random.range(80, 200);

		const fill = random.pick(rectColors).hex;
		const stroke = random.pick(rectColors).hex;

		const blend = random.value() > 0.5 ? 'overlay' : 'souce-over';

		rects.push({x, y, w, h, fill, stroke, blend});
	}

	return ({context, width, height}) => {
		context.fillStyle = bgColor;
		context.fillRect(0, 0, width, height);

		context.save();

		context.translate(mask.x, mask.y);
		drawPolygon({context, radius: mask.radius, sides: mask.sides});
		context.clip();

		rects.forEach(({x, y, w, h, fill, stroke, blend}) => {
			let shadowColor;

			context.save();
			context.translate(-mask.x, -mask.y);
			context.translate(x, y);
			context.strokeStyle = stroke;
			context.fillStyle = fill;
			context.lineWidth = 10;

			context.globalCompositeOperation = blend;

			drawSkewedRect({context, w, h, degress});

			shadowColor = Color.offsetHSL(fill, 0, 0, -20);
			shadowColor.rgba[3] = 0.4;

			context.shadowColor = Color.style(shadowColor.rgba);
			context.shadowOffsetX = -10;
			context.shadowOffsetY = 20;

			context.fill();

			context.shadowColor = null;
			context.stroke();

			context.globalCompositeOperation = blend;

			context.lineWidth = 5;
			context.strokeStyle = 'black';
			context.stroke();

			context.restore();
		});

		context.restore();

		context.save();

		context.translate(mask.x, mask.y);
		drawPolygon({context, radius: mask.radius, sides: mask.sides});
		context.lineWidth = 20;
		context.strokeStyle = 'black';
		context.stroke();

		context.restore();
	};
};

const drawSkewedRect = ({context, w = 600, h = 200, degress = -45}) => {
	const angle = math.degToRad(degress);
	const rx = Math.cos(angle) * w;
	const ry = Math.sin(angle) * w;

	context.save();
	context.translate(rx * -0.5, (ry + h) * -0.5);

	context.beginPath();
	context.moveTo(0, 0);
	context.lineTo(rx, ry);
	context.lineTo(rx, ry + h);
	context.lineTo(0, h);
	context.closePath();

	context.restore();
};

const drawPolygon = ({context, radius = 100, sides = 3}) => {
	const slice = (Math.PI * 2) / sides;

	context.beginPath();
	context.moveTo(0, -radius);

	for (let i = 1; i < sides; i++) {
		const theta = i * slice - Math.PI * 0.5;
		context.lineTo(Math.cos(theta) * radius, Math.sin(theta) * radius);
	}

	context.closePath();
};

canvasSketch(sketch, settings);
