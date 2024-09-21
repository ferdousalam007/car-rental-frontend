// import { createSlice } from '@reduxjs/toolkit';

// const initialState = {
//     theme: 'system', // 'dark', 'light', or 'system'
// };

// const themeSlice = createSlice({
//     name: 'theme',
//     initialState,
//     reducers: {
//         setTheme(state, action) {
//             state.theme = action.payload;
//         },
//     },
// });

// export const { setTheme } = themeSlice.actions;
// export default themeSlice.reducer;

import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type ThemeMode = 'light' | 'dark' | 'system';

interface ThemeState {
    mode: ThemeMode;
}

const initialState: ThemeState = {
    mode: 'system',
};

const themeSlice = createSlice({
    name: 'theme',
    initialState,
    reducers: {
        setThemeMode: (state, action: PayloadAction<ThemeMode>) => {
            state.mode = action.payload;
        },
    },
});

export const { setThemeMode } = themeSlice.actions;
export default themeSlice.reducer;