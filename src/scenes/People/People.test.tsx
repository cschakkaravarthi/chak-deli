import React from 'react';
import { People } from './People';
import { shallowRender } from '../../shared/services/testHelper';
import { dummyDepartment } from '../../shared/models/Department.model';
import { dummyLabel } from '../../shared/models/Label.model';

describe('People', () => {
  it('renders null on missing url param People with type department', () => {
    const tree = shallowRender(<People type="department" />);
    expect(tree).toEqual(null);
  });

  it('renders null on missing url param People with type label', () => {
    const tree = shallowRender(<People type="department" />);
    expect(tree).toEqual(null);
  });

  it('renders a People page for Department', () => {
    const tree = shallowRender(
      <People
        type="departament"
        givenId={1}
        content={dummyDepartment} />
    );
    expect(tree).toMatchSnapshot();
  });

  it('renders a People page for labels', () => {
    const tree = shallowRender(
      <People
        type="label"
        givenId={1}
        content={dummyLabel} />
    );
    expect(tree).toMatchSnapshot();
  });
});
