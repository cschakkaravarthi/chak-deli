import React, { FC, useEffect, useRef, useState } from 'react';
import { connect } from 'react-redux';
import get from 'lodash.get';
import { Link, useHistory } from 'react-router-dom';
import { handleUri } from '../utils/imageUrlHandler';
import Article from '../shared/models/Article.model';
import { NotificationBell } from '../shared/models/ManualNotification.model';
import { UserInfo, UserProfilePicture } from '../shared/models/UserInfo.model';
import { AllLinksButton } from 'umgc_ui_library/lib/components/allLinksButton';
import { SiteLogo } from 'umgc_ui_library/lib/components/siteLogo';
import { AppState } from '../shared/types/genericTypes';
import { fetchNotificationsCount } from '../shared/actions/manualNotificationAction';
import { fetchSearchSuggestion, clearSearchSuggestionList } from '../shared/actions/searchResultAction';
import { HamburgerButton } from 'umgc_ui_library/lib/components/hamburgerButton';
import { EditButton } from 'umgc_ui_library/lib/components/editButton';
import LinkModel from '../shared/models/Link.model';
import { Nav } from 'umgc_ui_library/lib/nav/nav';
import { NotificationsBadge } from 'umgc_ui_library/lib/components/notificationsBadge';
import { UserBadge } from 'umgc_ui_library/lib/components/userBadge';
import { NavBar, NavBarSection } from 'umgc_ui_library/lib/nav/navBar';
import { MenuSlideTransition } from 'umgc_ui_library/lib';
import { AutoSuggest, HandleSelectedResponseParams } from 'umgc_ui_library/lib/search/autoSuggest';
import images from '../images/images';
import { fetchUserProfilePicture, fetchUserProfileDetails } from '../shared/actions/userProfileActions';
import { getUserProfilePicture, useQuery, getUserSiteCode } from '../utils/customHooks';
import { setCurrentUsername } from '../shared/actions/commonActions';
import { CurrentUser } from '../shared/types/commonTypes';
import { BREAKPOINTS } from '../constants/constants';
import { getUserInfo } from '../reactAuthProvider';

export interface PrimaryNavItem {
  id: number;
  route: string;
  label: string;
}

export interface SearchSuggest {
  value: string;
  label: string;
}

type Props = {
  user?: UserInfo;
  articles?: Article[];
  labelLogo?: string;
  allLinksOpen?: boolean;
  setCurrentUsername?: (userData: CurrentUser) => void;
  notificationsOpen?: boolean;
  primaryNav?: PrimaryNavItem[];
  notificationsBell?: NotificationBell;
  fetchNotificationsCount?: <T>() => T;
  onSetAllLinksOpen?: (b: boolean) => void;
  searchSuggestions?: SearchSuggest[];
  fetchSearchSuggestion?: (a: string, b: number) => void;
  clearSearchSuggestionList?: () => void;
  fetchUserLinks?: <T>() => T;
  links?: LinkModel[];
  onNotificationPress?: (b: boolean) => void;
  editLinks: boolean;
  profileDataError?: boolean;
  onSetEditLinks: (b: boolean) => void;
  fetchUserProfileDetails?: (email: string) => Promise<void>;
  fetchUserProfilePicture?: <T>(email: string) => Promise<T>;
  userProfilePicture?: UserProfilePicture | null;
};

const mapState = (state: AppState, props: Props): Props => ({
  ...props,
  articles: state.articleReducers.articleList,
  notificationsBell: state.manualNotificationReducers.notificationBell,
  links: state.linkReducers.links,
  searchSuggestions: state.searchResultReducers.searchSuggestions ? state.searchResultReducers.searchSuggestions : [],
  profileDataError: state.userProfileReducers.profileDataError,
  userProfilePicture: state.userProfileReducers.userProfilePicture,
  labelLogo: state.userProfileReducers.userProfileDetails ? state.userProfileReducers.userProfileDetails.labelLogo : ''
});

const actionCreators = {
  fetchNotificationsCount,
  fetchSearchSuggestion,
  setCurrentUsername,
  fetchUserProfileDetails,
  clearSearchSuggestionList,
  fetchUserProfilePicture
};

