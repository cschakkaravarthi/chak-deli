// @TODO: Tag is likely to be department / label / artist in future.
import { ImageUris } from './Image.model';
import { BaseContentModel, TaxonomyTermModel } from '../types/contentTypes';

export default interface Article extends BaseContentModel {
  type: 'article';
  drupal_id: number;
  title: string;
  body_full?: string;
  created: number; // Unix Timestamp
  summary?: string;
  tags?: TaxonomyTermModel[];
  categories: TaxonomyTermModel[];
  owner: TaxonomyTermModel[];
  image_uri?: ImageUris;
  articleCategory?: TaxonomyTermModel[];
  likesCount?: number;
  likedByUser?: boolean;
}

export const dummyArticle: Article = {
  body_full:
    '<p><strong>An Article!</strong>&nbsp;About&nbsp;<em>music</em>! This is a paragraph with many lines of content. This is a paragraph with many lines of content. This is a paragraph with many lines of content. This is a paragraph with many lines of content. This is a paragraph with many lines of content.This is a paragraph with many lines of content.This is a paragraph with many lines of content.This is a paragraph with many lines of content.This is a paragraph with many lines of content.This is a paragraph with many lines of content.This is a paragraph with many lines of content.This is a paragraph with many lines of content.This is a paragraph with many lines of content.This is a paragraph with many lines of content.This is a paragraph with many lines of content.This is a paragraph with many lines of content.This is a paragraph with many lines of content.This is a paragraph with many lines of content.This is a paragraph with many lines of content.This is a paragraph with many lines of content.This is a paragraph with many lines of content.This is a paragraph with many lines of content.This is a paragraph with many lines of content.This is a paragraph with many lines of content.This is a paragraph with many lines of content.This is a paragraph with many lines of content.This is a paragraph with many lines of content.</p>',
  summary: 'summary content',
  type: 'article',
  created: 1568727365,
  drupal_id: 1,
  title: 'Test Article',
  image_uri: {
    umgc_banner: 'undefined',
    umgc_embedded: 'undefined',
    umgc_featured: 'undefined',
    umgc_thumbnail: 'undefined',
    source: 'undefined'
  },
  tags: [{ title: 'Company news article 6', drupal_id: 1 }],
  categories: [{ drupal_id: 1, title: 'test', weight: 1, icon: 'test.png' }],
  category_ancestors: [],
  owner: [
    { drupal_id: 1, title: 'Corporate Communications', weight: 0, icon: null }
  ],
  articleCategory: [
    { drupal_id: 45, title: 'Industry News', weight: 1, icon: null }
  ],
  likesCount: 5,
  likedByUser: true
};

