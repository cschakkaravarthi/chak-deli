import {
  FETCH_SYSTEMS_APPLICATIONS,
  LOAD_SYSTEMS_APPLICATIONS,
  FetchSystemsApplicationsAction,
  LoadSystemsApplicationsAction
} from '../types/systemsApplicationsTypes';
import { ThunkDispatch } from 'redux-thunk';
import { AnyAction } from 'redux';
import { SystemApplicationItem } from '../../shared/models/SystemsApplications.model';
import ApiService from '../services/apiService';
import { triggerToast } from './commonActions';

export const fetchApplications = (): FetchSystemsApplicationsAction => (
  {
    isFetching: true,
    applications: [],
    type: FETCH_SYSTEMS_APPLICATIONS
  }
);

export const loadSystemsApplications = (applications: SystemApplicationItem[]): LoadSystemsApplicationsAction => (
  {
    applications,
    isFetching: false,
    type: LOAD_SYSTEMS_APPLICATIONS
  }
);

export const fetchSystemsApplications = (filterBy?: string) => {
  return async (dispatch: ThunkDispatch<{}, {}, AnyAction>): Promise<void> => {
    dispatch(fetchApplications());
    return ApiService.getSystemsApplications(
      applications => dispatch(loadSystemsApplications(applications)),
      () => dispatch(triggerToast('Systems and Applications are not loading. Try again later!', true)),
      filterBy
    );
  };
};
