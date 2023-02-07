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
    Taro.navigateTo({ url: `/pages/post/details/index?id=${data.id}` })
  }
  return (
    <Cell onClick={onItemClick}>
      <div className="cmpPostItemWrapper">
        <div className="cmpPostItemWrapperTitleWrapper">
          <span className="cmpPostItemWrapperTitle">{data.subject}</span>
          {data.isEssence && (<Tag color="#FA685D" className="cmpPostItemWrapperTag">精华</Tag>)}
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
              <span>{data.viewCount}</span>
            </div>
            <div className="cmpPostItemWrapperFooterCommentCount">
              <Icon name="message" />
              <span>{data.commentCount}</span>
            </div>
          </div>
        </div>
      </div>
    </Cell>
  );
}
export default PostItem
