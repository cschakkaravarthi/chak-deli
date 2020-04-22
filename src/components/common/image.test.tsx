import React from 'react';
import Image from './image';
import { shallowRender } from '../../shared/services/testHelper';
import { MemoryRouter } from 'react-router-dom';

describe('Image holder with src & classname attributes', () => {
  it('renders correctly with props', () => {
    const tree = shallowRender(
      <MemoryRouter keyLength={0}>
        <Image src="/assets/icons/icon-180.png" alt="sample alt" />
        <Image src="s3://assets/icons/icon-180.png" />
      </MemoryRouter>
    );
    expect(tree).toMatchSnapshot();
  });
});
