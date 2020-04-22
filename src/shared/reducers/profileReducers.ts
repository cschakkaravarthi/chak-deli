import { Reducer } from 'redux';
import { ProfileState, SET_PROFILE_DETAILS } from '../types/profileTypes';

export const initialState = {
  profileDetails: {}
};

const profileReducers: Reducer<ProfileState, any> = (
  state = initialState,
  action
) => {
  switch (action.type) {
    case SET_PROFILE_DETAILS:
      return {
        ...state,
        profileDetails: action.profile
      };
    default:
      return state;
  }
};

export default profileReducers;
