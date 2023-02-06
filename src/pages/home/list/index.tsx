import { useState, useEffect, useMemo } from "react";

import useCloudFunction from "../../../hooks/useCloudFunction";

import PostItem from "../../../components/PostItem";
import AdvanceScrollView from "../../../components/AdvanceScrollView";
import './index.less';

const PAGESIZE = 10;

const checkHasMore = (pageNo, total) => {
  return pageNo * PAGESIZE < total;
}

const App = () => {
  const [list, setList] = useState<Post.PostItem[]>([])
  const [hasMore, setHasMore] = useState(true);
  const [pageNo, setPageNo] = useState(1);
  const { run: fetList, loading } = useCloudFunction<Base.Page<Post.PostItem>>({ manual: true, name: 'router', path: 'postList', body: { pageNo, pageSize: 10 } });

  useEffect(() => {
    onRefresherRefresh();
  }, []);

  const onRefresherRefresh = async () => {
    if (loading) return;
    const [e, data] = await fetList({ pageNo: 1, pageSize: PAGESIZE });
    console.log(data);
    if (data) {
      setList(data?.list!);
      setPageNo(data.pageNo);
      setHasMore(checkHasMore(data.pageNo, data.total));
    }
  }

  const onReachBottomHandler = async () => {
    if (loading || !hasMore) return;
    const [e, data] = await fetList({ pageNo: pageNo + 1, pageSize: PAGESIZE });
    if (data) {
      setHasMore(checkHasMore(data.pageNo, data.total));
      setPageNo(data.pageNo);
      const _list = list.concat(data.list ?? []);
      console.log(_list);
      setList(_list);
    }
  }

  return (
    <ul id="scroll" className="scroll">
      <AdvanceScrollView
        hasMore={hasMore}
        onLoadMore={onReachBottomHandler}
        onRefresh={onRefresherRefresh}
      >
        {list.map((item) => {
          return (
            <li key={item.id} className="scrollItem">
              <PostItem data={item} />
            </li>
          )
        })}
      </AdvanceScrollView>
    </ul>
  )
}
export default App;
