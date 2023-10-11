/** @type {import('tailwindcss').Config} */
export default {
	darkMode: 'class',
	content: [
		'./src/**/*.{html,js,tsx,ts}',
		'./src/**/**/*.{html,js,tsx,ts}',
		'./src/**/**/**/*.{html,js,tsx,ts}',
		'./node_modules/flowbite/**/*.js',
		'./src/*.{html,js,tsx}',
		'./index.html',
		'node_modules/flowbite-react/**/*.{js,jsx,ts,tsx}',
	],
	theme: {
		extend: {
			colors: {
				'default-blue': '#0a79ff',
				'default-purple': '#a804fc',
			},
		},
	},
	plugins: [require('flowbite/plugin')],
};
