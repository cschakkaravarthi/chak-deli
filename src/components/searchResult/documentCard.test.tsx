import React from 'react';
import { DocumentCard } from './documentCard';
import { dummyDocument } from '../../shared/models/Document.model';
import { shallowRender } from '../../shared/services/testHelper';
import { MemoryRouter } from 'react-router-dom';

describe('Document for search result', () => {
  it('renders correctly with props', () => {
    const tree = shallowRender(
      <MemoryRouter keyLength={0}>
        <DocumentCard document={dummyDocument} />
      </MemoryRouter>
    );
    expect(tree).toMatchSnapshot();
  });
});
