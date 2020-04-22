import React from 'react';
import { shallowRender } from '../shared/services/testHelper';
import TemplateC from './TemplateC';
import { dummyDepartment } from '../shared/models/Department.model';
import { dummyTemplateIds } from '../shared/models/Template.model';

describe('TemplateC', () => {
  it('renders correctly', () => {
    const tree = shallowRender(
      <TemplateC
        content={dummyDepartment}
        contentIds={dummyTemplateIds}
      />
    );
    expect(tree).toMatchSnapshot();
  });
});
