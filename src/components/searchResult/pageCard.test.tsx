import React from 'react';
import { PageCard } from './pageCard';
import { dummyPageSearchData } from '../../shared/models/Page.model';
import { shallowRender } from '../../shared/services/testHelper';
import { MemoryRouter } from 'react-router-dom';

describe('PageCard for search result', () => {
  it('renders correctly with props', () => {
    const tree = shallowRender(
      <MemoryRouter keyLength={0}>
        <PageCard pageCard={dummyPageSearchData} />
      </MemoryRouter>
    );
    expect(tree).toMatchSnapshot();
  });
});
