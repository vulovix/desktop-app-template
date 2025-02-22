import { RootState } from 'libs/redux/store';
import { createSelector } from 'reselect';
import { CATCONTROLLER_SCOPE } from './constants';
import { initialState } from './slice';
import { ICatState } from './types';

export const getCatState = (state: RootState): ICatState => state?.[CATCONTROLLER_SCOPE] || initialState;

export const selectCatImageUrl = createSelector(getCatState, (state: ICatState) => state.catImageUrl);

export const selectCatImageLoading = createSelector(getCatState, (state: ICatState) => state.loading);
