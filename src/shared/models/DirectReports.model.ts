export default interface Reports {
  link: string;
  lastName: string;
  networkID: string;
  firstName: string;
}

export const dummyReports: Reports[] = [
  {
    networkID: 'CarloId',
    firstName: 'Carlo',
    lastName: 'Magno',
    link:
      'https://personsearch.stage.umgctrl.dev/person/ad/find?networkID=CarloId'
  },
  {
    networkID: 'AlbertId',
    firstName: 'Albert',
    lastName: 'Camus',
    link:
      'https://personsearch.stage.umgctrl.dev/person/ad/find?networkID=AlbertId'
  },
  {
    networkID: 'OliverId',
    firstName: 'Oliver',
    lastName: 'Khan',
    link:
      'https://personsearch.stage.umgctrl.dev/person/ad/find?networkID=OliverIdr'
  }
];
