import React from 'react';
import { shallowRender } from '../shared/services/testHelper';
import TemplateA from './TemplateA';
import { dummyDepartment } from '../shared/models/Department.model';
import { dummyTemplateIds } from '../shared/models/Template.model';

describe('TemplateA', () => {
  it('renders correctly', () => {
    const tree = shallowRender(
      <TemplateA
        content={dummyDepartment}
        contentIds={dummyTemplateIds}
      />
    );
    expect(tree).toMatchSnapshot();
  });
});
