import { createSlice, current } from '@reduxjs/toolkit'

const initialState = {}

const userSlice = createSlice({
    name: 'users',
    initialState,
    reducers: {
        getUserID(state, action) {
            return {...action.payload}
        },
        changeUserName(state, action) {
            return {...state, info: {...current(state).info, name: action.payload}}
        }
    }
})

export const { getUserID, changeUserName } = userSlice.actions;
export default userSlice.reducer;