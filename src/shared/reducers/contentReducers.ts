import { Reducer } from 'redux';
import unionBy from 'lodash.unionby';
import get from 'lodash.get';
import {
  ContentStateModel,
  DIRECTLY_LOADED_CONTENT_KEY,
  LOAD_CONTENT,
  LOAD_GROUPED_CONTENT,
  LoadContentAction,
  LoadGroupedContentAction,
  REPLACE_INDIVIDUAL_CONTENT,
  ReplaceIndividualContentAction
} from '../types/contentTypes';
import { LOAD_ARTICLE_BY_ID, LoadArticleByIdAction } from '../types/articleTypes';
import { replaceContentInState } from '../../utils/content';

export const initialState = {
  content: {
    [DIRECTLY_LOADED_CONTENT_KEY]: {
      content: [],
      totalRecords: 0
    }
  },
  groupedContent: {}
};

const contentReducers: Reducer<ContentStateModel, any> = (
  state = initialState,
  action: LoadContentAction | LoadGroupedContentAction | LoadArticleByIdAction | ReplaceIndividualContentAction
) => {
  switch (action.type) {
    case LOAD_CONTENT:
      return {
        ...state,
        content: {
          ...state.content,
          [action.key]: {
            ...action.content,
            // Merge the existing set with our fresh set by comparing the drupal_id prop. This ensures that if we are
            // fetching additional pages of content, at the same time as someone is adding new content, we won't end up
            // with duplicate records. I'm expecting that as we keep requesting additional pages of content, this array
            // will start getting very large. We should keep an eye on performance here.
            content: unionBy(
              get(state.content[action.key], 'content', []),
              action.content.content,
              'drupal_id'
            )
          }
        }
      };
    case REPLACE_INDIVIDUAL_CONTENT:
      return replaceContentInState(state, action.content);
    case LOAD_GROUPED_CONTENT:
      return {
        ...state, groupedContent: { ...state.groupedContent, [action.key]: action.content }
      };
    // @TODO: Listening for the article action in the content reducer is a sort of temporary middle ground while we clean up.
    case LOAD_ARTICLE_BY_ID:
      return {
        ...state,
        content: {
          ...state.content,
          [DIRECTLY_LOADED_CONTENT_KEY]: {
            content: [
              ...state.content[DIRECTLY_LOADED_CONTENT_KEY].content,
              action.article
            ],
            totalRecords: state.content[DIRECTLY_LOADED_CONTENT_KEY].content.length + 1
          }
        }
      };
    default:
      return state;
  }
};

export default contentReducers;
