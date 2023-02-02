import Taro, { useDidShow } from '@tarojs/taro'
import CommentList from "./list";
import useCloudFunction from "../../hooks/useCloudFunction";

import "./index.less";

const CommentPage = () => {
  const $instance = Taro.getCurrentInstance();
  const id = $instance?.router?.params.id;
  const { error, data, loading, run } = useCloudFunction<Comment.CommentItem>({ name: 'router', path: 'commentDetails', body: { id }, manual: true });

  useDidShow(() => {
    run();
  });

  let commentList: Comment.CommentItem[] = [];
  if (data) {
    commentList.push(data);
    if (data.children) {
      commentList = commentList.concat(data.children);
    }
  }
  return (
    <div className="commentWrapper">
      <CommentList data={commentList} />
    </div>
  )
}

export default CommentPage;
