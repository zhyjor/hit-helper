import { useState } from "react";
import {
  Tabbar, TabbarItem
} from "@nutui/nutui-react-taro";
import Home from '../home';
import Post from '../post'
import Plate from '../plate';
import Message from '../message';
import My from '../my';
import "./index.less";

const Index = () => {

  const [activeKey, setActiveKey] = useState<number>(2);

  return (
    <div className="layout-wrapper">
      <div className="layout-content">
        {activeKey === 0 && <Home />}
        {/* {activeKey === 1 && <Plate />} */}
        {activeKey === 1 && <Post />}
        {/* {activeKey === 3 && <Message />} */}
        {activeKey === 2 && <My />}

      </div>
      <Tabbar
        onSwitch={(child, idx) => {
          console.log(idx)
          setActiveKey(idx);
        }}
      >
        <TabbarItem tabTitle="首页" icon="home" />
        {/* <TabbarItem tabTitle="版块" icon="category" /> */}
        <TabbarItem tabTitle="发帖" icon="find" />
        {/* <TabbarItem tabTitle="消息" icon="cart" /> */}
        <TabbarItem tabTitle="我的" icon="my" />
      </Tabbar>
    </div>
  );

}
export default Index
