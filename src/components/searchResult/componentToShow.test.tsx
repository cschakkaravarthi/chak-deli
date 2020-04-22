import React from 'react';
import { ComponentToShow } from './componentToShow';
import { shallowRender } from '../../shared/services/testHelper';
import { dummyPeople } from '../../shared/models/People.model';

describe('ComponentToShow for search result', () => {
  it('renders null', () => {
    const tree = shallowRender(
      <ComponentToShow
        data={[]}
        dataLength={0}
        heading="People"
        typeInQuery="all"
        skeletonCount={2}
        isFetching={false}
        skeletonColSize={6}
        cardInSkeleton="people"
        filterByTypeChange="people"
        handleFilterByTypeChange={jest.fn}
      >
        <p>Test child component</p>
      </ComponentToShow>
    );
    expect(tree).toMatchSnapshot();
  });

  it('renders properly', () => {
    const tree = shallowRender(
      <ComponentToShow
        dataLength={1}
        heading="People"
        typeInQuery="all"
        skeletonCount={2}
        isFetching={false}
        data={[dummyPeople]}
        skeletonColSize={6}
        cardInSkeleton="people"
        filterByTypeChange="people"
        handleFilterByTypeChange={jest.fn}
      >
        <p>Test child component</p>
      </ComponentToShow>
    );
    expect(tree).toMatchSnapshot();
  });

  it('renders skeleton', () => {
    const tree = shallowRender(
      <ComponentToShow
        data={[]}
        dataLength={0}
        heading="People"
        typeInQuery="all"
        skeletonCount={2}
        isFetching={true}
        skeletonColSize={6}
        cardInSkeleton="people"
        filterByTypeChange="people"
        handleFilterByTypeChange={jest.fn}
      >
        <p>Test child component</p>
      </ComponentToShow>
    );
    expect(tree).toMatchSnapshot();
  });
});
