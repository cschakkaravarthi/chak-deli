import { Reducer } from 'redux';
import {
  FACILITIES_ERROR,
  LinkState,
  LOAD_FACILITIES,
  LOAD_LINKS,
  LOAD_MINISITE_LINKS,
  LOAD_QUICK_TOOLS,
  LOAD_USER_LINKS,
  CLEAR_FACILITILES
} from '../types/linkTypes';

export const initialState = {
  links: [],
  groups: [],
  minisiteLinks: {},
  quickTools: [],
  facilities: [],
  facilitiesError: false
};

const linkReducers: Reducer<LinkState, any> = (
  state = initialState,
  action
) => {
  switch (action.type) {
    case LOAD_FACILITIES:
      return {
        ...state,
        facilitiesError: false,
        facilities: action.facilities
      };
    case FACILITIES_ERROR:
      return {
        ...state,
        facilitiesError: true
      };
    case LOAD_MINISITE_LINKS:
      return {
        ...state,
        minisiteLinks: {
          ...state.minisiteLinks,
          [action.cat]: action.minisiteLinks
        }
      };
    case LOAD_LINKS:
      return {
        ...state,
        groups: action.groups
      };
    case LOAD_USER_LINKS:
      return {
        ...state,
        links: action.links
      };
    case LOAD_QUICK_TOOLS:
      return {
        ...state,
        quickTools: action.quickTools
      };
    case CLEAR_FACILITILES:
      return {
        ...state,
        facilities: initialState.facilities
      };
    default:
      return state;
  }
};

export default linkReducers;
