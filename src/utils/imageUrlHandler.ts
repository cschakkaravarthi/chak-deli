import { appEnv } from './customHooks';
import { ImageUris } from '../shared/models/Image.model';

const placeholderImage = require('../assets/placeholder.jpg');
const placeholderIcon = require('../assets/default_icon.svg');

interface ImageUrlHandlerType {
  sanitize(value: string | object | undefined | null): string;
}

function buildImageUrl (source: string): string {
  return source.includes('s3://') ? appEnv.cloudfrontEndpoint.baseUrl + source.split(
    '://')[1] : source;
}

// sanitize image url in accordance with remote host
export function imageUrlHandler (): ImageUrlHandlerType {
  function sanitize (src: string): string {
    return buildImageUrl(unescape(src));
  }
  return { sanitize };
}

export const handleUriForIcons = (
  field: null | string
): string => {
  if (!field) {
    return placeholderIcon;
  }

  return imageUrlHandler().sanitize(field);
};

export const handleUri = (
  field: null | string
): string => {
  if (!field) {
    return placeholderImage;
  }

  return imageUrlHandler().sanitize(field);
};

export const handleUriSet = (
  field: null | ImageUris
): ImageUris => {
  if (!field) {
    return {
      umgc_banner: placeholderImage,
      umgc_embedded: placeholderImage,
      umgc_featured: placeholderImage,
      umgc_thumbnail: placeholderImage,
      source: placeholderImage
    };
  }

  return {
    umgc_banner: imageUrlHandler().sanitize(field.umgc_banner),
    umgc_embedded: imageUrlHandler().sanitize(field.umgc_embedded),
    umgc_featured: imageUrlHandler().sanitize(field.umgc_featured),
    umgc_thumbnail: imageUrlHandler().sanitize(field.umgc_thumbnail),
    source: imageUrlHandler().sanitize(field.source)
  };
};
