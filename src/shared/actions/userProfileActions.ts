import { ThunkDispatch } from 'redux-thunk';
import { AnyAction } from 'redux';
import ApiService from '../services/apiService';

import {
  LoadUserProfileDetailsAction,
  LoadUserProfilePictureAction,
  LoadOrgChartAction,
  UpdateUserProfile,
  UpdateUserProfileRequest,
  UpdateUserProfileError,
  UserProfileResponseError,
  OrgChartResponseError,
  ClearUserProfile,
  FetchUserProfile,
  FetchMyContacts,
  SetMyContacts,
  MyContactsResponseError,
  RemoveSingleContactType,
  InitiateUploadProfilePic,
  UploadProfilePictureSuccessType,
  UploadProfilePictureErrorType,
  ClearUserProfileUpdateError,
  RemoveUserProfilePic,
  FetchOrgChart,
  FETCH_USER_PROFILE,
  SET_USER_PROFILE_DETAILS,
  FETCH_ORG_CHART,
  SET_ORG_CHART,
  USER_PROFILE_RESPONSE_ERROR,
  ORG_CHART_RESPONSE_ERROR,
  CLEAR_PROFILE_DATA,
  FETCH_USER_PROFILE_PICTURE,
  SET_USER_PROFILE_PICTURE,
  UPDATE_USER_PROFILE_DATA,
  UPDATE_USER_PROFILE_REQUEST,
  UPDATE_USER_PROFILE_ERROR,
  FETCH_MY_CONTACTS,
  SET_MY_CONTACTS,
  MY_CONTACTS_RESPONSE_ERROR,
  REMOVE_SINGLE_CONTACT,
  INITIATE_UPLOAD_PROFILE_PIC,
  UPLOAD_PROFILE_PIC_SUCCESS,
  UPLOAD_PROFILE_PIC_ERROR,
  CLEAR_USER_PROFILE_UPDATE_ERROR,
  REMOVE_PROFILE_PIC,
  COMPLETE_REMOVE_PROFILE_PIC,
  CompleteRemoveProfilePic
} from '../types/userProfileTypes';
import {
  UserProfileModel,
  UserProfilePicture,
  ContactResponse,
  ContactList,
  UserProfileUpdateResponse,
  AddToContactResponse
} from '../models/UserInfo.model';
import { ApiErrorModel } from '../models/Error.model';
import { Users } from '../models/OrgChart.model';
import ApiNormalizer from '../services/apiNormalizer';
import { triggerToast } from './commonActions';

export const setUserProfileDetails = (
  userProfile: UserProfileModel
): LoadUserProfileDetailsAction => ({
  userProfile,
  type: SET_USER_PROFILE_DETAILS
});

export const setUserProfilePicture = (
  userProfilePicture: UserProfilePicture
): LoadUserProfilePictureAction => ({
  userProfilePicture,
  type: SET_USER_PROFILE_PICTURE
});

export const loadUserProfileError = (error: ApiErrorModel): UserProfileResponseError => {
  let profileDataError;
  if (error) {
    profileDataError = true;
  }
  return ({
    type: USER_PROFILE_RESPONSE_ERROR,
    profileDataError
  });
};

export const fetchUserProfile = (): FetchUserProfile => {
  return ({
    type: FETCH_USER_PROFILE,
    isFetchUserProfile: true
  });
};

export const fetchUserProfileDetails = (email: string) => {
  return async (dispatch: ThunkDispatch<{}, {}, AnyAction>): Promise<void> => {
    dispatch(fetchUserProfile());
    return ApiService.getUserProfile(userProfile =>
      dispatch(setUserProfileDetails(userProfile)),
    error => dispatch(loadUserProfileError(error)),
    email
    );
  };
};

