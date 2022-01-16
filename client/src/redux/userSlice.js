import { createSlice } from '@reduxjs/toolkit'

const initialState = {}

const userSlice = createSlice({
    name: 'users',
    initialState,
    reducers: {
        getUserID(state, action) {
            return {...action.payload}
        }
    }
})

export const { getUserID } = userSlice.actions;
export default userSlice.reducer;