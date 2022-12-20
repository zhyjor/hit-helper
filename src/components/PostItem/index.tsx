import { Component } from "react";
import {
  Button,
  Cell,
  Tag,
  Divider,
  Icon,
} from "@nutui/nutui-react-taro";
import "./index.less";

const PostItem = () => {
  return (
    <Cell>
      <div className="cmpPostItemWrapper">
        <div className="cmpPostItemWrapperTitleWrapper">
          <span className="cmpPostItemWrapperTitle">帖子发布例子</span>
          <Tag plain>精华</Tag>
        </div>
        <div className="cmpPostItemWrapperFooterWrapper">
          <div className="cmpPostItemWrapperFooterLeft">
            <span className="cmpPostItemWrapperFooterLeftPlate">求助</span>
            <Divider direction="vertical" />
            <span className="cmpPostItemWrapperFooterLeftAuthor">微信用户</span>
            <span className="cmpPostItemWrapperFooterLeftGmtUpdate">2022.12.18 10:23</span>
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
