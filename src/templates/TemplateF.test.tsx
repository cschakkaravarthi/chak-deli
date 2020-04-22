import React from 'react';
import { shallowRender } from '../shared/services/testHelper';
import { Template } from './TemplateF';
import { dummyLabel } from '../shared/models/Label.model';
import { dummyTemplateIds } from '../shared/models/Template.model';

describe('TemplateE', () => {
  it.skip('renders correctly', () => {
    const tree = shallowRender(
      <Template
        content={dummyLabel}
        contentIds={dummyTemplateIds}
      />
    );
    expect(tree).toMatchSnapshot();
  });
});
