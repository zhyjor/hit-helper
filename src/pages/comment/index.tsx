import { Component } from "react";
import Taro from '@tarojs/taro'
import {
  Button,
  Cell,
  Avatar,
} from "@nutui/nutui-react-taro";
import CommentItem from "../../components/CommentItem";
import useCloudFunction from "../../hooks/useCloudFunction";

import "./index.less";

const CommentList = () => {
  const $instance = Taro.getCurrentInstance();
  const id = $instance?.router?.params.id;
  const { error, data, loading } = useCloudFunction<Comment.CommentItem>({ name: 'router', path: 'commentDetails', body: { id } });
  console.log(data);
  let commentList: Comment.CommentItem[] = [];
  if (data) {
    commentList.push(data);
    if (data.children) {
      commentList = commentList.concat(data.children);
    }
  }
  return (
    <div className="commentWrapper">
      {
        commentList?.map((i, idx) => <CommentItem data={i} showReceiver={idx > 0} />)
      }
    </div>
  )
}

export default CommentList;
