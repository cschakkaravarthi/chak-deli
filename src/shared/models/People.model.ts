export interface UserProfilePicture {
  photo?: string;
}

export default interface PeopleModel {
  loginId: string;
  fullName?: string;
  firstName?: string;
  lastName?: string;
  employeeType?: string;
  employeeNumber?: string;
  title?: string;
  managerName?: string;
  managerEmail?: string;
  costCenter?: string;
  department?: string;
  company?: string;
  location?: string;
  siteCode?: string;
  country?: string;
  mobileNumber?: string;
  phoneNumber?: string;
  voipNumber?: string;
  email?: string;
  prefLanguage?: string;
  photo?: UserProfilePicture;
  avatar?: UserProfilePicture;
}

export const dummyPeople: PeopleModel = {
  loginId: 'Balasua2',
  fullName: 'Bastian vonPfister',
  firstName: 'Bastian',
  lastName: 'vonPfister',
  employeeType: '3rd Party',
  employeeNumber: '',
  title: 'Manager Business Analysis & Commercial P',
  managerName: 'Joerg Bromberg',
  costCenter: 'GER30/DE050075',
  department: 'Sales',
  company: 'n/a',
  location: '',
  siteCode: 'EXTNL',
  country: 'Germany',
  mobileNumber: '',
  phoneNumber: '+49 30 810969 213',
  voipNumber: '',
  email: 'Bastian.vonPfister@studiocanal.de',
  prefLanguage: '',
  photo: { photo: '' },
  avatar: { photo: '' }
};

export const dummyPeoples: PeopleModel[] = [
  dummyPeople,
  { ...dummyPeople, firstName: 'Bastian' }
];
