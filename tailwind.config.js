/** @type {import('tailwindcss').Config} */
export default {
	darkMode: 'class',
	content: [
		'./src/**/*.{html,js,tsx,ts}',
		'./src/**/**/*.{html,js,tsx,ts}',
		'./src/*.{html,js,tsx}',
		'./index.html',
	],
	theme: {
		extend: {},
	},
	plugins: [],
};
