import { UserProfileModel, UserProfilePicture, ContactList } from '../models/UserInfo.model';
import { Users } from '../models/OrgChart.model';

export const FETCH_USER_PROFILE = 'FETCH_USER_PROFILE';
export const SET_USER_PROFILE_DETAILS = 'SET_USER_PROFILE_DETAILS';
export const FETCH_USER_PROFILE_PICTURE = 'FETCH_USER_PROFILE_PICTURE';
export const SET_USER_PROFILE_PICTURE = 'SET_USER_PROFILE_PICTURE';
export const SET_ORG_CHART = 'SET_ORG_CHART';
export const FETCH_ORG_CHART = 'FETCH_ORG_CHART';
export const USER_PROFILE_RESPONSE_ERROR = 'USER_PROFILE_RESPONSE_ERROR';
export const ORG_CHART_RESPONSE_ERROR = 'ORG_CHART_RESPONSE_ERROR';
export const CLEAR_PROFILE_DATA = 'CLEAR_PROFILE_DATA';
export const UPDATE_USER_PROFILE_DATA = 'UPDATE_USER_PROFILE_DATA';
export const UPDATE_USER_PROFILE_REQUEST = 'UPDATE_USER_PROFILE_REQUEST';
export const UPDATE_USER_PROFILE_ERROR = 'UPDATE_USER_PROFILE_ERROR';
export const FETCH_MY_CONTACTS = 'FETCH_MY_CONTACTS';
export const SET_MY_CONTACTS = 'SET_MY_CONTACTS';
export const MY_CONTACTS_RESPONSE_ERROR = 'MY_CONTACTS_RESPONSE_ERROR';
export const REMOVE_SINGLE_CONTACT = 'REMOVE_SINGLE_CONTACT';
export const INITIATE_UPLOAD_PROFILE_PIC = 'INITIATE_UPLOAD_PROFILE_PIC';
export const UPLOAD_PROFILE_PIC_SUCCESS = 'UPLOAD_PROFILE_PIC_SUCCESS';
export const UPLOAD_PROFILE_PIC_ERROR = 'UPLOAD_PROFILE_PIC_ERROR';
export const CLEAR_USER_PROFILE_UPDATE_ERROR = 'CLEAR_USER_PROFILE_UPDATE_ERROR';
export const REMOVE_PROFILE_PIC = 'REMOVE_PROFILE_PIC';
export const COMPLETE_REMOVE_PROFILE_PIC = 'COMPLETE_REMOVE_PROFILE_PIC';

export interface UserProfileState {
  userProfileDetails: UserProfileModel;
  userProfilePicture: UserProfilePicture;
  userOrgChart: Users;
  profileDataError: boolean;
  chartDataError: boolean;
  isUserProfileUpdate: boolean;
  isFetchUserProfile: boolean;
  userProfileUpdateErrorMessage: string;
  isUserProfileUpdateError: boolean;
  userContactList: ContactList[];
  isFetchingMyContacts: boolean;
  fetchingMyContactsError: boolean;
  removeContactSucess: boolean;
  uploadSuccess: boolean;
  uploadError: boolean;
  isUploading: boolean;
  removeProfilePicSucess: boolean;
  isFetchingOrgChart: boolean;
}

export interface LoadUserProfileDetailsAction {
  type: typeof SET_USER_PROFILE_DETAILS;
  userProfile: UserProfileModel;
}

export interface LoadUserProfilePictureAction {
  type: typeof SET_USER_PROFILE_PICTURE;
  userProfilePicture: UserProfilePicture;
}

export interface OrgChartState {
  orgChartState: Users;
}

export interface LoadOrgChartAction {
  type: typeof SET_ORG_CHART;
  orgChartusers: Users;
  chartDataError: boolean;
  isFetchingOrgChart: boolean;
}

export interface UserProfileResponseError {
  type: typeof USER_PROFILE_RESPONSE_ERROR;
  profileDataError?: boolean;
}

export interface OrgChartResponseError {
  type: typeof ORG_CHART_RESPONSE_ERROR;
  chartDataError?: boolean;
}

export interface ClearUserProfile {
  type: typeof CLEAR_PROFILE_DATA;
}
export interface UpdateUserProfile {
  type: typeof UPDATE_USER_PROFILE_DATA;
  isUserProfileUpdate?: boolean;
  userProfileUpdateErrorMessage: string;
  isUserProfileUpdateError: boolean;
}
export interface UpdateUserProfileRequest {
  type: typeof UPDATE_USER_PROFILE_REQUEST;
  isUserProfileUpdate?: boolean;
  isUserProfileUpdateError?: boolean;
  userProfileUpdateErrorMessage?: string;
}

export interface UpdateUserProfileError {
  type: typeof UPDATE_USER_PROFILE_ERROR;
  isUserProfileUpdate?: boolean;
}

export interface FetchUserProfile {
  type: typeof FETCH_USER_PROFILE;
  isFetchUserProfile?: boolean;
  uploadSuccess?: boolean;
}

export interface FetchMyContacts {
  type: typeof FETCH_MY_CONTACTS;
  isFetchingMyContacts: boolean;
}

export interface SetMyContacts {
  type: typeof SET_MY_CONTACTS;
  userContactList: ContactList;
  isFetchingMyContacts: boolean;
  removeContactSucess: boolean;
}

export interface MyContactsResponseError {
  type: typeof MY_CONTACTS_RESPONSE_ERROR;
  isFetchingMyContacts: boolean;
  fetchingMyContactsError: boolean;
}

export interface RemoveSingleContactType {
  type: typeof REMOVE_SINGLE_CONTACT;
  removeContactSucess: boolean;
}

export interface InitiateUploadProfilePic {
  type: typeof INITIATE_UPLOAD_PROFILE_PIC;
  uploadSuccess: boolean;
  isUploading: boolean;
}

export interface UploadProfilePictureSuccessType {
  type: typeof UPLOAD_PROFILE_PIC_SUCCESS;
  uploadSuccess: boolean;
  isUploading: boolean;
}

export interface UploadProfilePictureErrorType {
  type: typeof UPLOAD_PROFILE_PIC_ERROR;
  uploadError: boolean;
}

export interface ClearUserProfileUpdateError {
  type: typeof CLEAR_USER_PROFILE_UPDATE_ERROR;
  isUserProfileUpdate?: boolean;
  isUserProfileUpdateError?: boolean;
  userProfileUpdateErrorMessage?: string;
}

export interface CompleteRemoveProfilePic {
  type: typeof COMPLETE_REMOVE_PROFILE_PIC;
  removeProfilePicSucess: boolean;
}

export interface RemoveUserProfilePic {
  type: typeof REMOVE_PROFILE_PIC;
  removeProfilePicSucess: boolean;
}

export interface FetchOrgChart {
  type: typeof FETCH_ORG_CHART;
  isFetchingOrgChart: boolean;
}
