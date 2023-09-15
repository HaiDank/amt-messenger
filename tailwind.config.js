/** @type {import('tailwindcss').Config} */
export default {
	darkMode: 'class',
	content: [
		'./src/**/*.{html,js,tsx,ts}',
		'./src/**/**/*.{html,js,tsx,ts}',
		'./src/*.{html,js,tsx}',
		'./index.html',
		'node_modules/flowbite-react/**/*.{js,jsx,ts,tsx}',
	],
	theme: {
		extend: {},
	},
	plugins:  [require('flowbite/plugin')],
};
