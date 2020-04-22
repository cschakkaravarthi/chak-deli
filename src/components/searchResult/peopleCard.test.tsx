import React from 'react';
import { PeopleCard } from './peopleCard';
import { dummyPeoples } from '../../shared/models/People.model';
import { shallowRender } from '../../shared/services/testHelper';
import { MemoryRouter } from 'react-router-dom';

describe('PeopleCard for search result', () => {
  it('renders correctly with props', () => {
    const tree = shallowRender(
      <MemoryRouter keyLength={0}>
        <PeopleCard people={dummyPeoples[0]} />
      </MemoryRouter>
    );
    expect(tree).toMatchSnapshot();
  });
});
