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
export declare const dummyPeople: PeopleModel;
export declare const dummyPeoples: PeopleModel[];
export declare const dummyPeopleSkeletonData: PeopleModel[];
//# sourceMappingURL=People.model.d.ts.map