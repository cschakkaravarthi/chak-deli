import React from 'react';
import { shallowRender } from '../shared/services/testHelper';
import TemplateD from './TemplateD';
import { dummyDepartment } from '../shared/models/Department.model';
import { dummyTemplateIds } from '../shared/models/Template.model';

describe('TemplateD', () => {
  it('renders correctly', () => {
    const tree = shallowRender(
      <TemplateD
        content={dummyDepartment}
        contentIds={dummyTemplateIds}
      />
    );
    expect(tree).toMatchSnapshot();
  });
});
