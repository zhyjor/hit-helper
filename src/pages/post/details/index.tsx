import React, { Component, useCallback, useEffect, useState } from "react";
import useCloudFunction from "../../../hooks/useCloudFunction";
import {
  Button,
  Divider,
  Tag,
  Notify,
  Avatar,
} from "@nutui/nutui-react-taro";
import Taro from "@tarojs/taro";
import TextIcon from "../../../components/TextIcon";
import CommentItem from "../../../components/CommentItem";

import "./index.less";

type IProps = {
  data?: Post.PostItem;
}
const Details: React.FC<IProps> = (props) => {
  const $instance = Taro.getCurrentInstance();
  const id = $instance?.router?.params.id ?? 'c749a6be63b4f2d4000024384a467d9c';

  const { error, data, loading } = useCloudFunction<Post.PostItem>({ name: 'router', path: 'postDetails', body: { id } });
  const { error: listError, data: listData, loading: listLoading } = useCloudFunction<Comment.CommentItem[]>({ name: 'router', path: 'commentList', body: { postId: id } });

  console.log(listData);

  return (
    <div className="postDetailsWrapper">
      <div className="postDetailsContent">
        <div className="postDetailsContentTitle">
          {data?.subject}
        </div>
        <div className="postDetailsContentAuthor">
          <div className="postDetailsContentAuthorAvatar">
            <Avatar url={data?.avatarUrl} />
          </div>
          <div className="postDetailsContentAuthorName">
            <div className="postDetailsContentAuthorNameContent">
              <div className="postDetailsContentAuthorNameContentName">{data?.nickName}</div>
              <div className="postDetailsContentAuthorNameContentTime">{data?.createTime}</div>
            </div>
            <div className="postDetailsContentAuthorNameCount">
              <TextIcon icon="eye" text={10} />
            </div>
          </div>
          <div className="postDetailsContentAuthorPlate">
            <Tag className="" color="#E9E9E9" textColor="#999999">{data?.plateTypeName}</Tag>
          </div>
        </div>
        <div className="postDetailsContentBody">
          {data?.body}
        </div>
        <div className="postDetailsContentComment">
          {
            listData?.map(i => (
              <CommentItem data={i} showChildren />
            ))
          }
          <Divider className="postDetailsContentCommentDivider">已显示全部内容</Divider>
        </div>
      </div>
      <div className="postDetailsHandler">
        <div
          className="postDetailsHandlerComment"
          onClick={() => {
            Taro.navigateTo({ url: `/pages/comment/create/index?postId=${data?._id}` });
          }}
        >
          <TextIcon style={{ fontSize: 14, color: '#888' }} text="我要回复" icon="message" />
        </div>
        <div
          className="postDetailsHandlerShare"
        >
          <TextIcon style={{ fontSize: 14, color: '#888' }} icon="share" />
        </div>
      </div>
    </div>
  )
}

export default Details;
