import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { OfficesPeople } from './Offices';
import { shallowRender } from '../../shared/services/testHelper';
import { dummyOfficesPeople } from '../../shared/models/OfficesPeople.model';

describe('OfficesPeople', () => {
  it('renders without data', () => {
    const tree = shallowRender(
      <MemoryRouter keyLength={0}>
        <OfficesPeople setFilterFacet={() => {}} />
      </MemoryRouter>
    );
    expect(tree).toMatchSnapshot();
  });

  it('renders with data', () => {
    const tree = shallowRender(
      <MemoryRouter keyLength={0}>
        <OfficesPeople
          officesPeopleList={dummyOfficesPeople}
          setFilterFacet={() => {}}
        />
      </MemoryRouter>
    );
    expect(tree).toMatchSnapshot();
  });
});