export const dummyArticles: Article[] = [
  {
    drupal_id: 1,
    type: 'article',
    title: 'Zeppelin',
    image_uri: {
      umgc_banner: 'undefined',
      umgc_embedded: 'undefined',
      umgc_featured: 'undefined',
      umgc_thumbnail: 'undefined',
      source: 'undefined'
    },

    created: 1561047294,
    body_full:
      '' +
      '<p><strong>An Article!</strong> About <em>music</em>! This is a paragraph with many lines of content. ' +
      'This is a paragraph with many lines of content. This is a paragraph with many lines of content. ' +
      'This is a paragraph with many lines of content.</p>' +
      '<p><a href="https://www.google.com/search?q=music">Here is a link</a></p>' +
      '<ul><li>Bullet point!</li><li>Another one!</li></ul>' +
      '<h2>A second-level heading!!</h2>' +
      '<h3>And a third!!</h3>' +
      '<wombat>This tag is unknown!</wombat>' +
      '<script>alert("This content should be stripped!")</script>',
    summary: 'An article about music.',
    tags: [
      {
        drupal_id: 90,
        title: 'Corporate Communications'
      }
    ],
    categories: [],
    category_ancestors: [],
    owner: [
      { drupal_id: 1, title: 'Corporate Communications', weight: 0, icon: null }
    ],
    articleCategory: [
      { drupal_id: 45, title: 'Industry News', weight: 1, icon: null }
    ],
    likesCount: 5,
    likedByUser: false
  },
  {
    drupal_id: 2,
    type: 'article',
    title: 'Floyd',
    image_uri: {
      umgc_banner: 'undefined',
      umgc_embedded: 'undefined',
      umgc_featured: 'undefined',
      umgc_thumbnail: 'undefined',
      source: 'undefined'
    },

    created: 1561047294,
    body_full:
      '' +
      '<p><strong>An Article!</strong> About <em>music</em>! This is a paragraph with many lines of content. ' +
      'This is a paragraph with many lines of content. This is a paragraph with many lines of content. ' +
      'This is a paragraph with many lines of content.</p>' +
      '<p><a href="https://www.google.com/search?q=music">Here is a link</a></p>' +
      '<img src="https://assets.nrdc.org/sites/default/files/styles/full_content--retina/public/media-uploads/' +
      'duplaix_shortclawedotter3.jpg?itok=mF0khuw-" title="Embedded Video" />' +
      '<ul><li>Bullet point!</li><li>Another one!</li></ul>' +
      '<h2>A second-level heading!!</h2>' +
      '<h3>And a third!!</h3>' +
      '<wombat>This tag is unknown!</wombat>' +
      '<script>alert("This content should be stripped!")</script>',
    summary: 'An article about music.',
    tags: [
      {
        drupal_id: 90,
        title: 'Corporate Communications'
      }
    ],
    categories: [],
    category_ancestors: [],
    owner: [
      { drupal_id: 1, title: 'Corporate Communications', weight: 0, icon: null }
    ],
    articleCategory: [
      { drupal_id: 45, title: 'Industry News', weight: 1, icon: null }
    ],
    likesCount: 5,
    likedByUser: false
  },
  {
    drupal_id: 3,
    type: 'article',
    title: 'Hendrix',
    image_uri: {
      umgc_banner: 'undefined',
      umgc_embedded: 'undefined',
      umgc_featured: 'undefined',
      umgc_thumbnail: 'undefined',
      source: 'undefined'
    },

    created: 1561047294,
    body_full:
      '' +
      '<p><strong>An Article!</strong> About <em>music</em>! This is a paragraph with many lines of content. ' +
      'This is a paragraph with many lines of content. This is a paragraph with many lines of content. ' +
      'This is a paragraph with many lines of content.</p>' +
      '<p><a href="https://www.google.com/search?q=music">Here is a link</a></p>' +
      '<img src="https://assets.nrdc.org/sites/default/files/styles/full_content--retina/public/media-uploads/' +
      'duplaix_shortclawedotter3.jpg?itok=mF0khuw-" title="Embedded Video" />' +
      '<ul><li>Bullet point!</li><li>Another one!</li></ul>' +
      '<h2>A second-level heading!!</h2>' +
      '<h3>And a third!!</h3>' +
      '<wombat>This tag is unknown!</wombat>' +
      '<script>alert("This content should be stripped!")</script>',
    summary: 'An article about music.',
    tags: [
      {
        drupal_id: 90,
        title: 'Corporate Communications'
      }
    ],
    categories: [],
    category_ancestors: [],
    owner: [
      { drupal_id: 1, title: 'Corporate Communications', weight: 0, icon: null }
    ],
    articleCategory: [
      { drupal_id: 45, title: 'Industry News', weight: 1, icon: null }
    ],
    likesCount: 0,
    likedByUser: false
  }
];

