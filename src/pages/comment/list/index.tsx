import React from "react";

import CommentItem from "../../../components/CommentItem";

import "./index.less";

interface IProps {
  data: Comment.CommentItem[];
}
const CommentList: React.FC<IProps> = (props) => {
  const { data } = props;
  return (
    <div className="commentWrapper">
      {
        data?.map((i, idx) => <CommentItem data={i} showReceiver={idx > 0} />)
      }
    </div>
  )
}

export default CommentList;
