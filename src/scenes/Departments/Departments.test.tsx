import React from 'react';
import { Departments } from './Departments';
import { shallowRender } from '../../shared/services/testHelper';
import { dummyDepartmentsArray } from '../../shared/models/Department.model';

describe('Department', () => {
  it('tests empty departments array', () => {
    const tree = shallowRender(<Departments departments={[]} />);
    expect(tree).toMatchSnapshot();
  });

  it('renders Departments', () => {
    const tree = shallowRender(<Departments departments={dummyDepartmentsArray} />);
    expect(tree).toMatchSnapshot();
  });
});