export const SlidingMenu: FC<Props> = props => {
  const [isFetching, setIsFetching] = useState<boolean>(true);
  const SlidingContainer = useRef<HTMLDivElement>(null);

  const {
    notificationsBell,
    onSetAllLinksOpen,
    fetchNotificationsCount,
    searchSuggestions = [],
    fetchSearchSuggestion,
    clearSearchSuggestionList,
    fetchUserLinks,
    onSetEditLinks,
    links,
    setCurrentUsername,
    fetchUserProfileDetails,
    fetchUserProfilePicture,
    userProfilePicture,
    labelLogo
  } = props;

  const query = useQuery();
  const history = useHistory();
  const user = getUserInfo();
  let upn = query.get('upn');
  const [search, setSearch] = useState<string>('');
  const suggestionLimit = 8;

  let searchKeyWord = '';

  searchKeyWord = query.get('q');

  const [showSlideMenu, setSlideMenu] = useState<boolean>(!(window.innerWidth < BREAKPOINTS.large));

  const handleSubmit = (event: React.SyntheticEvent): void => {
    onSetAllLinksOpen && onSetAllLinksOpen(false);
    event.preventDefault();
    clearSearchSuggestionList!();

    if (search) {
      setSlideMenu(false);
      history.push(`/search?q=${encodeURIComponent(search)}&type=all`);
    }
  };

  const UserEmail = get(props, 'user.userName');

  useEffect(() => {
    if (!upn) {
      upn = user.userName;
    }

    fetchUserProfileDetails &&
      upn &&
      fetchUserProfileDetails(upn)
        .then(() => {
          setIsFetching(false);
        })
        .catch(() => {
          setIsFetching(false);
        });
  }, [upn]);

  useEffect(() => {
    fetchUserLinks && fetchUserLinks();
    fetchNotificationsCount && fetchNotificationsCount();

    const updateWindowDimensions = (): void => {
      setSlideMenu(!(window.innerWidth < BREAKPOINTS.large));
    };

    window.innerWidth > BREAKPOINTS.small && window.addEventListener('resize', updateWindowDimensions);
    return () => {
      window.removeEventListener('resize', updateWindowDimensions);
    };
  }, []);

  const [userDataFetching, setUserDataFetching] = useState<boolean>(false);

  useEffect(() => {
    if (UserEmail) {
      setCurrentUsername && setCurrentUsername(props?.user?.profile);
      setUserDataFetching(true);
      fetchUserProfilePicture && fetchUserProfilePicture(UserEmail).then(() => setUserDataFetching(false));
    }
  }, [UserEmail]);

  const hideOnDesktop = 'd-block d-xl-none';
  const hideOffDesktop = 'd-none d-xl-block';

  const getSuggestions = (value: string): object[] => {
    clearSearchSuggestionList && clearSearchSuggestionList();
    fetchSearchSuggestion && fetchSearchSuggestion(value, suggestionLimit);

    return searchSuggestions;
  };

  const manualSearch = (value: string): void => {
    const regex = /(<([^>]+)>)/gi;
    value = value.replace(regex, '');
    setSearch(value);
  };

  const handleSelected = (suggested: HandleSelectedResponseParams): void => {
    const regex = /(<([^>]+)>)/gi;

    suggested.value = suggested.value.replace(regex, '');
    setSearch(suggested.value);
    clearSearchSuggestionList && clearSearchSuggestionList();

    if (suggested.value) {
      setSlideMenu(false);
      history.push(`/search?q=${encodeURIComponent(suggested.value)}&type=all`);
    }
  };

  const redirectToUserProfile = (): void => {
    onSetAllLinksOpen!(false);
    history.push('/profile');
  };

  const profilePictureUri = getUserProfilePicture(userProfilePicture);
  const siteCode = getUserSiteCode(userProfilePicture);
  window.sessionStorage.setItem('userSiteCode', siteCode || '');
  const notificationCout = notificationsBell ? notificationsBell.newNotificationCount : 0;

  const topBar = (
    <NavBar variant="top">
      <NavBarSection variant="standard">
        <HamburgerButton open={showSlideMenu} handleClick={() => setSlideMenu(!showSlideMenu)} />
        { !isFetching && <SiteLogo
          logoSrc={labelLogo ? handleUri(labelLogo) : images.siteLogo}
          handleClick={() => {
            onSetAllLinksOpen!(false);
            history.push('/');
          }}
        />
        }
      </NavBarSection>
      <NavBarSection variant="dark">
        <NotificationsBadge
          handleClick={() => {
            setSlideMenu(false);
            history.push('/notifications/new?alert_type=all');
          }}
          notificationCount={notificationCout}
        />
        {profilePictureUri && (
          <UserBadge
            imageUrl={profilePictureUri}
            isFetching={userDataFetching}
            handleClick={redirectToUserProfile}
            fullName={`${get(props, 'user.profile.given_name', '')} ${get(props, 'user.profile.family_name', '')}`}
          />
        )}
      </NavBarSection>
    </NavBar>
  );

  const sideBar = (
    <MenuSlideTransition showToggle={window.innerWidth >= BREAKPOINTS.large || showSlideMenu}>
      <NavBar variant="side">
        <div className={hideOffDesktop}>
          <NavBarSection variant="dark" className="justify-content-around">
            {profilePictureUri && (
              <UserBadge
                imageUrl={profilePictureUri}
                isFetching={userDataFetching}
                handleClick={redirectToUserProfile}
                fullName={`${get(props, 'user.profile.given_name', '')} ${get(props, 'user.profile.family_name', '')}`}
              />
            )}
            <NotificationsBadge
              handleClick={() => {
                onSetAllLinksOpen && onSetAllLinksOpen(false);
                history.push('/notifications/new?alert_type=all');
              }}
              notificationCount={notificationCout}
            />
          </NavBarSection>
        </div>
        <NavBarSection className="justify-content-between" variant="standard">
          <div className={hideOffDesktop}>
            { !isFetching && <SiteLogo
              handleClick={() => {
                onSetAllLinksOpen && onSetAllLinksOpen(false);
                history.push('/');
              }}
              logoSrc={labelLogo ? handleUri(labelLogo) : images.siteLogo}
            />
            }
          </div>
          <AllLinksButton
            imageSrc={images.allLinksGrid}
            handleClick={() => {
              onSetAllLinksOpen && onSetAllLinksOpen(true);
              setSlideMenu(false);
              onSetEditLinks(false);
            }}
          />
        </NavBarSection>
        <div onClick={() => onSetAllLinksOpen && onSetAllLinksOpen(false)}>
          <NavBarSection className="nav-primary searchbar-section sliding-menu-auto-suggest" variant="light">
            <AutoSuggest
              suggestionValue={searchKeyWord}
              handleSubmit={handleSubmit}
              placeHolder="Search"
              miniNoOfCharsShowSuggestions={2}
              suggestions={searchSuggestions}
              manualSearch={manualSearch}
              handleSelected={handleSelected}
              getSuggestions={getSuggestions}
            />
          </NavBarSection>
        </div>
        <NavBarSection variant="standard'" className="flex-column align-items-baseline">
          <Nav
            className="w-100"
            items={get(props, 'primaryNav', [] as any).map((i: any) => ({
              key: i.id,
              Link: (p: JSX.IntrinsicAttributes) => (
                <Link
                  onClick={() => {
                    onSetAllLinksOpen && onSetAllLinksOpen(false);
                    setSlideMenu(false);
                  }}
                  to={i.route}
                  {...p}
                >
                  {i.label}
                </Link>
              )
            }))}
          />
          {links && (
            <Nav
              className="w-100"
              variant="secondary"
              sectionTitle="My Links"
              editLink={(p: JSX.IntrinsicAttributes) => (
                <EditButton
                  handleClick={() => {
                    onSetAllLinksOpen && onSetAllLinksOpen(true);
                    setSlideMenu(false);
                    onSetEditLinks(true);
                  }}
                  title="Edit"
                  {...p}
                />
              )}
              items={links.map(link => ({
                key: link.drupal_id,
                Link: (p: JSX.IntrinsicAttributes) => (
                  <a onClick={() => setSlideMenu(false)} href={link.url} {...p} target="_blank">
                    {link.title}
                  </a>
                )
              }))}
            />
          )}
        </NavBarSection>
      </NavBar>
    </MenuSlideTransition>
  );

  return (
    <div>
      <div className={hideOnDesktop}>{topBar}</div>
      <div ref={SlidingContainer}>{sideBar}</div>
    </div>
  );
};

export default connect(mapState, actionCreators)(SlidingMenu);
