import React from 'react';

import { Home } from './Home';
import { shallowRender } from '../shared/services/testHelper';
import { MemoryRouter } from 'react-router-dom';

describe('Home', () => {
  it('should render without props', () => {
    const tree = shallowRender(
      <MemoryRouter keyLength={0}>
        <Home />
      </MemoryRouter>
    );
    expect(tree).toMatchSnapshot();
  });
});
