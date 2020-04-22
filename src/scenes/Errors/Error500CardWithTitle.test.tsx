import React from 'react';
import Error500WithTitle from './Error500CardWithTitle';
import { shallowRender } from '../../shared/services/testHelper';

describe('Error500CardWithTitle', () => {
  it('renders Error500 Card With Title', () => {
    const tree = shallowRender(
      <Error500WithTitle title="Org Chart" topBorder="darkTurquoise" />
    );
    expect(tree).toMatchSnapshot();
  });
});
