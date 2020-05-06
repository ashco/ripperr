import React from 'react';

import Plus from './Plus';
// import Wifi from "./Wifi";
// import Phone from "./Phone";
// import Trash from "./Trash";
// import Message from "./Message";
// import Envelope from "./Envelope";

import { IIcon } from 'types/types';

const Icon: React.FC<IIcon> = (props) => {
  switch (props.name) {
    case 'plus':
      return <Plus {...props} />;
    // case "phone":
    //   return <Phone {...props} />;
    // case "wifi":
    //   return <Wifi {...props} />;
    // case "trash":
    //   return <Trash {...props} />;
    // case "message":
    //   return <Message {...props} />;
    // case "envelope":
    //   return <Envelope {...props} />;
    default:
      return <div></div>;
  }
};

export default Icon;
