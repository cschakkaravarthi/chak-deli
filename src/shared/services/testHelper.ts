import { ReactElement } from 'react';
import ShallowRenderer from 'react-test-renderer/shallow';

import getStore from './mockGlobalStore';

export const shallowRender = (toRender: JSX.Element): ReactElement => {
  const renderer = ShallowRenderer.createRenderer();
  renderer.render(toRender);
  return renderer.getRenderOutput();
};

export const getMockStore = getStore;

export const drawerMockNavigation = {
  state: {
    isDrawerOpen: true,
    isTransitioning: false,
    index: 1,
    routes: [],
    key: 'abc',
    params: {}
  },
  dispatch: jest.fn(),
  goBack: jest.fn(),
  dismiss: jest.fn(),
  navigate: jest.fn(),
  openDrawer: jest.fn(),
  closeDrawer: jest.fn(),
  toggleDrawer: jest.fn(),
  getParam: jest.fn(),
  setParams: jest.fn(),
  addListener: jest.fn(),
  push: jest.fn(),
  replace: jest.fn(),
  reset: jest.fn(),
  pop: jest.fn(),
  popToTop: jest.fn(),
  isFocused: jest.fn(),
  isFirstRouteInParent: jest.fn(),
  dangerouslyGetParent: jest.fn()
};
