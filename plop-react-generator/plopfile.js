module.exports = plop => {
	// Setting up Plop to generate components
	// When run `npm run plop` you'll be asked to enter the component name.
	plop.setGenerator('component', {
		description: 'Create a component',
		prompts: [
			{
				type: 'input',
				name: 'name',
				message: 'What is your component name?',
			},
		],
		actions: [
			{
				type: 'add',
				path: './src/components/{{pascalCase name}}/index.js',
				templateFile: 'plop-templates/component.hbs',
			},
			{
				type: 'add',
				path: './src/components/{{pascalCase name}}/styles.css',
			},
		],
	});

	// Setting up Plop to generate pages
	// When run `npm run plop` you'll be asked to enter the page name.
	plop.setGenerator('page', {
		description: 'Create a page',
		prompts: [
			{
				type: 'input',
				name: 'name',
				message: 'What is your page name?',
			},
		],
		actions: [
			{
				type: 'add',
				path: './src/pages/{{pascalCase name}}/index.js',
				templateFile: 'plop-templates/component.hbs',
			},
			{
				type: 'add',
				path: './src/pages/{{pascalCase name}}/styles.css',
			},
		],
	});
};
