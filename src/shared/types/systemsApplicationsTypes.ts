import { SystemApplicationItem } from '../models/SystemsApplications.model';

export const FETCH_SYSTEMS_APPLICATIONS = 'FETCH_SYSTEMS_APPLICATIONS';
export const LOAD_SYSTEMS_APPLICATIONS = 'LOAD_SYSTEMS_APPLICATIONS';

export interface LoadSystemsApplicationsAction {
  type: typeof LOAD_SYSTEMS_APPLICATIONS;
  applications: SystemApplicationItem[];
  isFetching: boolean;
}

export interface FetchSystemsApplicationsAction {
  type: typeof FETCH_SYSTEMS_APPLICATIONS;
  isFetching: boolean;
  applications: SystemApplicationItem[];
}

export interface SystemsApplicationsState {
  applications: SystemApplicationItem[];
  isFetching: boolean;
}
