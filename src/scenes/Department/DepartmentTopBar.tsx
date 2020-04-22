import React, { FC, useEffect } from 'react';
import { LogoBanner } from 'umgc_ui_library';
import images from '../../images/images';
import Container from 'react-bootstrap/Container';
import TopNavMinimal, {
  LinkInterface
} from '../../components/nav/TopNavMinimal';
import { DepartmentTemplate, Department as DepartmentModel } from '../../shared/models/Department.model';
import Breadcrumb from '../../components/nav/Breadcrumb';
import { AppState } from '../../shared/types/genericTypes';
import { connect } from 'react-redux';
import { fetchDepartmentById } from '../../shared/actions/departmentActions';
import { fetchContent } from '../../shared/actions/contentActions';
import get from 'lodash.get';
import {
  ContentQueryParamsType, FacetedContentModel,
  VariousContentModel
} from '../../shared/types/contentTypes';
import { getLinkToContent, toQueryString } from '../../utils/content';
import { Page } from '../../shared/models/Page.model';
import DrupalIds from '../../drupalIds';
import { Link } from 'react-router-dom';

type Props = {
  active?: number;
  content?: FacetedContentModel;
  department?: VariousContentModel;
  departmentId: number;
  fetchContent?: (params: ContentQueryParamsType) => void;
  fetchDepartmentById?: (departmentId: number) => void;
  navItems?: VariousContentModel[];
  page?: Page;
  paramSet?: ContentQueryParamsType;
};

const mapState: any = (state: AppState, props: Props): Props => {
  const departmentIds = get(DrupalIds.departments, props.departmentId);
  const paramSet: ContentQueryParamsType = {
    category: departmentIds && departmentIds.topNav
  };
  const topNavContent = get(state.contentReducers.content, `[${toQueryString(paramSet)}]`);
  return {
    ...props,
    paramSet,
    content: topNavContent,
    department: state.departmentReducers.departments.content.find(
      d => d.drupal_id === props.departmentId
    )
  };
};

const actionCreators = { fetchContent, fetchDepartmentById };

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
  department: VariousContentModel,
  topNavContent: FacetedContentModel,
  active?: number,
  containsPeople = false
): LinkInterface[] => {
  const navLinks = [];
  // First we add the department to the links (not active because we are in a page component)
  navLinks.push({
    title: 'Home',
    isActive: active === department.drupal_id,
    id: department.drupal_id,
    linkComponent: getLinkToContent(department, 'Home')
  });

  const pageNavLinks: LinkInterface[] = [];

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
        <Link to={'/departments/' + department.drupal_id + '/people'} {...p}>People</Link>
      )
    });
  }

  return navLinks;
};

export const DepartmentTopBar: FC<Props> = props => {
  const {
    active,
    content,
    department,
    departmentId,
    fetchContent,
    fetchDepartmentById,
    page,
    paramSet
  } = props;

  useEffect(() => {
    fetchDepartmentById && fetchDepartmentById(departmentId);
  }, [departmentId]);

  useEffect(() => {
    fetchContent && paramSet && fetchContent(paramSet);
  }, []);

  const getTemplateId = (): string => {
    const getTemplates = get(
      department,
      'template',
      [] as DepartmentTemplate[]
    );
    // Typecast to string.
    return getTemplates[0].drupal_id + '';
  };

  const templateId = department && getTemplateId();

  const wrappedDepartment = department as DepartmentModel;

  const containsPeople = wrappedDepartment && Array.isArray(wrappedDepartment.contacts) && wrappedDepartment.contacts.length > 0 && templateId !== DrupalIds.templates.templateE && templateId !== DrupalIds.templates.templateB;

  const navLinks =
    department && content
      ? getNavigationLinks(department, content, active, containsPeople)
      : [];

  if (!department) {
    return null;
  }

  return (
    <>
      <LogoBanner
        logoSrc={images.logoSrc}
        bannerSrc={get(department, 'banner_uri.umgc_banner', '')}
      />
      {content && !!content.content.length && (
        <TopNavMinimal links={navLinks} />
      )}
      <Container>
        {page ? (
          <Breadcrumb
            variant="secondary"
            subsection={page.title}
            title={department.title}
            sectionImageSrc={get(
              department,
              'logo_uri',
              require('../../assets/default_icon_circle.svg')
            )}
          />
        ) : (
          <Breadcrumb
            title={department.title}
            bodyText={department.summary}
            sectionImageSrc={get(
              department,
              'logo_uri',
              require('../../assets/default_icon_circle.svg')
            )}
          />
        )}
      </Container>
    </>
  );
};

export default connect(mapState, actionCreators)(DepartmentTopBar);
