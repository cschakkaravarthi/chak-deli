import { combineReducers } from 'redux';
import articleReducers from './articleReducers';
import appreciationReducers from './appreciationReducers';
import notificationReducers from './notificationReducers';
import manualNotificationReducers from './manualNotificationReducers';
import usersReducers from './usersReducers';
import linkReducers from './linkReducers';
import officeReducers from './officeReducers';
import pageReducers from './pageReducers';
import departmentReducers from './departmentReducers';
import labelReducers from './labelReducers';
import eventReducers from './eventReducers';
import profileReducers from './profileReducers';
import searchResultReducers from './searchResultReducers';
import userProfileReducers from './userProfileReducers';
import employeeReducers from './employeeReducers';
import contentReducers from './contentReducers';
import peopleReducers from './peopleReducers';
import officesPeopleReducers from './officePeopleReducers';
import bookmarkReducers from './bookmarkReducers';
import todoReducers from './todoReducers';
import commonReducers from './commonReducers';
import systemsApplicationsReducers from './systemsApplicationsReducers';

import { EventState } from '../types/eventTypes';
import { UsersState } from '../types/userTypes';
import { ArticleState } from '../types/articleTypes';
import { LabelState } from '../types/labelTypes';
import { NotificationState } from '../types/notificationTypes';
import { ManualNotificationListState } from '../types/manualNotificationTypes';
import { LinkState } from '../types/linkTypes';
import { ProfileState } from '../types/profileTypes';
import { SearchResultState } from '../types/searchResultTypes';
import { EmployeeState } from '../types/employeeTypes';
import { UserProfileState } from '../types/userProfileTypes';
import { PageState } from '../types/pageTypes';
import { DepartmentsState } from '../types/departmentTypes';
import { OfficeState } from '../types/officeTypes';
import { PeopleState } from '../types/peopleTypes';
import { OfficesPeopleState } from '../types/officesPeopleType';
import { BookmarkState } from '../types/bookmarkTypes';
import { TodoState } from '../types/todoTypes';
import { ContentStateModel } from '../types/contentTypes';
import { CommonState } from '../types/commonTypes';
import { AppreciationState } from '../types/appreciationTypes';
import { SystemsApplicationsState } from '../types/systemsApplicationsTypes';

export interface ApplicationState {
  appreciationReducers: AppreciationState;
  articleReducers: ArticleState;
  bookmarkReducers: BookmarkState;
  contentReducers: ContentStateModel;
  departmentReducers: DepartmentsState;
  employeeReducers: EmployeeState;
  eventReducers: EventState;
  linkReducers: LinkState;
  labelReducers: LabelState;
  manualNotificationReducers: ManualNotificationListState;
  notificationReducers: NotificationState;
  officeReducers: OfficeState;
  officesPeopleReducers: OfficesPeopleState;
  pageReducers: PageState;
  peopleReducers: PeopleState;
  profileReducers: ProfileState;
  searchResultReducers: SearchResultState;
  todoReducers: TodoState;
  userProfileReducers: UserProfileState;
  usersReducers: UsersState;
  commonReducers: CommonState;
  systemsApplicationsReducers: SystemsApplicationsState;
}

const rootReducer = combineReducers<ApplicationState>({
  appreciationReducers,
  articleReducers,
  bookmarkReducers,
  contentReducers,
  departmentReducers,
  employeeReducers,
  eventReducers,
  linkReducers,
  labelReducers,
  manualNotificationReducers,
  notificationReducers,
  officeReducers,
  officesPeopleReducers,
  pageReducers,
  peopleReducers,
  profileReducers,
  searchResultReducers,
  todoReducers,
  userProfileReducers,
  usersReducers,
  commonReducers,
  systemsApplicationsReducers
});

export default rootReducer;
