import React from "react";
import {
  Icon,
} from "@nutui/nutui-react-taro";

import "./index.less";

type IProps = {
  icon: 'eye' | 'message' | 'share-n' | 's-follow' | 'fabulous' | 'more-s';
  text?: number | string;
  style?: React.CSSProperties;
  onClick?: (e?: any) => void;
  active?: boolean;
}

const TextIcon: React.FC<IProps> = (props) => {
  const { icon, text, style, onClick, active } = props;
  return (
    <div className="cmpCount" style={style} onClick={onClick}>
      <Icon name={icon} size={style?.fontSize} color={active ? '#fa2c19' : undefined} />
      {
        text && <span className="cmpCountText" style={{ color: active ? '#fa2c19' : undefined }}>{text}</span>
      }
    </div>
  );
}
export default TextIcon
