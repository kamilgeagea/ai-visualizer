import { FC } from 'react';

import { Video as YoutubeFrameProps } from '../../../types';

const YoutubeFrame: FC<YoutubeFrameProps> = ({ title, link }) => {
  return (
    <div className="youtube-frame">
      <iframe
        src={link}
        frameBorder="0"
        title={title}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      />
    </div>
  );
};

export default YoutubeFrame;