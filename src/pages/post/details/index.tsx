import React, { useMemo, useState } from "react";
import useCloudFunction from "../../../hooks/useCloudFunction";
import {
  Tag,
  Avatar,
} from "@nutui/nutui-react-taro";
import Taro, { useDidShow } from "@tarojs/taro";
import TextIcon from "../../../components/TextIcon";
import CommentItem from "../../../components/CommentItem";
import Handler from '../../../components/Handler';
import Loading from "../../../components/Loading";
import Footer from "../../../components/Footer";
import AdvanceScrollView from "../../../components/AdvanceScrollView";

import "./index.less";

type IProps = {
  data?: Post.PostItem;
}
const PAGESIZE = 10;

const checkHasMore = (pageNo, total) => {
  return pageNo * PAGESIZE < total;
}


const Details: React.FC<IProps> = (props) => {
  const [pageNo, setPageNo] = useState<number>(1);
  const [list, setList] = useState<Comment.CommentItem[]>([])
  const [hasMore, setHasMore] = useState(true);

  const $instance = Taro.getCurrentInstance();
  const id = $instance?.router?.params.id ?? 'c749a6be63b4f2d4000024384a467d9c';

  const [handlerLoading, setHandlerLoading] = useState(false);

  const { error, run, data, loading } = useCloudFunction<Post.PostItem>({ name: 'router', path: 'postDetails', body: { id }, manual: true });
  const { error: listError, run: fetchCommentList, loading: listLoading } = useCloudFunction<Base.Page<Comment.CommentItem>>({ name: 'router', path: 'commentList', body: { postId: id, pageNo, pageSize: PAGESIZE }, manual: true });
  const { error: errorView } = useCloudFunction<Post.PostItem>({ name: 'router', path: 'postView', body: { id } });

  useDidShow(() => {
    run();
    onRefreshHandler();
  });

  const onPostHandler = (e) => {
    setHandlerLoading(e.loading);
    // 刷新一下数据
    run();
  }

  const onRefreshHandler = async () => {
    if (listLoading) return;
    const [e, data] = await fetchCommentList({ pageNo: 1, pageSize: PAGESIZE, postId: id });
    console.log('data', data);
    if (data) {
      setList(data?.list!);
      setPageNo(data.pageNo);
      setHasMore(checkHasMore(data.pageNo, data.total));
    }
  }

  const onLoadMoreHandler = async () => {
    if (listLoading || !hasMore) return;
    const [e, data] = await fetchCommentList({ pageNo: pageNo + 1, pageSize: PAGESIZE, postId: id  });
    if (data) {
      setHasMore(checkHasMore(data.pageNo, data.total));
      setPageNo(data.pageNo);
      const _list = list.concat(data.list ?? []);
      console.log(_list);
      setList(_list);
    }
  }

  const loadingVisible = useMemo(() => {
    return loading || handlerLoading;
  }, [loading, handlerLoading])
  return (
    <div className="postDetailsWrapper">
      <div className="postDetailsContent">
        {/* <div style={{ height: "60%" }}> */}
        <AdvanceScrollView
          hasMore={hasMore}
          onLoadMore={onLoadMoreHandler}
          onRefresh={onRefreshHandler}
          className="postDetailsScroll"
        >
          <div className="postDetailsScrollContent">
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
                list?.map(i => (
                  <CommentItem data={i} showChildren />
                ))
              }
            </div>
          </div>
        </AdvanceScrollView>
        {/* </div> */}
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
