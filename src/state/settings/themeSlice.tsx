import { PayloadAction, createSlice } from '@reduxjs/toolkit';

export enum ThemeName {
    DARK_THEME = 'Dark',
    LIGHT_THEME = 'Light',
    GREY_THEME = 'Grey',
}


const styles: ThemeStateType[] = [
	{
		theme: ThemeName.DARK_THEME,
		textNormal: 'text-white',
		textFade: 'text-neutral-600',
		bgColor: 'bg-black',
		menuActive: 'bg-neutral-500',
		iconBgColor: 'bg-white',
		popupBgColor: 'bg-neutral-800',
		popupBgHex: '#262626',
	},
	{
		theme: ThemeName.LIGHT_THEME,
		textNormal: 'text-black',
		textFade: 'text-neutral-500',
		bgColor: 'bg-white',
		menuActive: 'bg-neutral-100',
		iconBgColor: 'bg-white',
		popupBgColor: 'bg-neutral-100',
		popupBgHex: '#f5f5f5',

	},
	{
		theme: ThemeName.GREY_THEME,
		textNormal: 'text-white',
		textFade: 'text-neutral-600',
		bgColor: 'bg-neutral-900',
		menuActive: 'bg-neutral-500',
		iconBgColor: 'bg-white',
		popupBgColor: 'bg-neutral-700',
		popupBgHex: '#404040',
	},
];


export type ThemeStateType = {
	theme: ThemeName;
	textNormal: string;
	textFade: string;
	bgColor: string;
	menuActive: string;
	iconBgColor: string;
	popupBgColor: string;
	popupBgHex: string;
};

const initialState: ThemeStateType = styles[1]

export const themeSlice = createSlice({
	name: 'theme',
	initialState,
	reducers: {
        changeTheme: (state, action: PayloadAction<ThemeName>) => {
            switch(action.payload){
                case(ThemeName.DARK_THEME):{
                    state = styles[0]
                    return;
                }
                case(ThemeName.LIGHT_THEME):{
                    state = styles[1]
                    return;
                }
                case(ThemeName.GREY_THEME):{
                    state = styles[2]
                    return;
                }
                default:
                    console.log(state);
            }
        }
    },
});

export const {changeTheme} = themeSlice.actions

export default themeSlice.reducer