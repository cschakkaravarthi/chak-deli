import React from 'react';
import { shallowRender } from '../../shared/services/testHelper';
import { Breadcrumb } from './Breadcrumb';
import images from '../../images/images';

describe('Breadcrumb', () => {
  it('renders correctly', () => {
    const tree = shallowRender(
      <Breadcrumb
        title="test title"
        bodyText="text description"
        sectionImageSrc={images.placeholder}/>
    );
    expect(tree).toMatchSnapshot();
  });
});
