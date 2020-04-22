import { loadPeople } from './peopleActions';
import { dummyPeople } from '../models/People.model';

describe('peopleActions', () => {
  it('creates a loadPeople action', () => {
    expect(loadPeople([dummyPeople])).toMatchSnapshot();
  });
});
