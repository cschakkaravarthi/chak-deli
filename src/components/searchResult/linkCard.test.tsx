import React from 'react';
import { LinkCard } from './linkCard';
import { searchDummyLinks } from '../../shared/models/Link.model';
import { shallowRender } from '../../shared/services/testHelper';
import { MemoryRouter } from 'react-router-dom';

describe('Link Card for search result', () => {
  it('renders correctly with props', () => {
    const tree = shallowRender(
      <MemoryRouter keyLength={0}>
        <LinkCard link={searchDummyLinks} />
      </MemoryRouter>
    );
    expect(tree).toMatchSnapshot();
  });
});
