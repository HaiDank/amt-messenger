import { createSlice, PayloadAction } from '@reduxjs/toolkit';

enum CustomThemeNames {
	DEFAULT = 'default',
}


export type CustomThemeType = {
	themeName: string;
	bgColorPrimary: string;
	bgColorSecondary: string;
	textColorPrimary: string;
	textColorSecondary: string;
	bgMessage?: string;
};

const themes: CustomThemeType[] = [
	{
		themeName: 'default',
		bgColorPrimary: 'bg-default-blue',
		bgColorSecondary: 'bg-default-purple',
		textColorPrimary: 'text-default-blue',
		textColorSecondary: 'text-default-purple',
		bgMessage: 'bg-gradient-to-t to-default-purple from-default-blue bg-fixed'
	},
];



const initialState: CustomThemeType = themes[0];

const customThemeSlice = createSlice({
	name: 'customTheme',
	initialState,
	reducers: {
		changeTheme: (state, action: PayloadAction<CustomThemeNames>) => {
			let style = themes.find(
				(theme) => theme.themeName === action.payload
			);
			if (style) {
				state = style;
			} else {
				state = state;
			}
		},
	},
});

export const { changeTheme } = customThemeSlice.actions;

export default customThemeSlice.reducer;
