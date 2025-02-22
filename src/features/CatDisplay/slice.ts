import { createSlice } from '@reduxjs/toolkit';
import { CATCONTROLLER_SCOPE } from './constants';
import { ICatState } from './types';

export const initialState: ICatState = {
  loading: false,
  catImageUrl: '',
};

const slice = createSlice({
  name: CATCONTROLLER_SCOPE,
  initialState,
  reducers: {
    getCatImage(state) {
      state.loading = true;
      state.catImageUrl = '';
    },
    setCatImageUrl(state, action) {
      state.loading = false;
      state.catImageUrl = action.payload;
    },
    removeCatImageUrl(state) {
      state.catImageUrl = '';
    },
  },
});

export const { actions, reducer } = slice;
