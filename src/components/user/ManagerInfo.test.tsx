import React from 'react';
import TestRenderer from 'react-test-renderer';
import ManagerInfo from './ManagerInfo';

import { dummyUserInfo } from '../../shared/models/UserInfo.model';

describe('ManagerInfo', () => {
  it('renders correctly without info', () => {
    const tree = TestRenderer.create(<ManagerInfo />).toJSON();
    expect(tree).toBe(null);
  });

  it('renders correctly with info', () => {
    const tree = TestRenderer.create(<ManagerInfo reportsTo={dummyUserInfo} />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
