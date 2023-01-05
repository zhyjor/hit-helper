import React, { useState, useEffect } from "react";
import { Infiniteloading, Cell } from '@nutui/nutui-react-taro';
import Taro, { cloud } from "@tarojs/taro";

import PostItem from "../../../components/PostItem";
import './index.less';

const App = () => {
  const [defultList, setDefultList] = useState<string[]>([])
  const [hasMore, setHasMore] = useState(true);

  const getPostList = async () => {
    const data =  await cloud.callFunction({
      name: 'router',
      data: {
        $url: 'postList',
        // data: { subject, body }
      }
    });
    console.log(data.result);
  }

  useEffect(() => {
    getPostList();
  }, [])

  const loadMore = (done: () => void) => {
    setTimeout(() => {
      const curLen = defultList.length
      for (let i = curLen; i < curLen + 10; i++) {
        defultList.push(`${i}`)
      }
      if (defultList.length >= 50) {
        setHasMore(false)
      } else {
        setDefultList([...defultList])
      }
      done()
    }, 500)
  }

  return (
    <ul id="scroll" className="scroll">
      <Infiniteloading
        containerId="scroll"
        useWindow={false}
        hasMore={hasMore}
        loadMore={loadMore}
      >
        {defultList.map((item, index) => {
          return (
            <li key={index} className="scrollItem">
              <PostItem />
            </li>
          )
        })}
      </Infiniteloading>
    </ul>
  )
}
export default App;
