import React from 'react';
import { shallowRender } from '../../shared/services/testHelper';
import { MyContacts } from './MyContacts';
import { dummyContactList } from '../../shared/models/UserInfo.model';

describe('MyContacts component', () => {
  it('renders null without contacts', () => {
    const tree = shallowRender(<MyContacts userContactList={[]} isFetching={false} />);
    expect(tree).toMatchSnapshot();
  });

  it('renders skeletons', () => {
    const tree = shallowRender(<MyContacts isFetching={true} userContactList={[]} />);
    expect(tree).toMatchSnapshot();
  });

  it('renders properly with info', () => {
    const tree = shallowRender(<MyContacts isFetching={false} userContactList={[dummyContactList]} />);
    expect(tree).toMatchSnapshot();
  });
});
