import { Reducer } from 'redux';
import uniqBy from 'lodash.uniqby';

import {
  OfficesPeopleState,
  LOAD_OFFICES_PEOPLE,
  FILTER_OFFICES_PEOPLE
} from '../types/officesPeopleType';
import OfficesPeople, { OfficeItem, OfficePeopleCategory } from '../models/OfficesPeople.model';

export const initialState = {
  officesPeople: [],
  officesPeopleFilteredList: [],
  officeCategories: []
};

const officesPeopleReducers: Reducer<OfficesPeopleState, any> = (
  state = initialState,
  action
) => {
  switch (action.type) {
    case LOAD_OFFICES_PEOPLE: {
      const officeCategList: OfficePeopleCategory[] = [];

      action.officesPeople.forEach((data: OfficesPeople) => {
        data.officeList && data.officeList.forEach((officeObj: OfficeItem) => {
          officeObj.officeCategories && officeCategList.push(...officeObj.officeCategories);
        });
      });
      return {
        ...state,
        officesPeople: action.officesPeople,
        officesPeopleFilteredList: action.officesPeople,
        officeCategories: uniqBy(officeCategList, 'drupal_id')
      };
    }

    case FILTER_OFFICES_PEOPLE: {
      let currentData: OfficesPeople[] = [];
      currentData = state.officesPeople.filter(item => {
        return item != null && item.drupal_id === Number(action.filterId);
      });

      return {
        ...state,
        officesPeopleFilteredList: Number(action.filterId) === 0 ? state.officesPeople : currentData
      };
    }
    default:
      return state;
  }
};

export default officesPeopleReducers;
