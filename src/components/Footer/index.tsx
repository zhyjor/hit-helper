import React from "react";

import {
  Divider,
} from "@nutui/nutui-react-taro";
import './index.less';

interface IProps {
  text: string;
}

const Footer: React.FC<IProps> = ({ text }) => {
  return <Divider className="cmtDivider">{text}</Divider>
}

export default Footer;

