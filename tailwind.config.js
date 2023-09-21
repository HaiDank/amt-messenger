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
		extend: {
			colors: {
				'default-blue': '#067cff',
				'default-purple': '#a901ff'
			}
		},
	},
	plugins:  [require('flowbite/plugin')],
};
