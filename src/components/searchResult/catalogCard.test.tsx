import React from 'react';
import { CatalogCard } from './catalogCard';
import { dummyCatalog } from '../../shared/models/Catalog.model';
import { shallowRender } from '../../shared/services/testHelper';
import { MemoryRouter } from 'react-router-dom';

describe('Catalog for search result', () => {
  it('renders correctly with props', () => {
    const tree = shallowRender(
      <MemoryRouter keyLength={0}>
        <CatalogCard catalog={dummyCatalog} />
      </MemoryRouter>
    );
    expect(tree).toMatchSnapshot();
  });
});
