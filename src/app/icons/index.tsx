import React from 'react';

import Bars from './Bars';
import GripLines from './GripLines';
import Logo from './Logo';
import Plus from './Plus';
import Times from './Times';

import { IIcon } from 'types/types';

type IconName = 'bars' | 'grip' | 'grip-lines' | 'logo' | 'plus' | 'times';

const Icon: React.FC<IIcon<IconName>> = (props) => {
  switch (props.name) {
    case 'bars':
      return <Bars {...props} />;
    case 'grip-lines':
      return <GripLines {...props} />;
    case 'logo':
      return <Logo {...props} />;
    case 'plus':
      return <Plus {...props} />;
    case 'times':
      return <Times {...props} />;
    default:
      return <svg></svg>;
  }
};

export default Icon;
