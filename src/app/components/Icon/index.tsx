import React from 'react';

import Bars from './paths/Bars';
import GripLines from './paths/GripLines';
import Logo from './paths/Logo';
import Plus from './paths/Plus';
import Times from './paths/Times';

type IconName = 'bars' | 'grip' | 'grip-lines' | 'logo' | 'plus' | 'times';

export interface PathProps {
  fill?: string;
}

export interface IconProps extends PathProps {
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
  let path;

  switch (name) {
    case 'bars':
      path = <Bars fill={fill} />;
      break;
    case 'grip-lines':
      path = <GripLines fill={fill} />;
      break;
    case 'logo':
      path = <Logo fill={fill} />;
      break;
    case 'plus':
      path = <Plus fill={fill} />;
      break;
    case 'times':
      path = <Times fill={fill} />;
      break;
    default:
      break;
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
      {path}
    </svg>
  );
};

export default Icon;
