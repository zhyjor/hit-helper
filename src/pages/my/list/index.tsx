import React, { useState } from "react";
import { Tabs, TabPane } from '@nutui/nutui-react-taro';
import PostItem from '../../../components/PostItem';

const PostList = ({ list }) => {
  console.log(list);
  return (
    <ul>
      {list.map((item) => {
        return (
          <li key={item.id} className="scrollItem">
            <PostItem data={item} />
          </li>
        )
      })}
    </ul>
  )
}

interface IProps {
  list: Post.PostItem[];
  tabKey: Feature.TabKey;
  onTabChange: (e: Feature.TabKey) => void;
}
const App: React.FC<IProps> = (props) => {
  const { list, tabKey, onTabChange } = props;
  return (
    <>
      <Tabs value={tabKey} onChange={({ paneKey }) => {
        onTabChange(paneKey as Feature.TabKey)
      }}>
        <TabPane paneKey="mine" title="帖子">
          <PostList list={list} />
        </TabPane>
        <TabPane paneKey="favorite" title="收藏">
          <PostList list={list} />
        </TabPane>
      </Tabs>
    </>
  );
};
export default App;
