import React from 'react';
import { Department } from './Department';
import { shallowRender } from '../../shared/services/testHelper';
import { dummyDepartment } from '../../shared/models/Department.model';

describe('Department', () => {
  it('renders null on missing url param Department', () => {
    const tree = shallowRender(<Department/>);
    expect(tree).toEqual(null);
  });

  it('renders a Department', () => {
    const tree = shallowRender(
      <Department
        departmentId={1}
        department={dummyDepartment} />
    );
    expect(tree).toMatchSnapshot();
  });
});
