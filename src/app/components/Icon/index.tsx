import React from 'react';

import Bars from './paths/Bars';
import GripLines from './paths/GripLines';
import Logo from './paths/Logo';
import Plus from './paths/Plus';
import Times from './paths/Times';

import assertNever from 'utils/assert-never';

type IconName = 'bars' | 'grip-lines' | 'logo' | 'plus' | 'times';

export interface PathProps {
  fill?: string;
}

interface IconProps extends PathProps {
  name: IconName;
  title?: string;
  desc?: string;
  style?: any;
  width?: string;
  className?: string;
  viewBox?: string;
}

const Icon: React.FC<IconProps> = ({
  name,
  title,
  desc,
  style = {},
  fill = '#000',
  width = '100%',
  className = '',
  viewBox = '0 0 448 512',
}) => {
  function getPath() {
    switch (name) {
      case 'bars':
        return <Bars fill={fill} />;
      case 'grip-lines':
        return <GripLines fill={fill} />;
      case 'logo':
        return <Logo fill={fill} />;
      case 'plus':
        return <Plus fill={fill} />;
      case 'times':
        return <Times fill={fill} />;
      default:
        return assertNever(name);
    }
  }

  return (
    <svg
      width={width}
      style={style}
      height={width}
      viewBox={viewBox}
      xmlns="http://www.w3.org/2000/svg"
      className={`svg-icon ${className}`}
      xmlnsXlink="http://www.w3.org/1999/xlink"
      role="img"
      aria-describedby="title desc"
      aria-hidden={!title && !desc} // hide in aria if title or desc are not provided
    >
      {title && (
        <title id="title" data-testid="icon-title">
          {title}
        </title>
      )}
      {desc && <desc id="desc">{desc}</desc>}
      {getPath()}
    </svg>
  );
};

export default Icon;
