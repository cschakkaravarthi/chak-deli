import React, { useEffect, useState, Suspense, lazy } from 'react';
import { Provider } from 'react-redux';
import { Router, Route, Switch } from 'react-router-dom';

import 'umgc_ui_library/scss/_base.scss';
import 'umgc_ui_library/scss/_common.scss';
import './styles/overrides.scss';
import configureStore from './store';
import AllLinksOverlay from './components/AllLinksOverlay';
import SlidingMenu, { PrimaryNavItem } from './components/SlidingMenu';
import NotificationsOverlay from './components/NotificationsOverlay';
import { UserInfo } from './shared/models/UserInfo.model';
import { getUserInfo } from './reactAuthProvider';
import { FooterFeedbackView } from 'umgc_ui_library/lib/components/footerFeedbackView';
import GA from './../src/utils/googleAnalytics';
import TopScroller from './components/topScroller/TopScroller';
import GlobalToast from './components/globalToast/GlobalToast';
import { createBrowserHistory } from 'history';

export const history = createBrowserHistory();

const ArticleScene = lazy(() => import('./scenes/Article/ArticleScene'));
const ArticlesScene = lazy(() => import('./scenes/Article/ArticlesScene'));
const EmployeeServices = lazy(() => import('./scenes/EmployeeServices'));
const Department = lazy(() => import('./scenes/Department/Department'));
const Departments = lazy(() => import('./scenes/Departments/Departments'));
const Page = lazy(() => import('./scenes/Page/Page'));
const Event = lazy(() => import('./scenes/Events/Event'));
const EventsScene = lazy(() => import('./scenes/Events/EventsScene'));
const SearchResultsScene = lazy(() => import('./scenes/SearchResults/SearchResultsScene'));
const Home = lazy(() => import('./scenes/Home'));
const Notifications = lazy(() => import('./scenes/Notifications'));
const Office = lazy(() => import('./scenes/Office/Office'));
const UserEdit = lazy(() => import('./scenes/User/UserEdit'));
const UserProfile = lazy(() => import('./scenes/UserProfile/UserProfile'));
const ComingSoon = lazy(() => import('./components/ComingSoon'));
const Error404 = lazy(() => import('./scenes/Errors/Error404'));
const RedirectPage = lazy(() => import('./components/RedirectPage'));
const Offices = lazy(() => import('./scenes/Office/Offices'));
const Error500 = lazy(() => import('./scenes/Errors/Error500'));
const BrandsLabels = lazy(() => import('./scenes/BrandsLabels/BrandsLabels'));
const CreateAppreciationCard = lazy(() => import('./scenes/CreateAppreciationCard/CreateAppreciationCard'));
const AppreciationCardsScene = lazy(() => import('./scenes/AppreciationCards/AppreciationCardsScene'));
const SystemsApplications = lazy(() => import('./scenes/SystemsApplications/SystemsApplications'));
const People = lazy(() => import('./scenes/People/People'));
const store = configureStore();

const App = (): JSX.Element => {
  const [notificationsOpen, setNotificationsOpen] = useState<boolean>(false);
  const [allLinksOpen, setAllLinkOpen] = useState<boolean>(false);
  const [editLinksOpen, setEditLinksOpen] = useState<boolean>(false);
  const [userDetails, setUserDetail] = useState<UserInfo>({});

  const primaryNav: PrimaryNavItem[] = [
    { id: 1, route: '/news-articles', label: 'News' },
    { id: 2, route: '/employee-services', label: 'Employee Services' },
    { id: 3, route: '/offices', label: 'Offices & People' },
    { id: 4, route: '/departments', label: 'Departments' },
    { id: 5, route: '/systems-applications', label: 'Systems & Applications' },
    { id: 6, route: '/brands-labels', label: 'Brands & Labels' }
  ];

  useEffect(() => {
    // get user info and set for user details.
    const user: UserInfo = getUserInfo();
    if (user.userName) {
      setUserDetail(user);
    }
  }, []);

  return (
    <Provider store={store}>
      <Router history={history}>
        <GlobalToast />
        <TopScroller />
        <SlidingMenu
          user={userDetails}
          notificationsOpen={notificationsOpen}
          onNotificationPress={setNotificationsOpen}
          allLinksOpen={allLinksOpen}
          onSetAllLinksOpen={setAllLinkOpen}
          editLinks={editLinksOpen}
          onSetEditLinks={setEditLinksOpen}
          primaryNav={primaryNav}
        />
        <AllLinksOverlay
          user={userDetails}
          menuOpen={allLinksOpen}
          onSetMenuOpen={setAllLinkOpen}
          editLinks={editLinksOpen}
          onSetEditLinks={setEditLinksOpen}
          links={[]}
        />
        <NotificationsOverlay menuOpen={notificationsOpen} onSetMenuOpen={setNotificationsOpen} />
        {GA.init() && <GA.RouteTracker />}
        <Suspense fallback={<h5 className="text-center p-5">Loading...</h5>}>
          <Switch>
            <Route exact path="/" component={Home} />
            <Route path="/news-articles" component={ArticlesScene} />
            <Route path="/article/:id" component={ArticleScene} />
            <Route path="/events" component={EventsScene} />
            <Route path="/event/:id" component={Event} />
            <Route path="/notifications" component={Notifications} />
            <Route path="/search" component={SearchResultsScene} />
            <Route exact path="/profile" component={UserProfile} />
            <Route path="/pages/:id" component={Page} />
            <Route path="/employee-services" component={EmployeeServices} />
            <Route exact path="/departments/:id/people" render={props => <People type="department" {...props} />} />
            <Route exact path="/labels/:id/people" render={props => <People type="label" {...props} />} />
            <Route exact path="/departments/:id" component={Department} />
            <Route path="/departments" component={Departments} />
            <Route path="/profile/edit" component={UserEdit} />
            <Route path="/office/:id" component={Office} />
            <Route exact path="/user" component={UserProfile} />
            <Route path="/user/:id" component={UserProfile} />
            <Route path="/artists" component={ComingSoon} />
            <Route path="/systems-applications" component={SystemsApplications} />
            <Route path="/brands-labels" component={BrandsLabels} />
            <Route exact path="/offices" component={Offices} />
            <Route exact path="/appreciation-cards" component={AppreciationCardsScene} />
            <Route path="/aad_redirect_callback" component={RedirectPage} />
            <Route path="/error500" component={Error500} />
            <Route path="/appreciation-cards/create" component={CreateAppreciationCard} />
            <Route component={Error404} />
          </Switch>
          <FooterFeedbackView title="FEEDBACK" hrefLink="mailto:UMGCentral@umusic.com" />
        </Suspense>
      </Router>
    </Provider>
  );
};

export default App;
