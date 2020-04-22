export interface Users {
    manager: Manager;
    user: Manager;
    subordinates: Manager[];
}

export interface Manager {
    email?: string;
    name: string;
    title?: string;
}

export const dummyManager: Manager = {
  name: 'Tom Mitchell',
  title: 'CEO'
};

export const dummyUser: Manager = {
  name: 'Luz Lacson'
};

export const dummyUsers: Users = {
  manager: dummyManager,
  user: dummyUser,
  subordinates: [{ name: 'Harman Kaur', title: 'Business Analyst' },
    { name: 'Ed Rowell', title: 'Sr. Business Analyst' }]
};
