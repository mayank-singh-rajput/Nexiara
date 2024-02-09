import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  id: '',
  email: '',
  phoneNo: '',
  name: '',
};

const activeUserSlice = createSlice({
  name: 'activeUser',
  initialState,
  reducers: {
    setActiveUser: (state, { payload }) => {
      state.id = payload.id;
      state.email = payload.email;
      state.phoneNo = payload.phoneNo;
      state.name = payload.name;
    },
  },
});
export const { setActiveUser } = activeUserSlice.actions;
export default activeUserSlice.reducer;
