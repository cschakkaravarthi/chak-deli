import React from 'react';
import { shallowRender } from '../../shared/services/testHelper';
import OnError from './Error';

describe('ArticleTeaser', () => {
  it('renders correctly with article', () => {
    const tree = shallowRender(<OnError errorMessage='Error test' />);
    expect(tree).toMatchSnapshot();
  });
});