export const fetchUserProfilePicture = (email: string) => {
  return async (dispatch: ThunkDispatch<{}, {}, AnyAction>): Promise<void> => {
    dispatch(() => ({ type: FETCH_USER_PROFILE_PICTURE }));
    return ApiService.getUserProfilePicture(userProfilePicture =>
      dispatch(setUserProfilePicture(userProfilePicture)),
    error => dispatch(loadUserProfileError(error)),
    email
    );
  };
};

export const fetchAddToContactRequest = (email: string | undefined) => {
  return (dispatch: ThunkDispatch<{}, {}, AnyAction>): void => {
    ApiService.postAddToContact(
      (res: AddToContactResponse) => {
        if (res.success) { dispatch(triggerToast('Contact added successfully.')); } else { dispatch(triggerToast('Contact is already in your contacts.', true)); }
      },
      () => {
        dispatch(triggerToast('Error adding contact. Try again later!'));
      },
      email
    );
  };
};

export const loadOrgChart = (
  orgChartusers: Users
): LoadOrgChartAction => ({
  orgChartusers,
  isFetchingOrgChart: false,
  chartDataError: false,
  type: SET_ORG_CHART
});

export const loadOrgChartError = (error: ApiErrorModel): OrgChartResponseError => {
  let chartDataError;
  if (error) {
    chartDataError = true;
  }
  return ({
    type: ORG_CHART_RESPONSE_ERROR,
    chartDataError
  });
};

export const fetchingOrgChart = (): FetchOrgChart => ({
  isFetchingOrgChart: true,
  type: FETCH_ORG_CHART
});

export const fetchOrgChart = (email: string) => {
  return async (dispatch: ThunkDispatch<{}, {}, AnyAction>): Promise<void> => {
    dispatch(fetchingOrgChart());
    return ApiService.getUserOrgChart(
      usersOrgChart => dispatch(loadOrgChart(usersOrgChart)),
      error => {
        if (error) {
          dispatch(loadOrgChartError(error));
        }
        return dispatch(triggerToast('Org Chart is not loading. Try again later! ', true));
      },
      email
    );
  };
};

export const clearProfileData = (): ClearUserProfile => {
  return ({
    type: CLEAR_PROFILE_DATA
  });
};

export const updateUserProfileData = (res: UserProfileUpdateResponse): UpdateUserProfile => {
  return ({
    type: UPDATE_USER_PROFILE_DATA,
    isUserProfileUpdate: false,
    isUserProfileUpdateError: res.isUserProfileUpdateError,
    userProfileUpdateErrorMessage: res.userProfileUpdateErrorMessage
  });
};

export const updateUserProfileRequest = (): UpdateUserProfileRequest => ({
  type: UPDATE_USER_PROFILE_REQUEST,
  isUserProfileUpdate: true,
  isUserProfileUpdateError: false,
  userProfileUpdateErrorMessage: ''
});

export const clearUserProfileUpdateError = (): ClearUserProfileUpdateError => ({
  type: CLEAR_USER_PROFILE_UPDATE_ERROR,
  isUserProfileUpdateError: false,
  userProfileUpdateErrorMessage: ''
});

export const updateUserProfileError = (error: ApiErrorModel): UpdateUserProfileError => {
  let isUpdateStatus;
  if (error) {
    isUpdateStatus = true;
  }
  return ({
    type: UPDATE_USER_PROFILE_ERROR,
    isUserProfileUpdate: isUpdateStatus
  });
};

export const setUserProfileData = (userDetails: Omit<UserProfileModel, 'title'>) => {
  return async (dispatch: ThunkDispatch<{}, {}, AnyAction>): Promise<void> => {
    dispatch(updateUserProfileRequest());
    return ApiService.updateUserProfileDetails(
      res => dispatch(updateUserProfileData(res)),
      error => dispatch(updateUserProfileError(error)),
      ApiNormalizer.normalizeSetUserProfileData(userDetails)
    );
  };
};

export const fetchMyContactsRequest = (): FetchMyContacts => {
  return ({
    type: FETCH_MY_CONTACTS,
    isFetchingMyContacts: true
  });
};

