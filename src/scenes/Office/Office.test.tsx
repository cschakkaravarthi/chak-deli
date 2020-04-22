import React from 'react';
import { Office } from './Office';
import { shallowRender } from '../../shared/services/testHelper';
import { dummyOffice } from '../../shared/models/Office.model';

const mockMatch = { params: { id: 1 }, isExact: true, path: '', url: '' };

describe('Office scene', () => {
  it('renders null without event', () => {
    const tree = shallowRender(
      <Office office={undefined} isLastPage={false}/>
    );
    expect(tree).toEqual(null);
  });

  it('renders with offices', () => {
    const tree = shallowRender(
      <Office
        match={mockMatch}
        officeError={false}
        isLastPage={false}
        office={dummyOffice}
        fetchOffice={jest.fn()}/>
    );
    expect(tree).toMatchSnapshot();
  });
});
