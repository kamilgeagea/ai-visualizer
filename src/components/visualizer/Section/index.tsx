import './Section.scss';

import { FC, ReactNode } from 'react';

interface SectionProps {
  label: string;
  children: ReactNode;
  subSection?: boolean;
}

const Section: FC<SectionProps> = ({ label, children, subSection }) => {
  return (
    <div className={`section ${subSection ? 'subsection' : ''}`}>
      <div className={`section__label`}>{label}</div>
      <div className={`section__content`}>{children}</div>
    </div>
  );
};

Section.defaultProps = {
  subSection: false,
};

export default Section;