import React, { useEffect, useState } from 'react';
import get from 'lodash.get';
import { connect } from 'react-redux';
import { AppState } from '../shared/types/genericTypes';
import Link from '../shared/models/Link.model';
import { UserInfo } from '../shared/models/UserInfo.model';

import { fetchUserLinks, saveUserLinks } from '../shared/actions/linkActions';
import { triggerToast } from '../shared/actions/commonActions';

import { NavOverlay } from 'umgc_ui_library/lib/nav/navOverlay';
import { Checkbox } from 'umgc_ui_library/lib/components/checkBox';
import { fetchGroupedContent } from '../shared/actions/contentActions';
import { ContentQueryParamsType, FacetedContentGroupModel, VariousContentModel } from '../shared/types/contentTypes';
import DrupalIds from '../drupalIds';
import { toQueryString } from '../utils/content';

const menuLinksParamSet: ContentQueryParamsType = {
  type: 'link',
  group: 'category',
  category: DrupalIds.categories.allLinks
};

type Props = {
  user?: UserInfo;
  menuOpen: boolean;
  onSetMenuOpen: (b: boolean) => void;
  editLinks: boolean;
  onSetEditLinks: (b: boolean) => void;
  fetchGroupedContent?: <T>(params: ContentQueryParamsType) => T;
  groups?: FacetedContentGroupModel;
  fetchUserLinks?: <T>() => T;
  links: Link[];
  saveUserLinks?: <T>(links: string[]) => Promise<T>;
  triggerToast?: <T>(message: string, toastError: boolean) => T;
};

const mapState = (state: AppState, props: Props): Props => ({
  ...props,
  groups: state.contentReducers.groupedContent[toQueryString(menuLinksParamSet)],
  links: state.linkReducers.links
});

const actionCreators = {
  fetchGroupedContent,
  fetchUserLinks,
  saveUserLinks,
  triggerToast
};

const MAX_USER_LINKS = 7;

export const AllLinksOverlay: React.FC<Props> = props => {
  const {
    user,
    groups,
    links,
    menuOpen,
    onSetMenuOpen,
    fetchGroupedContent,
    fetchUserLinks,
    editLinks,
    onSetEditLinks,
    saveUserLinks,
    triggerToast
  } = props;

  useEffect(() => {
    fetchGroupedContent && fetchGroupedContent(menuLinksParamSet);
    user && user.userName && fetchUserLinks && fetchUserLinks();
  }, [user]);

  const [userLinks, setUserLinks] = useState();

  useEffect(() => {
    setUserLinks(links.map(l => l.drupal_id.toString()));
  }, [links]);

  const handleLinkClick = (
    link: VariousContentModel,
    userLinks: string[],
    setUserLinks: (userLinks: string[]) => void
  ): void => {
    const linkId = link.drupal_id.toString();
    const userLinksCopy = [...userLinks];

    if (userLinks.includes(linkId)) {
      const index = userLinks.indexOf(linkId);
      userLinksCopy.splice(index, 1);
      setUserLinks(userLinksCopy);
    } else {
      userLinksCopy.push(linkId);
      setUserLinks(userLinksCopy);
    }
  };

  return (
    <NavOverlay
      navGroups={
        !groups || !groups.groups
          ? []
          : groups.groups.map(g => ({
            key: g.drupal_id,
            sectionTitle: g.title,
            sectionIcon: g.icon,
            items: g.content.map(i => ({
              key: i.drupal_id,
              Link: (p: JSX.IntrinsicAttributes) => {
                return editLinks ? (
                  <Checkbox
                    handleClick={() => {
                      handleLinkClick(i, userLinks, setUserLinks);
                    }}
                    title={i.title}
                    checked={userLinks.includes(i.drupal_id.toString())}
                  ></Checkbox>
                ) : (
                  <a href={get(i, 'url')} title={i.summary} target="_blank" {...p}>
                    {i.title}
                  </a>
                );
              }
            }))
          }))
      }
      show={menuOpen}
      setShow={(): void => {
        onSetMenuOpen(!menuOpen);
        user && user.userName && fetchUserLinks && fetchUserLinks();
      }}
      editMode={editLinks}
      handleAdd={() => {
        if (userLinks.length > MAX_USER_LINKS) {
          triggerToast && triggerToast('Max number (7) of My Links reached', true);
          return;
        }

        if (userLinks.length === 0) {
          if (!confirm('Are you sure you want to remove all links?')) {
            return;
          }
        }

        if (user && user.userName && saveUserLinks) {
          saveUserLinks(userLinks).then(() => {
            onSetEditLinks(!editLinks);
            user && user.userName && fetchUserLinks && fetchUserLinks();
          });
        }
      }}
      handleEdit={() => onSetEditLinks(!editLinks)}
    />
  );
};

export default connect(mapState, actionCreators)(AllLinksOverlay);
