import linkReducers, { initialState } from './linkReducers';
import {
  LOAD_LINKS,
  LOAD_MINISITE_LINKS,
  LOAD_QUICK_TOOLS
} from '../types/linkTypes';
import {
  dummyGroupedLinkContent,
  minisiteDummyLinks
} from '../models/Link.model';

describe('linkReducers', () => {
  it('Handles default case', () => {
    const state = linkReducers(undefined, {});
    expect(state).toEqual(initialState);
  });

  it('Handles loadLinks action', () => {
    const action = { type: LOAD_LINKS, groups: dummyGroupedLinkContent };
    const state = linkReducers(initialState, action);
    expect(state).toMatchSnapshot();
  });

  it('Handles LOAD_MINISITE_LINKS action', () => {
    const action = {
      type: LOAD_MINISITE_LINKS,
      minisiteLinks: dummyGroupedLinkContent
    };

    const state = linkReducers(initialState, action);
    expect(state).toMatchSnapshot();
  });

  it('Handles LOAD_QUICK_TOOLS action', () => {
    const action = { type: LOAD_QUICK_TOOLS, docsLinks: minisiteDummyLinks };

    const state = linkReducers(initialState, action);
    expect(state).toMatchSnapshot();
  });
});
