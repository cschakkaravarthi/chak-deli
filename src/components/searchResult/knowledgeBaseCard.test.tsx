import React from 'react';
import { KnowledgeCard } from './knowledgeBaseCard';
import { dummyKnowledgeBase } from '../../shared/models/KnowledgeBase.model';
import { shallowRender } from '../../shared/services/testHelper';
import { MemoryRouter } from 'react-router-dom';

describe('Knowledge Base for search result', () => {
  it('renders correctly with props', () => {
    const tree = shallowRender(
      <MemoryRouter keyLength={0}>
        <KnowledgeCard knowledgeBase={dummyKnowledgeBase} />
      </MemoryRouter>
    );
    expect(tree).toMatchSnapshot();
  });
});
