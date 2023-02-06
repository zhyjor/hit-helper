import React, { useState } from "react";
import { ScrollView } from "@tarojs/components";
import Footer from '../Footer';

interface IProps {
  hasMore: boolean;
  onRefresh: () => void;
  onLoadMore: () => void;
  children: any;
  className?: string;
}
const AdvanceScrollView: React.FC<IProps> = (props) => {
  const { onLoadMore, onRefresh, hasMore, className } = props;

  const [refresherTriggered, setRefresherTriggered] = useState(false);
  const [showLoadMore, setShowLoadMore] = useState(false);
  const onRefresherRefresh = async () => {
    setRefresherTriggered(true);
    await onRefresh();
    setRefresherTriggered(false);
  }

  const onReachBottomHandler = async () => {
    if (!hasMore) return;
    setShowLoadMore(true);
    await onLoadMore();
    setShowLoadMore(false);
  }

  return (
    <ScrollView
      className={className}
      scrollY
      refresherEnabled={!!onRefresh}
      refresherTriggered={refresherTriggered}
      onRefresherRefresh={onRefresherRefresh}
      onScrollToLower={onReachBottomHandler}
      lowerThreshold={30}
    >
      {props.children}
      <div
        style={{
          background: '#fff'
        }}
      >
        {
          hasMore ? (showLoadMore ? <Footer text="加载中..." /> : null) : <Footer text="已显示全部内容" />
        }
      </div>
    </ScrollView>
  )
}

export default AdvanceScrollView;
