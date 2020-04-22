export default interface ManagerInfoModel {
  id: number;
  name: string;
  lastName: string;
  title: string;
  group: string;
  belongsTo: string;
}

export const dummyManagerInfo: ManagerInfoModel = {
  id: 23,
  name: 'Carlo',
  lastName: 'Magno',
  title: 'Senior Director',
  group: 'Universal Music Group',
  belongsTo: 'Corporate Communications'
};