export const dummyArticleList: Article[] = [
  {
    drupal_id: 1,
    type: 'article',
    title: 'Zeppelin',
    image_uri: {
      umgc_banner: 'undefined',
      umgc_embedded: 'undefined',
      umgc_featured: 'undefined',
      umgc_thumbnail: 'undefined',
      source: 'undefined'
    },

    created: 1561047294,
    body_full:
      '' +
      '<p><strong>An Article!</strong> About <em>music</em>! This is a paragraph with many lines of content. ' +
      'This is a paragraph with many lines of content. This is a paragraph with many lines of content. ' +
      'This is a paragraph with many lines of content.</p>' +
      '<p><a href="https://www.google.com/search?q=music">Here is a link</a></p>' +
      '<img src="https://assets.nrdc.org/sites/default/files/styles/full_content--retina/public/media-uploads/' +
      'duplaix_shortclawedotter3.jpg?itok=mF0khuw-" title="Embedded Video" />' +
      '<ul><li>Bullet point!</li><li>Another one!</li></ul>' +
      '<h2>A second-level heading!!</h2>' +
      '<h3>And a third!!</h3>' +
      '<wombat>This tag is unknown!</wombat>' +
      '<script>alert("This content should be stripped!")</script>',
    summary: 'An article about music.',
    tags: [
      {
        drupal_id: 90,
        title: 'Corporate Communications'
      }
    ],
    categories: [],
    category_ancestors: [],
    owner: [
      { drupal_id: 1, title: 'Corporate Communications', weight: 0, icon: null }
    ],
    articleCategory: [
      { drupal_id: 45, title: 'Industry News', weight: 1, icon: null }
    ]
  },
  {
    drupal_id: 2,
    type: 'article',
    title: 'Floyd',
    image_uri: {
      umgc_banner: 'undefined',
      umgc_embedded: 'undefined',
      umgc_featured: 'undefined',
      umgc_thumbnail: 'undefined',
      source: 'undefined'
    },

    created: 1561047294,
    body_full:
      '' +
      '<p><strong>An Article!</strong> About <em>music</em>! This is a paragraph with many lines of content. ' +
      'This is a paragraph with many lines of content. This is a paragraph with many lines of content. ' +
      'This is a paragraph with many lines of content.</p>' +
      '<p><a href="https://www.google.com/search?q=music">Here is a link</a></p>' +
      '<img src="https://assets.nrdc.org/sites/default/files/styles/full_content--retina/public/media-uploads/' +
      'duplaix_shortclawedotter3.jpg?itok=mF0khuw-" title="Embedded Video" />' +
      '<ul><li>Bullet point!</li><li>Another one!</li></ul>' +
      '<h2>A second-level heading!!</h2>' +
      '<h3>And a third!!</h3>' +
      '<wombat>This tag is unknown!</wombat>' +
      '<script>alert("This content should be stripped!")</script>',
    summary: 'An article about music.',
    tags: [
      {
        drupal_id: 90,
        title: 'Corporate Communications'
      }
    ],
    categories: [],
    category_ancestors: [],
    owner: [
      { drupal_id: 1, title: 'Corporate Communications', weight: 0, icon: null }
    ],
    articleCategory: [
      { drupal_id: 45, title: 'Industry News', weight: 1, icon: null }
    ]
  },

  {
    drupal_id: 3,
    type: 'article',
    title: 'Hendrix',
    image_uri: {
      umgc_banner: 'undefined',
      umgc_embedded: 'undefined',
      umgc_featured: 'undefined',
      umgc_thumbnail: 'undefined',
      source: 'undefined'
    },

    created: 1561047294,
    body_full:
      '' +
      '<p><strong>An Article!</strong> About <em>music</em>! This is a paragraph with many lines of content. ' +
      'This is a paragraph with many lines of content. This is a paragraph with many lines of content. ' +
      'This is a paragraph with many lines of content.</p>' +
      '<p><a href="https://www.google.com/search?q=music">Here is a link</a></p>' +
      '<img src="https://assets.nrdc.org/sites/default/files/styles/full_content--retina/public/media-uploads/' +
      'duplaix_shortclawedotter3.jpg?itok=mF0khuw-" title="Embedded Video" />' +
      '<ul><li>Bullet point!</li><li>Another one!</li></ul>' +
      '<h2>A second-level heading!!</h2>' +
      '<h3>And a third!!</h3>' +
      '<wombat>This tag is unknown!</wombat>' +
      '<script>alert("This content should be stripped!")</script>',
    summary: 'An article about music.',
    tags: [
      {
        drupal_id: 90,
        title: 'Corporate Communications'
      }
    ],
    categories: [],
    category_ancestors: [],
    owner: [
      { drupal_id: 1, title: 'Corporate Communications', weight: 0, icon: null }
    ],
    articleCategory: [
      { drupal_id: 45, title: 'Industry News', weight: 1, icon: null }
    ]
  }
];
