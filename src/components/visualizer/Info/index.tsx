import './Info.scss';

import { FC, useEffect, useRef } from 'react';

import { YoutubeFrame } from '../../index';

import { Info as InfoProps } from '../../../types';

const Info: FC<InfoProps> = ({ image, title, description, link, videos }) => {
  const ref = useRef<HTMLDivElement>(null);

  const scrollToTop = () => {
    ref.current?.scrollIntoView({ behavior: 'auto' });
  };

  useEffect(() => {
    scrollToTop();
  }, []);

  return (
    <div ref={ref} className="info">
      <img
        className="info__image"
        src={image}
        alt={title}
      />
      <div className="info__title">{title}</div>
      <div className="info__description">{description}</div>
      {/* eslint-disable-next-line react/jsx-no-target-blank */}
      <a
        href={link}
        target="_blank"
        className="info__description-link"
      >
        Learn more
      </a>
      <div className="info__videos">
        <div className="info__videos__message">Here are some videos you might find useful:</div>
        <div className="info__videos__links">
          {videos.map(({ title, link }) => (
            <YoutubeFrame
              key={title}
              title={title}
              link={link}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Info;