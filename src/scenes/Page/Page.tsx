import React, { FC, useEffect, useState } from 'react';
import { ContentWrapper, Resources as ResourceComponent } from 'umgc_ui_library';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import { connect } from 'react-redux';
import { match } from 'react-router';
import createDOMPurify from 'dompurify';
import get from 'lodash.get';

// Utils
import drupalIds from '../../drupalIds';
import { handleUri } from '../../utils/imageUrlHandler';
import { extractExtension } from '../../utils/customHooks';

// Actions
import { fetchPageById, fetchPages } from '../../shared/actions/pageActions';

// Types
import { AppState } from '../../shared/types/genericTypes';

// Models
import { Page as PageModel } from '../../shared/models/Page.model';

// Components
import TemplatesTopBar from '../../components/templatesTopBar/templatesTopBar';
import Error404 from '../Errors/Error404';

interface TypeAndId {
  givenId: number;
  type: string;
}

interface Resource {
  title: string;
  extension: string;
  link: string;
}

const findDrupalId = (searchType: string, ownerId: string): number | undefined => {
  const objectToFind = searchType === 'department'
    ? drupalIds.departments
    : drupalIds.labels;
  let givenId;

  Object.keys(objectToFind).forEach(key => {
    if (get(drupalIds, `${searchType}s[${key}].ownerId`) + '' === ownerId + '') {
      givenId = parseInt(key, 10);
    }
  });

  return givenId;
};

const getTypeAndId = (ownerId: string): TypeAndId => {
  const typeAndId = {
    givenId: 0,
    type: ''
  };

  if (ownerId) {
    const findInDepartaments = findDrupalId('department', ownerId);
    const findInLabels = findDrupalId('label', ownerId);
    if (findInDepartaments) {
      typeAndId.type = 'department';
      typeAndId.givenId = findInDepartaments;
    } else if (findInLabels) {
      typeAndId.type = 'label';
      typeAndId.givenId = findInLabels;
    }
  }

  return typeAndId;
};

const extractFilename = (attachment: string): string => {
  const slashIndex = attachment.indexOf('/');

  if (slashIndex >= 0) {
    attachment = attachment.slice(slashIndex + 1);
  }

  const dotIndex = attachment.indexOf('.');
  if (dotIndex >= 0) {
    attachment = attachment.slice(0, dotIndex);
  }
  return attachment;
};

const extractResources = (attachments: string[]): Resource[] => {
  if (attachments) {
    const resources: Resource[] = [];

    attachments.forEach(attachment => {
      const link = handleUri(attachment);
      attachment = attachment.replace('s3://', '');
      const resource = {
        title: extractFilename(attachment),
        extension: extractExtension(attachment),
        link: link
      };
      resources.push(resource);
    });

    return resources;
  }
  return [];
};

type Props = {
  type?: string;
  page?: PageModel;
  pages: PageModel[];
  match?: match;
  pageId?: number;
  givenId?: number; // givenId could be labelId or departmentId
  fetchPages?: (categoryId: string) => void;
  fetchPageById?: (pageId: number) => Promise<void>;
};

const mapState: any = (state: AppState, props: Props): Props => {
  const pageId = parseInt(get(props, 'match.params.id'), 10);
  const page = state.pageReducers.pages.find(d => get(d, 'drupal_id', 0) === pageId);
  const { type, givenId } = getTypeAndId(get(page, 'owner[0].drupal_id'));

  return {
    ...props,
    page,
    type,
    pageId,
    givenId,
    pages: state.pageReducers.pages
  };
};

const actionCreators = {
  fetchPages,
  fetchPageById
};

export const Page: FC<Props> = props => {
  const { pageId, givenId, page, fetchPageById } = props;
  const [isFetching, setIsFetching] = useState<boolean>(true);

  useEffect(() => {
    setIsFetching(true);
  });

  useEffect(() => {
    if (fetchPageById && pageId) {
      fetchPageById(pageId).then(() => {
        setIsFetching(false);
      }).catch(() => {
        setIsFetching(false);
      });
    }
  }, [pageId]);

  if (!page) {
    if (!isFetching) {
      return <Error404 />;
    } else {
      return null;
    }
  }

  const pageData = {
    title: page.title,
    pageContent: page.body_full,
    resources: extractResources(get(page, 'attachments_uri', [] as string[]))
  };

  return (
    <div className="page">
      {
        givenId ? (
          <TemplatesTopBar
            givenId={givenId}
            active={pageId}
            page={page}
            type={props.type}
          />
        ) : (
          <Container className="page--breadcrumb pb-3">
            <div className="py-4">
              <h3>{pageData.title}</h3>
            </div>
          </Container>
        )
      }
      <Container className="page--breadcrumb pb-3">
        <Row className="px-3 pt-3">
          {pageData.pageContent && (
            <ContentWrapper title="">
              <div
                className="position-relative"
                dangerouslySetInnerHTML={{
                  __html: createDOMPurify.sanitize(pageData.pageContent)
                }}
              />
            </ContentWrapper>
          )}
        </Row>
        <Row className="px-3 pt-3">
          {pageData.resources.length > 0 && (
            <ContentWrapper title="Resources">
              <div className="resources d-flex flex-wrap justify-content-between">
                {pageData.resources.map((resource: Resource) => (
                  <div className="pb-4" key={resource.title + ':' + resource.link}>
                    <ResourceComponent
                      mainLinkText={resource.title}
                      MainLink={p => (
                        <a href={resource.link} target="_blank">
                          {p.children}
                        </a>
                      )}
                      extension={resource.extension}
                    />
                  </div>
                ))}
              </div>
            </ContentWrapper>
          )}
        </Row>
      </Container>
    </div>
  );
};

export default connect(mapState, actionCreators)(Page);
