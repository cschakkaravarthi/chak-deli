import React from 'react';
import PeopleContainer from './PeopleContainer';
import { shallowRender } from '../../shared/services/testHelper';

describe('PeopleContainer', () => {
  it('renders null', () => {
    const tree = shallowRender(<PeopleContainer
      people={[]}
      isLastPage={false}
      triggerFetchPeople={jest.fn()}/>);
    expect(tree).toMatchSnapshot();
  });

  it('renders peopleContainer', () => {
    const tree = shallowRender(<PeopleContainer
      isLastPage={false}
      triggerFetchPeople={jest.fn()}/>);
    expect(tree).toMatchSnapshot();
  });
});
