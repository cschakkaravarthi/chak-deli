import React from 'react';
import TestRenderer from 'react-test-renderer';
import DirectReportInfo from './DirectReportInfo';

import { dummyUserInfo } from '../../shared/models/UserInfo.model';

describe('DirectReportInfo', () => {
  it('renders correctly without info', () => {
    const tree = TestRenderer.create(<DirectReportInfo directReports={[]} />).toJSON();
    expect(tree).toBe(null);
  });

  it('renders correctly with info', () => {
    const tree = TestRenderer.create(<DirectReportInfo directReports={dummyUserInfo.directReports} />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
