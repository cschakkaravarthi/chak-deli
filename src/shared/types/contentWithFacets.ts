import Article from '../models/Article.model';
import Event from '../models/Event.model';
import Facet from '../models/Facet.model';
import PeopleModel from '../models/People.model';

export interface ContentWithFacet {
  people?: PeopleModel[];
  articleList?: Article[];
  eventsList?: Event[];
  facets?: Facet;
}
