import React, { useState } from "react";
import { Tabs, TabPane } from '@nutui/nutui-react-taro';
import PostList from './list';

const App = () => {
  const [tab1value, setTab1value] = useState('0');
  return (
    <>
      <Tabs value={tab1value} onChange={({ paneKey }) => {
        setTab1value(paneKey)
      }}>
        <TabPane title="通知">
          <PostList />
        </TabPane>
        <TabPane title="评论">
          <PostList />
        </TabPane>
        {/* <TabPane title="Tab 3"> Tab 3 </TabPane> */}
      </Tabs>
    </>
  );
};
export default App;
