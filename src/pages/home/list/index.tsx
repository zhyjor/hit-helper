import React, { useState, useEffect } from "react";
import { Infiniteloading, PullToRefresh } from '@nutui/nutui-react-taro';
import Taro, { cloud } from "@tarojs/taro";

import PostItem from "../../../components/PostItem";
import './index.less';

const App = () => {
  const [list, setList] = useState<Post.PostItem[]>([])
  const [hasMore, setHasMore] = useState(true);
  const [pageNo, setPageNo] = useState(1);

  const getPostList = async () => {
    const res = await cloud.callFunction({
      name: 'router',
      data: {
        $url: 'postList',
        data: { pageNo, pageSize: 10 }
      }
    });
    console.log(res);
    const { code, data, page } = res.result as any;
    if (code === 200) {
      setPageNo(page.pageNo);
      setList(list.concat(data));
    }
  }

  useEffect(() => {
    getPostList();
  }, [])

  const loadMore = (done: () => void) => {
    console.log('more')
  }

  return (
    <ul id="scroll" className="scroll">
      <PullToRefresh onRefresh={async () => { console.log('pull') }}>
        <Infiniteloading
          containerId="scroll"
          useWindow={false}
          hasMore={hasMore}
          loadMore={loadMore}
        >
          {list.map((item) => {
            return (
              <li key={item.id} className="scrollItem">
                <PostItem data={item} />
              </li>
            )
          })}
        </Infiniteloading>
      </PullToRefresh>
    </ul>
  )
}
export default App;
