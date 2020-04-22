import React from 'react';
import { Link } from 'react-router-dom';
import get from 'lodash.get';
import { imageUrlHandler } from './imageUrlHandler';
import { ContentStateModel, VariousContentModel } from '../shared/types/contentTypes';
import intersection from 'lodash.intersection';

// When using this method to create a key for the redux store, you should not pass in "limit" or "page".
export const toQueryString = (requestQuery: any): string => {
  const validProperties = [
    'article_category',
    'category',
    'event_category',
    'facet',
    'group',
    'id',
    'limit',
    'owner',
    'page',
    'sitecode',
    'sort',
    'startsWith',
    'type',
    'query'
  ];

  const queryIntersection = intersection(
    validProperties,
    Object.keys(requestQuery)
  ).filter((queryProp: string) => requestQuery[queryProp] !== null && requestQuery[queryProp] !== undefined);
  const mappedQuery = queryIntersection.map((queryProperty: any) => `${queryProperty}=${requestQuery[queryProperty]}`);

  return mappedQuery.join('&');
};

// Loop through every item we have already loaded to check for these ids.
export const findContentInState = (state: ContentStateModel, ids: number[]): VariousContentModel[] => {
  const matching: VariousContentModel[] = [];

  // Check all non-grouped content.
  const contentSets = Object.keys(state.content);
  for (let i = 0; i < contentSets.length; i++) {
    const content = state.content[contentSets[i]].content;
    for (let j = 0; j < content.length; j++) {
      if (content[j] && ids.includes(content[j].drupal_id)) {
        matching.push(content[j]);
      }
      if (matching.length === ids.length) {
        // Found them all, no need to keep looping.
        return matching;
      }
    }
  }

  // If we still haven't found it, check the grouped content (goes deeper).
  const groupedContentSets = Object.keys(state.groupedContent);
  for (let i = 0; i < groupedContentSets.length; i++) {
    const groups = state.groupedContent[groupedContentSets[i]].groups;
    for (let j = 0; j < groups.length; j++) {
      const content = state.groupedContent[groupedContentSets[i]].groups[j].content;
      for (let k = 0; k < content.length; k++) {
        if (content[k] && ids.includes(content[k].drupal_id)) {
          matching.push(content[k]);
        }
        if (matching.length === ids.length) {
          // Found them all, no need to keep looping.
          return matching;
        }
      }
    }
  }

  // Seems like we couldn't find them all. Return what we have, and we will have to fetch the rest directly.
  return matching;
};

export const replaceContentInState = (state: ContentStateModel, newContent: VariousContentModel): ContentStateModel => {
  const newState: ContentStateModel = { ...state };

  // Check all non-grouped content.
  const contentSets = Object.keys(state.content);
  for (let i = 0; i < contentSets.length; i++) {
    const content = state.content[contentSets[i]].content;
    for (let j = 0; j < content.length; j++) {
      if (content[j].drupal_id === newContent.drupal_id) {
        newState.content[contentSets[i]].content[j] = newContent;
      }
    }
  }

  // Next, check the grouped content (goes deeper).
  const groupedContentSets = Object.keys(state.groupedContent);
  for (let i = 0; i < groupedContentSets.length; i++) {
    const groups = state.groupedContent[groupedContentSets[i]].groups;
    for (let j = 0; j < groups.length; j++) {
      const content = state.groupedContent[groupedContentSets[i]].groups[j].content;
      for (let k = 0; k < content.length; k++) {
        if (content[k].drupal_id === newContent.drupal_id) {
          newState.groupedContent[groupedContentSets[i]].groups[j].content[k] = newContent;
        }
      }
    }
  }

  // Return full state with matching items replaced.
  return newState;
};

export const getLinkToContent = (
  content: VariousContentModel,
  label?: string
): React.ComponentType | undefined => {
  let mainLink: React.ComponentType;
  switch (content.type) {
    case 'link':
      mainLink = p => (
        <a target="_blank" href={get(content, 'url')} {...p}>
          {label || p.children}
        </a>
      );
      break;
    case 'article':
      mainLink = p => (
        <Link to={'/article/' + content.drupal_id} {...p}>
          {label || p.children}
        </Link>
      );
      break;
    case 'event':
      mainLink = p => (
        <Link to={'/event/' + content.drupal_id} {...p}>
          {label || p.children}
        </Link>
      );
      break;
    case 'department':
      mainLink = p => (
        <Link to={'/departments/' + content.drupal_id} {...p}>
          {label || p.children}
        </Link>
      );
      break;
    case 'label':
      mainLink = p => (
        <Link to="/" {...p}>
          {label || p.children}
        </Link>
      );
      break;
    case 'page':
      mainLink = p => (
        <Link to={'/pages/' + content.drupal_id} {...p}>
          {label || p.children}
        </Link>
      );
      break;
    case 'office':
      mainLink = p => (
        <Link to={'/office/' + content.drupal_id} {...p}>
          {label || p.children}
        </Link>
      );
      break;
    case 'document':
      mainLink = p => (
        <a
          target="_blank"
          href={imageUrlHandler().sanitize(get(content, 'document_uri'))}
          {...p}
        >
          {label || p.children}
        </a>
      );
      break;
    default:
      return undefined;
  }
  return mainLink;
};
