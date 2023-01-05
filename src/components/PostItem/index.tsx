import React from "react";
import {
  Button,
  Cell,
  Tag,
  Divider,
  Icon,
} from "@nutui/nutui-react-taro";
import Taro from '@tarojs/taro'

import "./index.less";

type IProps = {
  data: Post.PostItem;
}

const PostItem: React.FC<IProps> = (props) => {
  const { data } = props;
  const onItemClick = () => {
    Taro.navigateTo({ url: `/pages/post/details/index?id=${data._id}` })
  }
  return (
    <Cell onClick={onItemClick}>
      <div className="cmpPostItemWrapper">
        <div className="cmpPostItemWrapperTitleWrapper">
          <span className="cmpPostItemWrapperTitle">{data.subject}</span>
          {data.isExtract && (<Tag plain>精华</Tag>)}
        </div>
        <div className="cmpPostItemWrapperFooterWrapper">
          <div className="cmpPostItemWrapperFooterLeft">
            <span className="cmpPostItemWrapperFooterLeftPlate">{data.plateTypeName}</span>
            <Divider direction="vertical" />
            <span className="cmpPostItemWrapperFooterLeftAuthor">{data.nickName}</span>
            <span className="cmpPostItemWrapperFooterLeftGmtUpdate">{data.createTime}</span>
          </div>
          <div className="cmpPostItemWrapperFooterRight">
            <div className="cmpPostItemWrapperFooterReadCount">
              <Icon name="eye" />
              <span>10</span>
            </div>
            <div className="cmpPostItemWrapperFooterCommentCount">
              <Icon name="message" />
              <span>20</span>
            </div>
          </div>
        </div>
      </div>
    </Cell>
  );
}
export default PostItem
