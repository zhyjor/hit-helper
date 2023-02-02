import { useState, useEffect, useMemo } from "react";
import { ScrollView } from "@tarojs/components";
import useCloudFunction from "../../../hooks/useCloudFunction";

import PostItem from "../../../components/PostItem";
import './index.less';

const App = () => {
  // const [list, setList] = useState<Post.PostItem[]>([])
  const [hasMore, setHasMore] = useState(true);
  const [pageNo, setPageNo] = useState(1);
  const [refresherTriggered, setRefresherTriggered] = useState(false);
  const { data: pageData, run: getPostList, loading } = useCloudFunction({ manual: true, name: 'router', path: 'postList', body: { pageNo, pageSize: 10 } });

  const list = useMemo(() => {
    if (pageData) {
      return pageData;
    }
    return [];
  }, [pageData]);

  const fetList = async () => {
    await getPostList();
    setRefresherTriggered(false);
  }

  useEffect(() => {
    fetList();
  }, [pageNo]);

  const onRefresherRefresh = async () => {
    setRefresherTriggered(true);
    setPageNo(1)
  }

  const onReachBottomHandler = () => {
    if (loading) return;
    setPageNo(pageNo + 1);
  }

  return (
    <ul id="scroll" className="scroll">
      <ScrollView
        className='scrollview'
        scrollY
        refresherEnabled
        refresherTriggered={refresherTriggered}
        onRefresherRefresh={onRefresherRefresh}
        onScrollToLower={onReachBottomHandler}
        lowerThreshold={30}
      >
        {list.map((item) => {
          return (
            <li key={item.id} className="scrollItem">
              <PostItem data={item} />
            </li>
          )
        })}
      </ScrollView>
    </ul>
  )
}
export default App;
