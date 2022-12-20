import React, { useState, useEffect } from "react";
import { Infiniteloading, Cell } from '@nutui/nutui-react-taro';
import PostItem from "../../../components/PostItem";
import './index.less';

const App = () => {
  const [defultList, setDefultList] = useState<string[]>([])
  const [hasMore, setHasMore] = useState(true)

  useEffect(() => {
    // init()
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

  const init = () => {
    for (let i = 0; i < 20; i++) {
      defultList.push(`${i}`)
    }
    setDefultList([...defultList])
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
