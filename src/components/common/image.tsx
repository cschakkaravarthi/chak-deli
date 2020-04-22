import React, { FC } from 'react';
import { imageUrlHandler } from '../../utils/imageUrlHandler';

interface ImageProps {
  src: string | undefined | null;
  alt?: string | undefined | null;
  className?: string;
  onClick?: (event: React.SyntheticEvent) => void; // @TODO handling onClick event
}

const Image: FC<ImageProps> = props => {
  const { src, alt, className, onClick } = props;
  const imageUrl = imageUrlHandler();

  return <img
    src={imageUrl.sanitize(src)}
    alt={alt || `image in ${window.location.hostname}`}
    className={className}
    onClick={onClick}
  />;
};

export default Image;
