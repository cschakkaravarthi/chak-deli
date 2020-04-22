import { dummyOffice } from '../models/Office.model';
import { loadOfficeAction } from './officeActions';

describe('officeActions', () => {
  it('creates a loadOfficeAction action', () => {
    expect(loadOfficeAction(dummyOffice)).toMatchSnapshot();
  });
});
