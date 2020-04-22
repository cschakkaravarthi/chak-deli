export interface SystemApplicationItem {
  name: string;
  shortDescription?: string;
  ownedBy?: string;
  managedBy?: string;
  supportedBy?: string;
  url?: string;
  ownedByEmail?: string;
  managedByEmail?: string;
  supportedByEmail?: string;
}

export interface SystemsApplications {
  applications: SystemApplicationItem[];
}

export const dummySystemsApplications: SystemApplicationItem[] = [
  {
    name: 'ALT-A Europe  (ALT-A-EU)',
    shortDescription: '',
    ownedBy: 'Mark Ayres',
    managedBy: 'Danya Haggart',
    supportedBy: 'Danya Haggart',
    ownedByEmail: '',
    managedByEmail: '',
    supportedByEmail: '',
    url: ''
  },
  {
    name: 'ALT-A- Canada  (ALT-A-CN)',
    shortDescription: '',
    ownedBy: 'Cindy Oliver',
    managedBy: 'Gianina Carver',
    supportedBy: 'Gianina Carver',
    ownedByEmail: '',
    managedByEmail: '',
    supportedByEmail: '',
    url: ''
  },
  {
    name: 'ASPEN  (Asset Storage Platform Exchange Node)',
    shortDescription: '',
    ownedBy: 'Patrick Kraus',
    managedBy: '',
    supportedBy: '',
    ownedByEmail: '',
    managedByEmail: '',
    supportedByEmail: '',
    url: ''
  },
  {
    name: 'Active Directory  (Global Address List)',
    shortDescription: '',
    ownedBy: '',
    managedBy: 'Jane Peterson',
    supportedBy: 'Jay Thompson',
    ownedByEmail: '',
    managedByEmail: '',
    supportedByEmail: '',
    url: ''
  },
  {
    name: 'Atlas  (A2)',
    shortDescription: '',
    ownedBy: 'Kendra Ross',
    managedBy: '',
    supportedBy: '',
    ownedByEmail: '',
    managedByEmail: '',
    supportedByEmail: '',
    url: ''
  }
];
