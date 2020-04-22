import React from 'react';
import { shallowRender } from '../../shared/services/testHelper';
import Facilities from './Facilities';
import { dummyLink } from '../../shared/models/Link.model';

describe('Facilities component', () => {
  it('renders null without facility', () => {
    const tree = shallowRender(
      <Facilities/>
    );
    expect(tree).toMatchSnapshot();
  });

  it('renders error component', () => {
    const tree = shallowRender(
      <Facilities facilitiesError={true}/>
    );
    expect(tree).toMatchSnapshot();
  });

  it('renders with offices', () => {
    const tree = shallowRender(
      <Facilities facility={dummyLink} facilitiesError={false}/>
    );
    expect(tree).toMatchSnapshot();
  });
});
