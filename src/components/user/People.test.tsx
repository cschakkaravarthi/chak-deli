import React from 'react';
import { shallowRender } from '../../shared/services/testHelper';
import People from './People';
import { dummyPeople } from '../../shared/models/People.model';

describe('People component', () => {
  it('renders null without facility', () => {
    const tree = shallowRender(
      <People people={dummyPeople}/>
    );
    expect(tree).toMatchSnapshot();
  });
});
