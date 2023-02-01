import React from "react";
import {
  Overlay, Icon
} from "@nutui/nutui-react-taro";

import "./index.less";

type IProps = {
  visible: boolean;
  onClick?: () => void;
}

const WrapperStyle = {
  display: 'flex',
  height: '100%',
  alignItems: 'center',
  justifyContent: 'center'
}
const ContentStyle = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  color: 'red'
}

const Loading: React.FC<IProps> = (props) => {
  const { onClick, visible } = props;
  return (
    <Overlay visible={visible} onClick={onClick}>
      <div className="wrapper" style={WrapperStyle}>
        <div className="content" style={ContentStyle}>
          <Icon size={24} name="loading"></Icon>
        </div>
      </div>
    </Overlay>
  );
}
export default Loading
