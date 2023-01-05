import React from "react";
import {
  Icon,
} from "@nutui/nutui-react-taro";

import "./index.less";

type IProps = {
  icon: 'eye' | 'message' | 'share';
  text?: number | string;
  style?: React.CSSProperties;
  onClick?: (e?: any) => void;
}

const TextIcon: React.FC<IProps> = (props) => {
  const { icon, text, style, onClick  } = props;
  return (
    <div className="cmpCount" style={style} onClick={onClick}>
      <Icon name={icon} />
      {
        text && <span>{text}</span>
      }
    </div>
  );
}
export default TextIcon
