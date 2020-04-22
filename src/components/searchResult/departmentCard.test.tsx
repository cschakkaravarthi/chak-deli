import React from 'react';
import { DepartmentCard } from './departmentCard';
import { dummyDepartmentsArray } from '../../shared/models/Department.model';
import { shallowRender } from '../../shared/services/testHelper';
import { MemoryRouter } from 'react-router-dom';

describe('DepartmentCard for search result', () => {
  it('renders correctly with props', () => {
    const tree = shallowRender(
      <MemoryRouter keyLength={0}>
        <DepartmentCard department={dummyDepartmentsArray[0]} />
      </MemoryRouter>
    );
    expect(tree).toMatchSnapshot();
  });
});
