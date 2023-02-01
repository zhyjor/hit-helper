import React from "react";
import {
  Button,
  Cell,
  Tag,
  Divider,
  Icon,
  Avatar,
} from "@nutui/nutui-react-taro";
import Taro from '@tarojs/taro'
import TextIcon from "../TextIcon";

import "./index.less";

type IProps = {
  data: Comment.CommentItem;
  showChildren?: boolean;
  showReceiver?: boolean;
}

const CommentItem: React.FC<IProps> = (props) => {
  const { data, showChildren, showReceiver } = props;
  const onChildrenCommentClick = () => {
    Taro.navigateTo({ url: `/pages/comment/index?id=${data?.id}` });
  }
  const onCommentClick = () => {
    Taro.navigateTo({ url: `/pages/comment/create/index?parentCommentId=${data?.id}&receiverNickName=${data.nickName}&rootCommentId=${data.rootCommentId ?? data.id }` });
  }
  return (
    // <Cell onClick={onItemClick}>
    <div className="cmpCommentItemWrapper">
      <div className="cmpCommentItemAvatar">
        <Avatar url={data.avatarUrl} />
      </div>
      <div className="cmpCommentItemContent">
        <div className="cmpCommentItemContentInfo">
          <div className="cmpCommentItemContentInfoNicknameWrapper">
            <div className="cmpCommentItemContentInfoNicknameWrapper">
              <div className="cmpCommentItemContentInfoNickname">{data.nickName}</div>
              {data.isAuthor && (
                <div className="cmpCommentItemContentInfoNicknameTag">
                  <Tag plain>楼主</Tag>
                </div>
              )}
            </div>
            {
              showReceiver && (
                <>
                  <div className="cmpCommentItemContentInfoNicknameReply">回复</div>
                  <div className="cmpCommentItemContentInfoNicknameWrapper">
                    <div className="cmpCommentItemContentInfoNickname">{data.receiverNickName}</div>
                    {data.OPENID === data.receiverOpenId && (
                      <div className="cmpCommentItemContentInfoNicknameTag">
                        <Tag plain>楼主</Tag>
                      </div>
                    )}
                  </div>
                </>
              )
            }
          </div>

          <div className="cmpCommentItemContentInfoMeta">
            {
              !showReceiver && (
                <div className="cmpCommentItemContentInfoMetaFloor">{data.floor}楼</div>
              )
            }
            <div className="cmpCommentItemContentInfoMetaTime">{data.createTime}</div>
          </div>
        </div>
        <div className="cmpCommentItemContentBody">
          {data.body}
        </div>
        {
          showChildren && data.children && data.children.length > 0 && (
            <div className="cmpCommentItemContentChildren" onClick={onChildrenCommentClick}>
              <div className="cmpCommentItemContentNickName">{data.children[0].nickName}</div>
              <div className="cmpCommentItemContentTips">等人</div>
              <div className="cmpCommentItemContentNumber">共{data.children.length}条评论</div>
            </div>

          )
        }

        <div className="cmpCommentItemContentHandler">
          <TextIcon icon="eye" text="查看" />
          <TextIcon onClick={onCommentClick} icon="message" text="评论" />
        </div>
      </div>

    </div>
    // </Cell>
  );
}
export default CommentItem
