import { Component } from "react";
import {
  Button,
  Cell, Tabbar, TabbarItem
} from "@nutui/nutui-react-taro";
import Home from '../home';
import Post from '../post'
import Plate from '../plate';
import Message from '../message';
import My from '../my';
import "./index.less";

type PropsWithChildren = {
  activeKey: 0 | 1 | 2 | 3 | 4;
}
class Index extends Component<PropsWithChildren, PropsWithChildren> {
  constructor(props: any) {
    super(props);
    this.state = {
      activeKey: 2,
    }
  }

  componentWillMount() { }

  componentDidMount() { }

  componentWillUnmount() { }

  componentDidShow() { }

  componentDidHide() { }

  render() {
    const { activeKey } = this.state;
    return (
      <div className="layout-wrapper">
        <div className="layout-content">
          {activeKey === 0 && <Home />}
          {activeKey === 1 && <Plate />}
          {activeKey === 2 && <Post />}
          {activeKey === 3 && <Message />}
          {activeKey === 4 && <My />}

        </div>
        <Tabbar
          onSwitch={(child, idx) => {
            console.log(idx)
            this.setState({ activeKey: idx as any });
          }}
        >
          <TabbarItem tabTitle="首页" icon="home" />
          <TabbarItem tabTitle="版块" icon="category" />
          <TabbarItem tabTitle="发帖" icon="find" />
          <TabbarItem tabTitle="消息" icon="cart" />
          <TabbarItem tabTitle="我的" icon="my" />
        </Tabbar>
      </div>
    );
  }
}
export default Index