export const setMyContactsList = (myContactsList: ContactList): SetMyContacts => {
  return ({
    type: SET_MY_CONTACTS,
    userContactList: myContactsList,
    isFetchingMyContacts: false,
    removeContactSucess: false
  });
};

export const fetchMyContactsError = (error: ApiErrorModel): MyContactsResponseError => {
  let isError = false;
  if (error) {
    isError = true;
  }
  return ({
    type: MY_CONTACTS_RESPONSE_ERROR,
    isFetchingMyContacts: !isError,
    fetchingMyContactsError: true
  });
};

export const fetchMyContactsData = () => {
  return async (dispatch: ThunkDispatch<{}, {}, AnyAction>): Promise<void> => {
    dispatch(fetchMyContactsRequest());
    return ApiService.fetchMyContactsList(
      myContactsList => dispatch(setMyContactsList(myContactsList)),
      (error) => {
        if (error) {
          return dispatch(triggerToast('My Contacts are not loading. Try again later! ', true));
        }
      });
  };
};

export const removeSingleContactFromList = (response: ContactResponse): RemoveSingleContactType => {
  return ({
    type: REMOVE_SINGLE_CONTACT,
    removeContactSucess: response.success
  });
};

export const removeSingleContact = (email: string) => {
  return async (dispatch: ThunkDispatch<{}, {}, AnyAction>): Promise<void> => {
    return ApiService.removeContactFromList(
      (response) => dispatch(removeSingleContactFromList(response)),
      error => dispatch(fetchMyContactsError(error)),
      email
    );
  };
};

export const uploadProfilePictureError = (error: ApiErrorModel): UploadProfilePictureErrorType => {
  let isError = false;
  if (error) {
    isError = true;
  }
  return ({
    type: UPLOAD_PROFILE_PIC_ERROR,
    uploadError: isError
  });
};

export const uploadProfilePictureSuccess = (): UploadProfilePictureSuccessType => {
  return ({
    type: UPLOAD_PROFILE_PIC_SUCCESS,
    uploadSuccess: true,
    isUploading: false
  });
};

export const initiateUploadProfilePicture = (): InitiateUploadProfilePic => {
  return ({
    type: INITIATE_UPLOAD_PROFILE_PIC,
    uploadSuccess: false,
    isUploading: true
  });
};

export const uploadUserProfilePicture = (photo: File) => {
  return async (dispatch: ThunkDispatch<{}, {}, AnyAction>): Promise<void> => {
    dispatch(initiateUploadProfilePicture());
    return ApiService.uploadUserProfilePic(
      () => dispatch(uploadProfilePictureSuccess()),
      error => dispatch(uploadProfilePictureError(error)),
      photo
    );
  };
};

/**
 * Once profile pic is removed action is complete, This flag will reset the remove profile pic success status
 */
export const updateRemoveProfilePic = (): CompleteRemoveProfilePic => {
  return ({
    type: COMPLETE_REMOVE_PROFILE_PIC,
    removeProfilePicSucess: false
  });
};

export const removeProfilePicture = (response: ContactResponse): RemoveUserProfilePic => {
  return ({
    type: REMOVE_PROFILE_PIC,
    removeProfilePicSucess: response.success || true
  });
};

// isProfileAPIProcessing flags block all the duplicate call for remove profile pic.
let isProfileApiProcessing = false;
export const removeProfilePic = () => {
  return async (dispatch: ThunkDispatch<{}, {}, AnyAction>): Promise<void> => {
    if (isProfileApiProcessing) {
      return;
    }
    isProfileApiProcessing = true;
    return ApiService.removeUserProfilePic(
      (response) => {
        isProfileApiProcessing = false;
        dispatch(removeProfilePicture(response));
      },
      error => {
        if (error) {
          isProfileApiProcessing = false;
          return dispatch(triggerToast('Error removing user profile photo. Try again later!', true));
        }
      }
    );
  };
};
