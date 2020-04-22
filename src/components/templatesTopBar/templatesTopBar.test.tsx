import React from 'react';
import { TemplatesTopBar } from './templatesTopBar';
import { shallowRender } from '../../shared/services/testHelper';
import { dummyDepartment } from '../../shared/models/Department.model';
import { dummyLabel } from '../../shared/models/Label.model';

describe('TemplatesTopBar', () => {
  it('renders a top bar for department', () => {
    const tree = shallowRender(
      <TemplatesTopBar
        type="departament"
        givenId={1}
        content={dummyDepartment} />
    );
    expect(tree).toMatchSnapshot();
  });

  it('renders a top bar for labels', () => {
    const tree = shallowRender(
      <TemplatesTopBar
        type="label"
        givenId={1}
        content={dummyLabel} />
    );
    expect(tree).toMatchSnapshot();
  });
});
