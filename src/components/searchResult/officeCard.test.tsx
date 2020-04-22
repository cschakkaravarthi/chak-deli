import React from 'react';
import { OfficeCard } from './officeCard';
import { dummySearchOffice } from '../../shared/models/Office.model';
import { shallowRender } from '../../shared/services/testHelper';
import { MemoryRouter } from 'react-router-dom';

describe('OfficeCard for search result', () => {
  it('renders correctly with props', () => {
    const tree = shallowRender(
      <MemoryRouter keyLength={0}>
        <OfficeCard office={dummySearchOffice} />
      </MemoryRouter>
    );
    expect(tree).toMatchSnapshot();
  });
});
