import './Background.scss';

interface BackgroundProps {
  src: string;
}

/**
 * Background picture that will be displayed for a screen
 */

const Background = ({ src }: BackgroundProps) => {
  return (
    <div className="background">
      <img src={src} alt="Background" />
    </div>
  );
};

export default Background