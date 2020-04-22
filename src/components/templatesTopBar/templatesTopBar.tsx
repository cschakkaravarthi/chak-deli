import React, { FC, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { LogoBanner } from 'umgc_ui_library';
import Container from 'react-bootstrap/Container';
import get from 'lodash.get';
import find from 'lodash.find';

// Components
import TopNavMinimal, { LinkInterface } from '../../components/nav/TopNavMinimal';
import Breadcrumb from '../../components/nav/Breadcrumb';

// Utils
import { getLinkToContent, toQueryString } from '../../utils/content';
import DrupalIds from '../../drupalIds';
import images from '../../images/images';

// Types
import { AppState } from '../../shared/types/genericTypes';
import { ContentQueryParamsType, FacetedContentModel, VariousContentModel } from '../../shared/types/contentTypes';
import { DepartmentTemplate, Department as DepartmentModel } from '../../shared/models/Department.model';
import { LabelTemplate, Label as LabelModel } from '../../shared/models/Label.model';

// Actions
import { fetchDepartmentById } from '../../shared/actions/departmentActions';
import { fetchLabelById } from '../../shared/actions/labelActions';
import { fetchContent } from '../../shared/actions/contentActions';
import { Page } from '../../shared/models/Page.model';

type Props = {
  page?: Page;
  type?: string;
  active?: number;
  givenId: number;
  content?: VariousContentModel;
  navItems?: VariousContentModel[];
  paramSet?: ContentQueryParamsType;
  topNavContent?: FacetedContentModel;
  fetchContent?: (params: ContentQueryParamsType) => void;
  fetchDepartmentById?: (departmentId: number) => void;
  fetchLabelById?: (labelId: number) => void;
};

const mapState: any = (state: AppState, props: Props): Props => {
  // This should looks like -> get(DrupalIds, 'departments.102020')
  const contentIds = get(DrupalIds, `${props.type}s.${props.givenId}`);
  const givenContent =
    props.type === 'department' ? state.departmentReducers.departments.content : state.labelReducers.labels;
  const paramSet: ContentQueryParamsType = {
    category: contentIds && contentIds.topNav
  };
  const topNavContent = get(state.contentReducers.content, `[${toQueryString(paramSet)}]`);

  return {
    ...props,
    paramSet,
    topNavContent,
    content: find(givenContent, c => c.drupal_id === props.givenId)
  };
};

const actionCreators = { fetchContent, fetchLabelById, fetchDepartmentById };

const sortAlphabetically = (links: LinkInterface[]): LinkInterface[] => {
  return links.sort((a: LinkInterface, b: LinkInterface) => {
    if (a.title < b.title) {
      return -1;
    }
    if (a.title > b.title) {
      return 1;
    }
    return 0;
  });
};

const getNavigationLinks = (
  content: VariousContentModel,
  topNavContent: FacetedContentModel,
  active?: number,
  type?: string,
  containsPeople = false
): LinkInterface[] => {
  const navLinks = [];
  // First we add the department to the links (not active because we are in a page component)
  navLinks.push({
    title: 'Home',
    isActive: active === content.drupal_id,
    id: content.drupal_id,
    linkComponent: getLinkToContent(content, 'Home')
  });

  const pageNavLinks: LinkInterface[] = [];
  const subLink = type === 'departments' ? '/departments/' : '/labels/';

  // Then, we add the pages as links (set active the one that matches the current page)
  topNavContent.content.map(c => {
    pageNavLinks.push({
      isActive: active === c.drupal_id,
      title: c.title,
      id: c.drupal_id,
      linkComponent: getLinkToContent(c, c.title)
    });
  });

  const sortedPageNavLinks: LinkInterface[] = sortAlphabetically(pageNavLinks);

  navLinks.push(...sortedPageNavLinks);

  if (containsPeople) {
    navLinks.push({
      id: 0,
      isActive: active === -1,
      title: 'People',
      linkComponent: (p: any) => (
        <Link to={subLink + content.drupal_id + '/people'} {...p}>
          People
        </Link>
      )
    });
  }

  return navLinks;
};

export const TemplatesTopBar: FC<Props> = props => {
  const {
    active,
    content,
    givenId,
    fetchContent,
    topNavContent,
    fetchLabelById,
    fetchDepartmentById,
    page,
    paramSet,
    type
  } = props;

  useEffect(() => {
    if (type === 'department' && fetchDepartmentById) {
      fetchDepartmentById(givenId);
    } else if (type === 'label' && fetchLabelById) {
      fetchLabelById(givenId);
    }
  }, [givenId]);

  useEffect(() => {
    fetchContent && paramSet && fetchContent(paramSet);
  }, []);

  const getTemplateId = (): string => {
    const getTemplates =
      props.type === 'department'
        ? get(content, 'template', [] as DepartmentTemplate[])
        : get(content, 'template', [] as LabelTemplate[]);
    return getTemplates[0].drupal_id.toString();
  };

  const templateId = content && getTemplateId();

  const wrappedContent = props.type === 'department' ? (content as DepartmentModel) : (content as LabelModel);

  const containsPeople =
    wrappedContent &&
    Array.isArray(wrappedContent.contacts) &&
    wrappedContent.contacts.length > 0 &&
    templateId !== DrupalIds.templates.templateE &&
    templateId !== DrupalIds.templates.templateB;

  const navLinks =
    content && topNavContent ? getNavigationLinks(content, topNavContent, active, props.type, containsPeople) : [];

  if (!content) {
    return null;
  }

  return (
    <>
      <LogoBanner logoSrc={images.logoSrc} bannerSrc={get(content, 'banner_uri.umgc_banner', images.bannerSrc)} />
      {navLinks && navLinks.length > 1 && <TopNavMinimal links={navLinks} />}
      <Container>
        {page ? (
          <Breadcrumb
            variant="secondary"
            title={content.title}
            subsection={page.title}
            sectionImageSrc={get(content, 'logo_uri', require('../../assets/default_icon_circle.svg'))}
          />
        ) : (
          <Breadcrumb
            title={content.title}
            bodyText={content.summary}
            sectionImageSrc={get(content, 'logo_uri', require('../../assets/default_icon_circle.svg'))}
          />
        )}
      </Container>
    </>
  );
};

export default connect(mapState, actionCreators)(TemplatesTopBar);
