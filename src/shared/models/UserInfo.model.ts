import ErrorModel from './Error.model';
import images from '../../images/images';

export interface DirectReports {
  link?: string;
  lastName?: string;
  firstName?: string;
  networkID?: string;
}

export interface ContactResponse {
  success: boolean;
  error?: string;
  message: string;
  className?: string;
}

export interface Phone {
  cc: string;
  num: string;
  type: string;
}

export interface ReportsTo {
  lastName?: string;
  jobTitle?: string;
  networkID?: string;
  firstName?: string;
  department?: string;
}

export interface UserPhoto {
  large: string | null;
  medium: string | null;
  small: string | null;
  thumb: string | null;
}

export interface UserLocation {
  country: string;
  office: string;
  address: string;
  city: string;
  state: string;
  postalCode: string;
  room: string;
}

export default interface UserInfoModel {
  networkID?: string;
  email?: string;
  jobTitle?: string;
  department?: string;
  profilePicture?: string;
  location?: UserLocation;
  phone?: Phone[];
  photo?: UserPhoto;
  reportsTo?: ReportsTo;
  lastName?: string;
  firstName?: string;
  fullName?: string;
  preferredLanguage?: string;
  directReports?: DirectReports[];
  error?: ErrorModel;
}

type UserProfile = Omit<
  UserInfoModel,
  'jobTitle' | 'location' | 'phone' | 'photo' | 'reportsTo' | 'preferredLanguage' | 'directReports'
>;

export interface UserProfileModel extends UserProfile {
  title: string;
  fullName?: string;
  jobLocation?: string;
  companyName?: string;
  profitCenter?: string;
  desk?: string;
  officeNumber?: string;
  mobileNumber?: string;
  nickname?: string;
  birthday?: string;
  birthMonth?: string;
  anniversaryDay?: string;
  anniversaryMonth?: string;
  languagesSpoken?: string;
  professionalSkills?: string;
  currentlyWorking?: string;
  aboutMe?: string;
  hideMobileNumberOnProfile?: boolean;
  photo?: UserProfilePicture;
  avatar?: UserProfilePicture;
  profileType?: string;
  labelId?: number;
  labelLogo?: string;
}

export interface UserProfilePicture {
  photo?: string;
  siteCode?: string;
}

export interface ContactList {
  title: string;
  office?: string;
  mobile?: string;
  email?: string;
  contactPic?: UserProfilePicture;
}

export const dummyContactList: ContactList = {
  title: 'string',
  office: 'string',
  mobile: 'string',
  email: 'string',
  contactPic: {
    photo: 'string',
    siteCode: 'string'
  }
};

export const dummyInfo: UserInfoModel = {
  error: {
    message: '',
    isError: false,
    errorDetails: {}
  },
  networkID: 'AvesD',
  preferredLanguage: 'en-US',
  firstName: 'Luz',
  lastName: 'Lacson',
  email: 'doris.aves@umusic.com',
  jobTitle: 'Senior Director',
  department: 'UMG Corporate IT',
  profilePicture: '',
  location: {
    country: 'US',
    office: 'Woodland Hills - UMG',
    address: '21301 Burbank Blvd',
    city: 'Woodland Hills',
    state: 'CA',
    postalCode: '91367',
    room: 'A-31'
  },
  phone: [
    {
      cc: 'US',
      num: '+1 221 397 5664',
      type: 'Desk'
    },
    {
      cc: 'US',
      num: '+1 413 286 671',
      type: 'Mobile'
    }
  ],
  photo: {
    large: images.defaultAvatar,
    medium: images.defaultAvatar,
    small: images.defaultAvatar,
    thumb: images.defaultAvatar
  },
  reportsTo: {
    networkID: 'AbedA',
    lastName: 'Abed',
    firstName: 'Andre',
    jobTitle: 'Vice President, IT Run/Operations',
    department: 'UMG Corp IT/R&C Run'
  },
  directReports: [
    {
      networkID: 'HinesAr',
      lastName: 'Hines',
      firstName: 'Artrina'
    },
    {
      networkID: 'VanderA',
      lastName: 'Vanderberg',
      firstName: 'Ann'
    },
    {
      networkID: 'CapitoA',
      lastName: 'Capito',
      firstName: 'Apollo'
    },
    {
      networkID: 'GillisC',
      lastName: 'Gillis',
      firstName: 'Christopher'
    }
  ]
};

export const dummyProfileInfo: UserProfileModel = {
  error: {
    message: '',
    isError: false,
    errorDetails: {}
  },
  networkID: 'AvesD',
  firstName: 'Luz',
  lastName: 'Lacson',
  fullName: 'Luz Lacson',
  email: 'doris.aves@umusic.com',
  title: 'Senior Director',
  department: 'UMG Corporate IT',
  profilePicture: '',
  jobLocation: 'Woodland Hills - UMG',
  companyName: 'Universal Music Group',
  profitCenter: 'USIC',
  desk: '1A',
  officeNumber: '818.212.0897',
  mobileNumber: '818.264.4243',
  nickname: 'Chi',
  birthday: '13',
  birthMonth: '1',
  anniversaryDay: '1',
  anniversaryMonth: '7',
  languagesSpoken: 'English, Spanish',
  professionalSkills:
    "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries.",
  currentlyWorking:
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
  aboutMe:
    'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.',
  photo: { photo: '', siteCode: '' },
  avatar: { photo: '', siteCode: '' }
};

export const dummyUserInfo: UserInfoModel = dummyInfo;

// @TODO: may have to remove this and use above one 'UserInfoModel'. this is based on jwt-decode token
export interface UserInfo {
  userName?: string;
  profile?: any;
  name?: string;
}

export interface UserProfileUpdateResponse {
  userProfileUpdateErrorMessage: string;
  isUserProfileUpdateError: boolean;
}

export interface AddToContactResponse {
  success?: boolean;
}
