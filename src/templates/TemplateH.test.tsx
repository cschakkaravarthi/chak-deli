import React from 'react';

import { TemplateH } from './TemplateH';
import { shallowRender } from '../shared/services/testHelper';
import { MemoryRouter } from 'react-router-dom';

describe('TemplateH', () => {
  it('should render without props', () => {
    const tree = shallowRender(
      <MemoryRouter keyLength={0}>
        <TemplateH />
      </MemoryRouter>
    );
    expect(tree).toMatchSnapshot();
  });
});
