import React from 'react';
import { shallowRender } from '../../shared/services/testHelper';
import { QuickTools } from './QuickTools';
import { dummyLink } from '../../shared/models/Link.model';

describe('QuickTools', () => {
  it('no quick tools', () => {
    const tree = shallowRender(
      <QuickTools quickTools={[]} />
    );
    expect(tree).toMatchSnapshot();
  });

  it('Renders correctly', () => {
    const tree = shallowRender(
      <QuickTools quickTools={[dummyLink]} />
    );
    expect(tree).toMatchSnapshot();
  });
});
