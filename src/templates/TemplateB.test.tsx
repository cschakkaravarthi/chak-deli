import React from 'react';
import { shallowRender } from '../shared/services/testHelper';
import { Template } from './TemplateB';
import { dummyDepartment, dummyDepartmentContacts } from '../shared/models/Department.model';
import { dummyTemplateIds } from '../shared/models/Template.model';

describe('TemplateB', () => {
  it('renders correctly', () => {
    const tree = shallowRender(
      <Template
        content={dummyDepartment}
        contentIds={dummyTemplateIds}
        departmentContacts={dummyDepartmentContacts}
      />
    );
    expect(tree).toMatchSnapshot();
  });
});
