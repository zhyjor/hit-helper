import React, { useState } from "react";
import { Tabs, TabPane, PullToRefresh } from '@nutui/nutui-react-taro';
import PostList from './list';

const App = () => {
  const [tab1value, setTab1value] = useState('0');
  return (
    <PullToRefresh>
      <Tabs value={tab1value} onChange={({ paneKey }) => {
        setTab1value(paneKey)
      }}>
        <TabPane title="最新">
          <PostList />
        </TabPane>
        <TabPane title="精华">
          <PostList />
        </TabPane>
        {/* <TabPane title="Tab 3"> Tab 3 </TabPane> */}
      </Tabs>
    </PullToRefresh>
  );
};
export default App;
