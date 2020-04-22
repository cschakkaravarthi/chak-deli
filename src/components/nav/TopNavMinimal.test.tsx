import React from 'react';
import { shallowRender } from '../../shared/services/testHelper';
import { TopNavMinimal } from './TopNavMinimal';

// This doesn't need to test when events are null since that logic is present on another component
describe('TopNavMinimal', () => {
  it('renders correctly', () => {
    const tree = shallowRender(<TopNavMinimal links={[]}/>);
    expect(tree).toMatchSnapshot();
  });
});
