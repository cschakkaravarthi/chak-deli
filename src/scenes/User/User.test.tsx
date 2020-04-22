import React from 'react';
import { dummyUserInfo } from '../../shared/models/UserInfo.model';
import { User } from './User';
import TestRenderer from 'react-test-renderer';

// @TODO: Figure out how to shallow render components with hooks. (Deep render for now).

describe('User', () => {
  it('renders with data', () => {
    const tree = TestRenderer.create(<User userDetails={dummyUserInfo} />);
    expect(tree.toJSON()).toMatchSnapshot();
  });
});
