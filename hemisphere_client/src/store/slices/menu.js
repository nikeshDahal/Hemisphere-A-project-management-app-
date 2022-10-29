import { createSlice } from '@reduxjs/toolkit';

// initial state
const initialState = {
    selectedItem: ['dashboard'],
    drawerOpen: false
};

// ==============================|| SLICE - MENU ||============================== //

const menu = createSlice({
    name: 'menu',
    initialState,
    reducers: {
        activeItem(state, action) {
            state.selectedItem = action.payload;
        },

        openDrawer(state, action) {
            state.drawerOpen = action.payload;
        }
    }
});

export default menu.reducer;

export const { activeItem, openDrawer } = menu.actions;
