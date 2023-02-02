import React, { useMemo, useState } from "react";
import useCloudFunction from "../../../hooks/useCloudFunction";
import {
  Divider,
  Tag,
  Avatar,
} from "@nutui/nutui-react-taro";
import Taro, { useDidShow } from "@tarojs/taro";
import TextIcon from "../../../components/TextIcon";
import CommentItem from "../../../components/CommentItem";
import Handler from '../../../components/Handler';
import Loading from "../../../components/Loading";

import "./index.less";

type IProps = {
  data?: Post.PostItem;
}
const Details: React.FC<IProps> = (props) => {
  const $instance = Taro.getCurrentInstance();
  const id = $instance?.router?.params.id ?? 'c749a6be63b4f2d4000024384a467d9c';

  const [handlerLoading, setHandlerLoading] = useState(false);

  const { error, run, data, loading } = useCloudFunction<Post.PostItem>({ name: 'router', path: 'postDetails', body: { id }, manual: true });
  const { error: listError, run: fetchCommentList, data: listData, loading: listLoading } = useCloudFunction<Comment.CommentItem[]>({ name: 'router', path: 'commentList', body: { postId: id }, manual: true });
  const { error: errorView } = useCloudFunction<Post.PostItem>({ name: 'router', path: 'postView', body: { id } });

  useDidShow(() => {
    run();
    fetchCommentList();
  });

  const onPostHandler = (e) => {
    setHandlerLoading(e.loading);
    // 刷新一下数据
    run();
  }

  const loadingVisible = useMemo(() => {
    return loading || listLoading || handlerLoading;
  }, [loading, listLoading, handlerLoading])

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
              <TextIcon icon="eye" text={data?.viewCount} />
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
        {
          data && (<Handler data={data} onAttitude={onPostHandler} onFavorite={onPostHandler} />)
        }
      </div>
      <Loading visible={loadingVisible} />
    </div>
  )
}

export default Details;
