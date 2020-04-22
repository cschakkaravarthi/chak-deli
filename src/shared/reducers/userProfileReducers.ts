import { Reducer } from 'redux';
import {
  UserProfileState,
  SET_USER_PROFILE_DETAILS,
  SET_ORG_CHART,
  USER_PROFILE_RESPONSE_ERROR,
  ORG_CHART_RESPONSE_ERROR,
  CLEAR_PROFILE_DATA,
  SET_USER_PROFILE_PICTURE,
  UPDATE_USER_PROFILE_DATA,
  UPDATE_USER_PROFILE_REQUEST,
  UPDATE_USER_PROFILE_ERROR,
  CLEAR_USER_PROFILE_UPDATE_ERROR,
  FETCH_USER_PROFILE,
  FETCH_MY_CONTACTS,
  FETCH_ORG_CHART,
  SET_MY_CONTACTS,
  MY_CONTACTS_RESPONSE_ERROR,
  REMOVE_SINGLE_CONTACT,
  INITIATE_UPLOAD_PROFILE_PIC,
  UPLOAD_PROFILE_PIC_SUCCESS,
  UPLOAD_PROFILE_PIC_ERROR,
  REMOVE_PROFILE_PIC,
  COMPLETE_REMOVE_PROFILE_PIC
} from '../types/userProfileTypes';
import { Users } from 'umgc_ui_library/lib/seeds/OrgChart.model';
import { UserProfileModel, UserProfilePicture, ContactList } from '../models/UserInfo.model';

export const initialState = {
  userProfileDetails: {} as UserProfileModel,
  userOrgChart: {} as Users,
  profileDataError: false as boolean,
  chartDataError: false as boolean,
  userProfilePicture: {} as UserProfilePicture,
  isUserProfileUpdate: true as boolean,
  isFetchUserProfile: true as boolean,
  userProfileUpdateErrorMessage: '',
  isUserProfileUpdateError: false,
  isFetchingMyContacts: true,
  fetchingMyContactsError: false,
  userContactList: {} as ContactList[],
  removeContactSucess: false,
  isUploading: false,
  uploadSuccess: false,
  uploadError: false,
  removeProfilePicSucess: false,
  isFetchingOrgChart: true
};

const userProfileReducers: Reducer<UserProfileState, any> = (
  state = initialState,
  action
) => {
  switch (action.type) {
    case SET_USER_PROFILE_DETAILS:
      return {
        ...state,
        userProfileDetails: action.userProfile,
        profileDataError: false,
        isFetchUserProfile: false
      };
    case FETCH_USER_PROFILE:
      return {
        ...state,
        isFetchUserProfile: action.isFetchUserProfile,
        uploadSuccess: action.uploadSuccess
      };
    case SET_USER_PROFILE_PICTURE:
      return {
        ...state,
        userProfilePicture: action.userProfilePicture,
        profileDataError: false
      };
    case FETCH_ORG_CHART:
      return {
        ...state,
        isFetchingOrgChart: action.isFetchingOrgChart
      };
    case SET_ORG_CHART:
      return {
        ...state,
        userOrgChart: action.orgChartusers,
        chartDataError: action.chartDataError,
        isFetchingOrgChart: action.isFetchingOrgChart
      };
    case USER_PROFILE_RESPONSE_ERROR:
      return {
        ...state,
        profileDataError: true,
        isFetchUserProfile: false
      };
    case ORG_CHART_RESPONSE_ERROR:
      return {
        ...state,
        chartDataError: true
      };
    case CLEAR_PROFILE_DATA:
      return {
        ...state,
        userProfileDetails: { title: '' },
        userOrgChart: {},
        profileDataError: false,
        chartDataError: false
      };
    case UPDATE_USER_PROFILE_DATA:
      return {
        ...state,
        isUserProfileUpdate: action.isUserProfileUpdate,
        userProfileUpdateErrorMessage: action.userProfileUpdateErrorMessage,
        isUserProfileUpdateError: action.isUserProfileUpdateError
      };
    case UPDATE_USER_PROFILE_REQUEST:
      return {
        ...state,
        isUserProfileUpdate: action.isUserProfileUpdate
      };
    case UPDATE_USER_PROFILE_ERROR:
      return {
        ...state,
        isUserProfileUpdate: action.isUserProfileUpdate
      };
    case CLEAR_USER_PROFILE_UPDATE_ERROR:
      return {
        ...state,
        isUserProfileUpdateError: action.isUserProfileUpdateError,
        userProfileUpdateErrorMessage: action.userProfileUpdateErrorMessage
      };
    case FETCH_MY_CONTACTS:
      return {
        ...state,
        isFetchingMyContacts: action.isFetchingMyContacts
      };
    case SET_MY_CONTACTS:
      return {
        ...state,
        userContactList: action.userContactList,
        isFetchingMyContacts: action.isFetchingMyContacts,
        removeContactSucess: action.removeContactSucess
      };
    case MY_CONTACTS_RESPONSE_ERROR:
      return {
        ...state,
        isFetchingMyContacts: action.isFetchingMyContacts,
        fetchingMyContactsError: action.fetchingMyContactsError
      };
    case REMOVE_SINGLE_CONTACT:
      return {
        ...state,
        removeContactSucess: action.removeContactSucess
      };
    case INITIATE_UPLOAD_PROFILE_PIC:
      return {
        ...state,
        uploadSuccess: action.uploadSuccess,
        isUploading: action.isUploading
      };
    case UPLOAD_PROFILE_PIC_SUCCESS:
      return {
        ...state,
        uploadSuccess: action.uploadSuccess,
        isUploading: action.isUploading
      };
    case UPLOAD_PROFILE_PIC_ERROR:
      return {
        ...state,
        uploadError: action.uploadError
      };
    case REMOVE_PROFILE_PIC:
      return {
        ...state,
        removeProfilePicSucess: action.removeProfilePicSucess
      };
    case COMPLETE_REMOVE_PROFILE_PIC:
      return {
        ...state,
        removeProfilePicSucess: action.remo
      };
    default:
      return state;
  }
};

export default userProfileReducers;
