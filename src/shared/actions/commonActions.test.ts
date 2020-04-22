import { toggleGlobalToast } from './commonActions';

describe('commonActions', () => {
  it('creates a toggleGlobalToast action', () => {
    expect(toggleGlobalToast(true, 'Successfull operation!', false)).toMatchSnapshot();
  });
});
